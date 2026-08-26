import type { Post } from "../types";

// ─── Bilingual template — the TRANSLATION ────────────────────────────────────
// A translation is an ordinary post with two extra fields:
//
//   lang:          the language code, registered in ../languages.ts
//   translationOf: the slug of the ORIGINAL post
//
// Everything else is independent — including images. A translation may use
// different pictures from the original if that serves its readers better.
//
// Keep `date` the same as the original so both sort to the same place.

export const post: Post = {
  slug: "template-bilingual-zh",
  lang: "zh-Hans",
  translationOf: "template-bilingual", // ← the original's slug

  title: "双语文章模板",
  excerpt: "一到两句话的摘要，会显示在列表卡片、首页轮播，以及搜索引擎的描述里。",
  cover: "/pics/mountains.jpg",
  coverAlt: "为屏幕阅读器描述封面图片",
  date: "2026-08-27",
  authorId: "sos-foundation",
  tags: ["announcements"],
  draft: true, // ← remove to publish

  body: [
    {
      type: "paragraph",
      text: "开头先抛出钩子。这里同样可以使用行内 HTML：<strong>粗体</strong>、<em>斜体</em>，以及<a href=\"/research\">链接</a>。",
    },
    { type: "heading", text: "一个章节", level: 2 },
    {
      type: "paragraph",
      text: "每段两到五句话最好读。想法太长就拆成多个段落区块，不要堆成一整片文字墙。",
    },
    {
      type: "image",
      src: "/pics/borneo-2.jpg",
      alt: "描述这张图片的替代文字",
      caption: "一句简短的图说几乎总是能加分。",
    },
    {
      type: "gallery",
      images: [
        { src: "/pics/digital_moths.png", alt: "第一张图" },
        { src: "/pics/talk.png", alt: "第二张图" },
      ],
      caption: "两到三张属于同一组的图片。",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "干净地收尾——一句简短的结语。",
    },
  ],
};
