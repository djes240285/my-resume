import contourActivity from '../data/contour-activity.json';
import type { ContourActivityFile, ContributionRange, RangeKey } from './contour-activity-types';
import { GITHUB_DAYS, RANGE_KEYS } from './contour-activity-types';

const data = contourActivity as ContourActivityFile;

function isRange(r: unknown): r is ContributionRange {
  if (!r || typeof r !== 'object') return false;
  const x = r as ContributionRange;
  return (
    typeof x.weeks === 'number' &&
    Array.isArray(x.days) &&
    x.days.length === x.weeks * GITHUB_DAYS
  );
}

export function getRange(key: RangeKey): ContributionRange | null {
  if (data.ranges?.[key] && isRange(data.ranges[key])) {
    return data.ranges[key];
  }
  if (key === 'year' && data.days && data.weeks) {
    return {
      weeks: data.weeks,
      daysPerWeek: GITHUB_DAYS,
      gridStart: data.gridStart ?? '',
      gridEnd: data.gridEnd ?? '',
      maxCount: data.maxCount ?? 0,
      totalCommits: data.totalCommits ?? 0,
      monthLabels: data.monthLabels ?? [],
      days: data.days,
    };
  }
  return null;
}

export function getDefaultRangeKey(): RangeKey {
  const d = data.defaultRange;
  if (d && RANGE_KEYS.includes(d as RangeKey)) return d as RangeKey;
  return 'year';
}

export function getAllRanges(): Partial<Record<RangeKey, ContributionRange>> {
  const out: Partial<Record<RangeKey, ContributionRange>> = {};
  for (const key of RANGE_KEYS) {
    const r = getRange(key);
    if (r) out[key] = r;
  }
  return out;
}

export function activityFromGit(): boolean {
  return data.source === 'git' && Boolean(getRange('year'));
}

/** Payload для клиентского переключателя периодов */
export function getContributionClientPayload(): {
  ranges: Partial<Record<RangeKey, ContributionRange>>;
  defaultRange: RangeKey;
  fromGit: boolean;
} {
  return {
    ranges: getAllRanges(),
    defaultRange: getDefaultRangeKey(),
    fromGit: activityFromGit(),
  };
}
