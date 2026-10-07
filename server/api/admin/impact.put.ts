import { PROGRAM_IDS, STAT_COUNT, type Bilingual, type ProgramFigures } from "~/data/impact";

// Save the impact figures (admin only).
export default defineEventHandler(async (event) => {
  await requireAdmin(event);
  const body = await readBody<{ stats?: unknown[]; programs?: Record<string, any> }>(event);

  const bilingual = (v: any, max: number, required: boolean): Bilingual => {
    const en = str(v?.en, max);
    if (required && !en) fail(400, "impact_text_required");
    return { en, sw: str(v?.sw, max) };
  };

  if (!Array.isArray(body?.stats) || body.stats.length !== STAT_COUNT) fail(400, "impact_invalid");
  const stats = body.stats.map((raw: any) => {
    const value = Number(raw?.value);
    if (!Number.isFinite(value) || value < 0 || value > 1_000_000_000) fail(400, "impact_number_invalid");
    return {
      value: Math.round(value),
      prefix: str(raw?.prefix, 4),
      suffix: str(raw?.suffix, 4),
      label: bilingual(raw?.label, 80, true),
    };
  });

  const programs = {} as Record<string, ProgramFigures>;
  for (const id of PROGRAM_IDS) {
    const raw = body?.programs?.[id];
    programs[id] = {
      participants: str(raw?.participants, 20),
      duration: bilingual(raw?.duration, 40, false),
      impact: bilingual(raw?.impact, 60, false),
    };
  }

  return saveImpact({ stats, programs: programs as any });
});
