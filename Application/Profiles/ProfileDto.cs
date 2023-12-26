using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;

namespace Application.Profiles
{
    public class ProfileDto
    {
        public string DisplayName { get; set; }
        public string Bio { get; set; }
        public string Image { get; set; }
        public ICollection<Photo> Photos { get; set; }
        public ICollection<Activity> Activities { get; set; }
    }
}