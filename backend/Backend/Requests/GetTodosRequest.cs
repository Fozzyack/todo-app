using System.ComponentModel.DataAnnotations;

namespace Backend.Requests;

public class GetTodoRequest
{
    public Guid Id { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string? Name { get; set; }

    public string? Description { get; set; }

    public bool Completed { get; set; }
    
    public bool Cancelled { get; set; }

    public DateTime DueDate { get; set; }
}
