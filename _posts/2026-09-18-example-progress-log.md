---
title: "Example: a weekly progress log"
description: "The shape a lab log post can take — question, what I tried, what happened, what's next. Replace this with a real one."
date: 2026-09-18
tags: [lab-notes, example]
math: true
---

**This is a placeholder showing one format that works well for progress logs.**
Rewrite it with real content and delete this line. The structure below —
question, attempt, result, next step — is worth keeping: it's fast to write
weekly, and it stays readable months later when you've forgotten the details.

## The question

[What were you actually trying to find out this week? One or two sentences.
Being specific here is what makes the post worth re-reading later.]

For context: [the minimum background a reader outside your group needs — what
the apparatus does, what the measurement is]. The problem is that
[the specific failure mode or bottleneck].

## What I tried

[The approach, at the level of detail you'd tell a labmate at the whiteboard.]

The model is a [architecture] trained on [data — how much, collected how],
minimising

$$
\mathcal{L} = \sum_{i} \left( y_i - \hat{y}_i \right)^2 + \lambda R(\theta)
$$

where [define your terms]. Training details: [optimiser, learning rate, epochs,
hardware, wall-clock time].

```python
# The bit that mattered, not the whole script.
model = build_model(n_features=X.shape[1], hidden=(64, 64))
history = model.fit(
    X_train, y_train,
    validation_data=(X_val, y_val),
    epochs=200,
    callbacks=[EarlyStopping(patience=20, restore_best_weights=True)],
)
```

## What happened

[The result. Include the number, and include the error bar.]

| Configuration | [Metric] | Note |
|---------------|----------|------|
| Baseline      | [value]  | [what it is] |
| This week     | [value]  | [what changed] |

<!-- Once you have a plot, save it to assets/img/ and uncomment:
{% include figure.html
   src="/assets/img/result.png"
   alt="[Describe the trend the plot shows, not just its type]"
   caption="[What the reader should take away. Note the axes and error bars.]"
   width="wide" %}
-->

[Then the honest part: what's still wrong, what you don't trust yet, which
control you haven't run. Posts that only report wins are much less useful to
your future self than ones that record the doubts.]

## What's next

- [ ] [Concrete next step]
- [ ] [Another one]
- [ ] [The control experiment you know you're avoiding]

## Open questions

[Things you'd genuinely like an answer to. If anyone ever reads this blog,
this is the section that gets you an email.]
