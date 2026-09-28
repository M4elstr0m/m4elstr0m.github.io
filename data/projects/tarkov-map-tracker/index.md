---
title: Tarkov Map Tracker
summary: A desktop app that tracks your live in-game position on Escape From Tarkov maps in real time, using in-game screenshots.
stack: [Go, Wails, Gaming, Reverse Engineering, GUI]
cover: ./cover.png
icon: /projects/tarkov-map-tracker-icon.png
repo: https://github.com/M4elstr0m/TarkovMapTracker
featured: true
displayStars: true
startYear: 2023
rank: 1
---

**Tarkov Map Tracker** helps players find themselves on the sprawling maps of *Escape From Tarkov*. It watches the game's screenshot folder, and each time you take an in-game screenshot it geolocates and re-orients your position on an interactive map, no memory reading or game-file access involved.

## Overview

The app is built with [Wails v3](https://v3.wails.io/) (Go backend, web frontend) and ships as a standalone Windows executable. Since the app's own v3.0.0 release it also displays every point of interest on the map (extracts, loot spawns), supports custom ping markers, panning and zoom, and i18n localization across four languages.

The app got multiple overhauls in different languages:

- 2023 (**Python**): **Tkinter** version with bad performance and UX
- 2024 (**Go**): [Fyne](https://fyne.io/) version with optimizations and some new features alongside UI/UX improvements.
- 2025 (**Go**): [Wails v3](https://v3.wails.io/) version with a much better UI/UX overall, greater performance, and a lot of new features.

The app is closed-source because of issues encountered with the community in early development.

## Links

- [Latest release](https://github.com/M4elstr0m/TarkovMapTracker/releases/latest)
- [Source & documentation](https://github.com/M4elstr0m/TarkovMapTracker)
