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
        
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the default value for the Bio property
            modelBuilder.Entity<AppUser>()
                .Property(u => u.Bio)
                .HasDefaultValue("No bio available")
                .IsRequired(false);
        }

    }
}