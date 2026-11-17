# CLAUDE.md

个人学术主页：Astro 7 纯静态站点，中 / 英 / 法三语，部署到 GitHub Pages 用户站 `https://luc6987.github.io`。仓库名必须是 `luc6987.github.io`，所以**不设 `base`**。

## 命令

- `npm run dev`：本地开发，地址 http://localhost:4321/en/，草稿文章可见
- `npm run build`：构建到 `dist/`。**每次改动后都要跑，必须没有错误**
- `npm run preview`：预览构建结果
- Node ≥ 22.23.4（见 `package.json` 的 `engines`）

## 目录结构

```
astro.config.mjs        site、output: 'static'、compressHTML、Shiki 双主题
src/site.config.ts      与语言无关的“事实”：姓名、邮箱、地址、照片、外链、CV 文件、加粗的作者名
src/i18n/ui.ts          语言列表、<html lang> 映射、全部 UI 文案（en 是基准）
src/i18n/utils.ts       localePath / useTranslations / localize / formatDate / langStaticPaths
src/content.config.ts   内容集合的 schema（about / articles / publications / projects）
src/content/about/<lang>.md                About 页简介（frontmatter：role、affiliation）
src/content/articles/<lang>/<slug>.md      文章（title、description?、date、updated?、draft?）
src/data/publications.yaml                 论文列表（字段说明见文件头注释）
src/data/projects.yaml                     项目列表
src/lib/articles.ts     getArticles()：解析 <lang>/<slug>，生产环境过滤草稿，按日期倒序
src/layouts/BaseLayout.astro   页面骨架：head、hreflang、页眉、页脚
src/components/         BaseHead（meta + 主题初始化脚本）、Header（导航 + 语言切换）、ThemeToggle、LinkList、ProfileLinks
src/pages/index.astro   根路径 / ：按浏览器语言跳到 /en/ /zh/ /fr/（没有 JS 时跳 /en/）
src/pages/404.astro     三语 404 页（GitHub Pages 自动使用）
src/pages/[lang]/       每种语言一份：index（About）、research、articles/、cv、contact
src/styles/global.css   全部样式（组件里没有 <style>）
src/assets/profile.jpg  头像：换照片时直接覆盖同名文件
public/cv.pdf           CV PDF（占位）
```

## i18n 约定

- 所有 URL 都带语言前缀：`/en/…`、`/zh/…`、`/fr/…`。页面放在 `src/pages/[lang]/` 下，用 `langStaticPaths()` 生成三种语言
- 没有用 Astro 内置的 i18n 路由配置；`lang` 一律从 `Astro.params` 显式拿到后往下传
- **内部链接只用 `localePath(lang, 'path')` 生成**，不要手写 `/en/...`。它总会带上首尾斜杠
- 新增 UI 文案时，`ui.ts` 里 en / zh / fr 三处一起加。漏了 key TypeScript 会报错，运行时回退到英文
- `Localized` 类型的字段（site.config、YAML 里的 title / description / note）可以只写一个字符串（各语言共用），也可以写 `{ en, zh?, fr? }`，缺的语言回退到 en
- 文章：同一文件名放在不同语言目录下就是互译。语言切换按钮有译文就跳到译文，没有就跳到该语言的文章列表。文件名用 ASCII，不要在 frontmatter 里设 `slug`
- 新增一种语言要改：`ui.ts`（languages、htmlLang、langLabels、文案）；`content.config.ts` 的 `localized`；`src/content/about/<lang>.md`；需要的话再加 `articles/<lang>/`

## 硬性约束

- 不加任何分析 / 追踪脚本、第三方 script、Web 字体、外部嵌入（地图、视频、评论等）。只用系统字体
- 只做静态输出（`output: 'static'`），不要用 adapter 或 SSR
- JS 只有三处：BaseHead 里的主题初始化（内联）、ThemeToggle、根路径跳转。不要再加客户端框架
- 不设 `base`；`site` 保持 `https://luc6987.github.io`
- 风格极简：单栏，配色用 `global.css` 顶部的 `light-dark()` 变量。暗色模式靠 `<html data-theme>` 切换，没有 JS 时跟随系统设置

## Astro 7 注意事项

- Rust 编译器很严格：所有非 void 标签都要闭合，不要写非法嵌套（比如 `<p>` 里放 `<div>`）
- `compressHTML: true` 是有意设置的（Astro 7 默认的 `'jsx'` 会吞掉跨行的行内元素之间的空格），不要删
- Zod 从 `astro/zod` 导入（Zod 4）。集合配置在 `src/content.config.ts`
- `src/fetch.ts` 是 Astro 7 的保留文件名，不要用

## 部署

- push 到 `main` 后，`.github/workflows/deploy.yml` 会自动构建并发布（withastro/action@v6 → actions/deploy-pages@v5）
- 首次设置：
  1. 在 GitHub 建公开仓库 `luc6987.github.io`
  2. Settings → Pages → Source 选 **GitHub Actions**
- `package-lock.json` 必须提交（action 靠它识别 npm）
