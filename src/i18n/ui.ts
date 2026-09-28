export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const ui = {
  en: {
    "brand.name": "M4elstr0m",

    "nav.about": "about",
    "nav.projects": "projects",
    "nav.contact": "contact",
    "nav.homeAriaLabel": "Home",
    "nav.language": "language",

    "loading.boot": "booting m4elstr0m.sh",

    "home.readMore": "read more",
    "home.viewAllProjects": "view all projects",
    "home.greetings": "Greetings!",

    "projects.back": "back to projects",
    "projects.searchPlaceholder": "search projects...",
    "projects.filterAll": "all",
    "projects.noMatches": "no matches",

    "project.link": "link",
    "project.live": "live",
    "project.private": "private",
    "project.public": "public",
    "project.now": "Now",

    "seeMore.title": "See more",
    "seeMore.subtitle": "Browse the full list of projects",

    "hint.more": "more",
    "hint.home": "home",

    "about.decryptHint": "Click to decrypt",
    "about.localeList": "locale --list",
    "about.classifiedBreach": "THE BREACH IS HUMAN",
    "about.classifiedLeak": "THE LEAK IS HUMAN",
    "about.classifiedHack": "THE HACK IS HUMAN",
    "about.badgesInterests": "interests",
    "about.badgesStack": "stack",
    "about.badgesTools": "tools",
    "about.ferrisAlt": "ASCII art of Ferris, the Rust mascot",

    "panel.about": "about",
    "panel.classified": "classified",
    "panel.projects": "projects",
    "panel.contact": "contact",
    "panel.error": "error",
    "panel.more": "more",

    "404.cat": "cat ./requested-page",
    "404.catError": "cat: ./requested-page: No such file or directory",
    "404.heading": "This page doesn't exist, or it was moved.",
    "404.home": "home",

    "meta.home.title": "M4elstr0m: Portfolio",
    "meta.home.description":
      "Portfolio of M4elstr0m, a cybersecurity and coding enjoyer working primarily in Go and Rust, focused on OSINT and offensive security tooling.",
    "meta.about.title": "M4elstr0m: About",
    "meta.about.description":
      "More about M4elstr0m, a cybersecurity and coding enjoyer working primarily in Go and Rust.",
    "meta.projects.title": "M4elstr0m: Projects",
    "meta.projects.description":
      "Full list of projects by M4elstr0m, spanning Go, Rust, OSINT, and offensive security tooling.",
    "meta.404.title": "M4elstr0m: 404",
    "meta.404.description": "Page not found.",

    "redacted.ariaPrefix": "Classified transmission, click to decrypt:",

    "tooltip.unavailable": "No tooltip available",

    "placeholder.redacted": "REDACTED",
    "placeholder.noCover": "(no cover available)",
  },
  fr: {
    "brand.name": "M4elstr0m",

    "nav.about": "À propos",
    "nav.projects": "Projets",
    "nav.contact": "Contact",
    "nav.homeAriaLabel": "Accueil",
    "nav.language": "Langue",

    "loading.boot": "démarrage de m4elstr0m.sh",

    "home.readMore": "en savoir plus",
    "home.viewAllProjects": "voir tous les projets",
    "home.greetings": "Bonjour !",

    "projects.back": "retour aux projets",
    "projects.searchPlaceholder": "rechercher des projets...",
    "projects.filterAll": "tous",
    "projects.noMatches": "aucun résultat",

    "project.link": "lien",
    "project.live": "en ligne",
    "project.private": "privé",
    "project.public": "public",
    "project.now": "Aujourd'hui",

    "seeMore.title": "Voir plus",
    "seeMore.subtitle": "Parcourir la liste complète des projets",

    "hint.more": "plus",
    "hint.home": "accueil",

    "about.decryptHint": "Cliquer pour déchiffrer",
    "about.localeList": "locale --list",
    "about.classifiedBreach": "LA FAILLE EST HUMAINE",
    "about.classifiedLeak": "LA FUITE EST HUMAINE",
    "about.classifiedHack": "LE PIRATAGE EST HUMAIN",
    "about.badgesInterests": "centres d'intérêt",
    "about.badgesStack": "technologies",
    "about.badgesTools": "outils",
    "about.ferrisAlt": "Illustration ASCII de Ferris, la mascotte de Rust",

    "panel.about": "À propos",
    "panel.classified": "classifié",
    "panel.projects": "projets",
    "panel.contact": "contact",
    "panel.error": "erreur",
    "panel.more": "plus",

    "404.cat": "cat ./requested-page",
    "404.catError":
      "cat: ./requested-page: Aucun fichier ou dossier de ce type",
    "404.heading": "Cette page n'existe pas, ou elle a été déplacée.",
    "404.home": "accueil",

    "meta.home.title": "M4elstr0m : Portfolio",
    "meta.home.description":
      "Portfolio de M4elstr0m, passionné de cybersécurité et de programmation, travaillant principalement en Go et Rust, spécialisé en OSINT et en outillage offensif.",
    "meta.about.title": "M4elstr0m : À propos",
    "meta.about.description":
      "En savoir plus sur M4elstr0m, passionné de cybersécurité et de programmation, travaillant principalement en Go et Rust.",
    "meta.projects.title": "M4elstr0m : Projets",
    "meta.projects.description":
      "Liste complète des projets de M4elstr0m, mêlant Go, Rust, OSINT et outillage offensif.",
    "meta.404.title": "M4elstr0m : 404",
    "meta.404.description": "Page introuvable.",

    "redacted.ariaPrefix": "Cliquer pour déchiffrer",

    "tooltip.unavailable": "Aucune info-bulle disponible",

    "placeholder.redacted": "CENSURÉ",
    "placeholder.noCover": "(image non disponible)",
  },
} as const;

export type UiKey = keyof (typeof ui)[typeof defaultLocale];
