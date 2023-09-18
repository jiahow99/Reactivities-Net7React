using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;

namespace Persistence
{
    public class Seed
    {
        public static async Task SeedData(DataContext context,
            UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any() && !context.Activities.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Wilson",
                        UserName = "Wilson",
                        Email = "wilson@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Robert Dan",
                        UserName = "Robert Dan",
                        Email = "robert@test.com"
                    },
                    new AppUser
                    {
                        DisplayName = "Tom Cruising",
                        UserName = "Tom Cruising",
                        Email = "tom@test.com"
                    },
                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Past Activity 1",
                        Date = DateTime.Now.AddMonths(-2),
                        Description = "The metaverse is a digital realm where the physical and virtual worlds converge, promising limitless possibilities.",
                        Category = "Web3",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Past Activity 2",
                        Date = DateTime.Now.AddMonths(-1),
                        Description = "Celebrated as a digital frontier, it's transforming our lives, redefining work, and reshaping social connections—a vision of a future where the virtual seamlessly blends with the real.",
                        Category = "Metaverse",
                        City = "Paris",
                        Venue = "The Louvre",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 1",
                        Date = DateTime.Now.AddMonths(1),
                        Description = "As a digital frontier, it's not just a realm; it's a revolution. It's changing the way we work, socialize, and create—a window into a future where the lines between reality and the virtual blur.",
                        Category = "Blockchain",
                        City = "London",
                        Venue = "Wembly Stadium",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 2",
                        Date = DateTime.Now.AddMonths(2),
                        Description = "The metaverse is a digital realm where the physical and virtual worlds converge, promising limitless possibilities.",
                        Category = "Speech",
                        City = "London",
                        Venue = "Jamies Italian",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 3",
                        Date = DateTime.Now.AddMonths(3),
                        Description = "Celebrated as a digital frontier, it's transforming our lives, redefining work, and reshaping social connections—a vision of a future where the virtual seamlessly blends with the real.",
                        Category = "Web3",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 4",
                        Date = DateTime.Now.AddMonths(4),
                        Description = "The metaverse is a digital realm where the physical and virtual worlds converge, promising limitless possibilities.",
                        Category = "Blockchain",
                        City = "London",
                        Venue = "British Museum",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = true                            
                            }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 5",
                        Date = DateTime.Now.AddMonths(5),
                        Description = "Celebrated as a digital frontier, it's transforming our lives, redefining work, and reshaping social connections—a vision of a future where the virtual seamlessly blends with the real.",
                        Category = "Birds",
                        City = "London",
                        Venue = "Punch and Judy",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 6",
                        Date = DateTime.Now.AddMonths(6),
                        Description = "The metaverse is a digital realm where the physical and virtual worlds converge, promising limitless possibilities.",
                        Category = "Speech",
                        City = "London",
                        Venue = "O2 Arena",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(7),
                        Description = "Celebrated as a digital frontier, it's transforming our lives, redefining work, and reshaping social connections—a vision of a future where the virtual seamlessly blends with the real.",
                        Category = "Web3",
                        City = "Berlin",
                        Venue = "All",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[0],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = false                            
                            },
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 8",
                        Date = DateTime.Now.AddMonths(8),
                        Description = "The metaverse is a digital realm where the physical and virtual worlds converge, promising limitless possibilities.",
                        Category = "Web3",
                        City = "London",
                        Venue = "Pub",
                        Attendees = new List<ActivityAttendee>
                        {
                            new ActivityAttendee
                            {
                                AppUser = users[2],
                                IsHost = true                            
                            },
                            new ActivityAttendee
                            {
                                AppUser = users[1],
                                IsHost = false                            
                            },
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
