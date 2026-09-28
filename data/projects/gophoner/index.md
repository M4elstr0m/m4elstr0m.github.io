---
title: gophoner
summary: A CLI & TUI tool that checks, in parallel, whether a phone number is registered across popular apps and websites, with no prerequisite and no notification sent to the target.
stack: [Go, OSINT, CLI]
cover: ./cover.png
coverGif: /projects/gophoner-cover.gif
repo: https://github.com/M4elstr0m/gophoner
featured: true
displayStars: true
startYear: 2026
date: 2026-03-05
---

**gophoner** checks a single phone number against a set of OSINT modules concurrently, so checking against several services takes about as long as the slowest one, not the sum of them all. It ships both as a scriptable CLI (`gophoner check`) and a guided terminal UI (`gophoner interactive`), built with Cobra and Bubble Tea.

## Overview

None of the supported modules alert or notify the target phone number: no SMS or email is triggered by a check. Every request is sent with a randomized, internally consistent browser fingerprint (TLS, User-Agent, Client Hints) drawn from a real desktop browser pool, and target numbers are never written to the log file unless `--debug` is explicitly set.

## Notes

Cross-platform prebuilt binaries (Windows, Linux, macOS), `--json` output for scripting, and an update check on startup.

## Links

- [Source & documentation](https://github.com/M4elstr0m/gophoner)
