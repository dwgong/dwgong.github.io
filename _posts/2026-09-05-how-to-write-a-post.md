---
title: "How to write a post on this site"
description: "A working reference for every formatting feature here — math, code, figures, tables. Delete this post once you've got the hang of it."
date: 2026-09-05
tags: [meta]
math: true
---

This post is a reference. Everything below renders on the live site, so you can
compare what you see here against the source in
`_posts/2026-09-05-how-to-write-a-post.md`. Delete it whenever you like.

## Making a new post

Create a file in `_posts/` named `YYYY-MM-DD-some-slug.md`. **The date in the
filename is required** — Jekyll uses it to order posts and to build the URL.
Start the file with a front matter block between `---` lines:

```yaml
---
title: "Your title here"
description: "One sentence. Shows on the blog index and in link previews."
date: 2026-09-05
tags: [calibration, ml]
math: true      # only if the post contains equations
---
```

Only `title` and `date` are strictly required. `description` is worth writing
every time: it's what people read on the index page and what appears when
someone shares the link.

A post is a **draft** as long as its date is in the future — it won't appear on
the site until that date arrives. To keep a genuinely unfinished post out of
the build, put it in a `_drafts/` folder instead and preview it with
`bundle exec jekyll serve --drafts`.

## Math

Set `math: true` in the front matter, then write LaTeX between `$$` delimiters.
Keep it on one line inside a sentence and you get inline math, like
$$E = mc^2$$ here. Put it in its own paragraph and you get a centred display
equation:

$$
\mathcal{L}(\theta) = \frac{1}{N} \sum_{i=1}^{N}
  \left\| y_i - f_\theta(x_i) \right\|^2 + \lambda \|\theta\|^2
$$

Environments work too, so you can align multi-line derivations:

$$
\begin{aligned}
  \langle \hat{H} \rangle &= \int \psi^* \hat{H} \psi \, dx \\
                          &= \sum_n E_n |c_n|^2
\end{aligned}
$$

Note that `$$` is the delimiter for **both** inline and display math here —
unlike some LaTeX setups, a single `$` does nothing. Whether you get inline or
display output depends only on whether the math sits inside a paragraph or
stands alone as its own block.

Rendering is done by [KaTeX](https://katex.org), which is fast but supports a
smaller command set than full LaTeX — [check the list of supported
functions](https://katex.org/docs/supported.html) if something doesn't render.
A command KaTeX doesn't know shows up in red rather than breaking the page.

Because nothing here treats a lone `$` as math, dollar signs in prose and in
code are safe: `echo "$HOME"` renders literally, and so does a bare $5.

## Code

Fence a block with triple backticks and name the language for syntax
highlighting:

```python
import numpy as np
from scipy.optimize import curve_fit


def lorentzian(x, x0, gamma, amplitude, offset):
    """Single Lorentzian lineshape, the usual parameterisation."""
    return offset + amplitude * gamma**2 / ((x - x0) ** 2 + gamma**2)


def fit_resonance(freqs, signal, guess):
    popt, pcov = curve_fit(lorentzian, freqs, signal, p0=guess)
    # Diagonal of the covariance matrix gives the 1-sigma parameter errors.
    perr = np.sqrt(np.diag(pcov))
    return popt, perr
```

Inline code uses single backticks: `curve_fit`.

## Figures

Put images in `assets/img/`, then use the figure include, which handles the
caption and the accessibility text for you:

{% raw %}
```liquid
{% include figure.html
   src="/assets/img/loss-curve.png"
   alt="Validation loss against training step, falling steeply then flattening"
   caption="Validation loss across three seeds. Shaded band is ±1σ."
   width="wide" %}
```
{% endraw %}

`width` is optional: omit it for text-column width, `"wide"` to spill past the
column (good for plots), `"full"` for edge-to-edge.

Always write the `alt` text. Describe **what the figure shows**, not that it's
an image — "validation loss falls then plateaus after 3k steps" is useful;
"plot" is not. It's what screen readers announce and what search engines index.

A plain Markdown image works too, without the caption:
`![description](/assets/img/thing.png)`.

## Tables

Numbers get tabular alignment automatically, so columns line up:

| Method            | RMSE (mK) | Runtime (s) |
|-------------------|-----------|-------------|
| Linear baseline   | 12.40     | 0.3         |
| Gaussian process  | 4.15      | 88.0        |
| Small MLP         | 4.02      | 2.1         |

## Other bits

> Blockquotes are good for pulling out a result, or quoting a paper you're
> arguing with.

Lists work as you'd expect:

1. Ordered lists for procedure.
2. Second step.
   - Nested items are fine.

---

You can also drop in raw HTML anywhere, which is how the callout box on the
About page is built:

<div class="callout" markdown="1">
<span class="callout-label">Note</span>
The `markdown="1"` attribute is the important part — without it, kramdown
leaves the contents of an HTML block alone and your **Markdown** won't render.
</div>

## Previewing before you publish

```bash
bundle exec jekyll serve --livereload
```

Then open <http://localhost:4000>. Pages rebuild as you save. The one exception
is `_config.yml` — changing that needs a restart.
