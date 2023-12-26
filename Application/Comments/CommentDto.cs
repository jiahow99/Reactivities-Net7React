using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Comments
{
    public class CommentDto
    {
        public Guid Id { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string Username { get; set; }
        public string DisplayName { get; set; }
        public string Image { get; set; }
    }
}