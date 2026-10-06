import {
  ABOUT_FALLBACK,
  BLOG_INDEX_FALLBACK,
  CONTACT_FALLBACK,
  FAVORITES_INDEX_FALLBACK,
  HOME_FALLBACK,
  NOT_FOUND_FALLBACK,
  SEO_FALLBACK,
  SITE_FALLBACK,
  USES_INDEX_FALLBACK,
  WORK_INDEX_FALLBACK,
} from '@/constants/fallbacks';
import { reader } from '@/lib/keystatic';
import { withFallback } from '@/lib/merge';
import type {
  AboutContent,
  ContactContent,
  HomeContent,
  IndexPageContent,
  NotFoundContent,
  SeoContent,
  SiteContent,
} from '@/lib/types';

export async function getSite(): Promise<SiteContent> {
  return withFallback(await reader.singletons.site.read(), SITE_FALLBACK);
}

export async function getSeo(): Promise<SeoContent> {
  return withFallback(await reader.singletons.seo.read(), SEO_FALLBACK);
}

export async function getHome(): Promise<HomeContent> {
  return withFallback(await reader.singletons.home.read(), HOME_FALLBACK);
}

export async function getAbout(): Promise<AboutContent> {
  return withFallback(await reader.singletons.about.read(), ABOUT_FALLBACK);
}

export async function getContact(): Promise<ContactContent> {
  return withFallback(await reader.singletons.contact.read(), CONTACT_FALLBACK);
}

export async function getNotFound(): Promise<NotFoundContent> {
  return withFallback(
    await reader.singletons.notFound.read(),
    NOT_FOUND_FALLBACK,
  );
}

export async function getBlogIndex(): Promise<IndexPageContent> {
  return withFallback(
    await reader.singletons.blogIndex.read(),
    BLOG_INDEX_FALLBACK,
  );
}

export async function getWorkIndex(): Promise<IndexPageContent> {
  return withFallback(
    await reader.singletons.workIndex.read(),
    WORK_INDEX_FALLBACK,
  );
}

export async function getUsesIndex(): Promise<IndexPageContent> {
  return withFallback(
    await reader.singletons.usesIndex.read(),
    USES_INDEX_FALLBACK,
  );
}

export async function getFavoritesIndex(): Promise<IndexPageContent> {
  return withFallback(
    await reader.singletons.favoritesIndex.read(),
    FAVORITES_INDEX_FALLBACK,
  );
}
