export interface CtaContent {
  label: string;
  href: string;
}

export interface NavLink {
  label: string;
  href: string;
  visible: boolean;
}

export interface SocialLinks {
  twitter: string;
  github: string;
  linkedin: string;
  email: string;
  youtube: string;
}

export interface SiteContent {
  name: string;
  logo: string | null;
  tagline: string;
  description: string;
  status: string;
  url: string;
  social: SocialLinks;
  nav: NavLink[];
  footer: {
    copyrightName: string;
  };
}

export interface SeoContent {
  titleTemplate: string;
  defaultDescription: string;
  defaultOgImage: string | null;
  twitterHandle: string;
  keywords: string[];
}

export interface HomeContent {
  hero: {
    eyebrow: string;
    heading: string;
    subheading: string;
    primaryCta: CtaContent;
    secondaryCta: CtaContent;
  };
  postsSection: {
    eyebrow: string;
    heading: string;
    ctaLabel: string;
    ctaHref: string;
    emptyText: string;
  };
  workSection: {
    eyebrow: string;
    heading: string;
    ctaLabel: string;
    ctaHref: string;
    emptyText: string;
  };
}

export interface AboutContent {
  eyebrow: string;
  heading: string;
  intro: string;
  education: {
    heading: string;
    items: Array<{
      institution: string;
      detail: string;
      status: string;
    }>;
  };
  focusAreas: {
    heading: string;
    items: Array<{ label: string }>;
  };
  location: {
    heading: string;
    text: string;
  };
  cta: CtaContent;
}

export interface ContactContent {
  eyebrow: string;
  heading: string;
  intro: string;
  cta: CtaContent;
}

export interface NotFoundContent {
  eyebrow: string;
  heading: string;
  message: string;
  cta: CtaContent;
}

export interface IndexPageContent {
  eyebrow: string;
  heading: string;
  intro: string;
  emptyText: string;
}
