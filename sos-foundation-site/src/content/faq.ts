// ─── Frequently asked questions ──────────────────────────────────────────────
// Rendered as the visible FAQ on the home page AND emitted as schema.org
// FAQPage JSON-LD, and copied into /llms.txt. Search engines and AI assistants
// quote these answers directly, so keep each answer self-contained: name SOS
// Foundation explicitly instead of saying "we", and lead with the fact.
//
// Answers are plain text (no HTML) — the same string is used everywhere.

export type Faq = { question: string; answer: string };

export const FAQS: Faq[] = [
  {
    question: "What is the SOS Foundation?",
    answer:
      "The Sustainability of Sustainability Foundation (SOS Foundation) is a 501(c)(3) public charity, founded in 2025, whose mission is sustaining humanity's ability to learn from nature. It works across research, education, and open knowledge infrastructure so that what nature teaches us is never lost.",
  },
  {
    question: "What does \"Sustainability of Sustainability\" mean?",
    answer:
      "Sustainability is not self-sustaining. The knowledge, cultural frameworks, and institutional capacity that make sustainable practices possible require deliberate investment. The SOS Foundation works on that underlying capacity — how sustainability is understood, communicated, and practiced — so that it persists and grows.",
  },
  {
    question: "How is the SOS Foundation's work organized?",
    answer:
      "SOS organizes its work around three interlocking pillars — Meaning (art and cultural language, e.g. Nature Salon), Pattern (digitization and natural patterns, e.g. the SOS Research Unit and Mountain Digital Twins), and Mechanism (knowledge systems and open infrastructure, e.g. Map of the Unknown and the Internet of Bioinspiration) — with SOS Education as a cross-cutting layer that connects them.",
  },
  {
    question: "What is Nature Salon?",
    answer:
      "Nature Salon is the SOS Foundation's sustainability dialogue for artists, scientists, and entrepreneurs. It sits in the Meaning pillar: through art, design, and conversation it gives sustainability a shared language that people feel before it is explained.",
  },
  {
    question: "What is Digital Naturalism?",
    answer:
      "Digital Naturalism is a featured SOS Education program. It brings the age of exploration to life by following three naturalists — Charles Darwin, Alfred Russel Wallace, and Edward O. Wilson — and then has students use modern tools to revisit their traces and digitize nature. Its motto: learn from the great voyages, learn the tools of today, keep learning from nature.",
  },
  {
    question: "What is bioinspiration, and what is the Internet of Bioinspiration (IoBI)?",
    answer:
      "Bioinspiration is learning from how evolved organisms solve problems to inform sustainable design and innovation. The Internet of Bioinspiration (IoBI) is an SOS project that turns natural collections — such as digitized insect specimens — into structured, computable, openly accessible knowledge for research, education, and bioinspired design.",
  },
  {
    question: "What is the SOS Research Unit?",
    answer:
      "The SOS Research Unit, co-directed by Dr. Cong Liu and Dr. Wei-Ping Chan, translates nature into adaptive futures through ecology, evolutionary biology, data science, and AI. Its work covers nature digitization, biodiversity and climate change biology, conservation genomics, morphology, and bioinspiration, including the IoBI and Mountain Digital Twins (MDT) projects.",
  },
  {
    question: "What is Map of the Unknown?",
    answer:
      "Map of the Unknown (formerly Discovery Commons) is an open research platform operated by the SOS Foundation — a shared map of what we do not yet understand about nature, where a thoughtful question earns the same credit as a published result.",
  },
  {
    question: "What is SOS Education?",
    answer:
      "SOS Education connects students and communities to real research. Its philosophy is that education should not end with learning but lead to real contributions. It has five tracks: Community & Communication, AI Skills, Digitize Nature, Mentored Research, and Real Contributions.",
  },
  {
    question: "How can I get involved with or support the SOS Foundation?",
    answer:
      "Artists, researchers, museums, educators, system builders, and funders can join at the layer where they contribute most via the Get Involved form on the SOS website. Donations to the SOS Foundation (EIN 41-3097632) are tax-deductible to the extent allowed by law.",
  },
];
