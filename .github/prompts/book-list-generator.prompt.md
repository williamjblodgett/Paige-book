---
name: book-list-generator
description: "Use when you want to quickly generate filtered book lists from your catalog by spice level, trope, genre, or POV type"
argument-hint: "Spice level (1-5), trope (slow-burn, enemies-to-lovers, etc.), or genre. Example: 'Spice 4-5, paranormal romance' or 'Enemies-to-lovers contemporary'"
---

# Book List Generator

Quickly pull and organize your romance catalog by specific criteria.

## What This Does

Given a filter (spice level, trope, genre, POV type, or character type), this prompt will:

1. Search your entire catalog in `src/data/books/`
2. Extract matching titles with key metadata
3. Return an organized, formatted list ready to share or analyze

## How to Use

**Type**: `/book-list-generator` + your criteria

**Examples:**

| Input | Result |
|-------|--------|
| `Spice 4-5 Contemporary` | All contemporary romance books with spice levels 4-5 |
| `Paranormal - Dual POV` | All paranormal books written in dual POV |
| `Enemies-to-lovers` | All books tagged with enemies-to-lovers trope |
| `Single FMC` | All books with single female POV |
| `Dark romance under 400 pages` | Short dark romance books |
| `Standalone - no series` | All books marked as standalone |

## Output Format

```markdown
## Filtered Results: [Your Criteria]

**Total matches**: X books

| Title | Author | Spice | Genre | Pages | Notes |
|-------|--------|-------|-------|-------|-------|
| [Title] | [Author] | 4/5 | Contemporary | 350 | Standalone |
| [Title] | [Author] | 5/5 | Dark | 420 | Dual POV |

### Insights
- Average spice level: X
- POV breakdown: X% FMC, X% Dual
- Standalone vs. Series: X / Y
- Avg page count: Z

### Next Steps
- Want to add more paranormal romance?
- Looking for specific authors?
- Need content warning details?
```

## Filter Options

### By Spice Level
- `Spice 1-2` (sweet/slow-burn)
- `Spice 3` (moderate heat)
- `Spice 4-5` (steamy/explicit)
- `All spice levels` (full inventory)

### By Trope
- `Enemies-to-lovers`
- `Slow-burn`
- `Fake dating`
- `Forced proximity`
- `Paranormal romance`
- `Age gap`
- Any trope you see in the metadata

### By Genre
- `Contemporary romance`
- `Dark romance`
- `Erotic romance`
- `Mafia romance`
- `Paranormal romance`
- `Romantasy`
- `Sports romance`

### By POV
- `Single FMC` (female main character)
- `Single MMC` (male main character)
- `Dual POV`
- `Multi POV`

### By Book Type
- `Standalone` (not part of a series)
- `Series` (part of connected books)

### By Reading Time
- `Under 300 pages` (quick reads)
- `300-400 pages` (standard)
- `Over 400 pages` (epic/long reads)

## Tips

1. **Combine filters**: "Spice 5, paranormal, female POV, standalone" works!
2. **Get insights**: Use filtered lists to spot gaps
3. **Plan reading**: Sort by page count, genre, or publication year
4. **Share collections**: "Romance for paranormal lovers" or "Short steamy reads"
5. **Manage inventory**: "What contemporary authors do we have?" or "Books under 300 pages?"

## Need More?

- Want **specific author** books? Ask the @smutbook-curator agent
- Want **recommendations** for what to add? Use the /romance-discovery skill
- Want to **audit everything**? Invoke @smutbook-curator directly

---

*This prompt searches your live catalog every time, so results are always current.*
