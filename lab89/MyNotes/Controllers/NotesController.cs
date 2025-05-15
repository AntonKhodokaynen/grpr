using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyNotes.Contracts;
using MyNotes.DataAccess;
using MyNotes.Models;
using MyNotes.DataAccess;
using System.Linq.Expressions;

namespace MyNotes.Controllers;

[ApiController]
[Route("[controller]")]

public class NotesController : ControllerBase
{
    private readonly NotesDbContext _dbContext;

    private Expression<Func<Note, object>> GetSelectorKey(string sortItem)
    {
        return sortItem switch
        {
            "createdAt" => note => note.CreatedAt,
            "title" => note => note.Title,
            _ => note => note.Id
        };
    }

    public NotesController(NotesDbContext dbContext)
    {
        this._dbContext = dbContext;
    }

    [HttpPost]
    public async Task<IActionResult> Create([FromBody] CreateNoteRequest request, CancellationToken ct)
    {
        var note = new Note(request.Title, request.Description);

        await _dbContext.Notes.AddAsync(note, ct);
        await _dbContext.SaveChangesAsync(ct);

        return Ok();
    }

    [HttpGet]
    public async Task<IActionResult> Get([FromQuery] GetNotesRequest request, CancellationToken ct)
    {
        var notesQuerty = _dbContext.Notes
            .Where(n => string.IsNullOrWhiteSpace(request.Search) ||
                        n.Title.ToLower().Contains(request.Search.ToLower()));

        Expression<Func<Note, object>> selectorKey = request.SortItem?.ToLower() switch
        {
            "date" => note => note.CreatedAt,
            "title" => note => note.Title,
            _ => note => note.Id
        };

        notesQuerty = request.SortOrder == "desc"
            ? notesQuerty.OrderByDescending(selectorKey)
            : notesQuerty.OrderBy(selectorKey);

        var noteDtos = await notesQuerty
            .Select(n => new NoteDto(n.Id, n.Title, n.Description, n.CreatedAt))
            .ToListAsync(cancellationToken: ct);

            return Ok(new GetNotesResponse(noteDtos));
    }
}
