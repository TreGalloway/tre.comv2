import type { Entry } from '@keystatic/core/reader';
import keystaticConfig from '../../keystatic.config';

export type SiteContent = Entry<typeof keystaticConfig['singletons']['site']>;
export type SeoContent = Entry<typeof keystaticConfig['singletons']['seo']>;
export type HomeContent = Entry<typeof keystaticConfig['singletons']['home']>;
export type AboutContent = Entry<typeof keystaticConfig['singletons']['about']>;
export type ContactContent =
  Entry<typeof keystaticConfig['singletons']['contact']>;
export type NotFoundContent =
  Entry<typeof keystaticConfig['singletons']['notFound']>;
export type IndexPageContent =
  Entry<typeof keystaticConfig['singletons']['blogIndex']>;
export type NavLink = SiteContent['nav'][number];
export type SocialLinks = SiteContent['social'];
