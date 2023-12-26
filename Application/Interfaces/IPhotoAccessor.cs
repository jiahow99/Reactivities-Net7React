using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Photos;
using Domain;
using Microsoft.AspNetCore.Http;

namespace Application.Interfaces
{
    public interface IPhotoAccessor
    {
        Task<PhotoUploadResult> AddPhoto(IFormFile file);
        Task<List<ActivityPhoto>> AddMultiplePhoto(List<IFormFile> file);
        Task<string> DeletePhoto(string publicId);
    }
}