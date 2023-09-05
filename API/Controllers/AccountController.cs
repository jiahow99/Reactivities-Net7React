using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager, TokenService tokenService)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }


        [HttpPost("login")] // api/account/login
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // Find email in db
            var user = await _userManager.FindByEmailAsync(loginDto.Email);

            // No such email
            if (user == null) return Unauthorized();

            // Attempt login
            var loginResult = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            // Return success with user info if pwd match
            if(loginResult.Succeeded) {
                return new UserDto
                {
                    DisplayName = user.DisplayName,
                    Image = null,
                    Token = _tokenService.CreateToken(user),
                };
            }

            // Return 401 unauthorized if pwd not match
            return Unauthorized();
        }
        
    }
}