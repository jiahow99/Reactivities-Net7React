using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTO
{
    public class CreateActivityDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public DateTime  Date { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public string City { get; set; }
        public string Venue { get; set; }
        public List<IFormFile> Images { get; set; }
    }
}