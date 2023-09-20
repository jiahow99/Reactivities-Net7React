using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Diagnostics;

namespace Persistence
{
    public class DataContext : IdentityDbContext<AppUser>
    {
        public DbSet<Activity> Activities { get; set; } 
        public DbSet<ActivityAttendee> ActivityAttendee { get; set; } 
        public DbSet<Photo> Photos { get; set; } 
        public DbSet<Comment> Comments { get; set; }
        public DbSet<UserFollowing> UserFollowing { get; set; }
        public DbSet<ProfilePhoto> ProfilePhotos { get; set; }

        
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            // Configure the default value for the Bio property
            builder.Entity<AppUser>()
                .Property(u => u.Bio)
                .HasDefaultValue("No bio available")
                .IsRequired(false);

            builder.Entity<ActivityAttendee>(x => x.HasKey(aa => new {aa.AppUserId, aa.ActivityId}));

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.AppUser)
                .WithMany(u => u.Activities)
                .HasForeignKey(u => u.AppUserId);

            builder.Entity<ActivityAttendee>()
                .HasOne(u => u.Activity)
                .WithMany(u => u.Attendees)
                .HasForeignKey(u => u.ActivityId);

            builder.Entity<Comment>()
                .HasOne(a => a.Activity)
                .WithMany(a => a.Comments)
                .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<UserFollowing>(b => {
                b.HasKey(k => new {k.ObserverId, k.TargetId});

                b.HasOne(x => x.Observer)
                    .WithMany(x => x.Followings)
                    .HasForeignKey(x => x.ObserverId)
                    .OnDelete(DeleteBehavior.Cascade);

                b.HasOne(x => x.Target)
                    .WithMany(x => x.Followers)
                    .HasForeignKey(x => x.TargetId)
                    .OnDelete(DeleteBehavior.Cascade);
            });
                
        }

    }
}