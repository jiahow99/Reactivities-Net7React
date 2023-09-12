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
        [HttpPost("{username}")]  // Follow
        public async Task<IActionResult> FollowToggle(string username)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command{TargetUsername = username}));
        }
    }
}