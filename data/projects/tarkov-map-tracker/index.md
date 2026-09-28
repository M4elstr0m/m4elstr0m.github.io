---
title: Tarkov Map Tracker
summary: A Wails desktop app that tracks your live in-game position on Escape From Tarkov maps in real time, using in-game screenshots.
stack: [Go, Wails, Gaming, Reverse Engineering]
cover: ./cover.png
repo: https://github.com/M4elstr0m/TarkovMapTracker
featured: true
date: 2026-08-04
---

**Tarkov Map Tracker** helps players find themselves on the sprawling maps of *Escape From Tarkov*. It watches the game's screenshot folder, and each time you take an in-game screenshot it geolocates and re-orients your position on an interactive map, no memory reading or game-file access involved.

## Overview

The app is built with [Wails](https://wails.io/) (Go backend, web frontend) and ships as a standalone Windows executable. Since v3.0.0 it also displays every point of interest on the map (extracts, loot spawns), supports custom ping markers, panning and zoom, and i18n localization across four languages.

## How it works

Escape From Tarkov doesn't expose a live player-position API, so the app infers position purely from the minimap fragment burned into each in-game screenshot, entirely external to the game process.

## Links

- [Latest release](https://github.com/M4elstr0m/TarkovMapTracker/releases/latest)
- [Source & documentation](https://github.com/M4elstr0m/TarkovMapTracker)
