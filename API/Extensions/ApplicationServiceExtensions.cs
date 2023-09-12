using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Infrastructure;
using Infrastructure.Photo;
using Infrastructure.Photos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(this IServiceCollection services, IConfiguration config)
        {
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebAPIv5", Version = "v1" });
            });
            services.AddDbContext<DataContext>(opt => {
                opt.UseSqlite(config.GetConnectionString("DefaultConnection"));
            });
            // Register new CORS
            services.AddCors(opt => 
            {
                opt.AddPolicy("CorsPolicy", policy => 
                {
                    policy.AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials()
                        .WithOrigins("http://localhost:3000");
                });
            });
            // Mediator
            services.AddMediatR(typeof(List.Handler).Assembly);
            // Auto Mapper
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            // User Accessor
            services.AddScoped<IUserAccessor, UserAccessor>();
            // Photo Accessor
            services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            // Cloudinary API
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            // SignalR
            services.AddSignalR();

            return services;
        }
    }
}