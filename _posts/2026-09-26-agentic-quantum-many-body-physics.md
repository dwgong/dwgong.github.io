---
title: "Agentic quantum many-body physics"
description: "Two interacting loops: a scientist loop that decides what to investigate, and an engineer loop that keeps the apparatus running. Part 2 of 3."
date: 2026-09-26
tags: [rydberg, ai-for-science, agents, research-notes]
---

Our agentic AI system consists of two interacting loops: a **scientist loop** that
decides what to investigate, and an **engineer loop** that keeps the experiment
running.

{% include figure.html
   src="/assets/img/figure-2-loops.png"
   alt="Two concentric cycles. The outer scientist loop runs knowledge to hypothesis to experiments to conclusions and back, improving knowledge. The inner engineer loop runs error syndromes to diagnosis to action to apparatus, stabilising it. The two meet where the experiments run on the apparatus"
   caption="Figure 2. The scientist loop and the engineer loop, and how they interact. The experiments the outer loop designs run on the apparatus the inner loop keeps stable."
   width="wide" %}

## The scientist loop

The scientist loop follows the logic of experimental research: ask a question,
formulate a hypothesis, design and conduct an experiment, and use the results to
decide what to investigate next.

Closing this loop requires both creativity and scientific judgment — especially
the ability to identify which experiment would teach us something new. Improving
its capabilities requires broad understanding and reasoning in quantum many-body
physics.

While current LLMs can carry out parts of this process with appropriate context
engineering, they do not yet consistently demonstrate the depth of insight that
leading physicists bring to scientific discovery (see the
[case demonstrations]({{ '/blog/2026/case-demonstration-agent-on-the-apparatus/' | relative_url }})).
We believe fine-tuning on experimental experience could help bridge this gap.

## The engineer loop

The engineer loop makes such scientific exploration possible. It monitors the
apparatus, diagnoses faults from their symptoms, chooses and applies a fix, and
checks whether normal operation has been restored.

This requires detailed knowledge of the particular experiment — the practical
experience that researchers often describe as intuition. We have already
demonstrated this kind of autonomous troubleshooting on our working experiment
through context engineering (see the
[case demonstrations]({{ '/blog/2026/case-demonstration-agent-on-the-apparatus/' | relative_url }})).

---

*Previously: [Neutral-atom arrays and AI, in both directions]({{ '/blog/2026/neutral-atom-arrays-and-ai/' | relative_url }}).
Next: [what the agent has actually done on the apparatus]({{ '/blog/2026/case-demonstration-agent-on-the-apparatus/' | relative_url }}).*
