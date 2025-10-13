using Backend.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Backend;

public class AppDbContext : IdentityDbContext<User>
{
    public DbSet<Todo> Todos { get; set; }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options) { }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<Todo>().Property(t => t.CreatedAt).HasDefaultValueSql("NOW()");
        builder.Entity<Todo>().Property(t => t.UpdatedAt).HasDefaultValueSql("NOW()");
    }
}
