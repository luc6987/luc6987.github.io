import { getCollection, type CollectionEntry } from 'astro:content';
import { isLang, langs, type Lang } from '../i18n/utils';

export interface Article {
  entry: CollectionEntry<'articles'>;
  lang: Lang;
  /** File name without extension; shared by all translations of an article. */
  slug: string;
}

/** Every article in every language, newest first. Drafts (`draft: true`) only appear in `npm run dev`. */
export async function getArticles(): Promise<Article[]> {
  const entries = await getCollection('articles', ({ data }) => import.meta.env.DEV || !data.draft);
  return entries
    .map((entry) => {
      // Ids look like "<lang>/<slug>" because files live in src/content/articles/<lang>/.
      const [lang, ...rest] = entry.id.split('/');
      if (!isLang(lang) || rest.length === 0) {
        throw new Error(
          `Article "${entry.id}" must be inside src/content/articles/<${langs.join('|')}>/ and must not set a custom \`slug\`.`,
        );
      }
      return { entry, lang, slug: rest.join('/') };
    })
    .sort((a, b) => b.entry.data.date.valueOf() - a.entry.data.date.valueOf());
}
