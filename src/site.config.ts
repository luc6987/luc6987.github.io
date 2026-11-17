import type { ImageMetadata } from 'astro';
import profile from './assets/profile.jpg';
import type { Lang, Localized } from './i18n/utils';

/**
 * Facts about you that are not prose. Prose lives in src/content/ (one file per language).
 * `Localized` fields take either one string or { en, zh?, fr? } (English is the fallback).
 */
interface SiteConfig {
  /** Shown in the header, page titles and footer. */
  name: Localized;
  /** Default meta description. */
  description: Localized;
  email: string;
  /** Office / postal address; "\n" starts a new line. */
  address: Localized;
  /** About-page photo: replace src/assets/profile.jpg and keep the file name. */
  photo: ImageMetadata;
  /** Profile links shown on the About and Contact pages. */
  links: { label: string; href: string }[];
  /** CV PDFs in public/, one entry per language version. */
  cv: { lang: Lang; href: string }[];
  /** Author names shown in bold in the publication list. */
  highlightAuthors: string[];
}

export const SITE: SiteConfig = {
  name: { en: 'Your Name', zh: '你的名字', fr: 'Prénom Nom' },
  description: {
    en: 'Academic homepage of Your Name.',
    zh: '你的名字的个人学术主页。',
    fr: 'Page académique de Prénom Nom.',
  },
  email: 'your.name@example.com',
  address: {
    en: 'Office 000, Department of Something\nUniversity of Somewhere, City, Country',
    zh: '国家，城市\n某某大学某某系 000 室',
    fr: 'Bureau 000, Département de quelque chose\nUniversité de quelque part, Ville, Pays',
  },
  photo: profile,
  links: [
    { label: 'GitHub', href: 'https://github.com/luc6987' },
    { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=YOUR_ID' },
    { label: 'ORCID', href: 'https://orcid.org/0000-0000-0000-0000' },
  ],
  cv: [{ lang: 'en', href: '/cv.pdf' }],
  highlightAuthors: ['Your Name'],
};
