import type { Post } from "../types";

// ─── Should Buying and Selling Ants Be Banned? (original) ────────────────────
// Source: D20260826-Should Buying and Selling Ants Be Banned.docx
// Headings and paragraph breaks follow the manuscript exactly; typography is
// the blog's own. The Simplified Chinese version lives in the .zh.ts file
// alongside this one and points back here via `translationOf`.

export const post: Post = {
  slug: "should-buying-and-selling-ants-be-banned",
  title: "Should Buying and Selling Ants Be Banned?",
  excerpt:
    "In March, a traveler was stopped in Nairobi with more than 2,000 live ants in his luggage. Notes from my RFI interview on what the online ant trade actually looks like — and why neither a ban nor a free-for-all is the right answer.",
  cover: "/pics/ant-trade-customs.jpg",
  coverAlt:
    "Rows of test tubes holding live ants, seized and displayed in front of a China Customs sign",
  coverCredit: "Photo: CCTV",
  date: "2026-08-26",
  authorId: "cong-liu",
  tags: ["research", "policy"],
  body: [
    {
      type: "paragraph",
      text: "<em>Notes from my interview with Radio France Internationale's Chinese service</em>",
    },
    {
      type: "paragraph",
      text: "In March this year, a traveler was stopped at Jomo Kenyatta International Airport in Nairobi, on his way to China. His luggage held more than 2,000 live ants, most of them packed in small transparent capsules. In April, a Kenyan court fined him one million Kenyan shillings, about 6,500 euros, and sentenced him to twelve months in prison. Investigators linked him to a smuggling network broken up a year earlier: in May 2025, two Belgian teenagers, a Vietnamese man, and a Kenyan man were caught trying to export thousands of ants, and were sentenced to a year in prison or a fine of close to US$8,000.",
    },
    {
      type: "paragraph",
      text: "Most people have heard of ivory, pangolin, or rhino horn smuggling. Ant smuggling is new to almost everyone. Kenya's wildlife authority warned that trafficking is shifting from iconic mammals to species that are little known but important for ecological balance.",
    },
    {
      type: "paragraph",
      text: "In June, the Chinese service of Radio France Internationale (RFI) interviewed me by phone for its Environment and Development column. The question was the one in the title: should buying and selling ants be banned? I study ants at Harvard's Museum of Comparative Zoology, and in 2023 I co-authored one of the first studies to measure the online ant trade. This post is a summary of what I said in the interview, what my co-author Zhengyang Wang said, and where I think the answer lies.",
    },
    { type: "heading", text: "How ants became pets", level: 2 },
    {
      type: "paragraph",
      text: "Ants live almost everywhere on Earth, except places like the poles. About 16,000 species have been named, and the true number is probably above 30,000. For a hobbyist, this is a large part of the attraction. Compared with vertebrates, ants are more varied in form and behavior, cheaper to keep, and easier to breed when conditions are right. A whole colony fits in a test tube, and a test tube fits in a package. That is how an online market became possible. In the RFI piece, a hobbyist in Taiwan describes buying a colony on Taobao, rearing it, and reselling it on Facebook at five times the price.",
    },
    { type: "heading", text: "What our study found", level: 2 },
    {
      type: "paragraph",
      text: "In 2023, Zhengyang Wang, our colleagues, and I published a study in <em>Biological Conservation</em> that monitored China's online ant market for six months. In that period, 206 sellers in 89 cities sold 58,937 ant colonies, covering 209 species. The trade was concentrated in the three most densely populated regions of the country. More than a quarter of the species were not native to China. The popular species tended to have the traits of successful invaders, and our climate models showed that 24.7 percent of the non-native species could find a suitable climate in the very city where they were sold.",
    },
    {
      type: "paragraph",
      text: "We started the study out of curiosity. As ant researchers, we mostly saw the positive side at first: more attention to ants should mean more understanding and more protection. The results made us take the risks more seriously.",
    },
    { type: "heading", text: "The risk at both ends of the trade", level: 2 },
    {
      type: "paragraph",
      text: "Consider the source countries first. In Kenya, the main target of the smugglers is the harvester ant. It is a keystone species there: it disperses seeds, turns over soil, and feeds other animals. If its numbers drop quickly in one place, the effect does not stop at ants. Vegetation and the food web change with it. To be honest about the current situation, I told RFI that the impact of hobby-scale collecting does not look large so far. However, if collection becomes industrial in scale, local populations will decline, and right now we have no way to evaluate this. That is the uncomfortable part: nobody has baseline numbers for ant populations, in Kenya or anywhere else. What we do know is that insects overall are declining, from habitat loss, climate change, and invasive species, and ant diversity is very likely declining with them.",
    },
    {
      type: "paragraph",
      text: "Now consider the destination countries. Pets escape, and an ant species moved to a new region usually leaves its natural enemies behind. With nothing to hold it in check, it can establish, spread, and displace native species, and the damage lands on agriculture and public health. The example I gave in the interview is the red imported fire ant. It is native to South America, invaded the United States first, and then spread around the world. Its stings are painful and can cause allergic reactions, and after decades of control programs it still cannot be eradicated.",
    },
    {
      type: "paragraph",
      text: "Kenya's wildlife authority also suspects the smuggling amounts to biopiracy, the taking of a country's biological resources. Under the Nagoya Protocol, countries hold sovereign rights over the biological resources inside their borders. When researchers like us collect abroad, we ask permission first, and I do not think the principle changes because the collector is a hobbyist. At the same time, the word biopiracy needs some care. Most ant buyers today are hobbyists who want to keep and collect, and that is not the same as patenting another country's genetic resources.",
    },
    { type: "heading", text: "What a ban would cost", level: 2 },
    {
      type: "paragraph",
      text: "Zhengyang Wang studies the relationship between insects and people, and he was the other interviewee in the RFI piece. His position sounds contradictory at first: from the point of view of ecological threat, he said, he personally thinks the ant trade should be banned. He then explained why he still would not support a blanket ban.",
    },
    {
      type: "paragraph",
      text: "First, ants keep teaching. In China, many kindergartens and elementary schools keep an ant colony behind glass, and for many children it is their first close look at a living society. Some of those children grow into people who care about insects and about nature. Second, trade supports livelihoods. Where collection is legal and does not harm local populations, selling insects is an income, and many people around the world live on it. Third, the interest itself is worth something. The finding that surprised us most in the 2023 study was how many people love insects. We had assumed that almost nobody outside our field cared, and the data showed us we were wrong.",
    },
    {
      type: "paragraph",
      text: "His practical advice for hobbyists is also the middle path: keep local species. A native ant from your own neighborhood is nearly risk-free to raise, and nobody needs a queen from Kenya. In his words, we should not turn a good thing into a dangerous one.",
    },
    { type: "heading", text: "Where I land", level: 2 },
    {
      type: "paragraph",
      text: "So should the trade be banned? My answer at the end of the interview is the same as my answer here: a ban alone solves the wrong problem, and no rules at all is how we get the next fire ant.",
    },
    {
      type: "paragraph",
      text: "At SOS we organize our work in three layers: meaning, pattern, and mechanism. The ant trade splits along the same lines. The meaning question is why a small creature in a test tube can hold a child's attention, and what that attention is worth. The pattern question is what the trade data show: who buys, which species move, where the risk concentrates. The mechanism question is what removing a keystone species does to a savanna, and what an escaped colony does to a new continent. A workable policy has to answer all three. That means monitoring the trade openly instead of pushing it underground, respecting source countries' rights over their own species, and using education to steer the hobby toward local species.",
    },
    {
      type: "paragraph",
      text: "This is the kind of problem SOS was set up for, where the science, the economics, and people's attachment to nature have to be handled together. I am grateful to RFI for giving insects space that environment reporting usually reserves for large mammals, and to Zhengyang Wang for keeping both sides of the question honest.",
    },
    { type: "divider" },
    {
      type: "paragraph",
      text: "<em>The full interview (in Chinese) appeared in RFI's</em> Environment and Development <em>column on June 5, 2026:</em> <a href=\"https://www.rfi.fr/cn/%E4%B8%93%E6%A0%8F%E6%A3%80%E7%B4%A2/%E7%8E%AF%E5%A2%83%E4%B8%8E%E5%8F%91%E5%B1%95/20260605-%E4%B8%93%E5%AE%B6%E8%B0%88%E6%98%AF%E5%90%A6%E5%BA%94%E8%AF%A5%E7%A6%81%E6%AD%A2%E8%9A%82%E8%9A%81%E4%B9%B0%E5%8D%96\" target=\"_blank\" rel=\"noopener noreferrer\">专家谈是否应该禁止蚂蚁买卖 (RFI 中文)</a>",
    },
    {
      type: "paragraph",
      text: "<em>The study discussed:</em> Wang et al. (2023), <a href=\"https://www.sciencedirect.com/science/article/pii/S0006320723001398\" target=\"_blank\" rel=\"noopener noreferrer\">Monitoring the online ant trade reveals high biological invasion risk</a>, <em>Biological Conservation</em> 282, 110038.",
    },
  ],
};
