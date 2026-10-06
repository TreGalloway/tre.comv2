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
  return SITE_FALLBACK;
}

export async function getSeo(): Promise<SeoContent> {
  return SEO_FALLBACK;
}

export async function getHome(): Promise<HomeContent> {
  return HOME_FALLBACK;
}

export async function getAbout(): Promise<AboutContent> {
  return ABOUT_FALLBACK;
}

export async function getContact(): Promise<ContactContent> {
  return CONTACT_FALLBACK;
}

export async function getNotFound(): Promise<NotFoundContent> {
  return NOT_FOUND_FALLBACK;
}

export async function getBlogIndex(): Promise<IndexPageContent> {
  return BLOG_INDEX_FALLBACK;
}

export async function getWorkIndex(): Promise<IndexPageContent> {
  return WORK_INDEX_FALLBACK;
}

export async function getUsesIndex(): Promise<IndexPageContent> {
  return USES_INDEX_FALLBACK;
}

export async function getFavoritesIndex(): Promise<IndexPageContent> {
  return FAVORITES_INDEX_FALLBACK;
}
