using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class RegisterDto
    {
        public string DisplayName { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [RegularExpression("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@#$%^&+=]).{8,}$", 
        ErrorMessage = "The password must contain at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 8 characters long.")]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}