using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<Result<Domain.Photo>>
        {
            public IFormFile File { get; set; }
        }


        public class Handler : IRequestHandler<Command, Result<Domain.Photo>>
        {
            private readonly IUserAccessor _userAccessor;
            private readonly DataContext _context;
            private readonly IPhotoAccessor _photoAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor, IPhotoAccessor photoAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
                _photoAccessor = photoAccessor;
            }

            public async Task<Result<Domain.Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                // No photo
                if (request.File == null) return Result<Domain.Photo>.Failure("No photo selected."); ;

                // Get user from JWT token
                var user = await _context.Users.Include(x => x.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccessor.GetUsername());

                if (user == null) 
                    return Result<Domain.Photo>.Failure("No such user");

                // Set current main to not main
                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
                if (currentMain != null) currentMain.IsMain = false;

                // Cloudinary API
                var uploadedPhoto = await _photoAccessor.AddPhoto(request.File);

                // Cloudinary fail
                if (uploadedPhoto == null) 
                    return Result<Domain.Photo>.Failure("Problem uploading photo.");

                // Add user photo
                var newPhoto = new Domain.Photo {
                    Id = uploadedPhoto.PublicId,
                    Url = uploadedPhoto.Url,
                    IsMain = true
                };
                user.Photos.Add(newPhoto);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Result<Domain.Photo>.Success(newPhoto);

                return Result<Domain.Photo>.Failure("Problem setting main photo.");
            }
        }
    }
}