using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Activities;
using Application.Comments;
using AutoMapper;
using Domain;

namespace Application.Core
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            string currentUsername = null;

            CreateMap<Activity, Activity>();
            CreateMap<Profiles.UpdateUserDto, AppUser>();

            CreateMap<Activity, ActivityDto>()
                .ForMember(d => d.Host, opt => opt.MapFrom(s => s.Attendees.FirstOrDefault(s => s.IsHost).AppUser))
                .ForMember(d => d.images, opt => opt.MapFrom(s => s.ActivityPhotos));
            
            CreateMap<ActivityAttendee, AttendeeDto>()
                .ForMember(d => d.Id, opt => opt.MapFrom(s => s.AppUser.Id))
                .ForMember(d => d.Username, opt => opt.MapFrom(s => s.AppUser.UserName))
                .ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.AppUser.DisplayName))
                .ForMember(d => d.Bio, opt => opt.MapFrom(s => s.AppUser.Bio))
                .ForMember(d => d.Image, opt => opt.MapFrom(s => s.AppUser.Photos.FirstOrDefault(x => x.IsMain).Url))
                .ForMember(d => d.FollowersCount, opt => opt.MapFrom(s => s.AppUser.Followers.Count))
                .ForMember(d => d.FollowingCount, opt => opt.MapFrom(s => s.AppUser.Followings.Count))
                .ForMember(d => d.Following, opt => opt.MapFrom(s => s.AppUser.Followings.Any(x => x.Observer.UserName == currentUsername)));

            CreateMap<AppUser, Profiles.Profile>()
                .ForMember(d => d.Image, opt => opt.MapFrom(s => s.Photos.FirstOrDefault().Url))
                .ForMember(d => d.FollowersCount, opt => opt.MapFrom(s => s.Followers.Count))
                .ForMember(d => d.FollowingCount, opt => opt.MapFrom(s => s.Followings.Count))
                .ForMember(d => d.Following, opt => opt.MapFrom(s => s.Followings.Any(x => x.Observer.UserName == currentUsername)));
        
            CreateMap<Comment, CommentDto>()
                .ForMember(d => d.Username, opt => opt.MapFrom(s => s.Author.UserName))
                .ForMember(d => d.DisplayName, opt => opt.MapFrom(s => s.Author.DisplayName))
                .ForMember(d => d.Image, opt => opt.MapFrom(s => s.Author.Photos.FirstOrDefault(x => x.IsMain).Url));
        }
    }
}