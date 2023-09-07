using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Activity, Activity>();

            CreateMap<Activity, ActivityDto>()
                .ForMember(
                    d => d.HostUsername, 
                    opt => opt.MapFrom(s => s.Attendees
                    .FirstOrDefault(att => att.IsHost).AppUser.UserName)
                );
            
            CreateMap<ActivityAttendee, Profiles.Profile>()
                .ForMember(d => d.Username, opt => opt.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Bio, opt => opt.MapFrom(s => s.AppUser.Bio));
        }
    }
}