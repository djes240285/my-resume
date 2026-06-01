export type ContributionDay = {
  date: string;
  count: number;
  level: number;
  future?: boolean;
};

export type ContributionMonthLabel = {
  weekIndex: number;
  label: string;
};

export type ContributionRange = {
  weeks: number;
  daysPerWeek: number;
  gridStart: string;
  gridEnd: string;
  maxCount: number;
  totalCommits: number;
  monthLabels: ContributionMonthLabel[];
  days: ContributionDay[];
};

export type ContourActivityFile = {
  source?: string;
  layout?: string;
  version?: number;
  defaultRange?: string;
  ranges?: Record<string, ContributionRange>;
  weeks?: number;
  gridStart?: string;
  gridEnd?: string;
  maxCount?: number;
  totalCommits?: number;
  monthLabels?: ContributionMonthLabel[];
  /** @deprecated use ranges[].days */
  days?: ContributionDay[];
  cells?: number[];
};

export const GITHUB_DAYS = 7;
export type RangeKey = 'week' | 'month' | 'year' | 'twoYears' | 'all';
export const RANGE_KEYS: RangeKey[] = ['week', 'month', 'year', 'twoYears', 'all'];
