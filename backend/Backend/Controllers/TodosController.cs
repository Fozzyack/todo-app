using System.Security.Claims;
using Backend.Models;
using Backend.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

public class TodosController : BaseController
{
    private readonly AppDbContext _context;

    public TodosController(AppDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public async Task<IActionResult> GetAllTodos()
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }
        var userTodos = await _context
            .Todos.Where(t => t.UserId == userId)
            .OrderBy(t => t.DueDate)
            .ToListAsync();
        var todos = new List<GetTodoRequest>();
        foreach (var todo in userTodos)
        {
            todos.Add(
                new GetTodoRequest
                {
                    Id = todo.Id,
                    Name = todo.Name,
                    Description = todo.Description,
                    DueDate = todo.DueDate,
                    Cancelled = todo.Cancelled,
                    Completed = todo.Completed,
                }
            );
        }

        return Ok(todos);
    }

    [HttpPost]
    public async Task<IActionResult> CreateTodo(CreateTodoRequest request)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }

        var todo = new Todo
        {
            Name = request.Name,
            Description = request.Description,
            UserId = userId,
            DueDate = DateTime.Parse(request.Date).ToUniversalTime(),
        };

        await _context.Todos.AddAsync(todo);
        await _context.SaveChangesAsync();

        return Created($"api/todos/{todo.Id}", todo);
    }

    [HttpPatch("complete/{id}")]
    public async Task<IActionResult> UpdateTodoCompletion(
        string id,
        [FromBody] UpdateTodoCompletionRequest request
    )
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }

        var todo = await _context.Todos.FindAsync(new Guid(id));
        if (todo == null)
        {
            return NotFound();
        }

        if (todo.UserId != userId)
        {
            return Forbid();
        }

        todo.Completed = request.Completed;
        todo.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(todo);
    }

    [HttpPatch("cancel/{id}")]
    public async Task<IActionResult> UpdateTodoCancellation(
        string id,
        [FromBody] UpdateTodoCancelationRequest request
    )
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }
        var todo = await _context.Todos.FindAsync(new Guid(id));
        if (todo == null)
        {
            return NotFound();
        }
        if (userId != todo.UserId)
        {
            return Forbid();
        }

        todo.Cancelled = request.Cancelled;
        todo.UpdatedAt = DateTime.UtcNow;
        await _context.SaveChangesAsync();

        return Ok(todo);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteTodo(string id)
    {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        if (userId == null)
        {
            return Unauthorized();
        }

        var todoToDelete = await _context.Todos.FindAsync(new Guid(id));
        if (todoToDelete == null)
        {
            return NotFound();
        }
        _context.Todos.Remove(todoToDelete);
        await _context.SaveChangesAsync();
        return Ok();
    }
}
