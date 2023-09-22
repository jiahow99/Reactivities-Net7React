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
                // Photos
                var photos = new List<(string Id, string Url)>
                {
                    ("tfpejhud6lbwodnezn80", "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695284155/tfpejhud6lbwodnezn80.jpg"),
                    ("ejkxk12biugi0i4levcl", "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695284152/ejkxk12biugi0i4levcl.jpg"),
                    ("dp2s3ummbvxylilxafgf", "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695284150/dp2s3ummbvxylilxafgf.jpg"),
                    ("mam3wxfoonkcgen2kf7f", "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695284152/mam3wxfoonkcgen2kf7f.jpg"),
                    ("gim6h27rwr1pa7lbil8o", "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695284152/gim6h27rwr1pa7lbil8o.jpg"),
                    ("atgonkyxhg4xhhrarfgx", "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695284150/atgonkyxhg4xhhrarfgx.jpg"),
                    ("fyg0ri3oadzs7mtfikvq", "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695284151/fyg0ri3oadzs7mtfikvq.jpg"),
                    ("qjnxog263ckhfiyq6tr7", "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695284150/qjnxog263ckhfiyq6tr7.jpg"),
                    ("hpkx1dliassnrvxdrgyv", "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695284150/hpkx1dliassnrvxdrgyv.jpg")
                };
                // Users
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
                        },
                        ActivityPhotos = new List<ActivityPhoto>
                        {
                            new ActivityPhoto { Id = "tfpejhud6lbwodnezn80", Url = photos[0].Url },
                            new ActivityPhoto { Id = "tfpejhud62bwodnezn80", Url = photos[1].Url },
                            new ActivityPhoto { Id = "tfpejhud63bwodnezn80", Url = photos[2].Url }
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
                        },
                        ActivityPhotos = new List<ActivityPhoto>
                        {
                            new ActivityPhoto { Id = "tfpej1ud6lbwodnezn80", Url = photos[2].Url },
                            new ActivityPhoto { Id = "tfpej2ud6lbwodnezn80", Url = photos[5].Url },
                            new ActivityPhoto { Id = "tfpej3ud6lbwodnezn80", Url = photos[7].Url }
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
                        },
                        ActivityPhotos = new List<ActivityPhoto>
                        {
                            new ActivityPhoto { Id = "tfpe4hud6lbwodnezn80", Url = photos[1].Url },
                            new ActivityPhoto { Id = "tfpe5hud6lbwodnezn80", Url = photos[1].Url },
                            new ActivityPhoto { Id = "tfpe6hud6lbwodnezn80", Url = photos[3].Url }
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
                        },
                        ActivityPhotos = new List<ActivityPhoto>
                        {
                            new ActivityPhoto { Id = "tfpejhud6lbwo1nezn80", Url = photos[0].Url },
                            new ActivityPhoto { Id = "tfpejhud6lbwo2nezn80", Url = photos[3].Url },
                            new ActivityPhoto { Id = "tfpejhud6lbwo3nezn80", Url = photos[1].Url }
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
                        },
                        ActivityPhotos = new List<ActivityPhoto>
                        {
                            new ActivityPhoto { Id = "1fpejhud6lbwodnezn80", Url = photos[8].Url },
                            new ActivityPhoto { Id = "2fpejhud6lbwodnezn80", Url = photos[7].Url },
                            new ActivityPhoto { Id = "fpejhud6lbwodnezn80", Url = photos[6].Url }
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
                        },
                        ActivityPhotos = new List<ActivityPhoto>
                        {
                            new ActivityPhoto { Id = "tfpejhud6lbwodnezn86", Url = photos[6].Url },
                            new ActivityPhoto { Id = "tfpejhud6lbwodnezn87", Url = photos[3].Url },
                            new ActivityPhoto { Id = "tfpejhud6lbwodnezn88", Url = photos[2].Url }
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
                        },
                        ActivityPhotos = new List<ActivityPhoto>
                        {
                            new ActivityPhoto { Id = "afpejhud6lbwodnezn80", Url = photos[5].Url },
                            new ActivityPhoto { Id = "bfpejhud6lbwodnezn80", Url = photos[1].Url },
                            new ActivityPhoto { Id = "cfpejhud6lbwodnezn80", Url = photos[8].Url }
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
                        },
                        ActivityPhotos = new List<ActivityPhoto>
                        {
                            new ActivityPhoto { Id = "tspejhud6lbwodnezn80", Url = photos[6].Url },
                            new ActivityPhoto { Id = "ttpejhud6lbwodnezn80", Url = photos[2].Url },
                            new ActivityPhoto { Id = "tjejhud6lbwodnezn80", Url = photos[7].Url }
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
                        },
                        ActivityPhotos = new List<ActivityPhoto>
                        {
                            new ActivityPhoto { Id = "tfpejhud11bwodnezn80", Url = photos[6].Url },
                            new ActivityPhoto { Id = "tfpejhud52bwodnezn80", Url = photos[1].Url },
                            new ActivityPhoto { Id = "tfpejhud22bwodnezn80", Url = photos[3].Url }
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
                        },
                        ActivityPhotos = new List<ActivityPhoto>
                        {
                            new ActivityPhoto { Id = "t11ejhud6lbwodnezn80", Url = photos[7].Url },
                            new ActivityPhoto { Id = "t22ejhud6lbwodnezn80", Url = photos[2].Url },
                            new ActivityPhoto { Id = "t33ejhud6lbwodnezn80", Url = photos[5].Url }
                        }
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
