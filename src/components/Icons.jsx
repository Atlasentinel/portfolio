// Icônes SVG inline (pas de requête réseau, héritent de la couleur du texte).
const base = { width: 18, height: 18, "aria-hidden": true, focusable: "false" };
const stroke = { ...base, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };

export const GitHubIcon = (p) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.75c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
  </svg>
);

export const LinkedInIcon = (p) => (
  <svg {...base} viewBox="0 0 24 24" fill="currentColor" {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3zM9 9h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C20.6 8.65 21 11.2 21 14.5V21h-4v-5.8c0-1.4-.03-3.2-1.95-3.2-1.95 0-2.25 1.52-2.25 3.1V21H9z" />
  </svg>
);

export const DownloadIcon = (p) => (
  <svg {...stroke} {...p}><path d="M12 3v12m0 0-5-5m5 5 5-5M5 21h14" /></svg>
);

export const ArrowRightIcon = (p) => (
  <svg {...stroke} {...p}><path d="M5 12h14m-6-6 6 6-6 6" /></svg>
);

export const ArrowLeftIcon = (p) => (
  <svg {...stroke} {...p}><path d="M19 12H5m6 6-6-6 6-6" /></svg>
);

export const ExternalIcon = (p) => (
  <svg {...stroke} width={15} height={15} {...p}><path d="M7 17 17 7M9 7h8v8" /></svg>
);

export const MenuIcon = (p) => (
  <svg {...stroke} {...p}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
);

export const CloseIcon = (p) => (
  <svg {...stroke} {...p}><path d="M6 6l12 12M18 6 6 18" /></svg>
);

export const MailIcon = (p) => (
  <svg {...stroke} {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></svg>
);

export const LockIcon = (p) => (
  <svg {...stroke} width={14} height={14} {...p}><rect x="5" y="11" width="14" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></svg>
);
