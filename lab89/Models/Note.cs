using Microsoft.AspNetCore.Mvc;

namespace MyNotes.Models;

public class Note
{
    public Note(string title, string description)
    {
        Title = title;
        Description = description;
        CreatedAt = DateTime.Now;
    }

    public Guid Id { get; set; }
    public string Title { get; set; }
    public string Description { get; set; }
    public DateTime CreatedAt { get; set; }
}