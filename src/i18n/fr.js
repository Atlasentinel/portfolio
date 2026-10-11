// Tous les textes de l'interface en français.
// Les contenus des projets / formations / expériences sont dans src/data/*.json.
export const fr = {
  meta: {
    title: "Noé Ziadi | Développeur Full Stack",
    description:
      "Portfolio de Noé Ziadi, développeur full stack diplômé d’un Mastère en architecture logicielle. Projets, expérience et contact.",
  },

  nav: {
    projects: "Projets",
    experience: "Expérience",
    skills: "Compétences",
    contact: "Contact",
    menu: "Menu",
    main: "Navigation principale",
    language: "Langue",
    skip: "Aller au contenu",
  },

  hero: {
    status: "En recherche d’un CDI",
    titleLine1: "Développeur Full Stack,",
    titleLine2: "diplômé d’un Mastère en architecture logicielle.",
    quote: "«\u00a0Le fruit de nos échecs est le composte de notre réussite\u00a0»",
    quoteAuthor: "Ziadi Noé 🍂 · 2019",
    cv: "Télécharger le CV",
    contact: "Me contacter",
    photoAlt: "Portrait de Noé Ziadi",
  },

  facts: {
    label: "En bref",
    degree: "Diplôme",
    degreeValue: "Mastère Bac+5 (2026)",
    experience: "Expérience",
    experienceValue: "3 ans d’alternance",
    location: "Localisation",
    locationValue: "Région de Metz",
    languages: "Langues",
    languagesValue: "Français, anglais (C2)",
  },

  projects: {
    title: "Projets sélectionnés",
    subtitle: "Une sélection de projets récents. Chaque fiche détaille le contexte et la stack.",
    all: "Tous les projets",
    allTitle: "Tous les projets",
    allSubtitle: "Projets personnels, projets clients, projets d’école et stages, du plus récent au plus ancien.",
    back: "Tous les projets",
    aboutTitle: "Le projet",
    highlightsTitle: "Ce que j’ai réalisé",
    galleryTitle: "Captures",
    details: "Fiche",
    role: "Rôle",
    roleValue: "Conception et développement",
    period: "Période",
    type: "Type",
    stack: "Stack",
    status: "Statut",
    present: "en cours",
    since: "Depuis",
    unavailable: "Non consultable",
    offlineNote: "Ce projet n’est plus accessible en ligne.",
    privateNote: "Ce projet est privé : il n’est pas accessible publiquement.",
    wipNote: "Ce projet est en cours de développement et pas encore en ligne.",
    visit: "Voir le site",
    source: "Code source",
    doc: "Dossier du projet (PDF)",
    next: "Projet suivant",
    noPage: "Pas de fiche détaillée",
    previewOf: "Aperçu de",
    screenshotOf: "Capture de",
    kinds: { perso: "Projet personnel", school: "Projet d’école", internship: "Stage", client: "Projet client" },
    statuses: { live: "En ligne", wip: "En développement", offline: "Hors ligne", private: "Privé" },
  },

  github: {
    title: "Activité GitHub",
    total: (n) => `${n} contributions sur les 12 derniers mois`,
    day: (n, date) => `${n} contribution${n > 1 ? "s" : ""} le ${date}`,
    less: "Moins",
    more: "Plus",
    profile: "Voir le profil",
  },

  experience: { title: "Expérience" },
  education: { title: "Formation" },

  skills: {
    title: "Compétences",
    groups: [
      { name: "Front-end", items: "React, TypeScript, JavaScript, HTML/CSS, Tailwind" },
      { name: "Back-end", items: "Node.js, Bun, Express, PHP (Symfony, Laravel), Go" },
      { name: "Données", items: "SQL, MySQL, SQLite, MongoDB, Meilisearch, Elasticsearch" },
      { name: "Outils & DevOps", items: "Docker, Git, GitLab, RabbitMQ, Grafana, Prometheus" },
    ],
    alsoLabel: "Aussi :",
    also: "Python, Java, C, C#/.NET · Raspberry Pi, Arduino · Scrum, Kanban",
  },

  contact: {
    title: "Travaillons ensemble",
    text: "Je recherche un poste de développeur full stack en CDI. Écrivez-moi, je réponds rapidement.",
    cv: "CV (PDF)",
  },

  footer: { rights: "Tous droits réservés." },

  notFound: {
    title: "Page introuvable",
    text: "Cette page n’existe pas ou a été déplacée.",
    home: "Retour à l’accueil",
  },
};
