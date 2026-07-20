# Adding a paper

Each paper is a single `.mdx` file in this folder. The filename (without
`.mdx`) becomes the paper's URL slug, e.g. `content/papers/my-paper.mdx` is
served at `/papers/my-paper`.

## Frontmatter schema

```mdx
---
title: "Paper title"
date: "2026-07-20"
authors: ["Your Name"]
tags: ["category-one", "category-two"]
abstract: "A one or two sentence summary shown on the listing page and at the top of the paper."
---

Full paper body goes here, written in Markdown/MDX.

## Section heading

Regular paragraphs, lists, and images all work as normal Markdown.

Any charts generated in Python (matplotlib, etc.) should be saved as
PNG/SVG into `public/papers/<slug>/`, e.g.
`public/papers/my-paper/figure-1.png`, and embedded with an absolute path:

![Figure 1: description](/papers/my-paper/figure-1.png)
```

## Notes

- `date` should be an ISO string (`YYYY-MM-DD`) so papers sort correctly on
  the listing page.
- `tags` populate the category filter tabs on the listing page.
- Images/figures live in `public/papers/<slug>/` (not in this folder),
  since Next.js only serves static files out of `public/`.
- There are no sample papers checked in — this folder starts empty on
  purpose. Add your first `.mdx` file here whenever you're ready.
