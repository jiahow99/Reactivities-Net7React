using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Comments;
using MediatR;
using Microsoft.AspNetCore.SignalR;

namespace API.SIgnalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;
        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(Create.Command command)
        {
            // Send comment
            var comment = await _mediator.Send(command);

            // Emit event to specific group
            await Clients.Group(command.ActivityId.ToString())
                .SendAsync("ReceiveComment", comment.Value);
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            
            // Get "activityId" from request
            var activityId = httpContext.Request.Query["activityId"];

            // Join the user to group
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);

            // Load comments to client
            var comments = await _mediator.Send(new List.Query{ActivityId = Guid.Parse(activityId)});
            await Clients.Caller.SendAsync("LoadComments", comments.Value);
        }
    }
}