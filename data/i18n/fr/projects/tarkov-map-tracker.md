---
summary: Une application qui suit votre position en temps réel sur les cartes d'Escape From Tarkov, à partir de captures d'écran du jeu.
---

Le **Tarkov Map Tracker** aide les joueurs à se repérer sur les vastes cartes d'*Escape From Tarkov*. Il surveille le dossier de captures d'écran du jeu, à chaque capture il géolocalise et réoriente votre position sur une carte interactive, sans aucune lecture mémoire ni accès aux fichiers du jeu.

## Aperçu

L'application est construite avec [Wails v3](https://v3.wails.io/) (backend Go, frontend web) et se présente comme un exécutable Windows autonome. Depuis sa propre version v3.0.0, elle affiche également tous les points d'intérêt sur la carte (extractions, loot), et prend en charge des marqueurs personnalisés, le déplacement et le zoom, ainsi qu'une localisation i18n en quatre langues.

L'application a connu plusieurs refontes dans différents langages :

- 2023 (**Python**) : version **Tkinter**, avec de mauvaises performances et une UX médiocre
- 2024 (**Go**) : version [Fyne](https://fyne.io/), avec des optimisations, quelques nouvelles fonctionnalités et des améliorations UI/UX
- 2025 (**Go**) : version [Wails v3](https://v3.wails.io/), avec une UI/UX globalement bien meilleure, de meilleures performances et de nombreuses nouvelles fonctionnalités

L'application est closed-source en raison de problèmes rencontrés avec la communauté en début de développement.

## Liens

- [Dernière version](https://github.com/M4elstr0m/TarkovMapTracker/releases/latest)
- [Code source et documentation](https://github.com/M4elstr0m/TarkovMapTracker)
