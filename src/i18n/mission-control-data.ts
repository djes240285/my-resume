import type { Lang } from './cv-data';
import { loadMissionControlContent } from '../lib/load-mission-control';

export type StackQaPair = {
  q: string;
  a: string;
};

export type CaseLogEntry = {
  id: string;
  slug: string;
  name: string;
  /** Уточнение, если бренд ≠ весь контур системы */
  context?: string;
  operation: string;
  /** Краткая сводка для иконок и screen readers */
  stack: string;
  /** Уточнение стека в формате планирования (вопрос → ответ) */
  stackQa: StackQaPair[];
  /** slug иконок (simple-icons), как в tech-roadmap */
  stackIcons?: string[];
  /** Текстовая подпись платформы вместо первой иконки (XenForo, 1С-Битрикс) */
  stackLeadLabel?: string;
  status: string;
};

export type PassportMetric = {
  label: string;
  value: string;
  /** Дополнение к value (например «частичная занятость») */
  valueNote?: string;
};

export type PassportStackGroup = {
  label: string;
  /** Для screen readers; в UI показываем только иконки */
  value: string;
  contour: 'backend' | 'frontend' | 'ai';
};

/** Бортовой readout в паспорте (вместо «голых» процентов) */
export type PassportReadout = {
  code: string;
  label: string;
  headline: string;
  detail: string;
  tone: 'stability' | 'ai';
};

export type MindsetIndicatorVariant = 'audit' | 'regime' | 'scale' | 'e2e';

export type MissionMindsetStep = {
  phase: string;
  title: string;
  detail: string;
  /** Микро-подпись над волновым индикатором */
  indicatorLabel: string;
  indicator: MindsetIndicatorVariant;
};

export type MissionEngineerPassport = {
  name: string;
  role: string;
  metricsTitle: string;
  metrics: PassportMetric[];
  stackTitle: string;
  stackGroups: PassportStackGroup[];
  readouts: PassportReadout[];
  activityLabel: string;
  activityHint: string;
  vizAriaLabel: string;
};

export type MissionControlContent = {
  metaTitle: string;
  metaDescription: string;
  hero: {
    headline: string;
    lead: string;
    avatarAlt: string;
  };
  engineerPassport: MissionEngineerPassport;
  mindset: {
    title: string;
    badge: string;
    steps: MissionMindsetStep[];
  };
  caseLog: {
    title: string;
    intro: string;
    colId: string;
    colTarget: string;
    colOperation: string;
    colStack: string;
    colStatus: string;
    /** Подсказка по значениям колонки «Статус» */
    statusLegend: string;
    rowAction: string;
    drumAriaLabel: string;
    /** Мобилка: заголовок «окна» списка кейсов */
    windowTitle: string;
    foldLightsAria: string;
    foldClose: string;
    foldPreviewMode: string;
    foldOpen: string;
    entries: CaseLogEntry[];
  };
  bridge: {
    title: string;
    body: string;
    cta: string;
    mailtoSubject: string;
  };
  ai: {
    line: string;
  };
  footer: {
    contactsLabel: string;
  };
  cta: {
    email: string;
    telegram: string;
    max: string;
  };
};

export function getMissionControl(lang: Lang): MissionControlContent {
  return loadMissionControlContent(lang);
}
