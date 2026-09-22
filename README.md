# dwgong.github.io

Personal site — an About page and a blog. Built with [Jekyll](https://jekyllrb.com)
and served by GitHub Pages.

Live at **https://dwgong.github.io**

---

## Publishing

GitHub builds and deploys this automatically. **Push to the default branch and
the site updates**, usually within a minute. There's no build step for you to
run and no CI to configure.

One-time setup, if it isn't already done:

1. Go to **Settings → Pages** in this repo.
2. Under *Build and deployment*, set **Source** to *Deploy from a branch*.
3. Pick the default branch and the `/ (root)` folder. Save.

Because the repo is named `dwgong.github.io`, it's a GitHub *user site*, so it
lives at the bare `dwgong.github.io` domain rather than under a subpath.

## Writing a post

Add a file to `_posts/` named `YYYY-MM-DD-slug.md`:

```markdown
---
title: "What I learned about calibration drift"
description: "One sentence, shown on the blog index and in link previews."
date: 2026-09-22
tags: [lab-notes, calibration]
math: true
---

Post body in Markdown.
```

The date in the filename is required — Jekyll uses it for ordering and for the
URL. Commit, push, done.

A post dated in the future won't appear until that date. For work-in-progress,
put the file in a `_drafts/` folder (no date in the filename) and preview with
`--drafts`.

`_posts/2026-09-05-how-to-write-a-post.md` is a live reference for every
formatting feature — math, code, figures, tables. Read it rendered, then delete
it when you no longer need it.

## Previewing locally

Optional, but much nicer than pushing to see if something looks right.

```bash
bundle install          # once
bundle exec jekyll serve --livereload
```

Then open <http://localhost:4000>. Pages rebuild as you save — except
`_config.yml`, which needs a restart.

Needs Ruby. On macOS, `brew install ruby` then restart your shell; the system
Ruby is too old and installing gems into it needs `sudo`.

## What's where

```
_config.yml           Site title, tagline, social links. Start here.
index.md              The About page.
blog.html             The blog index (lists posts, groups by year).
_posts/               One Markdown file per post.
_layouts/             Page shells. post.html is the one worth reading.
_includes/            Reusable fragments — header, footer, figure, math setup.
assets/css/style.css  All styling. Colours are CSS variables at the top.
assets/img/           Images for posts.
assets/js/math.js     KaTeX configuration.
```

## Things worth knowing

- **Dark mode** follows the reader's OS setting. Both themes are defined in
  `assets/css/style.css`; the colour variables are all at the top of the file.
- **Math** is opt-in per post via `math: true`, so pages without equations
  don't pay to load KaTeX. Use `$$...$$` for both inline and display math — a
  single `$` is not a delimiter here, which is why dollar signs in code are
  safe.
- **Figures** go through `_includes/figure.html` so they get proper captions
  and alt text.
- **RSS** is generated at `/feed.xml`, and a sitemap at `/sitemap.xml`.
- **Your email** is not published anywhere by default. Set `author.email` in
  `_config.yml` if you want it in the footer — it will be scraped.

## Customising

- **Colours:** the `:root` block at the top of `assets/css/style.css`, with a
  `@media (prefers-color-scheme: dark)` block below it for dark mode.
- **Fonts:** Newsreader (body) and Inter (headings/UI), loaded in
  `_includes/head.html`. Swap the Google Fonts URL and the `--font-*`
  variables.
- **Adding a page:** create e.g. `research.md` with front matter
  `title`, `nav: research`, `permalink: /research/`, then add a link in
  `_layouts/default.html`.
- **Custom domain:** add a `CNAME` file containing just the domain, and point
  your DNS at GitHub Pages.
