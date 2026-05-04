"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

// ─── Design tokens — identical to main site ──────────────────────────────────
const COLORS = {
  ink: "#1F2A33",
  bg: "#F5F7F6",
  blue: "#2F5D8A",
  green: "#3F8F6B",
  gold: "#E0B63E",
  art: "#5FA58B",
  data: "#2E9C9A",
  mech: "#C9A23A",
};

const DARK_BG = "#081824";

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const y = el.getBoundingClientRect().top + window.scrollY - 84;
  window.scrollTo({ top: y, behavior: "smooth" });
}

// Same Pill component as main site
function Pill({ label, color }: { label: string; color: string }) {
  return (
    <span
      className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium"
      style={{ background: "rgba(47,93,138,0.08)", color }}
    >
      {label}
    </span>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const DIRECTORS = [
  {
    name: "Cong Liu",
    title: "Research Director, SOS Research Unit",
    affiliation: "Associate at Museum of Comparative Zoology, Harvard University",
    role: "Entomologist · AI Scientist · Sustainability Advocate",
    phd: "Ph.D. Ecology and Evolution — OIST (2018)",
    bio: "Cong Liu brings deep domain expertise in ant systematics, conservation genomics, and biosecurity, combined with industry-grade AI and data science capabilities from the pharmaceutical sector. His work spans three continents, 15+ years of research experience, and 34+ peer-reviewed publications.",
    metrics: [
      { label: "Publications", value: "34+" },
      { label: "Citations", value: "800+" },
      { label: "Experience", value: "15+ yrs" },
      { label: "Fieldwork", value: "3 continents" },
    ],
    themes: ["Ant Systematics", "Conservation Genomics", "Macroevolution", "AI for medical and pharmaceutical applications"],
    website: "https://personal-website-chi-dusky.vercel.app/",
    photo: "/pics/Cong.jpg",
    photoAlt: "Cong Liu",
    accentColor: COLORS.data,
  },
  {
    name: "Wei-Ping Chan",
    title: "Research Director, SOS Research Unit",
    affiliation: "Associate at Department of Organismic and Evolutionary Biology, Harvard University",
    role: "Exploratory Data Scientist · Interdisciplinary Researcher",
    phd: "Ph.D. Organismic and Evolutionary Biology — Harvard (2023)",
    bio: "Wei-Ping Chan is an interdisciplinary researcher working across high-throughput imaging, physics-informed ecological modeling, and causal inference, with expertise in Lepidoptera biology and climate–biodiversity systems. His work integrates biological observation with data-driven analysis across scales and domains.",
    metrics: [
      { label: "Publications", value: "6+" },
      { label: "High-impact journals", value: "Nature, Science" },
      { label: "Experience", value: "15+ yrs" },
      { label: "Key projects", value: "4 major" },
    ],
    themes: ["Nature Digitization & AI", "Climate Change Biology", "Morphological quantification", "Bioinspirations"],
    website: "https://wpchanwork.github.io/wei-ping_chan/home.html",
    // PLACEHOLDER: 期待放 Wei-Ping Chan 的個人照或實驗室工作照（建議：影像系統或蝴蝶標本場景）
    photo: "/pics/Wei-Ping.jpg",
    photoAlt: "Wei-Ping Chan",
    accentColor: COLORS.art,
  },
];

const THEMES = [
  {
    number: "01",
    title: "Nature Digitization & Bioinspired Translation",
    type: "Overlap" as const,
    color: COLORS.data,
    // PLACEHOLDER: 期待放標本掃描、高通量影像設備，或螞蟻/蝴蝶標本的微距照片
    photo: "/pics/IoBI.png",
    description:
      "Developing integrated pipelines that translate natural systems into structured, computationally accessible data and extend them into real-world applications. This includes large-scale digitization workflows, imaging and spectral acquisition, and the use of machine learning to enable the Internet of Bioinspiration (IoBI). These pipelines further support the discovery and prototyping of bioinspired materials and structures by connecting biological patterns with engineering and design contexts.",
    liu: "AI/ML pipelines for ant morphology (Nature Methods, 2026)",
    chan: "Multispectral imaging systems for Lepidoptera (Comms Bio, 2022); BioMuse-X for bioinspired materials (2022–2025)",
  },
  {
    number: "02",
    title: "Knowledge Infrastructure & Digital Ecosystems",
    type: "Overlap" as const,
    color: COLORS.data,
    // PLACEHOLDER: 期待放自然史標本館、標本排列，或資料視覺化截圖
    photo: "/pics/digital_moths.png",
    description:
      "Building data infrastructures that connect biological observations, environmental context, and computational models across scales. This includes standardized data collection pipelines and curated biodiversity databases — alongside Mountain Digital Twins (MDT), one of our flagship projects that creates integrated, multi-layer representations of mountain ecosystems by linking biotic and abiotic data. Together, these digital ecosystems enable repeatable analyses, interoperable datasets, and long-term monitoring frameworks supporting both fundamental research and conservation.",
    liu: "GABI-I: Global Ant Biodiversity Informatics (Ecology, 2023)",
    chan: "Climate velocity datasets for global mountains (Nature, 2024)",
  },
  {
    number: "03",
    title: "Conservation & Species Decline",
    type: "Overlap" as const,
    color: COLORS.art,
    // PLACEHOLDER: 期待放物種保育、野外族群調查，或受威脅昆蟲的照片
    photo: "/pics/light_trap.JPG",
    description:
      "Insects are declining globally, yet causes and trajectories remain poorly resolved. This theme takes a multi-evidence approach — combining population genomics with long-term behavioral and light-trap time series to track changes in abundance and community composition, integrating molecular, observational, and ecological data to disentangle the roles of habitat loss, climate change, and chemical pollution.",
    liu: "Museum genomics detecting endemic decline (Science, 2025)",
    chan: "Long-term behavioral datasets tracking decline (Proc R Soc B, 2025)",
  },
  {
    number: "04",
    title: "Evolutionary Biology & Functional Morphology",
    type: "Overlap" as const,
    color: COLORS.art,
    // PLACEHOLDER: 期待放蝴蝶翅膀微距、昆蟲形態特寫，或演化形態學研究的影像
    photo: "/pics/20250506_150401.JPG",
    description:
      "Eco-evolutionary perspectives on mutualism and dispersal combined with deep morphological expertise — converging on bioinspiration and understanding how evolved structures inform sustainable design.",
    liu: "Coevolution of mutualisms (PNAS, 2025)",
    chan: "One in five butterfly species sold online (Biological Conservation, 2023)",
  },
  {
    number: "05",
    title: "Climate Change & Mountain Ecosystems",
    type: "Complementary" as const,
    color: COLORS.blue,
    // PLACEHOLDER: 期待放山地景觀、氣候調查野外場景，或物種分布地圖
    photo: "/pics/drought-1.jpg",
    description:
      "Climate velocity frameworks and environmental variability models applied to biodiversity datasets to predict community turnover under future climate scenarios and mountain ecosystem shifts.",

    chan: "Climate velocity in mountains (Nature, 2024); range size (Science, 2016)",
  },
  {
    number: "06",
    title: "Biosecurity & Invasion Biology",
    type: "Complementary" as const,
    color: COLORS.mech,
    // PLACEHOLDER: 期待放入侵種昆蟲、電商平台截圖，或邊境入侵風險相關的野外照片
    photo: "/pics/ants.JPG",
    description:
      "Monitoring online wildlife trade platforms to quantify the movement of non-native species and assess invasion risk pathways. This work develops surveillance frameworks for detecting high-risk organisms in e-commerce networks before they establish in new environments — combining large-scale data scraping, species identification, and risk modelling.",
    liu: "Monitoring online ant trade reveals high invasion risk (Biological Conservation, 2023)",
  },
];

// Six flagship publications shown as visual cards in the Overview section.
// TODO: Replace url "#" with the actual DOI link for each paper.
const FEATURED_PUBS = [
  {
    id: "fp1",
    title: "Climate velocities and species tracking in global mountain regions",
    journal: "Nature",
    year: 2024,
    authors: "Chan WP, et al.",
    journalColor: COLORS.mech,
    photo: "/pics/work.JPG",
    url: "https://rdcu.be/fgA5H",
  },
  {
    id: "fp2",
    title: "Genomic signatures indicate biodiversity loss in an endemic island ant fauna",
    journal: "Science",
    year: 2025,
    authors: "Liu C, et al.",
    journalColor: COLORS.mech,
    photo: "/pics/island-ant-communities.jpg",
    url: "https://www.science.org/doi/abs/10.1126/science.ads3004",
  },
  {
    id: "fp3",
    title: "Seasonal and daily climate variation have opposite effects on species elevational range size",
    journal: "Science",
    year: 2016,
    authors: "Chan WP, et al.",
    journalColor: COLORS.mech,
    photo: "/pics/rng_sz-2.jpg",
    url: "https://www.science.org/doi/abs/10.1126/science.aab4119",
  },
  {
    id: "fp4",
    title: "Partner dependency alters patterns of coevolutionary selection in mutualisms",
    journal: "PNAS",
    year: 2025,
    authors: "Vidal MC, Liu C, et al.",
    journalColor: COLORS.mech,
    photo: "/pics/pnas.2424983122fig01.jpg",
    url: "https://www.pnas.org/doi/abs/10.1073/pnas.2424983122",
  },
  {
    id: "fp6",
    title: "A high-throughput multispectral imaging system for museum specimens",
    journal: "Communications Biology",
    year: 2022,
    authors: "Chan WP, et al.",
    journalColor: COLORS.mech,
    photo: "/pics/high-throughput_system-1.png",
    url: "https://rdcu.be/fgA9y",
  },
  {
    id: "fp5",
    title: "GABI-I: The global ant biodiversity informatics-island database",
    journal: "Ecology",
    year: 2023,
    authors: "Liu C, et al.",
    journalColor: COLORS.mech,
    photo: "/pics/okinawa-5.jpg",
    url: "https://esajournals.onlinelibrary.wiley.com/share/AQSJAPSWMEXFGWHFTNW7?target=10.1002/ecy.3969",
  },

];

const PUBLICATIONS: Array<{
  year: number;
  entries: Array<{ id: number; authors: string; title: string; journal: string; bold: string }>;
}> = [
  {
    year: 2026,
    entries: [
      {
        id: 1,
        authors: "Katzke J, …, Liu C, et al.",
        title: "High-throughput phenomics of global ant biodiversity",
        journal: "Nature Methods",
        bold: "Liu C",
      },
    ],
  },
  {
    year: 2025,
    entries: [
      {
        id: 2,
        authors: "Liu C, et al.",
        title: "Genomic signatures indicate massive decline of endemic island insects",
        journal: "Science",
        bold: "Liu C",
      },
      {
        id: 3,
        authors: "Vidal MC, Liu C, et al.",
        title: "Partner dependency alters patterns of coevolutionary selection in mutualisms",
        journal: "PNAS",
        bold: "Liu C",
      },
      {
        id: 4,
        authors: "Liu C & Vidal MC",
        title: "Dispersal promotes stability of exploited mutualisms",
        journal: "ISME Journal",
        bold: "Liu C",
      },
      {
        id: 5,
        authors: "Chan WP, et al.",
        title: "Historical behavioural data disentangle evolutionary and environmental drivers of recent declines in insect attraction to light",
        journal: "Proceedings of the Royal Society B",
        bold: "Chan WP",
      },
      {
        id: 6,
        authors: "Lin PA, Chan WP (co-first), et al.",
        title: "Coevolution of Lepidoptera and their host plants: The salient aroma hypothesis",
        journal: "Proceedings of the Royal Society B",
        bold: "Chan WP",
      },
    ],
  },
  {
    year: 2024,
    entries: [
      {
        id: 7,
        authors: "Chan WP, et al.",
        title: "Climate velocities and species tracking in global mountain regions",
        journal: "Nature",
        bold: "Chan WP",
      },
    ],
  },
  {
    year: 2023,
    entries: [
      {
        id: 8,
        authors: "Liu C, et al.",
        title: "GABI-I: Global ant biodiversity informatics",
        journal: "Ecology",
        bold: "Liu C",
      },
      {
        id: 9,
        authors: "Wang Z, …, Liu C, et al.",
        title: "Monitoring online ant trade reveals high invasion risk",
        journal: "Biological Conservation",
        bold: "Liu C",
      },
      {
        id: 10,
        authors: "Wang Z, Chan WP (co-first), et al.",
        title: "One in five butterfly species sold online across borders",
        journal: "Biological Conservation",
        bold: "Chan WP",
      },
    ],
  },
  {
    year: 2022,
    entries: [
      {
        id: 11,
        authors: "Chan WP, et al.",
        title: "A high-throughput multispectral imaging system for museum specimens",
        journal: "Communications Biology",
        bold: "Chan WP",
      },
    ],
  },
  {
    year: 2016,
    entries: [
      {
        id: 12,
        authors: "Chan WP, et al.",
        title: "Seasonal and daily climate variation have opposite effects on species elevational range size",
        journal: "Science",
        bold: "Chan WP",
      },
    ],
  },
];

// ─── Page ──────────────────────────────────────────────────────────────────────

export default function ResearchPage() {
  const [pubsExpanded, setPubsExpanded] = useState(false);

  return (
    <div className="min-h-screen" style={{ background: DARK_BG }}>
      {/* Background grid overlay — identical to main site */}
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(31,42,51,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(31,42,51,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          maskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 18%, black 0%, transparent 62%)",
        }}
      />

      <div className="relative z-10">
        {/* ── Header — same glassmorphism as main site ─────────────────── */}
        <header
          className="sticky top-0 z-50 backdrop-blur-xl"
          style={{ background: "rgba(245,247,246,0.72)", borderBottom: "1px solid rgba(31,42,51,0.08)" }}
        >
          <div className="mx-auto max-w-6xl px-5 py-3 flex items-center justify-between gap-4">
            {/* Logo + title */}
            <div className="flex items-center gap-3 shrink-0">
              <a href="/" className="h-9 w-9 rounded-2xl overflow-hidden hover:opacity-80 transition-opacity">
                <img src="/logo/SOS-LOGO_v3-icon.svg" alt="SOS Foundation Logo" className="h-full w-full object-cover" />
              </a>
              <div className="leading-tight">
                <div className="text-m font-semibold" style={{ color: COLORS.ink }}>
                  Sustainability of Sustainability
                </div>
                <div className="text-s" style={{ color: "rgba(31,42,51,0.55)" }}>
                  Research Unit
                </div>
              </div>
            </div>

            {/* Internal scroll nav */}
            <nav className="hidden md:flex items-center gap-5 text-sm" style={{ color: "rgba(31,42,51,0.75)" }}>
              <button className="text-m cursor-pointer transition-all hover:opacity-80 hover:scale-105 active:scale-95" onClick={() => scrollToId("overview")}>Overview</button>
              <button className="text-m cursor-pointer transition-all hover:opacity-80 hover:scale-105 active:scale-95" onClick={() => scrollToId("directors")}>Directors</button>
              <button className="text-m cursor-pointer transition-all hover:opacity-80 hover:scale-105 active:scale-95" onClick={() => scrollToId("themes")}>Research</button>
              <button className="text-m cursor-pointer transition-all hover:opacity-80 hover:scale-105 active:scale-95" onClick={() => scrollToId("publications")}>Publications</button>
              <button className="text-m cursor-pointer transition-all hover:opacity-80 hover:scale-105 active:scale-95" onClick={() => scrollToId("contact")}>Contact</button>
            </nav>

            {/* Back link */}
            <div className="flex items-center gap-2 shrink-0">
              <a
                href="/"
                className="hidden md:inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-85 shrink-0"
                style={{ background: COLORS.blue }}
              >
                <ArrowLeft size={14} /> SOS Foundation
              </a>
            </div>
          </div>
        </header>

        <main>
          {/* ── Hero ─────────────────────────────────────────────────────── */}
          <section className="relative w-full min-h-[100svh] md:min-h-[100vh] flex items-center justify-center overflow-hidden">
            <img
              src="/pics/mountains.jpg"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              style={{ objectPosition: "center bottom" }}
              decoding="async"
            />
            <div className="absolute inset-0" style={{ background: "rgba(8,24,36,0.82)" }} />

            <div className="relative z-10 mx-auto w-full max-w-4xl px-5 text-center -translate-y-6 md:-translate-y-10">
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <img
                  src="/logo/SOS-LOGO_v2-for_SVG.svg"
                  alt="SOS Foundation"
                  className="mx-auto h-12 w-28 opacity-100"
                  style={{
                    filter: "brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(0%) hue-rotate(0deg)",
                  }}
                />
                <div className="mt-2 text-xs font-medium tracking-wide" style={{ color: "rgba(255,255,255,0.60)" }}>
                  Sustainability of Sustainability Foundation
                </div>

                <h1 className="mt-8 text-5xl md:text-6xl font-semibold tracking-tight text-white">
                  SOS Research Unit
                </h1>
                <p className="mt-5 text-xl md:text-2xl leading-relaxed" style={{ color: COLORS.mech }}>
                  Translating nature into adaptive futures
                </p>

                <div className="mt-8 flex flex-wrap justify-center gap-3">
                  {["SOS Foundation", "40+ Publications", "800+ Citations"].map((badge) => (
                    <span
                      key={badge}
                      className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-white/80"
                    >
                      {badge}
                    </span>
                  ))}
                </div>

                <div className="mt-10 flex flex-wrap justify-center gap-3">
                  <button
                    onClick={() => scrollToId("directors")}
                    className="inline-flex items-center gap-2 rounded-2xl px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 cursor-pointer hover:scale-105 hover:brightness-110 active:scale-[0.97]"
                    style={{ background: COLORS.blue }}
                  >
                    Meet the Directors <ArrowRight size={16} />
                  </button>
                  <button
                    onClick={() => scrollToId("publications")}
                    className="inline-flex items-center gap-2 rounded-2xl border border-white/20 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 cursor-pointer hover:scale-105 hover:bg-white/10 active:scale-[0.97] backdrop-blur-sm"
                  >
                    View Publications
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── Overview ─────────────────────────────────────────────────── */}
          <section id="overview" className="mx-auto max-w-6xl px-5 pt-8 pb-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: "some" }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* Main text card — full width */}
              <div
                className="rounded-3xl border p-6 md:p-10"
                style={{ borderColor: "rgba(31,42,51,0.10)", background: "rgba(245,247,246,0.92)" }}
              >
                <Pill label="Overview" color={COLORS.blue} />
                <h2 className="mt-4 text-2xl md:text-3xl font-semibold" style={{ color: COLORS.ink }}>
                  Who we are
                </h2>
                <p className="mt-4 text-base md:text-lg leading-relaxed" style={{ color: "rgba(31,42,51,0.78)" }}>
                  The Research Unit of the Sustainability of Sustainability Foundation (SOS) is co-directed by Cong Liu and Wei-Ping Chan, two <strong className="font-semibold" style={{ color: COLORS.ink }}>interdisciplinary scientists</strong> working across <strong className="font-semibold" style={{ color: COLORS.ink }}>ecology, evolutionary biology, data science, and artificial intelligence</strong>.
                </p>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(31,42,51,0.72)" }}>
                  The unit focuses on translating biological, computational, and social systems to enable more <strong className="font-semibold" style={{ color: COLORS.ink }}>adaptive and resilient approaches to sustainability</strong>. Rather than optimizing for fixed outcomes, its research explores how knowledge from natural systems can be structured, interpreted, and <strong className="font-semibold" style={{ color: COLORS.ink }}>applied across domains under conditions of uncertainty</strong>.
                </p>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(31,42,51,0.72)" }}>
                  To support this, the unit develops <strong className="font-semibold" style={{ color: COLORS.ink }}>integrated pipelines</strong> that combine diverse hardware systems, data acquisition processes, and machine learning methods to capture and analyze nature at scale. These workflows span data collection through automated analysis, forming the foundation for <strong className="font-semibold" style={{ color: COLORS.ink }}>phenomics and large-scale nature digitization</strong>.
                </p>
                <p className="mt-4 text-base leading-relaxed" style={{ color: "rgba(31,42,51,0.72)" }}>
                  By linking physical environments, data infrastructure, and analytical models, the unit works to transform nature collections and field observations into <strong className="font-semibold" style={{ color: COLORS.ink }}>structured, accessible knowledge</strong>. This enables new forms of cross-domain application: <strong className="font-semibold" style={{ color: COLORS.ink }}>conservation, bioinspired design</strong>, and beyond.
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {["Internet of Bioinspiration (IoBI)", "Mountain Digital Twins (MDT)"].map((proj) => (
                    <span
                      key={proj}
                      className="rounded-full border px-3 py-1 text-xs font-medium"
                      style={{ borderColor: "rgba(47,93,138,0.28)", color: COLORS.blue, background: "rgba(47,93,138,0.06)" }}
                    >
                      {proj}
                    </span>
                  ))}
                </div>
              </div>

              {/* Featured publications — 6 flagship papers */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {FEATURED_PUBS.map((pub) => (
                  <a
                    key={pub.id}
                    href={pub.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-3xl overflow-hidden border flex flex-col group transition-opacity hover:opacity-90"
                    style={{ borderColor: "rgba(255,255,255,0.06)" }}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden shrink-0">
                      <img
                        src={pub.photo}
                        alt={pub.title}
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div
                        className="absolute inset-0"
                        style={{ background: "linear-gradient(180deg, rgba(8,24,36,0.10) 0%, rgba(8,24,36,0.75) 100%)" }}
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className="rounded-full px-2.5 py-1 text-[10px] font-semibold"
                          style={{ background: "rgba(8,24,36,0.80)", color: pub.journalColor, backdropFilter: "blur(4px)" }}
                        >
                          {pub.journal} · {pub.year}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div
                      className="p-4 flex flex-col gap-2 flex-1"
                      style={{ background: "rgba(31,42,51,0.92)" }}
                    >
                      <div className="text-xs font-semibold text-white leading-snug">{pub.title}</div>
                      <div className="text-[11px] text-white/45">{pub.authors}</div>
                      <div
                        className="mt-auto flex items-center gap-1 text-[11px] font-medium"
                        style={{ color: pub.journalColor }}
                      >
                        Read paper <ExternalLink size={10} />
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              {/* Photo strip */}
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    src: "/pics/borneo-2.jpg",
                    label: "Field work",
                  },
                  {
                    src: "/pics/DSC_1037.JPG",
                    label: "Lab work",
                  },
                  {
                    src: "/pics/high-school_talk.jpg",
                    label: "Education & outreach",
                  },
                ].map((img) => (
                  <div
                    key={img.src}
                    className="relative rounded-2xl overflow-hidden aspect-[3/2]"
                  >
                    <img
                      src={img.src}
                      alt={img.label}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{ background: "rgba(8,24,36,0.42)" }}
                    />
                    <div className="absolute bottom-3 left-4 text-sm font-medium text-white/80">
                      {img.label}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* Divider */}
          <div className="mx-auto max-w-6xl px-5">
            <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* ── Directors ────────────────────────────────────────────────── */}
          <section id="directors" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Pill label="Research Directors" color={COLORS.data} />
              <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-white">
                Meet the Research Directors
              </h2>
              <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
                Overlapping yet complementary — spanning hardware, field collection, lab work, software development, AI-driven analysis, and real-world application.
              </p>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
              {DIRECTORS.map((d, i) => (
                <motion.div
                  key={d.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.12 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{ borderColor: "rgba(255,255,255,0.06)" }}
                >
                  {/* Portrait photo */}
                  <div className="relative aspect-[3/4] overflow-hidden shrink-0">
                    <img
                      src={d.photo}
                      alt={d.photoAlt}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(8,24,36,0.0) 40%, rgba(8,24,36,0.92) 100%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6">
                      <div className="text-2xl font-semibold text-white">{d.name}</div>
                      <div className="text-sm mt-1 font-medium" style={{ color: COLORS.gold }}>
                        {d.title}
                      </div>
                      <div className="text-xs mt-0.5 text-white/55">{d.affiliation}</div>
                    </div>
                  </div>

                  {/* Minimal content */}
                  <div
                    className="p-5 md:p-6 flex flex-col gap-4"
                    style={{ background: "rgba(31,42,51,0.92)" }}
                  >
                    {/* Research focus tags */}
                    <div>
                      <div className="text-[10px] font-medium tracking-wide text-white/40 uppercase mb-2">
                        Research focus
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {d.themes.map((t) => (
                          <span
                            key={t}
                            className="rounded-full border px-2.5 py-1 text-[11px] text-white/70"
                            style={{
                              borderColor: "rgba(255,255,255,0.10)",
                              background: "rgba(255,255,255,0.04)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                    <a
                      href={d.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80 self-start"
                      style={{ background: COLORS.blue }}
                    >
                      Personal Website <ExternalLink size={13} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="mx-auto max-w-6xl px-5">
            <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* ── Research Themes ──────────────────────────────────────────── */}
          <section id="themes" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 flex-wrap"
            >
              <div>
                <Pill label="7 Research Themes" color={COLORS.mech} />
                <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-white">What we study</h2>
                <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
                  Four overlapping themes where both directors contribute, and three complementary areas.
                </p>
              </div>
              {/* Legend */}
              <div className="flex gap-3 shrink-0">
                {[
                  { label: "Overlap", color: COLORS.data },
                  { label: "Complementary", color: COLORS.blue },
                ].map((leg) => (
                  <span
                    key={leg.label}
                    className="inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs text-white/60"
                    style={{ borderColor: "rgba(255,255,255,0.10)" }}
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full shrink-0"
                      style={{ background: leg.color }}
                    />
                    {leg.label}
                  </span>
                ))}
              </div>
            </motion.div>

            <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {THEMES.map((theme, i) => (
                <motion.div
                  key={theme.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.1 }}
                  transition={{ duration: 0.55, ease: "easeOut", delay: (i % 3) * 0.08 }}
                  className="rounded-3xl overflow-hidden border flex flex-col"
                  style={{
                    borderColor: "rgba(255,255,255,0.06)",
                  }}
                >
                  {/* Photo header */}
                  <div className="relative aspect-[16/7] overflow-hidden shrink-0">
                    <img
                      src={theme.photo}
                      alt={theme.title}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                    <div
                      className="absolute inset-0"
                      style={{
                        background:
                          "linear-gradient(180deg, rgba(8,24,36,0.15) 0%, rgba(8,24,36,0.80) 100%)",
                      }}
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-3 flex items-end justify-between gap-2">
                      <div
                        className="text-3xl font-semibold leading-none"
                        style={{ color: theme.color, opacity: 0.55 }}
                      >
                        {theme.number}
                      </div>
                      <span
                        className="rounded-full px-2.5 py-1 text-[10px] font-medium shrink-0"
                        style={{ background: "rgba(8,24,36,0.80)", color: theme.color, backdropFilter: "blur(4px)" }}
                      >
                        {theme.type}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="p-5 flex flex-col gap-4 flex-1"
                    style={{ background: "rgba(31,42,51,0.92)" }}
                  >
                    <h3 className="text-base font-semibold leading-snug text-white">{theme.title}</h3>
                    <p className="text-sm leading-relaxed text-white/60 flex-1">{theme.description}</p>

                    {/* Contributions */}
                    <div
                      className="pt-4 border-t space-y-1.5"
                      style={{ borderColor: "rgba(255,255,255,0.06)" }}
                    >
                      <div className="text-[10px] font-medium tracking-wide text-white/30 uppercase mb-2">
                        Contributions
                      </div>
                      {theme.liu && (
                        <div className="flex items-start gap-2">
                          <span
                            className="text-[10px] font-semibold shrink-0 mt-0.5 w-7"
                            style={{ color: COLORS.data }}
                          >
                            Liu
                          </span>
                          <span className="text-xs text-white/55 leading-snug">{theme.liu}</span>
                        </div>
                      )}
                      {theme.chan && (
                        <div className="flex items-start gap-2">
                          <span
                            className="text-[10px] font-semibold shrink-0 mt-0.5 w-7"
                            style={{ color: COLORS.art }}
                          >
                            Chan
                          </span>
                          <span className="text-xs text-white/55 leading-snug">{theme.chan}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* Divider */}
          <div className="mx-auto max-w-6xl px-5">
            <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* ── Publications ─────────────────────────────────────────────── */}
          <section id="publications" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Pill label="Selected Publications" color={COLORS.gold} />
              <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-white">
                Publication record
              </h2>
              <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
                Co-director names appear in bold. Full lists on personal websites.
              </p>
            </motion.div>

            {(() => {
              const HIGHLIGHT_JOURNALS = new Set(["Nature", "Science", "Nature Methods", "PNAS", "Communications Biology"]);
              const JOURNAL_COLOR: Record<string, string> = {
                "Nature": COLORS.data,
                "Science": COLORS.data,
                "Nature Methods": COLORS.data,
                "PNAS": COLORS.data,
                "Communications Biology": COLORS.data,
              };
              const allPubs = PUBLICATIONS.flatMap((g) =>
                g.entries.map((e) => ({ ...e, year: g.year }))
              );
              const highlighted = allPubs.filter((p) => HIGHLIGHT_JOURNALS.has(p.journal));
              const total = allPubs.length;

              return (
                <div
                  className="mt-10 rounded-3xl border p-6 md:p-8"
                  style={{ borderColor: "rgba(31,42,51,0.10)", background: "rgba(245,247,246,0.92)" }}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {pubsExpanded ? (
                      <motion.div
                        key="full"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                      >
                        {PUBLICATIONS.map((group, gi) => (
                          <div
                            key={group.year}
                            className={gi > 0 ? "mt-8 pt-8 border-t" : ""}
                            style={{ borderColor: "rgba(31,42,51,0.08)" }}
                          >
                            <div
                              className="inline-block rounded-full px-3 py-1 text-xs font-semibold mb-4"
                              style={{ background: `${COLORS.blue}14`, color: COLORS.blue }}
                            >
                              {group.year}
                            </div>
                            <ol className="space-y-4">
                              {group.entries.map((pub) => (
                                <li key={pub.id} className="flex gap-4 items-start">
                                  <span
                                    className="text-xs font-medium shrink-0 mt-0.5 w-5 text-right tabular-nums"
                                    style={{ color: "rgba(31,42,51,0.30)" }}
                                  >
                                    {pub.id}.
                                  </span>
                                  <div
                                    className="text-sm leading-relaxed"
                                    style={{ color: "rgba(31,42,51,0.78)" }}
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        pub.authors.replace(
                                          new RegExp(pub.bold.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
                                          `<strong style="color:${COLORS.ink};font-weight:600">${pub.bold}</strong>`
                                        ) +
                                        ` (${group.year}). ${pub.title}. <em style="color:${COLORS.blue}">${pub.journal}</em>.`,
                                    }}
                                  />
                                </li>
                              ))}
                            </ol>
                          </div>
                        ))}
                      </motion.div>
                    ) : (
                      <motion.ol
                        key="highlighted"
                        className="space-y-3"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22, ease: "easeOut" }}
                      >
                        {highlighted.map((pub) => {
                          const jColor = JOURNAL_COLOR[pub.journal] ?? COLORS.blue;
                          return (
                            <li key={pub.id} className="flex items-start gap-3">
                              <span
                                className="shrink-0 mt-0.5 rounded-full px-2.5 py-0.5 text-xs font-bold whitespace-nowrap text-center"
                                style={{ background: `${jColor}18`, color: jColor, minWidth: "9.5rem" }}
                              >
                                {pub.journal}
                              </span>
                              <div
                                className="text-sm leading-relaxed"
                                style={{ color: "rgba(31,42,51,0.78)" }}
                                dangerouslySetInnerHTML={{
                                  __html:
                                    pub.authors.replace(
                                      new RegExp(pub.bold.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "g"),
                                      `<strong style="color:${COLORS.ink};font-weight:600">${pub.bold}</strong>`
                                    ) + ` (${pub.year}). ${pub.title}.`,
                                }}
                              />
                            </li>
                          );
                        })}
                      </motion.ol>
                    )}
                  </AnimatePresence>

                  <div
                    className="mt-5 pt-4 border-t flex items-center justify-between gap-3 flex-wrap"
                    style={{ borderColor: "rgba(31,42,51,0.08)" }}
                  >
                    <span className="text-xs" style={{ color: "rgba(31,42,51,0.40)" }}>
                      {pubsExpanded
                        ? `${total} publications total · all journals`
                        : `Showing ${highlighted.length} of ${total} · highlighted journals only`}
                    </span>
                    <button
                      onClick={() => setPubsExpanded((prev) => !prev)}
                      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium transition-opacity hover:opacity-80"
                      style={{ background: `${COLORS.blue}14`, color: COLORS.blue }}
                    >
                      {pubsExpanded ? "Collapse" : "Show full list"}
                      <motion.span
                        animate={{ rotate: pubsExpanded ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="inline-block leading-none text-xs"
                      >
                        ↓
                      </motion.span>
                    </button>
                  </div>
                </div>
              );
            })()}
          </section>

          {/* Divider */}
          <div className="mx-auto max-w-6xl px-5">
            <div className="h-px w-full" style={{ background: "rgba(255,255,255,0.06)" }} />
          </div>

          {/* ── Contact ──────────────────────────────────────────────────── */}
          <section id="contact" className="mx-auto max-w-6xl px-5 py-20 md:py-28">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Pill label="Contact" color={COLORS.art} />
              <h2 className="mt-4 text-2xl md:text-4xl font-semibold text-white">
                Prospective Students &amp; Collaborators
              </h2>
              <p className="mt-3 text-base" style={{ color: "rgba(255,255,255,0.55)" }}>
                We welcome inquiries from students and researchers at all career stages.
              </p>
            </motion.div>

            {/* SOS CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-10 rounded-3xl border p-6 md:p-10 flex flex-col md:flex-row gap-8 md:items-start"
              style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(31,42,51,0.92)" }}
            >
              <div className="flex items-start gap-4 flex-1">
                <div className="h-10 w-10 rounded-2xl overflow-hidden shrink-0">
                  <img src="/logo/SOS-LOGO_v3-icon.svg" alt="SOS Foundation" className="h-full w-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="text-base font-semibold text-white">SOS Research Unit</div>
                  <div className="text-xs text-white/45 mt-0.5">Sustainability of Sustainability Foundation</div>
                  <p className="mt-3 text-sm text-white/65 leading-relaxed">
                    We are open to collaboration with students and researchers interested in biodiversity
                    informatics, digitization, climate–biodiversity dynamics, evolutionary
                    morphology, and bioinspiration. Inquiries are welcome at all career stages —
                    from middle and high school through undergraduate, graduate, and postdoctoral.
                  </p>
                  <p className="mt-2 text-sm text-white/65 leading-relaxed">
                    Please reach out through the SOS Foundation main site, or directly through the
                    personal websites of the Research Directors.
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href="/"
                      className="inline-flex items-center gap-2 rounded-2xl px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
                      style={{ background: COLORS.blue }}
                    >
                      SOS Foundation <ArrowRight size={13} />
                    </a>
                    {/* {DIRECTORS.map((d) => (
                      <a
                        key={d.name}
                        href={d.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-80"
                      >
                        {d.name.split(" ")[0]}&apos;s website <ExternalLink size={13} />
                      </a>
                    ))} */}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Funding programs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mt-8"
            >
              <div className="text-sm font-medium text-white/50 mb-4 uppercase tracking-wide text-xs">
                Relevant funding programs
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  {
                    flag: "🇺🇸",
                    agency: "NSF",
                    full: "National Science Foundation",
                    country: "USA",
                    programs: "BIO, DEB, IOS, OISE",
                    url: "https://www.nsf.gov",
                  },
                  {
                    flag: "🇹🇼",
                    agency: "NSTC",
                    full: "National Science and Technology Council",
                    country: "Taiwan",
                    programs: "Postdoctoral Fellowships, Young Scholar",
                    url: "https://www.nstc.gov.tw",
                  },
                  {
                    flag: "🇯🇵",
                    agency: "JSPS",
                    full: "Japan Society for the Promotion of Science",
                    country: "Japan",
                    programs: "Postdoctoral Fellowships for Research in Japan",
                    url: "https://www.jsps.go.jp/english",
                  },
                  {
                    flag: "🇬🇧",
                    agency: "UKRI / BBSRC",
                    full: "UK Research and Innovation",
                    country: "United Kingdom",
                    programs: "Discovery Fellowships, Responsive Mode",
                    url: "https://www.ukri.org",
                  },
                  {
                    flag: "🇪🇺",
                    agency: "Horizon Europe",
                    full: "Marie Skłodowska-Curie Actions",
                    country: "European Union",
                    programs: "MSCA Postdoctoral Fellowships, ERC",
                    url: "https://marie-sklodowska-curie-actions.ec.europa.eu",
                  },
                  {
                    flag: "🇦🇺",
                    agency: "ARC",
                    full: "Australian Research Council",
                    country: "Australia",
                    programs: "DECRA, Discovery Early Career",
                    url: "https://www.arc.gov.au",
                  },
                ].map((f) => (
                  <a
                    key={f.agency}
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border p-4 flex flex-col gap-2 transition-opacity hover:opacity-80"
                    style={{ borderColor: "rgba(255,255,255,0.06)", background: "rgba(31,42,51,0.60)" }}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg leading-none" style={{ color: "#7DD3FC" }}>{f.flag}</span>
                      <div>
                        <div className="text-sm font-semibold text-white">{f.agency}</div>
                        <div className="text-[10px] text-white/65">{f.country}</div>
                      </div>
                    </div>
                    <div className="text-[11px] text-white/70 leading-snug">{f.full}</div>
                    <div className="text-[11px] text-white/55 leading-snug">{f.programs}</div>
                  </a>
                ))}
              </div>
            </motion.div>
          </section>
        </main>

        {/* Footer — same structure as main site footer */}
        <footer className="border-t" style={{ borderColor: "rgba(31,42,51,0.10)" }}>
          <div className="mx-auto max-w-6xl px-5 py-10 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
            <div>
              <div className="text-sm font-semibold" style={{ color: COLORS.bg }}>
                SOS Research Unit
              </div>
              <div className="mt-1 text-xs" style={{ color: "rgba(245,247,246,0.50)" }}>
                Sustainability of Sustainability Foundation · Harvard University
              </div>
            </div>
            <a
              href="/"
              className="text-xs hover:opacity-80 transition-opacity self-start md:self-auto"
              style={{ color: "rgba(245,247,246,0.50)" }}
            >
              ← Back to SOS Foundation
            </a>
            <div className="text-xs" style={{ color: "rgba(245,247,246,0.40)" }}>
              © {new Date().getFullYear()} SOS Initiative. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
