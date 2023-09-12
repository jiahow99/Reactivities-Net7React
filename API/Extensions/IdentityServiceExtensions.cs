using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using API.Services;
using Domain;
using Infrastructure.Policy;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;

namespace API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services, 
            IConfiguration config) 
        {
            services.AddIdentityCore<AppUser>(opt => 
            {
                opt.Password.RequireNonAlphanumeric = false;
            })
            .AddEntityFrameworkStores<DataContext>()
            .AddSignInManager<SignInManager<AppUser>>();

            // JWT authentication
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(opt => 
            {
                opt.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                };
                opt.Events = new JwtBearerEvents {
                    OnMessageReceived = context => {
                        // Access token in request
                        var accessToken = context.Request.Query["access_token"];  

                        // If the request is for our path ...
                        var path = context.HttpContext.Request.Path;  // Url path
                        if (!string.IsNullOrEmpty(accessToken) && path.StartsWithSegments("/chat"))
                        {
                            context.Token = accessToken;  // Manually set bearer token
                        }
                        return Task.CompletedTask;
                    }
                };
            });
            
            // Policy (IsHost)
            services.AddAuthorization(opt => {
                opt.AddPolicy("IsHostPolicy", policy => {
                    policy.Requirements.Add(new IsHostPolicy());
                });
            });
            services.AddTransient<IAuthorizationHandler, IsHostPolicyHandler>();

            // Token Service
            services.AddScoped<TokenService>();

            return services;
        }
    }
}