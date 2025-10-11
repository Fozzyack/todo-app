using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace Backend.Models;

public class Todo
{
    public Guid Id { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string? Name { get; set; }

    public string? Description { get; set; }

    public bool Completed { get; set; } = false;

    [ForeignKey(nameof(User))]
    [Required(AllowEmptyStrings = false)]
    public string? UserId { get; set; }

    [JsonIgnore]
    public User User { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
}
