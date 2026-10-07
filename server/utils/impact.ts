import { mergeImpact, type ImpactData } from "~/data/impact";

const KEY = "impact";

/** Saved impact figures merged with the defaults. */
export async function loadImpact(): Promise<ImpactData> {
  const row = await prisma.setting.findUnique({ where: { key: KEY } });
  if (!row) return mergeImpact(null);
  try {
    return mergeImpact({ ...JSON.parse(row.value), updatedAt: row.updatedAt.toISOString() });
  } catch {
    return mergeImpact(null);
  }
}

export async function saveImpact(data: Omit<ImpactData, "updatedAt">) {
  const value = JSON.stringify({ stats: data.stats, programs: data.programs });
  await prisma.setting.upsert({ where: { key: KEY }, create: { key: KEY, value }, update: { value } });
  return loadImpact();
}
