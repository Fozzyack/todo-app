using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;
using Backend.Models;

namespace Backend.Requests;

public class GetTodoRequest
{
    public Guid Id { get; set; }

    [Required(AllowEmptyStrings = false)]
    public string? Name { get; set; }

    public string? Description { get; set; }

    public bool Completed { get; set; } = false;

    public DateTime DueDate { get; set; }
}
