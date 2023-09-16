using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
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
        public class Query : IRequest<Result<PagedList<ActivityDto>>> {
            public PagingParams Params { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<PagedList<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _mapper = mapper;
            }


            public async Task<Result<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                // Mapper way
                var query = _context.Activities
                    .OrderBy(x => x.Date)
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, 
                        new {currentUsername = _userAccessor.GetUsername()})
                    .AsQueryable();

                return Result<PagedList<ActivityDto>>.Success(
                    await PagedList<ActivityDto>.CreateAsync(query, request.Params.CurrentPage
                        ,request.Params.PageSize)
                );
                    
                
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