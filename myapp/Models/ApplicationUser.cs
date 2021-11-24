using System.ComponentModel.DataAnnotations;

namespace myapp.Models
{
    public class ApplicationUser
    {
        public int ApplicationUserId { get; set; }
        // Unique にする必要がある
        [Required]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }
    }
}
