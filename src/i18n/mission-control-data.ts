import type { Lang } from './cv-data';

export type MissionFailurePair = {
  failure: string;
  resolution: string;
};

export type CaseLogEntry = {
  id: string;
  slug: string;
  name: string;
  operation: string;
  status: string;
};

export type MissionControlContent = {
  metaTitle: string;
  metaDescription: string;
  hero: {
    headlineLine1: string;
    headlineLine2: string;
    subheadLines: string[];
    identityName: string;
    identityRole: string;
  };
  liveStatus: {
    label: string;
    value: string;
    focusLabel: string;
    focusValue: string;
  };
  narrative: {
    body: string;
  };
  mindset: {
    title: string;
    lines: string[];
  };
  failures: {
    title: string;
    colFailure: string;
    colResolution: string;
    rows: MissionFailurePair[];
  };
  caseLog: {
    title: string;
    lead: string;
    colId: string;
    colTarget: string;
    colOperation: string;
    colStatus: string;
    entries: CaseLogEntry[];
    portfolioCta: string;
  };
  bridge: {
    title: string;
    body: string;
    cta: string;
  };
  ai: {
    line: string;
  };
  cta: {
    email: string;
    portfolio: string;
    resume: string;
  };
  linkedinLabel: string;
};

const ru: MissionControlContent = {
  metaTitle: 'Евгений Жуков — инженерный пульт · восстановление систем',
  metaDescription:
    'Стабилизация систем, от которых зависит бизнес: легаси, миграции, интеграции. Более 15 лет в продакшене.',
  hero: {
    headlineLine1: 'Стабилизирую системы,',
    headlineLine2: 'которые бизнес боится трогать.',
    subheadLines: [
      'Легаси и нестабильные релизы',
      'Хаос интеграций',
      'Миграции без права на простой',
    ],
    identityName: 'Евгений Жуков',
    identityRole: 'Инженер восстановления систем · фулстек · архитектор',
  },
  liveStatus: {
    label: 'СТАТУС',
    value: 'Открыт к точечным проектам',
    focusLabel: 'Текущий фокус',
    focusValue: 'ИИ-ускоренная инфраструктура и восстановление легаси',
  },
  narrative: {
    body:
      'Когда релиз нельзя откатить, а бизнес уже зависит от системы, важны не модные технологии, а инженерная устойчивость: диагностика, предсказуемые релизы и контур, который выдержит рост.',
  },
  mindset: {
    title: 'ИНЖЕНЕРНЫЙ ПОДХОД',
    lines: [
      'Сначала диагностика — не переписывание',
      'Стабильность важнее трендов',
      'Предсказуемость вместо хаоса',
      'Система должна пережить рост',
    ],
  },
  failures: {
    title: 'СБОИ, КОТОРЫЕ РАЗБИРАЮ',
    colFailure: 'Сбой',
    colResolution: 'Решение',
    rows: [
      { failure: 'Коллапс легаси', resolution: 'Восстановление и модернизация' },
      { failure: 'Медленная архитектура', resolution: 'Профилирование и ускорение' },
      { failure: 'Хаос интеграций', resolution: 'Стабильные интерфейсы' },
      { failure: 'Срыв масштабирования', resolution: 'Редизайн инфраструктуры' },
    ],
  },
  caseLog: {
    title: 'ДЕРЕВО ИНЦИДЕНТОВ (CASE_LOG)',
    lead: 'Задокументированные операции — краткий индекс. Детали и разборы — в полном логе.',
    colId: 'ID',
    colTarget: 'Объект',
    colOperation: 'Операция',
    colStatus: 'Статус',
    entries: [
      {
        id: 'ID_01',
        slug: 'windowcleaner',
        name: 'windowcleaner.com',
        operation: 'Реанимация ядра Magento 1→2',
        status: 'ACTIVE_5+YRS',
      },
      {
        id: 'ID_02',
        slug: 'krymresurs',
        name: 'Крымресурс',
        operation: 'Интеграция документооборота',
        status: 'IN_PRODUCTION',
      },
      {
        id: 'ID_03',
        slug: 'dostavka-zpr',
        name: 'Доставка-ЗПР',
        operation: 'Автоматизация логистики',
        status: 'OPERATIONAL',
      },
    ],
    portfolioCta: 'Смотреть полный дебаг-лог всех кейсов (портфолио)',
  },
  bridge: {
    title: 'Не верьте на слово',
    body: 'Посмотрите, как эти принципы работают в боевых условиях — в развёрнутых post-mortem по каждому контуру.',
    cta: 'Открыть логи проектов',
  },
  ai: {
    line: 'ИИ ускоряет анализ и поставку; архитектура и ответственность за прод остаются за инженером.',
  },
  cta: {
    email: 'Написать',
    portfolio: 'Портфолио',
    resume: 'Резюме',
  },
  linkedinLabel: 'Профиль в LinkedIn',
};

const en: MissionControlContent = {
  metaTitle: 'Eugene Zhukov — engineering mission control',
  metaDescription:
    'Stabilizing systems businesses depend on: legacy, migrations, integrations. 15+ years in production.',
  hero: {
    headlineLine1: 'I stabilize systems',
    headlineLine2: 'businesses are afraid to touch.',
    subheadLines: [
      'Legacy and brittle releases',
      'Integration chaos',
      'Migrations with no downtime window',
    ],
    identityName: 'Eugene Zhukov',
    identityRole: 'Systems recovery engineer · full-stack · architect',
  },
  liveStatus: {
    label: 'STATUS',
    value: 'Open to selective engagements',
    focusLabel: 'Current focus',
    focusValue: 'AI-augmented infrastructure and legacy recovery',
  },
  narrative: {
    body:
      'When a release cannot be rolled back and the business already depends on the system, trendy stacks matter less than engineering resilience: diagnosis, predictable releases, and a system that survives growth.',
  },
  mindset: {
    title: 'ENGINEERING MINDSET',
    lines: [
      'Diagnose before rewriting',
      'Stability over trends',
      'Predictability over chaos',
      'Systems must survive growth',
    ],
  },
  failures: {
    title: 'SYSTEM FAILURES I HANDLE',
    colFailure: 'Failure',
    colResolution: 'Resolution',
    rows: [
      { failure: 'Legacy collapse', resolution: 'Recovery & modernization' },
      { failure: 'Slow architecture', resolution: 'Profiling & acceleration' },
      { failure: 'Integration chaos', resolution: 'Stable interfaces' },
      { failure: 'Scaling failures', resolution: 'Infrastructure redesign' },
    ],
  },
  caseLog: {
    title: 'INCIDENT TREE (CASE_LOG)',
    lead: 'Documented operations — index only. Full post-mortems live in the debug log.',
    colId: 'ID',
    colTarget: 'Target',
    colOperation: 'Operation',
    colStatus: 'Status',
    entries: [
      {
        id: 'ID_01',
        slug: 'windowcleaner',
        name: 'windowcleaner.com',
        operation: 'Magento core recovery 1→2',
        status: 'ACTIVE_5+YRS',
      },
      {
        id: 'ID_02',
        slug: 'krymresurs',
        name: 'Krymresurs',
        operation: 'Document workflow integration',
        status: 'IN_PRODUCTION',
      },
      {
        id: 'ID_03',
        slug: 'dostavka-zpr',
        name: 'Dostavka-ZPR',
        operation: 'Logistics automation',
        status: 'OPERATIONAL',
      },
    ],
    portfolioCta: 'View full debug log of all cases (portfolio)',
  },
  bridge: {
    title: "Don't take my word for it",
    body: 'See how these principles hold under production load — full post-mortem per system.',
    cta: 'Open project logs',
  },
  ai: {
    line: 'AI speeds analysis and delivery; architecture and production accountability stay with the engineer.',
  },
  cta: {
    email: 'Email me',
    portfolio: 'Portfolio',
    resume: 'Resume',
  },
  linkedinLabel: 'LinkedIn profile',
};

export function getMissionControl(lang: Lang): MissionControlContent {
  return lang === 'ru' ? ru : en;
}
