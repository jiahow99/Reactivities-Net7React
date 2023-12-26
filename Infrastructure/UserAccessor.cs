using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Application.Interfaces;
using Microsoft.AspNetCore.Http;

namespace Infrastructure
{
    public class UserAccessor : IUserAccessor
    {
        private readonly IHttpContextAccessor _httpAccessor;
        public UserAccessor(IHttpContextAccessor httpAccessor)
        {
            _httpAccessor = httpAccessor;
        }

        public string? GetUsername()
        {
            return _httpAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.Name);
        }
    }
}