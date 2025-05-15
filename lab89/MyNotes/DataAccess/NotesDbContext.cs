using Microsoft.EntityFrameworkCore;
using MyNotes.Models;

namespace MyNotes.DataAccess;

public class NotesDbContext : DbContext
{
    public NotesDbContext(DbContextOptions<NotesDbContext> options)
        : base(options)
    {
    }

    public DbSet<Note> Notes => Set<Note>();
}

