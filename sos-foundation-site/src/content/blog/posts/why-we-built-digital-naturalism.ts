import type { Post } from "../types";

// ─── Why We Built Digital Naturalism (original) ─────────────────────────────
// Source: D20261010-Why We Built Digital Naturalism.docx
// Paragraph breaks and emphasis follow the manuscript exactly; typography is
// the blog's own. The Simplified Chinese version lives in the .zh.ts file
// alongside this one and points back here via `translationOf`.

export const post: Post = {
  slug: "why-we-built-digital-naturalism",
  title: "Why We Built Digital Naturalism",
  excerpt:
    "Retracing the voyages of Darwin, Wallace, and Wilson with today's tools, and why learning how they came to know belongs in SOS Education.",
  cover: "/pics/digital_naturalism.jpg",
  coverAlt:
    "Digital Naturalism: a voyage map and field journal beside a camera rig digitizing butterfly wings",
  date: "2026-10-10",
  authorId: "cong-liu",
  tags: ["education"],
  body: [
    {
      type: "paragraph",
      text: "We have just added Digital Naturalism to the SOS Education page. It is an interactive map of three natural history journeys: Charles Darwin's voyage on HMS Beagle (1831–1836), Alfred Russel Wallace's travels in the Amazon (1848–1852) and the Malay Archipelago (1854–1862), and E. O. Wilson's fieldwork across the twentieth century. You sail each route port by port. At every stop you read what the naturalist saw, collected, and thought there. I have been building it as a side project, and in this post I want to explain why, and why it belongs in SOS Education.",
    },
    { type: "heading", text: "How they came to know", level: 2 },
    {
      type: "paragraph",
      text: "Darwin, Wallace, and Wilson changed how we see the living world. Darwin and Wallace each arrived at the idea of natural selection. Wallace also found the sharp boundary between Asian and Australian animals that we now call the Wallace Line. Wilson, with Robert MacArthur, turned island observations into the theory of island biogeography, which still guides how nature reserves are planned.",
    },
    {
      type: "paragraph",
      text: "What interests me most is not that they were right, but how they came to know. The popular story says Darwin saw the finches on the Galápagos and understood evolution on the spot. The record is different. Darwin did not even note which island most of his finches came from. The giant fossils at Punta Alta, the seashells high in the Andes, and an earthquake that lifted the coast of Chile all came first, and the idea itself took shape only after he returned to London. Wallace reached the same idea without family money, a university position, or a navy ship. He paid for his travels by selling the specimens he collected.",
    },
    {
      type: "paragraph",
      text: "The app is built around this process of reasoning. At key stops, students commit to their own explanation before they see the naturalist's. For example, they match the giant fossils of Punta Alta to living animals, explain how seashells ended up at 12,000 feet, and sort birds from Bali and Lombok into Asian and Australian groups. A wrong answer gets a reason based on the evidence, not just a red mark. Every stop also links to the naturalist's own account, free online through Project Gutenberg and The Alfred Russel Wallace Page. A separate page shows how the three journeys connect. Darwin's travel book inspired Wallace to set out, Wallace's 1858 letter from Ternate pushed Darwin to publish <em>On the Origin of Species</em>, and a century later Wilson turned their island observations into equations.",
    },
    { type: "heading", text: "Learning from nature with today's tools", level: 2 },
    {
      type: "paragraph",
      text: "At SOS we often say: keep learning from nature. The great naturalists did this with a hand lens, a net, and a notebook. We have much more. When you open the app, Darwin greets you with a line I wrote for him: \"With your modern eyes and my old field notes, perhaps together we'll spot the clues I missed the first time.\" That line is the main idea of the whole project.",
    },
    {
      type: "paragraph",
      text: "One example is the Then & Now panel. For species a naturalist named at a stop, the app checks the Global Biodiversity Information Facility (GBIF), an open database of species records from around the world, and shows whether the species is still being recorded today. In the Falkland Islands, Darwin met the warrah, a fox-like animal so tame it could be lured close and killed. He predicted it would soon disappear. GBIF has no records of it after 2000, and the species was hunted to extinction in the 1870s. We are careful about how these numbers are read. Record counts mostly reflect how hard people have looked, so they cannot tell us whether a species is more or less common than in Darwin's time. They can tell us whether it is still being seen at all. Learning to read data together with its limits is part of the lesson.",
    },
    {
      type: "paragraph",
      text: "The same idea runs through SOS research. We built a multispectral imaging system that records butterfly wings in ultraviolet, visible, and infrared light, including colors no human eye can see. Museum collections are also being digitized. Many of Wilson's specimens are kept at Harvard's Museum of Comparative Zoology, where I do my research, and the app links directly to those museum records. A specimen collected for one purpose a century ago can answer questions its collector never thought to ask.",
    },
    {
      type: "paragraph",
      text: "I also think revisiting these stops may change how big findings are made. In Darwin's time, a finding depended on who could join a long voyage. Today a student anywhere can study the same places through open data, museum records, and satellite maps, and then add new observations of their own. If many people each add a careful piece, I believe we can find things that one voyage could not.",
    },
    { type: "heading", text: "Why it belongs in SOS Education", level: 2 },
    {
      type: "paragraph",
      text: "SOS Education starts from one idea: education should not end with learning, and it should lead to real contributions. Digital Naturalism sits at the learning end of that path and points toward the contribution end.",
    },
    {
      type: "paragraph",
      text: "First, students learn from the great voyages. They see how a careful observer moves from a pattern to a mechanism that could explain it. For example, Wallace noticed that the birds on two sides of a narrow strait were completely different, and he went looking for the cause. Second, students learn the tools of today: GBIF, museum databases, digitized specimens, and the imaging and AI methods taught in our Digitize Nature track. Third, students contribute. They revisit a stop, a specimen, or a place near home, and they add something others can build on, such as a dataset or a new set of observations.",
    },
    {
      type: "paragraph",
      text: "This last step does not need a ship. Every region has travelers and writers who recorded its plants and animals long ago. In China, for example, Xu Xiake spent more than thirty years in the first half of the 1600s traveling across much of the country and keeping detailed journals. A student can map one such journey, identify the species named in the old texts, and compare them with today's records, the same way the app does for Darwin. This is a project we hope to do with students. Let's do it together.",
    },
    { type: "heading", text: "Try it", level: 2 },
    {
      type: "paragraph",
      text: "Digital Naturalism is free and needs no account. It works on phones and tablets, and the voyages can be read in English or Chinese. Teachers can find three ready lesson flows, about 45 minutes each, on the For Educators page. I am now preparing a fourth voyage: Maria Sibylla Merian's 1699 journey to Suriname to study insects and the plants they live on.",
    },
    {
      type: "paragraph",
      text: "If you are a teacher, a student, or part of a museum and would like to use it, or would like to build a journey for a naturalist from your own region, please contact us through the SOS website.",
    },
    {
      type: "paragraph",
      text: "Digital Naturalism: <a href=\"https://www.digital-naturalism.com/\" target=\"_blank\" rel=\"noopener noreferrer\">digital-naturalism.com</a>",
    },
    {
      type: "paragraph",
      text: "For Educators (three lesson flows): <a href=\"https://www.digital-naturalism.com/educators\" target=\"_blank\" rel=\"noopener noreferrer\">digital-naturalism.com/educators</a>",
    },
    {
      type: "paragraph",
      text: "SOS Education: <a href=\"https://sos-commons.vercel.app/education\" target=\"_blank\" rel=\"noopener noreferrer\">sos-commons.vercel.app/education</a>",
    },
  ],
};
