import { COLORS } from "@/lib/theme";

// ─── "What is taking shape?" section content ─────────────────────────────────
// The home-page Work section reads from this file. To change the cards or the
// hero image, edit the data below — no JSX required. See ./README.md for the
// step-by-step guide.

/** Visual tone — controls the card's accent gradient. */
export type WorkTone = "meaning" | "pattern" | "mechanism" | "neutral";

/** What goes inside the card frame: a static image or an embedded iframe. */
export type WorkMedia =
  | { kind: "image"; src: string; alt?: string }
  | {
      kind: "iframe";
      src: string;
      title: string;
      /** Optional override of the default `allow` attribute. */
      allow?: string;
    };

export type WorkCard = {
  /** Stable id (so React keys are stable when cards are reordered). */
  id: string;
  /** Background placeholder label — usually obscured by the media. */
  label?: string;
  /** Accent tone. Pick whichever division the card belongs to. */
  tone: WorkTone;
  /** Tailwind aspect-ratio utility, e.g. "aspect-[4/5]" or "aspect-[16/10]". */
  aspect: string;
  /** What fills the frame. */
  media: WorkMedia;
  /** Optional pill in the top-left corner (e.g. "3D Interactive · drag / zoom"). */
  topBadge?: string;
  /** Optional caption chip at the bottom-left. */
  caption?: string;
};

/** The plain-text card that sits next to the spotlight card. */
export type WorkSignalCard = {
  heading: string;
  body: string;
};

export type WorkContent = {
  /** Tiny pill above the heading. */
  pillLabel: string;
  pillColor: string;
  /** Section heading. */
  title: string;
  /** One-line lede beneath the heading. */
  subtitle: string;
  /** The three feature cards across the top row. */
  cards: WorkCard[];
  /** Text card at the bottom-left of the second row. */
  signal: WorkSignalCard;
  /** Image / spotlight card at the bottom-right of the second row. */
  spotlight: WorkCard;
};

// ─────────────────────────────────────────────────────────────────────────────
// EDIT BELOW THIS LINE TO CHANGE THE HOME PAGE WORK SECTION
// ─────────────────────────────────────────────────────────────────────────────

export const WORK: WorkContent = {
  pillLabel: "Work",
  pillColor: COLORS.blue,
  title: "What is taking shape?",
  subtitle: "Selected works and signals emerging across Meaning, Pattern, and Mechanism.",

  cards: [
    {
      id: "patrick-hughes-poppish",
      label: "Featured exhibition / installation",
      tone: "meaning",
      aspect: "aspect-[4/5]",
      media: {
        kind: "iframe",
        src: "https://www.kiriengine.app/share/3dgsEmbed/1992812111444574208?userId=923097&type=0&bg_theme=bright&auto_spin=0",
        title: "Poppish — Patrick Hughes",
      },
      topBadge: "3D Interactive   drag / zoom / explore",
      caption: "Patrick Hughes | Poppish (3D Dillustion)",
    },
    {
      id: "william-hippopotamus",
      label: "Digitization demo / virtual museum preview",
      tone: "pattern",
      aspect: "aspect-[4/5]",
      media: {
        kind: "iframe",
        src: "https://www.kiriengine.app/share/3dgsEmbed/1994757825678540800?userId=923097&type=0&bg_theme=dark&auto_spin=0",
        title: "Hippopotamus \"William\"",
      },
      topBadge: "3D Interactive   drag / zoom / explore",
      caption: "Met Museum | \"William\" the Hippopotamus (3D)",
    },
    {
      id: "system-prototype-talk",
      label: "System prototype / incentive loop",
      tone: "mechanism",
      aspect: "aspect-[4/5]",
      media: {
        kind: "image",
        src: "/pics/talk.png",
        alt: "Presenting a system prototype",
      },
      caption: "Presenting a system prototype",
    },
  ],

  signal: {
    heading: "Signals across the loop",
    body: "A few concrete artifacts across Meaning, Pattern, and Mechanism. Less explanation here; more evidence. Each piece is a doorway into the loop.",
  },

  spotlight: {
    id: "nature-salon",
    label: "Future slot: partner spotlight / upcoming event",
    tone: "neutral",
    aspect: "aspect-[16/10]",
    media: {
      kind: "image",
      src: "/pics/Nature_Salon.jpg",
      alt: "Nature Salon",
    },
    caption: "Nature Salon | The Sustainability Dialogue for Artists, Scientists & Entrepreneurs",
  },
};
