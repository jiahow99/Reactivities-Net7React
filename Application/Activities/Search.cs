using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Search
    {
        public class Query: IRequest<Result<List<ActivityDto>>>
        {
            public SearchParams SearchParams { get; set; }
        }

        public class Handler : IRequestHandler<Query, Result<List<ActivityDto>>>
        {
            private readonly IMapper _mapper;
            private readonly DataContext _context;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities    
                    .Where(x => x.Date >= DateTime.Today)
                    .Where(x => x.Title.ToLower().Contains(request.SearchParams.Title.ToLower()))
                    .OrderBy(x => x.Date)
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync();
                
                return Result<List<ActivityDto>>.Success(activities);
            }
        }
    }
}