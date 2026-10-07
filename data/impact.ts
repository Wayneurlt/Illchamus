// Impact figures shown on the website (headline stats and per-program numbers).
// Editable in /admin → Impact & figures; saved in the database. These defaults
// are used until the figures have been saved there for the first time.
import en from "~/locales/en";
import sw from "~/locales/sw";
import { impactStats, programs, type ProgramId } from "~/data/site";

export interface Bilingual {
  en: string;
  sw: string;
}

export interface ImpactStat {
  value: number;
  prefix: string;
  suffix: string;
  label: Bilingual;
}

export interface ProgramFigures {
  participants: string;
  duration: Bilingual;
  impact: Bilingual;
}

export interface ImpactData {
  stats: ImpactStat[];
  programs: Record<ProgramId, ProgramFigures>;
  /** When the figures were last saved in the admin (null = still the defaults). */
  updatedAt: string | null;
}

export const STAT_COUNT = 4;
export const PROGRAM_IDS = programs.map((p) => p.id);

export function defaultImpact(): ImpactData {
  return {
    stats: impactStats.map((s, i) => ({
      value: s.value,
      prefix: s.prefix || "",
      suffix: s.suffix || "",
      label: { en: en.stats[i] || "", sw: sw.stats[i] || "" },
    })),
    programs: Object.fromEntries(
      programs.map((p) => [
        p.id,
        {
          participants: p.participants,
          duration: { en: en.programs[p.id].duration, sw: sw.programs[p.id].duration },
          impact: { en: en.programs[p.id].impact, sw: sw.programs[p.id].impact },
        },
      ])
    ) as Record<ProgramId, ProgramFigures>,
    updatedAt: null,
  };
}

/** Fills anything missing from saved figures with the defaults. */
export function mergeImpact(saved: Partial<ImpactData> | null | undefined): ImpactData {
  const base = defaultImpact();
  if (!saved) return base;
  return {
    stats: base.stats.map((d, i) => {
      const s = saved.stats?.[i];
      return s ? { ...d, ...s, label: { ...d.label, ...s.label } } : d;
    }),
    programs: Object.fromEntries(
      PROGRAM_IDS.map((id) => {
        const d = base.programs[id];
        const s = saved.programs?.[id];
        return [id, s ? { ...d, ...s, duration: { ...d.duration, ...s.duration }, impact: { ...d.impact, ...s.impact } } : d];
      })
    ) as Record<ProgramId, ProgramFigures>,
    updatedAt: saved.updatedAt ?? null,
  };
}

export const formatStat = (s: Pick<ImpactStat, "value" | "prefix" | "suffix">, value = s.value) =>
  `${s.prefix}${Math.round(value).toLocaleString("en-US")}${s.suffix}`;
