---
title: Spider-Scraper
summary: A crawler that automatically navigates through a website to extract targeted OSINT data such as email addresses, exporting the results as structured JSON.
stack: [Go, OSINT, CLI]
private: true
featured: true
startYear: 2025
endYear: 2026
---

**Spider-Scraper** is a crawler built to automatically browse a website and extract targeted OSINT data (e.g. email addresses). It quickly retrieves structured information, exported as JSON, which helps the user identifying email addresses exposed on a website, or mapping out a site's structure.

This tool is no longer maintained.

## Overview

Built entirely in **Go**, the tool only exposes a CLI built with [Cobra](https://cobra.dev/). Results can be exported to JSON for easy integration with other tools.

The scraper scans a given webpage in full, and every link to other pages gets stored to widen the search. If the `email` option is enabled, it also keeps any email addresses found on each page.

Using the growing list of discovered URLs, the crawler repeats these steps until no new page of the same root domain is left to scan, at which point it returns everything it found.

## Limitations

The tool does not support proxy-chaining, so rate limits are hit easily on larger targets.

An important upgrade would have been to integrate AI to analyze results.

Mass collection can be legally risky even for OSINT purposes, and so can acting on the endpoints it discovers. Worth keeping in mind before pointing it at a real target.
