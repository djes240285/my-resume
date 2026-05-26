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
    lead: string;
    subheadLines: string[];
    identityName: string;
    identityRole: string;
  };
  liveStatus: {
    focusLabel: string;
    focusValue: string;
  };
  operationalMetrics: {
    title: string;
    comment: string;
    lines: { key: string; value: string }[];
  };
  mindset: {
    title: string;
    lines: string[];
  };
  failures: {
    title: string;
    warningTag: string;
    preface: string;
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
    rowAction: string;
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
  cta: {
    email: string;
    telegram: string;
    max: string;
    portfolio: string;
    resume: string;
  };
};

const ru: MissionControlContent = {
  metaTitle: 'Евгений Жуков — инженерный пульт · восстановление систем',
  metaDescription:
    'Стабилизация систем, от которых зависит бизнес: легаси, миграции, интеграции. Более 15 лет в продакшене.',
  hero: {
    headlineLine1: 'Стабилизирую системы,',
    headlineLine2: 'которые бизнес боится трогать.',
    lead:
      'Специализируюсь на стабилизации непрерывных бизнес-процессов: легаси, сложные интеграции и архитектура с нулевым допуском к простою.',
    subheadLines: [
      'Легаси и нестабильные релизы',
      'Хаос интеграций и «ручные» стыки',
      'Миграции без права на простой',
      'Регрессии без владельца',
      'Масштаб, который ломает то, что «и так работало»',
    ],
    identityName: 'Евгений Жуков',
    identityRole: 'Инженер восстановления систем · фулстек · архитектор',
  },
  liveStatus: {
    focusLabel: 'Текущий фокус',
    focusValue: 'ИИ-ускоренная инфраструктура и восстановление легаси',
  },
  operationalMetrics: {
    title: '[OPERATIONAL_METRICS]',
    comment: '// ТЕКУЩИЕ ПАРАМЕТРЫ ПРИЕМА:',
    lines: [
      {
        key: '[ДОСТУПНОСТЬ]',
        value: '1 масштабный проект или архитектурный консалтинг',
      },
      {
        key: '[МАСШТАБ СИСТЕМ]',
        value: 'Высокая нагрузка, базы >100GB, e-com с оборотом Enterprise',
      },
      {
        key: '[БЕЗОПАСНОСТЬ]',
        value: 'Работа в контуре NDA / готовность к сложным легаси-миграциям',
      },
    ],
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
    title: 'КРИТИЧЕСКИЕ СЦЕНАРИИ И УСТРАНЕНИЕ СБОЕВ',
    warningTag: '[WARNING: CRITICAL_ZONE_ONLY]',
    preface:
      'Когда релиз нельзя откатить, а бизнес уже зависит от системы, важны не модные технологии, а инженерная устойчивость: диагностика, предсказуемые релизы и контур, который выдержит рост.',
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
    lead: 'Индекс задокументированных операций — клик по строке открывает post-mortem в полном логе.',
    colId: 'ID',
    colTarget: 'Объект',
    colOperation: 'Операция',
    colStatus: 'Статус',
    rowAction: '[VIEW_LOG_]',
    entries: [
      {
        id: 'ID_01',
        slug: 'windowcleaner',
        name: 'windowcleaner.com',
        operation: 'Реанимация ядра Magento 1→2',
        status: 'В ПРОДЕ · 5+ ЛЕТ',
      },
      {
        id: 'ID_02',
        slug: 'krymresurs',
        name: 'Крымресурс',
        operation: 'Интеграция документооборота',
        status: 'В ЭКСПЛУАТАЦИИ',
      },
      {
        id: 'ID_03',
        slug: 'dostavka-zpr',
        name: 'Доставка-ЗПР',
        operation: 'Автоматизация логистики',
        status: 'ШТАТНО · В КОНТУРЕ',
      },
    ],
  },
  bridge: {
    title: 'ИНИЦИАЛИЗАЦИЯ ВЗАИМОДЕЙСТВИЯ (ЗАПРОС НА АУДИТ)',
    body:
      'Если ваш контур перегружен, легаси тормозит бизнес, а команда боится релизов — опишите симптомы. Проведу экспресс-диагностику архитектуры без вмешательства в продакшен.',
    cta: 'ОТПРАВИТЬ СИМПТОМЫ СИСТЕМЫ',
    mailtoSubject: 'Симптомы системы — запрос на аудит',
  },
  ai: {
    line: 'ИИ ускоряет анализ и поставку; архитектура и ответственность за прод остаются за инженером.',
  },
  cta: {
    email: 'Написать',
    telegram: 'Telegram',
    max: 'MAX',
    portfolio: 'Портфолио',
    resume: 'Резюме',
  },
};

const en: MissionControlContent = {
  metaTitle: 'Eugene Zhukov — engineering mission control',
  metaDescription:
    'Stabilizing systems businesses depend on: legacy, migrations, integrations. 15+ years in production.',
  hero: {
    headlineLine1: 'I stabilize systems',
    headlineLine2: 'businesses are afraid to touch.',
    lead:
      'I specialize in stabilizing always-on business processes: legacy, complex integrations, and architectures with zero tolerance for downtime.',
    subheadLines: [
      'Legacy and brittle releases',
      'Integration chaos and manual glue',
      'Migrations with no downtime window',
      'Regressions with no owner',
      'Scale that breaks what “already worked”',
    ],
    identityName: 'Eugene Zhukov',
    identityRole: 'Systems recovery engineer · full-stack · architect',
  },
  liveStatus: {
    focusLabel: 'Current focus',
    focusValue: 'AI-augmented infrastructure and legacy recovery',
  },
  operationalMetrics: {
    title: '[OPERATIONAL_METRICS]',
    comment: '// CURRENT INTAKE PARAMETERS:',
    lines: [
      {
        key: '[AVAILABILITY]',
        value: 'One major project or architecture consulting engagement',
      },
      {
        key: '[SYSTEM SCALE]',
        value: 'High load, DBs >100GB, enterprise-grade e-commerce',
      },
      {
        key: '[SECURITY]',
        value: 'NDA-bound work / complex legacy migrations accepted',
      },
    ],
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
    title: 'CRITICAL SCENARIOS & FAILURE REMEDIATION',
    warningTag: '[WARNING: CRITICAL_ZONE_ONLY]',
    preface:
      'When a release cannot be rolled back and the business already depends on the system, trendy stacks matter less than engineering resilience: diagnosis, predictable releases, and a system that survives growth.',
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
    lead: 'Documented operations index — click a row to open the post-mortem in the full log.',
    colId: 'ID',
    colTarget: 'Target',
    colOperation: 'Operation',
    colStatus: 'Status',
    rowAction: '[VIEW_LOG_]',
    entries: [
      {
        id: 'ID_01',
        slug: 'windowcleaner',
        name: 'windowcleaner.com',
        operation: 'Magento core recovery 1→2',
        status: 'IN PROD · 5+ YRS',
      },
      {
        id: 'ID_02',
        slug: 'krymresurs',
        name: 'Krymresurs',
        operation: 'Document workflow integration',
        status: 'IN PRODUCTION',
      },
      {
        id: 'ID_03',
        slug: 'dostavka-zpr',
        name: 'Dostavka-ZPR',
        operation: 'Logistics automation',
        status: 'OPERATIONAL',
      },
    ],
  },
  bridge: {
    title: 'ENGAGEMENT INIT (AUDIT REQUEST)',
    body:
      'If your system is overloaded, legacy is blocking the business, and the team fears releases — describe the symptoms. I will run a rapid architecture triage without touching production.',
    cta: 'SUBMIT SYSTEM SYMPTOMS',
    mailtoSubject: 'System symptoms — audit request',
  },
  ai: {
    line: 'AI speeds analysis and delivery; architecture and production accountability stay with the engineer.',
  },
  cta: {
    email: 'Email me',
    telegram: 'Telegram',
    max: 'MAX',
    portfolio: 'Portfolio',
    resume: 'Resume',
  },
};

export function getMissionControl(lang: Lang): MissionControlContent {
  return lang === 'ru' ? ru : en;
}
