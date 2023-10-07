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
                var wilson = new AppUser
                {
                    DisplayName = "Wilson",
                    UserName = "Wilson",
                    Email = "wilson@test.com",
                    Photos = new List<Photo>
                    {
                        new Photo {
                            Id = "lgx9iwkaq3ttklc3llhr",
                            Url = "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695880007/lgx9iwkaq3ttklc3llhr.png",
                            IsMain = true
                        }
                    }
                };
                var robert = new AppUser
                {
                    DisplayName = "Robert Dan",
                    UserName = "Robert Dan",
                    Email = "robert@test.com",
                    Photos = new List<Photo>
                    {
                        new Photo {
                            Id = "uhe1lcvyzeuedlti6hh5",
                            Url = "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695880007/uhe1lcvyzeuedlti6hh5.png",
                            IsMain = true
                        }
                    }
                };
                var jane = new AppUser
                {
                    DisplayName = "Jane",
                    UserName = "Jane",
                    Email = "jane@test.com",
                    Photos = new List<Photo>
                    {
                        new Photo {
                            Id = "susyt9ln29c5jhws029o",
                            Url = "https://res.cloudinary.com/dmlkpaodl/image/upload/v1695880007/susyt9ln29c5jhws029o.png",
                            IsMain = true
                        }
                    }
                };
                var users = new List<AppUser>{wilson,robert, jane};
                foreach (var user in users)
                {
                    
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }
                // Create follower-following relationships
                var wilsonUser = users.First(u => u.UserName == "Wilson");
                var robertUser = users.First(u => u.UserName == "Robert Dan");
                var janeUser = users.First(u => u.UserName == "Jane");

                await context.UserFollowing.AddAsync(new UserFollowing
                {
                    ObserverId = wilsonUser.Id,
                    TargetId = robertUser.Id
                });
                await context.UserFollowing.AddAsync(new UserFollowing
                {
                    ObserverId = wilsonUser.Id,
                    TargetId = janeUser.Id
                });
                await context.UserFollowing.AddAsync(new UserFollowing
                {
                    ObserverId = robertUser.Id,
                    TargetId = wilsonUser.Id
                });
                await context.UserFollowing.AddAsync(new UserFollowing
                {
                    ObserverId = janeUser.Id,
                    TargetId = wilsonUser.Id
                });


                var activities = new List<Activity>
                {
                    new Activity
                    {
                        Title = "Virtual Reality Extravaganza",
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
                        Title = "Virtual Reality Extravaganza",
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
                        Title = "Virtual Reality Extravaganza",
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
                        Title = "Metaverse Summit",
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
                        Title = "Future of Virtual Reality",
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
                        Title = "Metaverse Summit",
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
                        Title = "Digital Frontier Expo",
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
                        Title = "Web3 World Congress",
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
                            new ActivityPhoto { Id = "tfpejaud6lbwodnezn80", Url = photos[0].Url },
                            new ActivityPhoto { Id = "tfpejbud62bwodnezn80", Url = photos[1].Url },
                            new ActivityPhoto { Id = "tfpejsud63bwodnezn80", Url = photos[2].Url }
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
                            new ActivityPhoto { Id = "tfpej1ud6lbw4dnezn80", Url = photos[2].Url },
                            new ActivityPhoto { Id = "tfpej2ud6lbwsdnezn80", Url = photos[5].Url },
                            new ActivityPhoto { Id = "tfpej3ud6lbwbdnezn80", Url = photos[7].Url }
                        }
                        
                    },
                    new Activity
                    {
                        Title = "Virtual Reality Extravaganza",
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
                            new ActivityPhoto { Id = "tfpe41ud6lbwodnezn80", Url = photos[1].Url },
                            new ActivityPhoto { Id = "tfpe52ud6lbwodnezn80", Url = photos[1].Url },
                            new ActivityPhoto { Id = "tfpe63ud6lbwodnezn80", Url = photos[3].Url }
                        }
                    },
                    new Activity
                    {
                        Title = "Metaverse Summit",
                        Date = DateTime.Now.AddMonths(6),
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
                            new ActivityPhoto { Id = "tfpejh5d6lbwo1nezn80", Url = photos[0].Url },
                            new ActivityPhoto { Id = "tfpejh7d6lbwo2nezn80", Url = photos[3].Url },
                            new ActivityPhoto { Id = "tfpejh8d6lbwo3nezn80", Url = photos[1].Url }
                        }
                    },
                    new Activity
                    {
                        Title = "Virtual Reality Extravaganza",
                        Date = DateTime.Now.AddMonths(2),
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
                            new ActivityPhoto { Id = "1fpejh1d6lbwodnezn80", Url = photos[8].Url },
                            new ActivityPhoto { Id = "2fpejh2d6lbwodnezn80", Url = photos[7].Url },
                            new ActivityPhoto { Id = "fpejhu36lbwodnezn80", Url = photos[6].Url }
                        }
                    },
                    new Activity
                    {
                        Title = "Future of Virtual Reality  ",
                        Date = DateTime.Now.AddMonths(1),
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
                            new ActivityPhoto { Id = "tfpejhud6lbwodne6n86", Url = photos[6].Url },
                            new ActivityPhoto { Id = "tfpejhud6lbwodn78n87", Url = photos[3].Url },
                            new ActivityPhoto { Id = "tfpejhud6lbwodne9n88", Url = photos[2].Url }
                        }
                    },
                    new Activity
                    {
                        Title = "Virtual Reality Extravaganza",
                        Date = DateTime.Now.AddMonths(3),
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
                            new ActivityPhoto { Id = "afpejhud611wodnezn80", Url = photos[5].Url },
                            new ActivityPhoto { Id = "bfpejhud622wodnezn80", Url = photos[1].Url },
                            new ActivityPhoto { Id = "cfpejhud655wodnezn80", Url = photos[8].Url }
                        }
                    },
                    new Activity
                    {
                        Title = "Digital Frontier Expo",
                        Date = DateTime.Now.AddMonths(2),
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
                            new ActivityPhoto { Id = "tspejhud6lbwodneza180", Url = photos[6].Url },
                            new ActivityPhoto { Id = "ttpejhud6lbwodneza20d", Url = photos[2].Url },
                            new ActivityPhoto { Id = "tjejhud6lbwodnezn8a34", Url = photos[7].Url }
                        }
                    },
                    new Activity
                    {
                        Title = "Future Activity 7",
                        Date = DateTime.Now.AddMonths(3),
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
                            new ActivityPhoto { Id = "tfpejhuj11bwodnezn80", Url = photos[6].Url },
                            new ActivityPhoto { Id = "tfpejhul52bwodnezn80", Url = photos[1].Url },
                            new ActivityPhoto { Id = "tfpejhff22bwodnezn80", Url = photos[3].Url }
                        }
                    },
                    new Activity
                    {
                        Title = "Virtual Reality Extravaganza",
                        Date = DateTime.Now.AddMonths(1),
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
                            new ActivityPhoto { Id = "t11kshud6lbwodnezn80", Url = photos[7].Url },
                            new ActivityPhoto { Id = "t22ddhud6lbwodnezn80", Url = photos[2].Url },
                            new ActivityPhoto { Id = "t33gfhud6lbwodnezn80", Url = photos[5].Url }
                        },
                    },
                    new Activity
                    {
                        Title = "Metaverse Summit",
                        Date = DateTime.Now.AddMonths(1),
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
                            new ActivityPhoto { Id = "t11ksdfd6lbwodnezn80", Url = photos[7].Url },
                            new ActivityPhoto { Id = "t22ddhsd6lbwodnezn80", Url = photos[2].Url },
                            new ActivityPhoto { Id = "t33gf12d6lbwodnezn80", Url = photos[5].Url }
                        },
                    },
                    new Activity
                    {
                        Title = "Metaverse Summit",
                        Date = DateTime.Now.AddMonths(1),
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
                            new ActivityPhoto { Id = "tbbkshud6lbwodnezn80", Url = photos[7].Url },
                            new ActivityPhoto { Id = "taaddhud6lbwodnezn80", Url = photos[2].Url },
                            new ActivityPhoto { Id = "tkkgfhud6lbwodnezn80", Url = photos[5].Url }
                        },
                    },
                    new Activity
                    {
                        Title = "Metaverse Summit",
                        Date = DateTime.Now.AddMonths(1),
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
                            new ActivityPhoto { Id = "t11kshud6bxwodnezn80", Url = photos[7].Url },
                            new ActivityPhoto { Id = "t22ddhud6lbwodnezaa0", Url = photos[2].Url },
                            new ActivityPhoto { Id = "t33gfhud6lbwouuezn80", Url = photos[5].Url }
                        },
                    },
                    new Activity
                    {
                        Title = "Metaverse Summit",
                        Date = DateTime.Now,
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
                            new ActivityPhoto { Id = "t11kshud6bxwrqnezn80", Url = photos[7].Url },
                            new ActivityPhoto { Id = "t22ddhud6lbwodndsaa0", Url = photos[2].Url },
                            new ActivityPhoto { Id = "t33gfhud6lbwhsuezn80", Url = photos[5].Url }
                        },
                    },
                    new Activity
                    {
                        Title = "Virtual Reality Extravaganza",
                        Date = DateTime.Now,
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
                            new ActivityPhoto { Id = "t11kshudbzxwodnezn80", Url = photos[7].Url },
                            new ActivityPhoto { Id = "hs2ddhud6lbwodnezaa0", Url = photos[2].Url },
                            new ActivityPhoto { Id = "t33gfhud6ldaouuezn80", Url = photos[5].Url }
                        },
                    }
                };

                await context.Activities.AddRangeAsync(activities);
                await context.SaveChangesAsync();
            }
        }
    }
}
