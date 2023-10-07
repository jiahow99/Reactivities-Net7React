using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Create
    {
        public class Command : IRequest<Result<Activity>>
        {
            public Activity Activity { get; set; }
            public List<IFormFile> Files { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Activity>>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _photoAccessor = photoAccessor;
                _context = context;
                _userAccessor = userAccessor;
            }


            public async Task<Result<Activity>> Handle(Command request, CancellationToken cancellationToken)
            {
                // Find user with info from JWT in header
                var user = await _context.Users.FirstOrDefaultAsync(
                    x => x.UserName == _userAccessor.GetUsername());
                
                // Create new ActivityAttendee and set the user to host automatically
                var attendee = new ActivityAttendee
                {
                    AppUser = user,
                    Activity = request.Activity,
                    IsHost = true
                };
                request.Activity.Attendees.Add(attendee);

                // Create activity
                var activity = _context.Activities.Add(request.Activity);
                
                // Upload photos
                var photos = await _photoAccessor.AddMultiplePhoto(request.Files);
                foreach (var photo in photos) {
                    request.Activity.ActivityPhotos.Add(photo);
                }
                
                // Save changes
                var result = await _context.SaveChangesAsync() > 0;
                if (!result) return Result<Activity>.Failure("Failed to create activity.");
                return Result<Activity>.Success(request.Activity);
            }
        }
    }
}