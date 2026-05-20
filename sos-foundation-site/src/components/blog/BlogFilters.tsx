import { ChevronDown, X } from "lucide-react";
import { COLORS } from "@/lib/theme";
import type { Author, Category } from "@/content/blog";

// ─── Blog index filter bar ───────────────────────────────────────────────────
// Controlled component: filter by category, author, and year/month. The parent
// (BlogIndexView) holds the state and does the actual filtering.

const MONTHS = [
  ["01", "January"], ["02", "February"], ["03", "March"], ["04", "April"],
  ["05", "May"], ["06", "June"], ["07", "July"], ["08", "August"],
  ["09", "September"], ["10", "October"], ["11", "November"], ["12", "December"],
];

export type FilterState = {
  category: string | null;
  authorId: string | null;
  year: string | null;
  month: string | null;
};

function Select({
  label,
  value,
  onChange,
  children,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        aria-label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="appearance-none cursor-pointer rounded-full border pl-4 pr-9 py-2 text-sm text-white outline-none transition-colors"
        style={{
          borderColor: "rgba(255,255,255,0.12)",
          background: "rgba(255,255,255,0.04)",
        }}
      >
        {children}
      </select>
      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
        style={{ color: "rgba(255,255,255,0.5)" }}
      />
    </div>
  );
}

export default function BlogFilters({
  categories,
  authors,
  years,
  state,
  onChange,
  resultCount,
  totalCount,
}: {
  categories: Category[];
  authors: Author[];
  years: string[];
  state: FilterState;
  onChange: (next: FilterState) => void;
  resultCount: number;
  totalCount: number;
}) {
  const active =
    state.category || state.authorId || state.year || state.month;

  const clear = () =>
    onChange({ category: null, authorId: null, year: null, month: null });

  return (
    <div
      className="rounded-3xl border p-4 md:p-5"
      style={{
        borderColor: "rgba(255,255,255,0.08)",
        background: "rgba(31,42,51,0.72)",
      }}
    >
      {/* Category pills */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-white/35 mr-1">
          Topic
        </span>
        <button
          type="button"
          onClick={() => onChange({ ...state, category: null })}
          className="rounded-full px-3 py-1 text-xs font-medium transition-all"
          style={
            !state.category
              ? { background: COLORS.bg, color: COLORS.ink }
              : {
                  border: "1px solid rgba(255,255,255,0.14)",
                  color: "rgba(255,255,255,0.65)",
                }
          }
        >
          All
        </button>
        {categories.map((c) => {
          const on = state.category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              title={c.description}
              onClick={() =>
                onChange({ ...state, category: on ? null : c.id })
              }
              className="rounded-full px-3 py-1 text-xs font-medium transition-all"
              style={
                on
                  ? { background: c.color, color: "#0B1A24" }
                  : {
                      border: `1px solid ${c.color}55`,
                      color: c.color,
                    }
              }
            >
              {c.label}
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div
        className="my-4 h-px w-full"
        style={{ background: "rgba(255,255,255,0.07)" }}
      />

      {/* Author + date selects */}
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-xs font-medium uppercase tracking-wide text-white/35">
          Filter
        </span>

        <Select
          label="Filter by author"
          value={state.authorId ?? ""}
          onChange={(v) => onChange({ ...state, authorId: v || null })}
        >
          <option value="">All authors</option>
          {authors.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </Select>

        <Select
          label="Filter by year"
          value={state.year ?? ""}
          onChange={(v) => onChange({ ...state, year: v || null })}
        >
          <option value="">All years</option>
          {years.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </Select>

        <Select
          label="Filter by month"
          value={state.month ?? ""}
          onChange={(v) => onChange({ ...state, month: v || null })}
        >
          <option value="">All months</option>
          {MONTHS.map(([value, name]) => (
            <option key={value} value={value}>
              {name}
            </option>
          ))}
        </Select>

        {/* Result count + clear */}
        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-white/40">
            {active ? `${resultCount} of ${totalCount}` : `${totalCount} posts`}
          </span>
          {active && (
            <button
              type="button"
              onClick={clear}
              className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium text-white/70 transition-opacity hover:opacity-80"
              style={{ borderColor: "rgba(255,255,255,0.14)" }}
            >
              <X size={12} /> Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
