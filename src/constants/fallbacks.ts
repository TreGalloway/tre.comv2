import type {
  AboutContent,
  ContactContent,
  HomeContent,
  IndexPageContent,
  NotFoundContent,
  SeoContent,
  SiteContent,
} from '@/lib/types';

export const SITE_FALLBACK = {
  name: "Tre' Galloway",
  logo: null,
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
} satisfies SiteContent;

export const SEO_FALLBACK = {
  titleTemplate: "%s — Tre' Galloway",
  defaultDescription:
    'Electrical Engineering student focused on embedded systems, computer architecture, homelab/self-hosting, and automation.',
  defaultOgImage: null,
  twitterHandle: '@tre_galloway',
  keywords: [
    'embedded systems',
    'computer architecture',
    'homelab',
    'self-hosting',
    'automation',
  ],
} satisfies SeoContent;

export const HOME_FALLBACK = {
  hero: {
    eyebrow: 'Available for selective work',
    heading:
      'Electrical Engineering student (Computer Engineering concentration), self-hoster',
    subheading:
      'Electrical Engineering student focused on embedded systems, computer architecture, homelab/self-hosting, and automation.',
    primaryCta: { label: 'View the work', href: '/work' },
    secondaryCta: { label: 'Get in touch', href: '/contact' },
  },
  postsSection: {
    eyebrow: 'Writing',
    heading: 'Recent posts',
    ctaLabel: 'View all',
    ctaHref: '/blog',
    emptyText: 'No posts yet.',
  },
  workSection: {
    eyebrow: 'Selected work',
    heading: 'Featured projects',
    ctaLabel: 'View all',
    ctaHref: '/work',
    emptyText: 'No featured work yet.',
  },
} satisfies HomeContent;

export const ABOUT_FALLBACK = {
  eyebrow: 'About',
  heading: "Tre' Galloway",
  intro:
    "I'm a student at Delgado Community College pursuing an Associate's degree as a transfer pathway into Electrical Engineering with a Computer Engineering concentration at LSU New Orleans / UNO.",
  education: {
    heading: 'Education',
    items: [
      {
        institution: 'Delgado Community College — A.S. transfer pathway',
        detail: '',
        status: 'In progress',
      },
      {
        institution:
          'Target: B.S. Electrical Engineering (Computer Engineering concentration), LSU New Orleans / UNO',
        detail: '',
        status: 'Expected Spring 2031',
      },
    ],
  },
  focusAreas: {
    heading: 'Focus areas',
    items: [
      { label: 'Embedded systems' },
      { label: 'Computer architecture' },
      { label: 'Homelab / self-hosting' },
      { label: 'Automation' },
    ],
  },
  location: {
    heading: 'Location',
    text: 'New Orleans, Louisiana',
  },
  cta: { label: 'Get in touch', href: '/contact' },
} satisfies AboutContent;

export const CONTACT_FALLBACK = {
  eyebrow: 'Contact',
  heading: 'Get in touch',
  intro: 'Have a project in mind or just want to say hi? Feel free to reach out.',
  cta: { label: 'Send an email', href: 'mailto:tre@tregalloway.com' },
} satisfies ContactContent;

export const NOT_FOUND_FALLBACK = {
  eyebrow: '404',
  heading: 'Page not found',
  message: "The page you're looking for doesn't exist or has been moved.",
  cta: { label: 'Back to home', href: '/' },
} satisfies NotFoundContent;

export const BLOG_INDEX_FALLBACK = {
  eyebrow: 'Blog',
  heading: 'Latest writing',
  intro: 'Thoughts on software, design, and building things.',
  emptyText: 'No posts yet.',
} satisfies IndexPageContent;

export const WORK_INDEX_FALLBACK = {
  eyebrow: 'Work',
  heading: 'Selected work',
  intro: "A selection of projects I've built and shipped.",
  emptyText: 'No work yet.',
} satisfies IndexPageContent;

export const USES_INDEX_FALLBACK = {
  eyebrow: 'Uses',
  heading: 'What I use',
  intro: 'A curated list of the tools and gear I rely on day to day.',
  emptyText: 'Nothing here yet.',
} satisfies IndexPageContent;

export const FAVORITES_INDEX_FALLBACK = {
  eyebrow: 'Things I Enjoy',
  heading: 'Things I enjoy',
  intro:
    'A collection of things I enjoy - manga, comics, anime, books (ebook, physical, and audio), games, and movies.',
  emptyText: 'Nothing here yet.',
} satisfies IndexPageContent;
