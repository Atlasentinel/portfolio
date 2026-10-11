// All interface strings in English. Must mirror the keys of fr.js.
export const en = {
  meta: {
    title: "Noé Ziadi | Full Stack Developer",
    description:
      "Portfolio of Noé Ziadi, full stack developer with a master’s degree in software architecture. Projects, experience and contact.",
  },

  nav: {
    projects: "Projects",
    experience: "Experience",
    skills: "Skills",
    contact: "Contact",
    menu: "Menu",
    main: "Main navigation",
    language: "Language",
    skip: "Skip to content",
  },

  hero: {
    status: "Open to full-time roles",
    titleLine1: "Full Stack Developer,",
    titleLine2: "with a master’s degree in software architecture.",
    quote: "“The fruit of our failures is the compost of our success”",
    quoteAuthor: "Ziadi Noé 🍂 · 2019",
    cv: "Download resume",
    contact: "Get in touch",
    photoAlt: "Portrait of Noé Ziadi",
  },

  facts: {
    label: "At a glance",
    degree: "Degree",
    degreeValue: "Master’s level (2026)",
    experience: "Experience",
    experienceValue: "3 years of work-study",
    location: "Location",
    locationValue: "Metz area, France",
    languages: "Languages",
    languagesValue: "French, English (C2)",
  },

  projects: {
    title: "Selected projects",
    subtitle: "A selection of recent work. Each page covers the context and the stack.",
    all: "All projects",
    allTitle: "All projects",
    allSubtitle: "Personal, client, school and internship projects, from newest to oldest.",
    back: "All projects",
    aboutTitle: "About the project",
    highlightsTitle: "What I built",
    galleryTitle: "Screenshots",
    details: "Details",
    role: "Role",
    roleValue: "Design and development",
    period: "Period",
    type: "Type",
    stack: "Stack",
    status: "Status",
    present: "ongoing",
    since: "Since",
    unavailable: "Not viewable",
    offlineNote: "This project is no longer available online.",
    privateNote: "This project is private and not publicly accessible.",
    wipNote: "This project is in development and not online yet.",
    visit: "Visit site",
    source: "Source code",
    doc: "Project report (PDF, in French)",
    next: "Next project",
    noPage: "No detail page",
    previewOf: "Preview of",
    screenshotOf: "Screenshot of",
    kinds: { perso: "Personal project", school: "School project", internship: "Internship", client: "Client project" },
    statuses: { live: "Live", wip: "In development", offline: "Offline", private: "Private" },
  },

  github: {
    title: "GitHub activity",
    total: (n) => `${n} contributions in the last 12 months`,
    day: (n, date) => `${n} contribution${n === 1 ? "" : "s"} on ${date}`,
    less: "Less",
    more: "More",
    profile: "View profile",
  },

  experience: { title: "Experience" },
  education: { title: "Education" },

  skills: {
    title: "Skills",
    groups: [
      { name: "Front end", items: "React, TypeScript, JavaScript, HTML/CSS, Tailwind" },
      { name: "Back end", items: "Node.js, Bun, Express, PHP (Symfony, Laravel), Go" },
      { name: "Data", items: "SQL, MySQL, SQLite, MongoDB, Meilisearch, Elasticsearch" },
      { name: "Tools & DevOps", items: "Docker, Git, GitLab, RabbitMQ, Grafana, Prometheus" },
    ],
    alsoLabel: "Also:",
    also: "Python, Java, C, C#/.NET · Raspberry Pi, Arduino · Scrum, Kanban",
  },

  contact: {
    title: "Let’s work together",
    text: "I’m looking for a full-time full stack developer role. Drop me a line, I reply quickly.",
    cv: "Resume (PDF)",
  },

  footer: { rights: "All rights reserved." },

  notFound: {
    title: "Page not found",
    text: "This page doesn’t exist or has moved.",
    home: "Back to home",
  },
};
