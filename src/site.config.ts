export const SITE = {
  name: "Tre' Galloway",
  tagline: 'Electrical Engineering student (Computer Engineering concentration), self-hoster',
  description:
    'Electrical Engineering student focused on embedded systems, computer architecture, homelab/self-hosting, and automation.',
  status: 'Available for selective work',
  url: 'https://tregalloway.com',
  about: {
    name: "Tre' Galloway",
    age: 'XX',
    location: 'New Orleans, Louisiana',
    role: 'Electrical Engineering student (Computer Engineering concentration)',
    bio: "I'm a student at Delgado Community College pursuing an Associate's degree as a transfer pathway into Electrical Engineering with a Computer Engineering concentration at LSU New Orleans / UNO.",
  },
  social: {
    twitter: 'https://x.com/tre_galloway',
    github: 'https://github.com/TreGalloway',
    linkedin: 'https://linkedin.com/in/tregalloway',
    email: 'mailto:tre@tregalloway.com',
    youtube: 'https://www.youtube.com/@tregalloway',
  },
} as const;

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Work', href: '/work' },
  { name: 'Uses', href: '/uses' },
  { name: 'Things I Enjoy', href: '/favorites' },
  { name: 'Contact', href: '/contact' },
] as const;
