import type { ContributionRange } from './contour-activity-types';

export const CONTRIB_CELL = 11;
export const CONTRIB_GAP = 3;
export const CONTRIB_COL_WIDTH = CONTRIB_CELL + CONTRIB_GAP;
export const CONTRIB_MONTH_BAND = 20;
export const CONTRIB_GRID_TOP_FULL = CONTRIB_MONTH_BAND + 6;
export const CONTRIB_GRID_TOP_COMPACT = 4;
export const CONTRIB_DOW_BAND = 16;
export const CONTRIB_DOW_GUTTER = 24;

/** Месяц: чуть крупнее базовой сетки (~×1.2) */
export const CONTRIB_CELL_MONTH = 13;
export const CONTRIB_GAP_MONTH = 3;
export const CONTRIB_COL_WIDTH_MONTH = CONTRIB_CELL_MONTH + CONTRIB_GAP_MONTH;
export const CONTRIB_DOW_GUTTER_MONTH = 26;

/** Год / 2 года / всё время */
export const CONTRIB_CELL_WIDE = 12;
export const CONTRIB_GAP_WIDE = 3;
export const CONTRIB_COL_WIDTH_WIDE = CONTRIB_CELL_WIDE + CONTRIB_GAP_WIDE;

export type ContribMetrics = {
  cell: number;
  colWidth: number;
  gridLeft: number;
  gridTop: number;
  dowBand: number;
};

export function contribMetricsForRange(range: ContributionRange): ContribMetrics {
  if (isMonthCalendarLayout(range)) {
    return {
      cell: CONTRIB_CELL_MONTH,
      colWidth: CONTRIB_COL_WIDTH_MONTH,
      gridLeft: CONTRIB_DOW_GUTTER_MONTH,
      gridTop: CONTRIB_GRID_TOP_FULL + 4,
      dowBand: CONTRIB_DOW_BAND,
    };
  }
  if (isWideYearLayout(range)) {
    return {
      cell: CONTRIB_CELL_WIDE,
      colWidth: CONTRIB_COL_WIDTH_WIDE,
      gridLeft: 0,
      gridTop: gridTopForRange(range),
      dowBand: CONTRIB_DOW_BAND,
    };
  }
  return {
    cell: CONTRIB_CELL,
    colWidth: CONTRIB_COL_WIDTH,
    gridLeft: 0,
    gridTop: gridTopForRange(range),
    dowBand: CONTRIB_DOW_BAND,
  };
}

/** Одна колонка недели → горизонтальный ряд из 7 дней */
export function isWeekStripLayout(range: ContributionRange): boolean {
  return range.weeks === 1;
}

/** ~4–5 недель: горизонтальная сетка с подписями, без растягивания как «Год» */
export function isMonthCalendarLayout(range: ContributionRange): boolean {
  return range.weeks >= 4 && range.weeks <= 6;
}

/** Год, 2 года, всё время — длинная горизонтальная сетка */
export function isWideYearLayout(range: ContributionRange): boolean {
  return range.weeks > 8;
}

/** Только неделя — полоса на всю ширину */
export function useFullWidthGrid(range: ContributionRange): boolean {
  return isWeekStripLayout(range);
}

export function showMonthLabelsOnGrid(weeks: number): boolean {
  return weeks > 8;
}

export function showMonthBand(range: ContributionRange): boolean {
  return isMonthCalendarLayout(range) || showMonthLabelsOnGrid(range.weeks);
}

export function gridTopForRange(range: ContributionRange): number {
  return showMonthBand(range) ? CONTRIB_GRID_TOP_FULL : CONTRIB_GRID_TOP_COMPACT;
}

export function getCellCoords(
  range: ContributionRange,
  index: number,
  metrics: ContribMetrics,
): { x: number; y: number } {
  const { colWidth, gridTop, gridLeft } = metrics;
  if (isWeekStripLayout(range)) {
    return { x: index * colWidth, y: gridTop };
  }
  const week = Math.floor(index / range.daysPerWeek);
  const dow = index % range.daysPerWeek;
  return { x: gridLeft + week * colWidth, y: gridTop + dow * colWidth };
}

export function svgSizeForRange(range: ContributionRange): {
  width: number;
  height: number;
  metrics: ContribMetrics;
  showMonthLabels: boolean;
  monthCalendar: boolean;
  fullWidth: boolean;
} {
  const metrics = contribMetricsForRange(range);
  const { colWidth, gridTop, gridLeft, dowBand } = metrics;
  const fullWidth = useFullWidthGrid(range);
  const monthCalendar = isMonthCalendarLayout(range);
  const showMonthLabels = showMonthLabelsOnGrid(range.weeks);

  if (isWeekStripLayout(range)) {
    return {
      width: range.daysPerWeek * colWidth,
      height: gridTop + colWidth + dowBand + 4,
      metrics,
      showMonthLabels,
      monthCalendar: false,
      fullWidth,
    };
  }

  return {
    width: gridLeft + range.weeks * colWidth,
    height: gridTop + range.daysPerWeek * colWidth + 4,
    metrics,
    showMonthLabels,
    monthCalendar,
    fullWidth,
  };
}
