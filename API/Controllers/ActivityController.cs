using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivityController : BaseApiController
    {
        // Index
        [HttpGet]   // api/activity
        [AllowAnonymous]
        public async Task<ActionResult<List<ActivityDto>>> GetActivities()
        {
            return await Mediator.Send(new List.Query());
        }

        // Show
        [HttpGet("{id}")]   // api/activity/{id}
        [Authorize]
        public async Task<IActionResult> GetActivity(Guid id)
        {
            var result = await Mediator.Send(new Details.Query{Id = id});

            return HandleResult(result);
        }

        // Create
        [HttpPost]
        public async Task<IActionResult> CreateActivity(Activity activity)
        {
            var result = await Mediator.Send(new Create.Command {Activity = activity});

            return HandleResult(result);
        }

        // Edit
        [Authorize(Policy = "IsHostPolicy")]
        [HttpPut("{id}")]
        public async Task<IActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            
            return HandleResult(await Mediator.Send(new Edit.Command {Activity = activity}));
        }

        // Delete
        [Authorize(Policy = "IsHostPolicy")]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new Delete.Command {Id = id}));
        }

        // Edit attendance
        [HttpPost("{id}/attendance")]
        public async Task<IActionResult> UpdateAttendance(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command {Id = id}));
        }
    }
}   