import { defaultLang, htmlLang, languages, ui, type Lang, type UIKey } from './ui';

export { defaultLang, htmlLang, langLabels, languages, ui, type Lang, type UIKey } from './ui';

/** All languages, in the order they appear in the language switcher. */
export const langs = Object.keys(languages) as Lang[];

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && (langs as string[]).includes(value);
}

/**
 * Internal URL of a page in a given language. Always use this instead of hand-written paths.
 * localePath('zh') → '/zh/'   localePath('fr', 'articles/hello') → '/fr/articles/hello/'
 */
export function localePath(lang: Lang, path = ''): string {
  return `/${[lang, ...path.split('/').filter(Boolean)].join('/')}/`;
}

/** `getStaticPaths()` result for pages that exist once per language. */
export function langStaticPaths() {
  return langs.map((lang) => ({ params: { lang } }));
}

/** Returns t('nav.about') etc. in the given language, falling back to English. */
export function useTranslations(lang: Lang) {
  return (key: UIKey): string => ui[lang][key] ?? ui[defaultLang][key];
}

/** A value shared by all languages, or one value per language (English required, used as fallback). */
export type Localized =
  | string
  | ({ [K in typeof defaultLang]: string } & Partial<Record<Lang, string>>);

export function localize(value: Localized, lang: Lang): string {
  return typeof value === 'string' ? value : (value[lang] ?? value[defaultLang]);
}

/** Long localized date: "November 15, 2026" / "2026年11月15日" / "15 novembre 2026". */
export function formatDate(date: Date, lang: Lang): string {
  return new Intl.DateTimeFormat(htmlLang[lang], { dateStyle: 'long', timeZone: 'UTC' }).format(date);
}

/** YYYY-MM-DD, for `<time datetime>`. */
export function isoDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
