---
summary: Un crawler qui parcourt automatiquement un site internet pour en extraire des données type OSINT ciblées, comme des adresses e-mail, et exporte les résultats en JSON structuré.
---

**Spider-Scraper** est un robot d'indexation conçu pour parcourir automatiquement un site internet et en extraire des données OSINT ciblées (par exemple des adresses e-mail). Il permet de récupérer rapidement des informations structurées, exportées en JSON, pour identifier des adresses e-mail exposées sur un site, ou cartographier la structure d'un site.

Cet outil n'est plus maintenu.

## Aperçu

Entièrement écrit en **Go**, l'outil n'expose qu'une interface CLI construite avec [Cobra](https://cobra.dev/). Les résultats peuvent être exportés en JSON pour faciliter l'intégration avec d'autres outils.

Le scraper analyse intégralement la page fournie, et chaque lien vers d'autres pages est stocké pour élargir la recherche. Si l'option `email` est activée, il conserve également les adresses e-mail trouvées sur chaque page.

Grâce à la liste croissante d'URLs découvertes, le robot répète ces étapes jusqu'à ce qu'il ne reste plus aucune nouvelle page du même domaine racine à scanner, puis renvoie l'ensemble des informations trouvées.

## Limites

L'outil ne prend pas en charge les listes de proxys, les limites de requêtes sont donc rapidement atteintes sur des cibles plus importantes.

Une amélioration conséquente aurait été d'intégrer de l'IA pour analyser les résultats.

La collecte massive peut être légalement répréhensible même à des fins d'OSINT, tout comme l'exploitation des endpoints découverts. À garder en tête avant de pointer l'outil vers une cible réelle.
