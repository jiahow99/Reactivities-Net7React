using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTO;
using API.Services;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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


        [AllowAnonymous]
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
                return createUserDto(user);
            }

            // Return 401 unauthorized if pwd not match
            return Unauthorized();
        }

        [AllowAnonymous]
        [HttpPost("register")]  // api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // Email taken
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                return BadRequest("Email was taken");
            }
            // Username taken
            if (await _userManager.Users.AnyAsync(x => x.UserName == registerDto.Username))
            {
                return BadRequest("Username was taken");
            }

            // User instance
            var user = new AppUser {
                DisplayName = registerDto.DisplayName,
                UserName = registerDto.Username,
                Email = registerDto.Email
            };
            // Create user
            var result = await _userManager.CreateAsync(user, registerDto.Password);
            
            // Successful
            if (result.Succeeded) 
            {
                return createUserDto(user);
            }

            // Failed with message
            return BadRequest("There was problem registering account. Please try again later.");
        }

        [HttpGet]
        public async Task<UserDto> GetCurrentUser()
        {
            // Get user by "email in token"
            var user = await _userManager.FindByEmailAsync(User.FindFirstValue(ClaimTypes.Email));

            return createUserDto(user, false);
        }
        
        private UserDto createUserDto(AppUser user, bool createToken = true)
        {
            var userDto = new UserDto {
                DisplayName = user.DisplayName,
                Image = null,
                Username = user.UserName,
            };

            if (createToken)
            {
                userDto.Token = _tokenService.CreateToken(user);
            }

            return userDto;
        }
    }
}