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
and controls from essential equipment — laser frequency, laser amplifiers,
doubling cavities, and temperature and pressure probes.

{% include figure.html
   src="/assets/img/monitor-laser-frequency.png"
   alt="Laser frequency monitor showing the 556 nm laser at 539386.795 GHz, locked to a cavity at 0.94 MHz, with a scatter trace of recent frequency readings"
   caption="Laser frequency: the 556 nm cooling laser, its lock status, and its recent drift." %}

{% include figure.html
   src="/assets/img/monitor-laser-amplifier.png"
   alt="Laser amplifier panel showing 14.20 A total current across three stages, seven temperature readouts, and five photodiode values"
   caption="Laser amplifier: stage currents, temperatures and photodiode levels, with ramp and abort controls." %}

{% include figure.html
   src="/assets/img/monitor-cavity-lock.png"
   alt="Cavity lock panel reading LOCKED, with a transmission trace near 1.05 V and an error signal centred on zero"
   caption="Doubling cavities: transmission and error signal for the 399 nm cavity lock." %}

{% include figure.html
   src="/assets/img/monitor-oscilloscope.png"
   alt="Oscilloscope screen showing a slow yellow sinusoid at about 18.7 Hz above two flatter cyan and magenta traces"
   caption="Oscilloscopes carry the lock and beam signals the agent reads directly." %}

Environmental sensors provide additional context: changes in temperature and
humidity, for example, may help explain drift in sensitive optical alignments.

{% include figure.html
   src="/assets/img/monitor-room-temperature.png"
   alt="Two days of room temperature for five locations, each holding within a few tenths of a degree, with the UV path near 22.4 C and the glass cell near 19.5 C"
   caption="Room temperature across the experiment and laser tables, with alert thresholds dashed."
   width="wide" %}

{% include figure.html
   src="/assets/img/monitor-room-humidity.png"
   alt="Two days of room humidity for five locations, normally between 29 and 40 percent, with a sharp six-hour excursion above 43 percent on the afternoon of 09/22"
   caption="Room humidity over the same window. The excursion on the afternoon of 09/22 is the kind of event that explains a drifting alignment after the fact."
   width="wide" %}

These observations and controls support the engineer loop, allowing it to connect
symptoms to possible causes, take corrective action, and check the result.

## The monitor loop

{% include figure.html
   src="/assets/img/monitor-loop.png"
   alt="Four-stage cycle: syndromes feed rules, rules feed a monitor agent that picks machine status and suggests actions, an experiment agent takes or rejects the suggestion and improves the rules and syndromes"
   caption="The monitor loop. Syndromes become rules, rules become a status and a suggested action, and the experiment agent decides whether to take it — then improves the syndromes and rules it was judged by."
   width="wide" %}

Measured syndromes — data curves and fits, subsystem metrics, instrument
readouts — are turned into a per-subsystem verdict of *fine*, *check* or *fault*
by an explicit threshold rule. The monitor agent reads those verdicts, picks a
machine status and suggests an action. The experiment agent then decides whether
to take the suggestion, and feeds what it learns back into the rules and
syndromes themselves, so the diagnosis improves with use.

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

{% include figure.html
   src="/assets/img/daily-calibration.png"
   alt="A 40-minute calibration timeline beside a level diagram of Yb-174 and six fitted spectra: the 399 nm line, the 556 nm mJ=0 and |mJ|=1 lines at low field, and the 556 nm mJ=+1 line, 616 revival and Autler-Townes doublet at 60 G"
   caption="A full daily calibration, start to finish in 40 minutes. The timeline on the left shows where the agent re-ran a scan on its own: the 556 |mJ|=1 line was re-windowed and the 616 revival re-scanned more finely. Click to open at full size."
   width="wide" %}

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

{% include figure.html
   src="/assets/img/trap-depth-feedback.png"
   alt="A 68-minute feedback timeline, the four steps of one round, before and after maps of trap depth across the array showing the red and blue patchwork flattening out, the depth CV falling 7.05 to 4.02 to 2.55 to 2.22 to 1.54 percent, and a radial profile flattening toward the array edge"
   caption="Trap-depth feedback, four rounds in 68 minutes: depth CV 7.05% to 1.54%. Panels a and b are the per-site depth map before and after. The phase change the agent asked of the hologram shrank each round, from 0.026 rad down to 0.007 rad — a gentle correction, as instructed. Click to open at full size."
   width="wide" %}

## Optimization: tuning the Rydberg excitation

Our experiment uses two laser pulses to lift each trapped atom into a highly
excited state. How well that works depends on a handful of knobs: the two laser
frequencies, how long each pulse lasts, and how far apart in time they fire. The
knobs interact, so turning them one at a time misses the best setting.

{% include figure.html
   src="/assets/img/stirap-optimization.png"
   alt="A 63-minute timeline and flow chart beside five result panels: a two-frequency heatmap with a diagonal ridge, a one-dimensional scan along the ridge peaking at 97.3 percent, a stack of delay slices forming a tilted plane, a test of on-plane against off-plane settings, and a final verification of two candidates that agree within 1.2 sigma"
   caption="The STIRAP optimization, 63 minutes end to end. Panels a-e follow the text: the ridge in the frequency map, the walk along it, the 3-D timing lattice and the plane fitted to it, the on- versus off-plane test, and the final verification. The aborted scan at +33 min is visible in the timeline — the agent dropped it once it realised the delay had to be scanned too. Click to open at full size."
   width="wide" %}

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

{% include figure.html
   src="/assets/img/discovery-rydberg-loss.png"
   alt="A five-box chain from question through two hypotheses, experiment, result and conclusion, above eight panels: the observed 4.8x lifetime drop at close spacing, the competing predictions of the distance and number hypotheses, the square, chain and pair geometries all at 14 micron spacing, decay curves for one, two and four neighbours, the measured lifetimes against both predictions, the extra loss rate growing faster than one-for-one, a repeat on a later date, and a check that close pairs are lost together"
   caption="The full investigation on one page. Lifetime falls 55, 40, 30 and 11 microseconds for zero, one, two and four neighbours at fixed 14 micron spacing — so it is the number of neighbours that matters, but going from one to four neighbours raises the loss about tenfold rather than fourfold. Click to open at full size."
   width="wide" %}

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

## A second investigation: the third dip

The same pattern ran on a different puzzle. Dressing the 308 nm line with 556 nm
light should split it into two dips — an Autler–Townes pair. We saw three, all at
more than ten sigma. Where does the third come from?

{% include figure.html
   src="/assets/img/discovery-autler-townes.png"
   alt="A five-box chain from question through three hypotheses, four tests, result and conclusion, above twelve panels: the observed three-dip spectrum, sketched predictions for undressed, spur and trapped atoms, a table of what each hypothesis predicts per test, spectra as the 556 power is turned down, the third dip moving with dressing strength, a test holding the trap on, a no-light control that comes out flat, a comparison against the full-trap ceiling, and a four-level model reproducing the three-dip structure"
   caption="Three hypotheses — undressed atoms, an electronic spur, or atoms still in the trap — and four scans, each of which splits them differently. The bare line is a peak rather than a dip, ruling out undressed atoms; the third dip moves with the 556 power and stays a single line, ruling out a spur copy. Trapped atoms remain the best candidate, though the figure notes the dip sits further out than a fully-on trap can account for. Click to open at full size."
   width="wide" %}

The conclusion here is narrower than in the neighbour-loss case: the agent
eliminated two of three hypotheses and identified the third as the best
remaining candidate, while flagging a quantitative gap it could not close — the
dip sits about 0.8 MHz further to the blue than even a fully-on trap would
explain. The proposed next step is a trap-depth series to pin down the
intercept.

<!-- The source document has no write-up for this second case. The summary above
     is read off the figure itself; expand it with the real narrative when you
     have time, or delete this section if it is too preliminary to publish. -->

---

*Previously: [Agentic quantum many-body physics]({{ '/blog/2026/agentic-quantum-many-body-physics/' | relative_url }})
and [Neutral-atom arrays and AI, in both directions]({{ '/blog/2026/neutral-atom-arrays-and-ai/' | relative_url }}).*
