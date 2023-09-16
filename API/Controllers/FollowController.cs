using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Follower;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowController : BaseApiController
    {
        [HttpPost("{username}")]  // api/follow
        public async Task<IActionResult> FollowToggle(string username)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command{TargetUsername = username}));
        }

        // api/follow/{bob}
        // ?type=followers || following
        [HttpGet("{username}")]  
        public async Task<IActionResult> GetFollowings(string username, string type)
        {
            return HandleResult(await Mediator.Send(new List.Query {
                Username = username,
                Type = type
            }));
        }
    }
}