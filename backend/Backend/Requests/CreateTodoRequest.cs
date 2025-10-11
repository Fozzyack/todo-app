using System.ComponentModel.DataAnnotations;

namespace Backend.Requests;

public class CreateTodoRequest
{
    [Required]
    public string? Name { get; set; }

    [Required]
    public string? Description { get; set; }

    [Required]
    public string? Date { get; set; }
}
