using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }    // Activity ID
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Get the activity with all attendees
                var activity = await _context.Activities
                    .Include(a => a.Attendees).ThenInclude(a => a.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);
                
                if(activity == null) return null;

                // Get user that make request
                var user = await _context.Users
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());
                
                if(user == null) return null;

                // Get hostname of the activity
                var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost).AppUser.UserName;

                // See if the user is in the activity
                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                // Host action
                if (attendance != null && user.UserName == hostUsername)
                    activity.IsCancelled = !activity.IsCancelled;
                // Attendee action (unfollow)
                if (attendance != null && user.UserName != hostUsername)
                    activity.Attendees.Remove(attendance);
                // Attendee action (follow)
                if (attendance == null)
                {
                    attendance = new ActivityAttendee{
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };

                    activity.Attendees.Add(attendance);
                }

                // Save changes and return results
                var result = await _context.SaveChangesAsync() > 0;
                return result 
                    ? Result<Unit>.Success(Unit.Value)
                    : Result<Unit>.Failure("Problem performing action.");

                
            }
        }
    }
}