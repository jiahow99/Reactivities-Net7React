using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Profiles
{
    public class UpdateUserDto
    {
        public string UserName { get; set; }
        public string DisplayName { get; set; }
        public string Email { get; set; }
        public string PhoneNumber { get; set; }
    }
}