using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Infrastructure.Policy
{
    public class IsHostPolicy : IAuthorizationRequirement
    {  
    }

    // Policy Handler
    public class IsHostPolicyHandler : AuthorizationHandler<IsHostPolicy>
    {
        private readonly DataContext _dbContext;
        private readonly IHttpContextAccessor _httpContext;
        public IsHostPolicyHandler(DataContext dbContext, IHttpContextAccessor httpContext)
        {
            _httpContext = httpContext;
            _dbContext = dbContext;
        }

        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, IsHostPolicy requirement)
        {
            var userId = context.User.FindFirstValue(ClaimTypes.NameIdentifier);
            
            if (userId == null) return Task.CompletedTask;  // Fail if no user

            // Get "id" from route and return Unauthorized if no id
            var idFromUrl = _httpContext.HttpContext?
                .Request.RouteValues
                .SingleOrDefault(x => x.Key == "id").Value?.ToString();
            
            // If id exist in url, then get the attendance and verify isHost action
            if (idFromUrl != null) {
                var activityId = Guid.Parse(idFromUrl);
                var attendance = _dbContext.ActivityAttendee
                    .AsNoTracking()
                    .SingleOrDefaultAsync(x => x.AppUserId == userId && x.ActivityId == activityId)
                    .Result;

                // No attendance
                if (attendance == null) return Task.CompletedTask;
                // Check isHost=true, then approve
                if (attendance.IsHost) context.Succeed(requirement);
            }

            return Task.CompletedTask;

            
            
        }
    }
}