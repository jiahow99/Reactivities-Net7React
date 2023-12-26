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

namespace Application.Follower
{
    public class FollowToggle
    {
        public class Command : IRequest<Result<Unit>> {
            public string TargetUsername { get; set; }
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
                // Main user
                var observer = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                // Target user
                var targetUser = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == request.TargetUsername);

                Console.WriteLine("------------------------------");
                Console.WriteLine(observer.UserName);
                Console.WriteLine(targetUser.UserName);
                Console.WriteLine("------------------------------");

                if (targetUser == null) return null;

                // Check for existing following, then follow and unfollow based on existing record
                var following = await _context.UserFollowing.FindAsync(observer.Id, targetUser.Id);
                // Follow
                if (following == null) {    
                    following = new UserFollowing {
                        Observer = observer,
                        Target = targetUser
                    };
                    _context.UserFollowing.Add(following);
                }
                // Unfollow
                else {
                    _context.UserFollowing.Remove(following);
                }

                // Save changes
                var success = await _context.SaveChangesAsync() > 0;
                if (success) return Result<Unit>.Success(Unit.Value);

                return Result<Unit>.Failure("Failed to update following.");
            }
        }
    }
}