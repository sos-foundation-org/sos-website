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
      "Digital Naturalism is a free interactive app from SOS Education that maps three natural history journeys: Charles Darwin's voyage on HMS Beagle, Alfred Russel Wallace's travels in the Amazon and the Malay Archipelago, and E. O. Wilson's fieldwork. Students sail each route stop by stop, commit to their own explanation before seeing the naturalist's, and use today's tools such as GBIF and digitized museum specimens. It needs no account, works on phones and tablets, is available in English and Chinese, and includes lesson flows for teachers. Its motto: learn from the great voyages, learn the tools of today, keep learning from nature.",
  },
  {
    question: "What is bioinspiration, and what is the Internet of Bioinspiration (IoBI)?",
    answer:
      "Bioinspiration means understanding how evolved structures in nature can inform sustainable design and innovation. The Internet of Bioinspiration (IoBI) is part of the SOS Foundation's open knowledge infrastructure (Mechanism pillar): pipelines of large-scale digitization, imaging and spectral acquisition, and machine learning that translate natural systems into structured, computationally accessible data and connect biological patterns with engineering and design.",
  },
  {
    question: "What is the SOS Research Unit?",
    answer:
      "The SOS Research Unit is the research arm of the SOS Foundation, co-directed by Dr. Cong Liu and Dr. Wei-Ping Chan, working across ecology, evolutionary biology, data science, and AI. Its research themes are nature digitization and bioinspired translation; knowledge infrastructure and digital ecosystems; conservation and species decline; evolutionary biology and functional morphology; climate change and mountain ecosystems; and biosecurity and invasion biology. Its flagship projects include the Internet of Bioinspiration (IoBI) and Mountain Digital Twins (MDT).",
  },
  {
    question: "What is Map of the Unknown?",
    answer:
      "Map of the Unknown (formerly Discovery Commons) is an open research platform operated by the SOS Foundation — a shared map of what we do not yet understand, and where discovery can begin. A thoughtful question earns the same credit as a published result, and contributors of all backgrounds and education levels are welcome, from field naturalists to theoretical physicists and humanities scholars.",
  },
  {
    question: "What is Ecotone (兼容並續)?",
    answer:
      "Ecotone (兼容並續) is an interdisciplinary sustainability forum co-organized by National Taiwan University, National Yang Ming Chiao Tung University, and the SOS Foundation. Named after the zone where two ecosystems meet, each volume brings together speakers from different fields and countries. Vol. 01, \"Sustainable Urbanization? Rewilding?\", takes place on 16 November 2026 at NTU's Gongguan Campus in Taipei and 17 November 2026 at NYCU's Hsinchu Campus. Details and registration: https://sustainable-ecotone.vercel.app/en",
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
