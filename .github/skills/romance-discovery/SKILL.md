---
name: romance-discovery
description: "Use when exploring popular romance authors, discovering trending tropes, finding book recommendations by spice level, or researching what's missing from your collection"
---

# Romance Discovery Skill

A curated workflow for exploring the romance landscape, finding new recommendations, and understanding reader preferences.

## Use Cases

- **Author research**: "Who are the top romance authors right now?"
- **Trope exploration**: "What are the most popular romance tropes in 2025-2026?"
- **Trend spotting**: "What's trending in spicy romance?"
- **Gap analysis**: "What subgenres should we add?"
- **Reader curating**: "Books for someone who likes dark romance but also paranormal?"

## Workflow

### Step 1: Define Your Need
Clarify whether you're looking for:
- **Popular authors** by genre or overall success
- **Trending tropes** in specific subgenres
- **Books by vibe**: dark and angsty? steamy and fun? paranormal and immersive?
- **Audience gaps**: underrepresented characters, relationships, experiences
- **Quality baseline**: what makes a romance book worth adding?

### Step 2: Explore Current Inventory
- Scan your existing catalog in `src/data/books/`
- Note author frequency, spice level distribution, genre balance
- Identify what you have **strong** in and what's **sparse**
- Look at metadata patterns: POV types, page counts, publication years

### Step 3: Research & Recommend
- Cross-reference with BookTok, Goodreads bestsellers, and romance award winners
- Consider:
  - **Spice level** (1-5 scale—are you skewed high or low?)
  - **Relationship dynamics** (what types are underrepresented?)
  - **Character diversity** (age, culture, disability, LGBTQ+ rep?)
  - **Tropes** (what's your gap? age gap? reverse harem? paranormal paranoia?)
  - **Author popularity** (does adding X author strengthen your collection?)

### Step 4: Validate Fit
Ask:
- Does it match the **tone** of existing titles?
- Does it fill a **genuine gap**?
- Is it **actively recommended** in romance communities?
- Will it **attract your target readers**?

### Step 5: Present Findings
Provide:
- A curated list with title, author, spice, why it fits
- Gap summary: "You're strong in contemporary and dark romance, but sparse in paranormal and sports romance"
- Author recommendation: "X author appears Y times, consider adding more of their work"
- Emerging opportunities: "Disability rep is missing; here are 3 titles to consider"

## Key Resources

### Popular Romance Authors (by subgenre)

**Contemporary Romance**
- Emily Henry, Christina Lauren, Sally Thorne, Talia Hibbert, Colleen Hoover, Elsie Silver

**Dark Romance**
- Krempe, Eloisa James, Cara Dee, Scarlett St. Clair, Helen Scheuerer

**Erotic Romance**
- Kristen Callihan, Sylvia Day, Tessa Dare, KF Breene

**Paranormal Romance**
- Sarah J. Maas, Jennifer L. Armentrout, Nalini Singh, Larissa Ione

**Romantasy**
- Sarah J. Maas, Rebecca Ross, Brigid Kemmerer, Elise Kova

**Sports Romance**
- Hannah Grace, Elle Kennedy, Elsie Silver, Narelle Atkins

**Mafia Romance**
- Laurell Wright, Ana Huang, Scarlett St. Clair, LJ Shen

### Trending Tropes (2025-2026)

- Reverse harem / poly romance
- Age gap with experienced character
- Fake dating with forced proximity
- Found family + romance subplot
- Queer paranormal (recently booming)
- Grumpy x sunshine (always popular)
- Forced proximity

### Metrics to Track

- Spice level distribution (aim for variety: 1-2, 3, 4-5)
- Relationship types (F/M, M/M, F/F, poly)
- POV diversity (single FMC, dual POV, single MMC)
- Standalone vs. series ratio
- Publication recency (mix of classics + new releases)
- Page count distribution (shorter, standard, epic)

## Output Format

**Standard recommendation response:**

```markdown
## Analyzed Your Gap

**Current Strength**: [What you have plenty of]
**Current Gap**: [What's sparse or missing]

## Recommended Additions

| Title | Author | Spice | Why It Fits |
|-------|--------|-------|-----------|
| [Book] | [Author] | 4/5 | [Specific reason] |
| [Book] | [Author] | 3/5 | [Specific reason] |

## Why These Work
- [Author] is trending on BookTok
- This fills your [specific gap]
- [Character type] is underrepresented in your catalog

## Follow-up Questions?
- Want more paranormal options?
- Looking for specific tropes or character types?
```

## Anti-patterns

- ❌ Recommending books you haven't vetted
- ❌ Suggesting overly niche titles without context
- ❌ Ignoring your existing catalog composition
- ❌ Recommending based on popularity alone (fit matters more!)

---

**Ready to explore?** Ask the @smutbook-curator agent for specific recommendations, or use the /book-list-generator prompt to quickly filter your current collection.
