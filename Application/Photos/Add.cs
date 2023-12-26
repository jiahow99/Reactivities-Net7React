using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class Add
    {
        public class Command : IRequest<Result<Photo>>
        {
            public IFormFile File { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Photo>>
        {
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IPhotoAccessor photoAccessor, IUserAccessor userAccessor)
            {
                _userAccessor = userAccessor;
                _context = context;
                _photoAccessor = photoAccessor;
            }

            public async Task<Result<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users.Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) return null;

                var uploadResult = await _photoAccessor.AddPhoto(request.File);

                var photo = new Photo{
                    Url = uploadResult.Url,
                    Id = uploadResult.PublicId,
                    IsMain = false
                };

                // Set main if first photo
                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                user.Photos.Add(photo);

                var saveResult = await _context.SaveChangesAsync() > 0;

                return saveResult
                    ? Result<Photo>.Success(photo)
                    : Result<Photo>.Failure("Problem uploading image");

            }
        }
    }
}