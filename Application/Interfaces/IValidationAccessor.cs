using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;

namespace Application.Interfaces
{
    public interface IValidationAccessor
    {
        Task<IActionResult> ValidateDuplicateUser(AppUser user);
    }
}