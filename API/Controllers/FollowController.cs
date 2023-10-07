using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Follower;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        private readonly DataContext _context;
        public FollowController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("{username}")]  // api/follow/{username}
        public async Task<IActionResult> FollowToggle(string username)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command{TargetUsername = username}));
        }

        // api/follow/{bob}
        // type = "followers" || "following"
        [HttpGet("{username}")]  
        public async Task<IActionResult> GetFollowings(string username, string type)
        {
            var result = _context.Users
                .Where(x => x.UserName == "Wilson")
                .Select(x => x.Followings.Any(x => x.Target.UserName == "Jane"))
                .FirstOrDefault();

            return HandleResult(await Mediator.Send(new List.Query {
                Username = username,
                Type = type
            }));
        }
    }
}