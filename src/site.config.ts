export const SITE = {
  name: "Tre' Galloway",
  logo: null as string | null,
  tagline:
    'Electrical Engineering student (Computer Engineering concentration), self-hoster',
  description:
    'Electrical Engineering student focused on embedded systems, computer architecture, homelab/self-hosting, and automation.',
  status: 'Available for selective work',
  url: 'https://tregalloway.com',
  social: {
    twitter: 'https://x.com/tre_galloway',
    github: 'https://github.com/TreGalloway',
    linkedin: 'https://linkedin.com/in/tregalloway',
    email: 'mailto:tre@tregalloway.com',
    youtube: 'https://www.youtube.com/@tregalloway',
  },
  nav: [
    { label: 'Home', href: '/', visible: true },
    { label: 'About', href: '/about', visible: true },
    { label: 'Blog', href: '/blog', visible: true },
    { label: 'Work', href: '/work', visible: true },
    { label: 'Uses', href: '/uses', visible: true },
    { label: 'Things I Enjoy', href: '/favorites', visible: true },
    { label: 'Contact', href: '/contact', visible: true },
  ],
  footer: {
    copyrightName: "Tre' Galloway",
  },
};

export type SiteContent = typeof SITE;
