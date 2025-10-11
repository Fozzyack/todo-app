using System.Security.Claims;
using Backend.Models;
using Backend.Requests;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

class TodoController : BaseController
{
    private readonly AppDbContext _context;

    public TodoController(AppDbContext context)
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
        var todos = await _context.Todos.Where(t => t.UserId == userId).ToListAsync();
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
            DueDate = DateTime.Parse(request.Date),
        };

        await _context.Todos.AddAsync(todo);
        await _context.SaveChangesAsync();

        return Created($"api/todos/{todo.Id}", todo);
    }
}
