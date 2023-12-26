using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using API.DTO;
using API.Services;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using Infrastructure;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly TokenService _tokenService;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        public AccountController(UserManager<AppUser> userManager, 
            SignInManager<AppUser> signInManager, TokenService tokenService, IMapper mapper, DataContext context)
        {
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
            _mapper = mapper;
            _context = context;
        }


        [AllowAnonymous]
        [HttpPost("login")] // api/account/login
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            // Find email in db
            var user = await _userManager.Users
                .Include(x => x.Photos)
                .SingleOrDefaultAsync(x => x.Email == loginDto.Email);

            // No such email
            if (user == null) return Unauthorized("No such email");

            // Attempt login
            var loginResult = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

            // Return success with user info if pwd match
            if(loginResult.Succeeded) {
                return CreateUserDto(user);
            }

            // Return 401 unauthorized if pwd not match
            return Unauthorized("Password not match");
        }


        [AllowAnonymous]
        [HttpPost("register")]  // api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {
            // Username taken
            if (await _userManager.Users.AnyAsync(x => x.NormalizedUserName == registerDto.Username.ToUpper()))
            {
                ModelState.AddModelError("username", "Username was taken");
                return ValidationProblem();
            }
            // Email taken
            if (await _userManager.Users.AnyAsync(x => x.Email == registerDto.Email))
            {
                ModelState.AddModelError("email", "Email was taken");
                return ValidationProblem();
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
                return CreateUserDto(user);
            }

            // Failed with message
            return BadRequest("There was problem registering account. Please try again later.");
        }


        [HttpGet]
        public async Task<UserDto> GetCurrentUser()
        {
            // Get user by "email in token"
            var user = await _userManager.Users.Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            return CreateUserDto(user, false);
        }
        

        [HttpPut("update")]  // api/account/update
        public async Task<IActionResult> Update(UpdateUserDto updateUserDto)
        {
            // Get user by email from token
            var user = await _userManager.Users
                .Include(x => x.Photos)
                .FirstOrDefaultAsync(x => x.Email == User.FindFirstValue(ClaimTypes.Email));

            if (user == null) return NotFound();

            // Check duplicate record and add model state error (if have)
            ValidateDuplicate(updateUserDto, user);
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Update details
            _mapper.Map(updateUserDto, user);
            
            // Save change
            var result = await _context.SaveChangesAsync() > 0;

            if (!result) return BadRequest("Problem updating user");

            return Ok(CreateUserDto(user, false));
        }

        [AllowAnonymous]
        [HttpGet("{userId}")]
        public async Task<IActionResult> Show(string userId)
        {
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null) return NotFound();

            var userToReturn = _mapper.Map<ProfileDto>(user);
            return Ok(userToReturn);
            // Linq to get user details
            // var userToReturn = await _userManager.Users
            //     .Where(u => u.Id == user.Id)
            //     .Select(u => new UserDto {
            //         Id = u.Id,
            //         Username = u.UserName,
            //         DisplayName = u.DisplayName,
            //         Photos = u.Photos,
            //         // Activities
            //         Activities = u.Activities
            //             .Where(a => a.IsHost && a.AppUserId == userId)
            //             .Select(a => new ActivityDto {
            //                 Id = a.ActivityId,
            //                 Title = a.Activity.Title,
            //                 Date = a.Activity.Date,
            //                 Description = a.Activity.Title,
            //                 Category = a.Activity.Category,
            //                 City = a.Activity.City,
            //                 Venue = a.Activity.Venue,
            //                 IsCancelled = a.Activity.IsCancelled,
            //                 Host = a.AppUser,
            //             })
            //             .ToList(),
            //     })
            //     .FirstOrDefaultAsync();
            
        }


        private UserDto CreateUserDto(AppUser user, bool createToken = true)
        {
            var userDto = new UserDto {
                Id = user.Id,
                Email = user.Email,
                DisplayName = user.DisplayName,
                Image = user.Photos?.FirstOrDefault(x => x.IsMain).Url,
                Username = user.UserName,
                PhoneNumber = user.PhoneNumber,
            };

            if (createToken)
            {
                userDto.Token = _tokenService.CreateToken(user);
            }

            return userDto;
        }


        private async void ValidateDuplicate(UpdateUserDto updateUserDto, AppUser user)
        {
            // Check duplicate email
            if (updateUserDto.Email != user.Email)
            {
                var existingEmail = await _userManager.FindByEmailAsync(updateUserDto.Email);
                if (existingEmail != null) 
                {
                    ModelState.AddModelError("email", "Email already in used");
                }
            }

            // Check duplicate username
            if (updateUserDto.UserName.ToUpper() != user.NormalizedUserName)
            {
                var existingUsername = await _userManager.FindByNameAsync(updateUserDto.UserName);
                if (existingUsername != null) 
                {
                    ModelState.AddModelError("username", "Username already in used");
                }
            }

            // Check duplicate display name
            if (!string.IsNullOrEmpty(updateUserDto.DisplayName) && updateUserDto.DisplayName != user.DisplayName)
            {
                var existingDisplayName = await _userManager.Users.FirstOrDefaultAsync(x => x.DisplayName == updateUserDto.DisplayName);
                if (existingDisplayName != null)
                {
                    ModelState.AddModelError("displayName", "Display name already in used");
                }
            }

            // Check duplicate phone number
            if (!string.IsNullOrEmpty(updateUserDto.PhoneNumber) && updateUserDto.PhoneNumber != user.PhoneNumber)
            {
                var existingPhone = await _userManager.Users.FirstOrDefaultAsync(x => x.PhoneNumber == updateUserDto.PhoneNumber);
                if (existingPhone != null) 
                {
                    ModelState.AddModelError("phoneNumber", "Phone number already in used");
                }
            }
        }
    }
}