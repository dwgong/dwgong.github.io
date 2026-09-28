---
title: "Case demonstration: the agent on the apparatus"
description: "Calibration, optimization, and one discovery — what the agent has actually carried out on a working Yb tweezer array. Part 3 of 3."
date: 2026-09-28
tags: [rydberg, ai-for-science, agents, lab-notes]
math: true
---

Both loops require a connection to the physical apparatus. This post collects what
the agent has actually done on our working Yb tweezer array: run a full
calibration, re-flatten a 1068-site trap array, tune a two-photon Rydberg
excitation, and chase down an unexplained atom-loss signal.

## Giving AI eyes and hands

Monitors provide the AI with information about the experiment's state, while
actuators let it change that state. Building this interface means choosing which
signals the AI needs to observe and which controls it needs to operate. We
organize measurements into relevant, structured information and expose a focused
set of controls for each task.

To run experiments, the AI has full access to the experimental control sequence,
allowing it to configure and execute the timed operations that define an
experimental run. This provides the means to carry out experiments proposed by the
scientist loop.

To maintain reliable operation, the AI also has access to selected measurements
and controls from essential equipment:

- Laser frequency
- Laser amplifier
- Doubling cavities
- Temperature and pressure probes

Environmental sensors provide additional context: changes in temperature and
humidity, for example, may help explain drift in sensitive optical alignments.
These observations and controls support the engineer loop, allowing it to connect
symptoms to possible causes, take corrective action, and check the result.

## Calibration

The agent runs the whole calibration on the Yb tweezer array. Each measurement is
survival spectroscopy: image the atoms, apply a probe pulse at frequency $$f$$,
image again. When $$f$$ is on resonance, the atoms will be pushed out.

For every line the agent picks the scan window, fits the spectrum, and decides
whether the result can be trusted. It also re-runs a scan on its own when the line
sits at the edge of the window or the frequency steps are too coarse.

The broad $$^1S_0 \to {}^1P_1$$ line (399 nm) is recorded as a reference. On the
narrow $$^1S_0 \to {}^3P_1$$ line (556 nm), the agent writes the trap-insensitive
$$m_J = 0$$ centre as the day's frequency reference. It turns the offset of the
light-shifted $$|m_J| = 1$$ line into the trap depth.

At 60 G it feeds each fitted centre into the next scan: first the $$^3P_1$$,
$$m_J = +1$$ line, then the 308 nm Rydberg resonance (the survival revival), and
finally the Autler–Townes doublet, whose splitting gives the Rydberg-laser Rabi
frequency.

## Optimization: re-flattening 1068 traps

The experiment holds single atoms in an array of 1068 laser "tweezers": tightly
focused spots of light, each of which traps one atom. The spots are made by a
hologram displayed on a spatial light modulator, a screen that reshapes one laser
beam into the whole pattern.

Every trap should be equally deep, but after the optics were realigned the depths
varied by 7% from site to site. The AI agent ran the fix on its own. The people
set the goal ("re-flatten, change the hologram only gently") and decided to stop
when site-to-site variation is < 2%.

The agent measured the trap depth through the atomic transitions. The trapping
light shifts one of the atom's resonance frequencies in proportion to how deep the
trap is, so scanning a probe laser and noting where each atom responds gives the
depth of every site at once. From that map the agent computed a correction:
brighten the shallow spots, dim the deep ones.

The agent repeated a loop of measure, correct, upload, re-measure. After each
round it checked from the data whether the improvement was real or just
measurement noise. **In four rounds and about an hour of machine time, the
site-to-site spread fell from 7% to about 2%.** The agent then installed the
result as the array the experiment runs on.

## Optimization: tuning the Rydberg excitation

Our experiment uses two laser pulses to lift each trapped atom into a highly
excited state. How well that works depends on a handful of knobs: the two laser
frequencies, how long each pulse lasts, and how far apart in time they fire. The
knobs interact, so turning them one at a time misses the best setting.

<!-- The five-panel figure (a-e) goes here. Save it to assets/img/ and uncomment:
{% include figure.html
   src="/assets/img/rydberg-optimization.png"
   alt="Five panels: a two-frequency map showing a diagonal ridge, a walk along the ridge, a 3-D timing lattice, a fitted plane of good settings, and a repetition test of top candidates"
   caption="The agent's optimization path: map, find the structure, follow it, refine, and verify."
   width="wide" %}
-->

It started from a map of the two frequencies (panel a). Good settings there don't
form a single spot but a diagonal line, a "ridge," because raising one frequency
can be offset by raising the other. Rather than search the whole map again, the
agent walked along that ridge (panel b). When its first pass peaked at the edge of
the window, it widened the search until it found a clear peak, which fixed the
frequencies.

It then turned to the timing knobs. Scanning the two pulse lengths while holding
their separation fixed would have given a misleading answer, so it abandoned that
scan and sampled all three timing knobs together as a 3-D lattice (panel c). The
good settings turned out to lie on a thin tilted sheet, a "plane," so the agent
fitted the sheet and tested points on it and just off it (panel d). Staying on the
sheet consistently did best.

Finally it spent many more repetitions on the top candidate and on the previous
best setting (panel e), because a handful of repetitions can crown a winner by
chance. The two came out statistically tied. That confirmed the sheet was real
while showing the old setting was already near the top, which is still a useful
finding.

Through each step the agent follows the same loop an experimenter would: map, find
the structure, follow it, refine, and verify before believing it.

## Discovery: what causes the accelerated loss?

Our experiment traps individual atoms in different kinds of arrays and excites
them to Rydberg states, highly excited states in which neighbouring atoms interact
strongly.

**a)** We observed that atoms in closely spaced arrays are lost substantially
faster than atoms in widely spaced arrays, and that this loss rate does not depend
on the size of the array. We posed a single question to our AI agent: what causes
this accelerated loss?

**b)** The agent first showed that the loss rate is independent of the size of the
array. This excluded collective effects and experimental drifts that scale with
the total number of atoms, and pointed instead to a local interaction between
neighbouring atoms. Reasoning from mechanisms established in Rydberg-atom physics,
it reduced the problem to two competing hypotheses: the loss is set either by the
distance to the nearest neighbour or by the number of neighbours, and each yields
a distinct, quantitative prediction.

**c)** It then designed an experiment to discriminate between them, holding the
interatomic spacing fixed while varying only the number of neighbours, by
arranging the atoms into square lattices, chains and isolated pairs.

**d)** It carried out these measurements on the apparatus and analysed the
resulting images.

**e)** Comparison with both predictions rejects both hypotheses in their simple
form.

**f)** The loss depends on the number of neighbours, and it increases faster than
in proportion to that number.

**g–h)** In subsequent days the agent tested the robustness of this result in two
independent ways: by repeating the measurement, and by verifying that the atoms
are lost in correlated pairs.

The full scientific cycle, from hypothesis formulation through experimental
design, data acquisition and analysis to a validated conclusion, was carried out
by the agent in response to one human question.

---

*Previously: [Agentic quantum many-body physics]({{ '/blog/2026/agentic-quantum-many-body-physics/' | relative_url }})
and [Neutral-atom arrays and AI, in both directions]({{ '/blog/2026/neutral-atom-arrays-and-ai/' | relative_url }}).*
