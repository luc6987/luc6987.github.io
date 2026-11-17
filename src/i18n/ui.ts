/**
 * Languages and UI strings.
 * `en` is the reference: `zh` and `fr` must define exactly the same keys
 * (TypeScript flags a missing key; at runtime a missing key falls back to English).
 */
export const languages = {
  en: 'English',
  zh: '中文',
  fr: 'Français',
} as const;

export type Lang = keyof typeof languages;

/** Fallback for missing translations and target of the no-JS redirect from `/`. */
export const defaultLang = 'en' satisfies Lang;

/** BCP 47 tags for `<html lang>`, `hreflang` and date formatting. */
export const htmlLang: Record<Lang, string> = {
  en: 'en',
  zh: 'zh-CN',
  fr: 'fr',
};

/** Short labels used by the language switcher. */
export const langLabels: Record<Lang, string> = {
  en: 'EN',
  zh: '中文',
  fr: 'FR',
};

const en = {
  'skip': 'Skip to content',
  'nav.label': 'Main',
  'nav.about': 'About',
  'nav.research': 'Research',
  'nav.articles': 'Articles',
  'nav.cv': 'CV',
  'nav.contact': 'Contact',
  'lang.label': 'Language',
  'theme.toggle': 'Dark mode',
  'research.title': 'Research',
  'research.publications': 'Publications',
  'research.projects': 'Projects',
  'articles.title': 'Articles',
  'articles.empty': 'No articles yet.',
  'articles.back': 'All articles',
  'articles.updated': 'Updated',
  'cv.title': 'CV',
  'cv.intro': 'My full CV is available as a PDF.',
  'cv.download': 'Download CV ({lang}, PDF)',
  'contact.title': 'Contact',
  'contact.intro': 'The best way to reach me is by email.',
  'contact.email': 'Email',
  'contact.address': 'Address',
  'contact.links': 'Elsewhere',
  'notFound.text': 'This page does not exist.',
  'notFound.back': 'Go to the home page',
};

export type UIKey = keyof typeof en;

const zh: Record<UIKey, string> = {
  'skip': '跳到正文',
  'nav.label': '主导航',
  'nav.about': '关于',
  'nav.research': '研究',
  'nav.articles': '文章',
  'nav.cv': '简历',
  'nav.contact': '联系',
  'lang.label': '语言',
  'theme.toggle': '深色模式',
  'research.title': '研究',
  'research.publications': '论文',
  'research.projects': '项目',
  'articles.title': '文章',
  'articles.empty': '暂无文章。',
  'articles.back': '全部文章',
  'articles.updated': '更新于',
  'cv.title': '简历',
  'cv.intro': '完整简历请见 PDF。',
  'cv.download': '下载简历（{lang}，PDF）',
  'contact.title': '联系方式',
  'contact.intro': '联系我最方便的方式是发邮件。',
  'contact.email': '邮箱',
  'contact.address': '地址',
  'contact.links': '其他平台',
  'notFound.text': '该页面不存在。',
  'notFound.back': '返回首页',
};

const fr: Record<UIKey, string> = {
  'skip': 'Aller au contenu',
  'nav.label': 'Navigation principale',
  'nav.about': 'À propos',
  'nav.research': 'Recherche',
  'nav.articles': 'Articles',
  'nav.cv': 'CV',
  'nav.contact': 'Contact',
  'lang.label': 'Langue',
  'theme.toggle': 'Mode sombre',
  'research.title': 'Recherche',
  'research.publications': 'Publications',
  'research.projects': 'Projets',
  'articles.title': 'Articles',
  'articles.empty': 'Aucun article pour le moment.',
  'articles.back': 'Tous les articles',
  'articles.updated': 'Mis à jour le',
  'cv.title': 'CV',
  'cv.intro': 'Mon CV complet est disponible au format PDF.',
  'cv.download': 'Télécharger le CV ({lang}, PDF)',
  'contact.title': 'Contact',
  'contact.intro': 'Le plus simple pour me joindre est de m’écrire par e-mail.',
  'contact.email': 'E-mail',
  'contact.address': 'Adresse',
  'contact.links': 'Ailleurs sur le web',
  'notFound.text': 'Cette page n’existe pas.',
  'notFound.back': 'Retour à l’accueil',
};

export const ui: Record<Lang, Record<UIKey, string>> = { en, zh, fr };
