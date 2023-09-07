using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Core;
using Application.Interfaces;
using Infrastructure;
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
            // Mediator
            services.AddMediatR(typeof(List.Handler).Assembly);
            // Auto Mapper
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            // User Accessor
            services.AddScoped<IUserAccessor, UserAccessor>();
            
            return services;
        }
    }
}