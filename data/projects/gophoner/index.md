---
title: gophoner
summary: A CLI & TUI tool that checks simultaneously if a phone number is registered on popular apps & websites, without any prerequisite.
stack: [Go, OSINT, CLI, TUI]
cover: ./cover.png
coverGif: /projects/gophoner-cover.gif
icon: /projects/gophoner-icon.svg
repo: https://github.com/M4elstr0m/gophoner
featured: true
displayStars: true
startYear: 2026
rank: 2
---

**gophoner** checks a single phone number against a set of individual modules concurrently, so checking against several services takes about as long as the slowest one, not the sum of them all. It ships both as a scriptable CLI (`gophoner check`) and a guided terminal UI (`gophoner interactive`), respectively built with [Cobra](https://cobra.dev/) and [Bubble Tea](https://github.com/charmbracelet/bubbletea).

It is a spiritual successor to [ignorant by Megadose](https://github.com/Megadose/ignorant/), which was one of the only **free and open-source** tools to do a similar job.

## Overview

None of the supported modules alert or notify the target phone number: no SMS or email is triggered by a check.

Every request is sent with a randomized, internally consistent browser fingerprint (TLS, User-Agent, Client Hints) drawn from a real, hand-made desktop browser pool. 

Target numbers are never written to the log file unless `--debug` is explicitly set.

Users can download it for every platform, from various package managers.

## Links

- [Latest release](https://github.com/M4elstr0m/gophoner/releases/latest)
- [Source & documentation](https://github.com/M4elstr0m/gophoner)
