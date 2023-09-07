using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class List
    {
        public class Query : IRequest<List<ActivityDto>> {}

        public class Handler : IRequestHandler<Query, List<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }


            public async Task<List<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Mapper way
                var activities = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();

                return activities;
                    
                
                // Linq way
                // var activityDtoList = await _context.Activities
                //     .Select(activity => new ActivityDto
                //     {
                //         Id = activity.Id,
                //         Title = activity.Title,
                //         Date = activity.Date,
                //         Description = activity.Description,
                //         Category = activity.Category,
                //         City = activity.City,
                //         Venue = activity.Venue,
                //         HostUsername = activity.Attendees.FirstOrDefault(att => att.IsHost).AppUser.UserName,
                //         Attendees = activity.Attendees
                //             .Select(att => new Profiles.Profile
                //             {
                //                 Username = att.AppUser.UserName,
                //                 DisplayName = att.AppUser.DisplayName,
                //                 Bio = att.AppUser.Bio,
                //             })
                //             .ToList()
                //     })
                //     .ToListAsync(cancellationToken);

                // return activityDtoList;
            }
        }
    }
}