using System.ComponentModel.DataAnnotations;

namespace Backend.Requests;

public class CreateTodoRequest
{
    [Required]
    public string? Name { get; set; }

    public string? Description { get; set; }

    public int Priority { get; set; }

    [Required]
    public string? Date { get; set; }
}
