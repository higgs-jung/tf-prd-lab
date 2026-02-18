import type { Experiment } from "../experiments";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function hashString(input: string): number {
  let hash = 0;
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  }
  return hash;
}

function toLocalDateKey(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function toLocalEpochDay(date: Date): number {
  const midnightLocal = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  return Math.floor(midnightLocal.getTime() / MS_PER_DAY);
}

export function getDeterministicExperimentByDate(
  list: Experiment[],
  date: Date = new Date()
): Experiment | null {
  if (list.length === 0) return null;
  if (list.length === 1) return list[0];

  const dateKey = toLocalDateKey(date);
  const slugSeed = list.map((experiment) => experiment.slug).join("|");
  const offset = hashString(`${dateKey}|${slugSeed}`) % list.length;
  const dayIndex = toLocalEpochDay(date) % list.length;
  const index = (dayIndex + offset) % list.length;

  return list[index];
}
