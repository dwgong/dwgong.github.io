---
title: "Neutral-atom arrays and AI, in both directions"
description: "Why Rydberg tweezer arrays are a good place to put AI to work — and why they might also be a good place to train it. Part 1 of 3."
date: 2026-09-24
tags: [rydberg, ai-for-science, research-notes]
---

Neutral-atom tweezer arrays let us hold individual atoms with laser light, arrange
them into patterns, and control how they interact
([Barredo et al., 2016](https://doi.org/10.1126/science.aah3778);
[Endres et al., 2016](https://doi.org/10.1126/science.aah3752);
[Kaufman & Ni, 2021](https://doi.org/10.1038/s41567-021-01357-2)). This makes them
powerful tools for studying quantum many-body physics: how interacting quantum
particles collectively produce behavior that cannot be understood by considering
each particle alone
([Browaeys & Lahaye, 2020](https://doi.org/10.1038/s41567-019-0733-z)). These
collective effects underlie phenomena such as magnetism and superconductivity,
making their study important for understanding materials and developing future
quantum technologies ([Keimer & Moore, 2017](https://doi.org/10.1038/nphys4302)).
They also raise fundamental questions about how complex behavior emerges from
simple physical laws — questions that can become extraordinarily difficult for
conventional computers to answer
([Georgescu, Ashhab & Nori, 2014](https://doi.org/10.1103/RevModPhys.86.153)).

Rydberg arrays have already realized many-body dynamics and quantum phases at the
scale of hundreds of atoms
([Bernien et al., 2017](https://doi.org/10.1038/nature24622);
[Ebadi et al., 2021](https://doi.org/10.1038/s41586-021-03582-4);
[Scholl et al., 2021](https://doi.org/10.1038/s41586-021-03585-1)), including
signatures of topological spin liquids
([Semeghini et al., 2021](https://doi.org/10.1126/science.abi8794)) and continuous
symmetry breaking in the dipolar XY model
([Chen et al., 2023](https://doi.org/10.1038/s41586-023-05859-2)).

<!-- Figure 1 goes here. Save the image to assets/img/ and uncomment:
{% include figure.html
   src="/assets/img/figure-1-apparatus.png"
   alt="Block diagram of a neutral Yb atom array apparatus: lasers, electronics, imaging and control"
   caption="Figure 1. The basic building blocks of a typical neutral Yb atom array system."
   width="wide" %}
-->

## AI for science

In Figure 1, we outline the basic building blocks of a typical neutral Yb atom
array system. Behind the precisely controlled atomic qubits is a complex
apparatus. Lasers, electronics, and imaging systems must work together with
precise timing, while experimental conditions must remain stable. Keeping this
apparatus operating reliably requires sustained attention from experienced
engineers and physicists, making round-the-clock operation demanding in both time
and personnel.

Maintaining and running the experiment with the help of AI is therefore a natural
idea, with early demonstrations already in cold-atom experiments
([Wigley et al., 2016](https://doi.org/10.1038/srep25890)), and is itself a
frontier problem at the interface of AI and physical science
([Carleo et al., 2019](https://doi.org/10.1103/RevModPhys.91.045002)).

The more ambitious step is from operating the experiment to doing science. An
autonomous scientist would need to ask important questions, choose experiments
that distinguish between possible answers, interpret the results, and revise its
understanding when the evidence disagrees. Our long-term goal is to connect these
abilities into a continuous loop, allowing AI to explore a quantum system at a
rate never seen before in pursuit of new discoveries.

A first step toward this loop is to give the AI a learned model of the experiment
itself, one that it can query millions of times while the apparatus runs only the
most informative experiments. This rests on a division of labor: classical machine
learning makes predictions and proposes protocols cheaply
([Carrasquilla & Melko, 2017](https://doi.org/10.1038/nphys4035)), while the
quantum simulator verifies them against physical reality, including in regimes
where no classical check exists. Theory supports this split, since for local
observables the difficulty lies in generating the data rather than in learning
from it ([Huang, Kueng et al., 2022](https://doi.org/10.1126/science.abk3333);
[Huang, Chen & Preskill, 2023](https://doi.org/10.1103/PRXQuantum.4.040337)).

The dipolar XY model shows why this matters. Its phase diagram on frustrated
lattices is rich and largely beyond classical methods
([Yao et al., 2018](https://doi.org/10.1038/s41567-017-0030-7)), yet experimental
realizations are noisy, with finite temperature, positional disorder, and
imperfect state preparation. A model trained on the device learns the physics and
the noise together, which lets us separate the two
([Ito et al., 2026](https://doi.org/10.48550/arXiv.2603.28294)) and design
experiments that reach the phases of interest despite these imperfections.

### A concrete target

Recent numerical studies predict that the dipolar XY model on a breathing kagome
lattice hosts a gapped chiral spin liquid (CSL), a topological phase that has not
yet been observed.[^csl]

We use our Yb Rydberg quantum simulator, which offers tunable geometry and
site-resolved addressing, to train a machine-learning model on the map from local
control parameters (site-resolved fields and triangle-level breathing) to measured
local observables, including scalar spin chirality on each triangle. Following
[Lewis et al. (2024)](https://doi.org/10.1038/s41467-024-45014-7), the model
exploits geometric locality. For gapped ground states within a single phase, this
makes the required number of training configurations grow only logarithmically
with system size.

Where tensor-network results exist, they serve as a calibration benchmark for the
full pipeline. Because the model is trained on the actual device, it also captures
non-idealities such as residual temperature, positional disorder, and diabatic
errors. We then use it to design preparation protocols — local-field ramps,
anyon-pinning potentials, and edge geometries — that bring the experiment into the
CSL regime and extend studies beyond the reach of classical simulation.

[^csl]: Breathing-kagome reference and DOI still to be filled in.

## Science for AI

But the relationship can also run in the other direction: quantum many-body
experiments using neutral atom arrays can help us train better AI.

AI's progress in mathematics
([Trinh et al., 2024](https://doi.org/10.1038/s41586-023-06747-5)) motivates a
natural next challenge: learning science through interaction with the physical
world. A practical obstacle is the time required to obtain experimental feedback.
Many materials-synthesis and biological workflows involve waiting for samples to
form, reactions to finish, or organisms to grow
([Szymanski et al., 2023](https://doi.org/10.1038/s41586-023-06734-w)). These
processes constrain how quickly an AI can test its ideas and accumulate
experience.

Neutral-atom arrays offer a different experimental rhythm. Integrated hardware and
electronic control allow experimental conditions to be changed through software
and measurement sequences to be repeated automatically. The system has the
potential of producing high-quality snapshots of quantum evolution at rates from
10 Hz ([Li et al., 2026](https://doi.org/10.1126/science.adz9952)) to 1000 Hz
([Zeng et al., 2026](https://doi.org/10.48550/arXiv.2608.17189)). Together with
records of the controls and conditions that produced them, these measurements
could provide a rich, rapidly growing resource for training scientific models.

Our aim is to use this experimental experience to fine-tune capable open-weight
models and develop reinforcement-learning methods grounded in measured outcomes
([Guo et al., 2025](https://doi.org/10.1038/s41586-025-09422-z)), turning
experience into lasting improvements in the models themselves. Improved models
would guide further experiments, whose results would support subsequent rounds of
training. Recent work on verifiable LLM agents for quantum many-body simulation
([Deng et al., 2026](https://doi.org/10.48550/arXiv.2604.00149)) suggests that
grounding in checkable physical outcomes is key to making such models reliable.

This combination of scientific depth, programmable control, and high data
throughput makes quantum many-body physics a compelling setting for training
scientific AI. Beyond advancing the field itself, we want to explore whether
learning how collective behavior emerges from microscopic interactions can help
models develop a deeper understanding of the physical world beyond humankind. How
broadly that understanding might transfer remains an open question, but the
possibility of gaining new insights into complex real-world systems is a central
motivation for this effort.

---

*Next: [Agentic quantum many-body physics]({{ '/blog/2026/agentic-quantum-many-body-physics/' | relative_url }}),
on the two loops that make this work.*
