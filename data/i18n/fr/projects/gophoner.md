---
summary: Un outil CLI & TUI qui vérifie simultanément si un numéro de téléphone est enregistré sur des applications et sites populaires, sans aucun prérequis.
---

**gophoner** confronte un numéro de téléphone donné à un ensemble de modules indépendants exécutés en parallèle : vérifier plusieurs services prend donc à peu près le temps du plus lent d'entre eux, et non la somme de chacun. Il est disponible à la fois comme CLI scriptable (`gophoner check`) et comme interface TUI guidée (`gophoner interactive`), respectivement construites avec [Cobra](https://cobra.dev/) et [Bubble Tea](https://github.com/charmbracelet/bubbletea).

Il s'agit d'un successeur spirituel d'[ignorant par Megadose](https://github.com/Megadose/ignorant/), l'un des seuls outils **gratuits et open-source** à remplir ce rôle.

## Aperçu

Aucun des modules pris en charge n'alerte ou ne notifie le numéro ciblé : aucun SMS ni e-mail n'est déclenché par une vérification.

Chaque requête est envoyée avec une empreinte de navigateur aléatoire mais cohérente (TLS, User-Agent, Client Hints), tirée d'une pool de vrais navigateurs de bureau constituée à la main.

Les numéros ciblés ne sont jamais écrits dans le fichier de log, sauf si `--debug` est explicitement activé.

L'outil est téléchargeable sur toutes les plateformes, via différents gestionnaires de paquets.

## Liens

- [Dernière version](https://github.com/M4elstr0m/gophoner/releases/latest)
- [Code source et documentation](https://github.com/M4elstr0m/gophoner)
