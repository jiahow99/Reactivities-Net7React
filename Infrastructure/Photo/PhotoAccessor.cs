using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Interfaces;
using Application.Photos;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Domain;
using Infrastructure.Photos;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;

namespace Infrastructure.Photo
{
    public class PhotoAccessor : IPhotoAccessor
    {
        private readonly Cloudinary _cloudinary;
        public PhotoAccessor(IOptions<CloudinarySettings> config)
        {
            var account = new Account(
                config.Value.CloudName,
                config.Value.ApiKey,
                config.Value.ApiSecret
            );
            _cloudinary = new Cloudinary(account);
        }


        public async Task<PhotoUploadResult> AddPhoto(IFormFile file)
        {
            if(file.Length > 0) 
            {
                await using var stream = file.OpenReadStream();
                var uploadParams = new ImageUploadParams {
                    File = new FileDescription(file.FileName, stream),
                    Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                };

                var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                // Uplaod fail
                if(uploadResult.Error != null) {
                    throw new Exception(uploadResult.Error.Message);
                }

                // Success, return results
                return new PhotoUploadResult {
                    PublicId = uploadResult.PublicId,
                    Url = uploadResult.SecureUrl.ToString()
                };
            }

            return null;
        }

        public async Task<List<ActivityPhoto>> AddMultiplePhoto(List<IFormFile> files)
        {
            var photos = new List<ActivityPhoto>();

            if(files.Count > 0) 
            {
                foreach (var file in files)
                {
                    // Params 
                    await using var stream = file.OpenReadStream();
                    var uploadParams = new ImageUploadParams {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Height(500).Width(500).Crop("fill")
                    };

                    // Upload to cloudinary
                    var uploadResult = await _cloudinary.UploadAsync(uploadParams);

                    // Upload Fail
                    if(uploadResult.Error != null) {
                        throw new Exception(uploadResult.Error.Message);
                    }

                    photos.Add(new ActivityPhoto {
                        Id = uploadResult.PublicId,
                        Url = uploadResult.SecureUrl.ToString(),
                    });
                }
            }
            return photos;
        }

        public async Task<string> DeletePhoto(string publicId)
        {
            var deleteParams = new DeletionParams(publicId);
            var result = await _cloudinary.DestroyAsync(deleteParams);
            
            return result.Result == "ok" 
                ? result.Result
                : null;
        }
    }
}