import type { Lang } from './cv-data';
import { buildMissionCaseLogEntries } from '../lib/build-mission-case-log';

export type CaseLogEntry = {
  id: string;
  slug: string;
  name: string;
  /** Уточнение, если бренд ≠ весь контур системы */
  context?: string;
  operation: string;
  stack: string;
  /** slug иконок (simple-icons), как в tech-roadmap */
  stackIcons?: string[];
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

const ru: MissionControlContent = {
  metaTitle: 'Евгений Жуков — веб-системы: разработка и поддержка',
  metaDescription:
    'Проектирование, развитие и поддержка веб-систем: фичи, бэкенд, интерфейсы. Предсказуемый продакшен, 15+ лет опыта.',
  hero: {
    headline: 'Проектирую, развиваю и поддерживаю веб-системы.',
    lead:
      'Помогаю бизнесу реализовывать сложные фичи, оптимизировать бэкенд и создавать точные интерфейсы, сохраняя предсказуемость и стабильность продакшена.',
    avatarAlt: 'Евгений Жуков',
  },
  engineerPassport: {
    name: 'Евгений Жуков',
    role: 'Инженер · Фулстек-архитектор',
    metricsTitle: 'Метрики разработчика',
    metrics: [
      { label: 'Статус', value: 'Активен', valueNote: 'Частичная занятость' },
      { label: 'Опыт', value: '15+ лет в коммерческом инжиниринге' },
      { label: 'Профиль', value: 'Fullstack · core-архитектор' },
      { label: 'Специализация', value: 'Разработка и развитие core-инфраструктуры' },
      { label: 'Контуры', value: 'Highload, e-commerce, AI-интеграции' },
    ],
    stackTitle: 'Основной контур стека',
    stackGroups: [
      {
        label: 'Backend',
        value: 'PHP (Laravel, Magento 1/2), Node.js, REST API, SQL',
        contour: 'backend',
      },
      {
        label: 'Frontend',
        value: 'Vue.js, React, Blade, Tailwind CSS, Figma (Pixel Perfect)',
        contour: 'frontend',
      },
      {
        label: 'AI-Driven',
        value: 'Cursor-агенты, автоматизация процессов, LLM-интеграции',
        contour: 'ai',
      },
    ],
    readouts: [
      {
        code: 'STAB',
        label: 'Стабильность продакшена',
        headline: 'Эволюция без «большого взрыма»',
        detail:
          'Итеративные релизы, rollback-план и мониторинг. P1 разбираю в SLA команды — без остановки бизнес-процессов.',
        tone: 'stability',
      },
      {
        code: 'AI-OPS',
        label: 'AI в рабочих процессах',
        headline: 'Cursor-агенты и LLM в daily-workflow',
        detail:
          'Оценка ТЗ, ревью diff, бойлерплейт, миграции и поиск регрессий в легаси. Архитектуру и критичные узлы проектирую вручную.',
        tone: 'ai',
      },
    ],
    activityLabel: 'Вовлечённость по контурам',
    activityHint: '12 мес. · интенсивность коммерческой работы',
    vizAriaLabel: 'Пульс стабильности и тепловая карта вовлечённости',
  },
  mindset: {
    title: 'Как я работаю',
    badge: 'ПОДХОД',
    steps: [
      {
        phase: '01 ·',
        title: 'Погружение, аудит и диалог',
        detail:
          'Вхожу в проект через изучение кода и архитектуры. Даю честный фидбек, соотношу его с вашими ожиданиями и фиксирую цели. Для меня важно сначала выслушать бизнес и заслужить доверие, а не навязывать шаблоны.',
        indicatorLabel: 'АУДИТ·DIFF',
        indicator: 'audit',
      },
      {
        phase: '02 ·',
        title: 'Адаптивность под ваш регламент',
        detail:
          'Если процессов нет — помогу их выстроить и обучить команду. Если у вас уже действует жёсткий регламент, правила версионирования и работы с фичами — бесшовно встроюсь в ваш контур и буду строго следовать вашим стандартам.',
        indicatorLabel: 'GIT·FLOW',
        indicator: 'regime',
      },
      {
        phase: '03 ·',
        title: 'От простого к сложному',
        detail:
          'Двигаюсь концептуально ориентированно, не перегружая архитектуру. Сначала стабилизируем базовые узлы и выпускаем главные фичи, а затем плавно развиваем систему. Нахожу наилучший сценарий разработки под конкретный бюджет и масштаб.',
        indicatorLabel: 'ITER·SCALE',
        indicator: 'scale',
      },
      {
        phase: '04 ·',
        title: 'Сквозная ответственность за продукт',
        detail:
          'Отвечаю за систему целиком — от чистоты бэкенда до логики интерфейса. Гарантирую Pixel-Perfect соответствие Figma и продумываю поведение UI в краевых состояниях, чтобы бизнес получал готовый, автономный актив.',
        indicatorLabel: 'BE·FE·UI',
        indicator: 'e2e',
      },
    ],
  },
  caseLog: {
    title: 'Примеры из практики',
    intro:
      'Сводка коммерческих контуров: проект, scope, стек и статус. Полный разбор с метриками — в портфолио.',
    colId: 'ID',
    colTarget: 'Проект',
    colOperation: 'Что сделано',
    colStack: 'Стек',
    colStatus: 'Статус',
    rowAction: 'Подробнее',
    drumAriaLabel:
      'Список проектов: колёсико над таблицей, перетаскивание строк или ползунок справа',
    windowTitle: 'ПРАКТИКА.LOG',
    foldLightsAria: 'Управление списком проектов',
    foldClose: 'Свернуть список',
    foldPreviewMode: 'Показать превью (3 проекта)',
    foldOpen: 'Развернуть весь список',
    entries: buildMissionCaseLogEntries('ru'),
  },
  bridge: {
    title: 'Давайте обсудим ваш проект',
    body:
      'Нужно реализовать новую функциональность, обновить легаси-платформу или автоматизировать рабочие процессы? Расскажите задачу — я предложу оптимальный технический стек и план реализации.',
    cta: 'Начать обсуждение',
    mailtoSubject: 'Обсуждение проекта',
  },
  ai: {
    line: 'ИИ помогает ускорять рутину; архитектуру и ответственность за прод веду как инженер.',
  },
  footer: {
    contactsLabel: 'Контакты: монограмма EZ, почта и LinkedIn',
  },
  cta: {
    email: 'Написать',
    telegram: 'Telegram',
    max: 'MAX',
  },
};

const en: MissionControlContent = {
  metaTitle: 'Eugene Zhukov — web systems: build & support',
  metaDescription:
    'Design, evolve, and support web systems: features, backend, interfaces. Predictable production, 15+ years of experience.',
  hero: {
    headline: 'I design, build, and support web systems.',
    lead:
      'I help businesses ship complex features, optimize backends, and craft precise interfaces while keeping production predictable and stable.',
    avatarAlt: 'Eugene Zhukov',
  },
  engineerPassport: {
    name: 'Eugene Zhukov',
    role: 'Engineer · Full-stack architect',
    metricsTitle: 'Developer metrics',
    metrics: [
      { label: 'Status', value: 'Active', valueNote: 'part-time availability' },
      { label: 'Experience', value: '15+ years in commercial engineering' },
      { label: 'Profile', value: 'Fullstack · core architect' },
      { label: 'Focus', value: 'Core infrastructure build & evolution' },
      { label: 'Domains', value: 'Highload, e-commerce, AI integrations' },
    ],
    stackTitle: 'Primary stack contour',
    stackGroups: [
      {
        label: 'Backend',
        value: 'PHP (Laravel, Magento 1/2), Node.js, REST API, SQL',
        contour: 'backend',
      },
      {
        label: 'Frontend',
        value: 'Vue.js, React, Blade, Tailwind CSS, Figma (pixel-perfect)',
        contour: 'frontend',
      },
      {
        label: 'AI-Driven',
        value: 'Cursor agents, workflow automation, LLM integrations',
        contour: 'ai',
      },
    ],
    readouts: [
      {
        code: 'STAB',
        label: 'Production stability',
        headline: 'Evolution, not big-bang',
        detail:
          'Iterative releases, rollback plan, and monitoring. P1 triage within team SLA — business flows keep running.',
        tone: 'stability',
      },
      {
        code: 'AI-OPS',
        label: 'AI in workflows',
        headline: 'Cursor agents + LLM in daily work',
        detail:
          'Scope review, diff review, boilerplate, migrations, legacy regression hunts. Architecture and critical paths stay hand-owned.',
        tone: 'ai',
      },
    ],
    activityLabel: 'Contour involvement',
    activityHint: '12 mo. · commercial engagement intensity',
    vizAriaLabel: 'Stability pulse and involvement heatmap',
  },
  mindset: {
    title: 'How I work',
    badge: 'APPROACH',
    steps: [
      {
        phase: '01 ·',
        title: 'Immersion, audit, and dialogue',
        detail:
          'I start by reading the code and architecture. I give honest feedback, align it with your expectations, and agree on goals. Listening to the business and earning trust comes first — not pushing a template playbook.',
        indicatorLabel: 'AUDIT·DIFF',
        indicator: 'audit',
      },
      {
        phase: '02 ·',
        title: 'Fit your operating rules',
        detail:
          'If you have no process yet, I help shape one and coach the team. If you already run strict versioning, feature flow, and release rules — I plug into your contour and follow your standards without friction.',
        indicatorLabel: 'GIT·FLOW',
        indicator: 'regime',
      },
      {
        phase: '03 ·',
        title: 'Simple first, then depth',
        detail:
          'I stay concept-driven and avoid over-engineering early. We stabilize core nodes and ship the main features first, then grow the system step by step. I pick the best delivery path for your budget and scale.',
        indicatorLabel: 'ITER·SCALE',
        indicator: 'scale',
      },
      {
        phase: '04 ·',
        title: 'End-to-end product ownership',
        detail:
          'I own the system as a whole — from clean backend to interface logic. Pixel-perfect Figma match and thoughtful edge-case UI so the business gets a ready, self-sufficient asset.',
        indicatorLabel: 'BE·FE·UI',
        indicator: 'e2e',
      },
    ],
  },
  caseLog: {
    title: 'Selected projects',
    intro:
      'Documented operations below. Each case in the portfolio includes analysis, diagrams, and optimization outcomes.',
    lead: 'Click a row to open the post-mortem in the main portfolio.',
    colId: 'ID',
    colTarget: 'Project',
    colOperation: 'Scope',
    colStack: 'Stack',
    colStatus: 'Status',
    rowAction: 'Details',
    drumAriaLabel: 'Project list: wheel over the table, drag rows, or use the scrollbar on the right',
    windowTitle: 'PRACTICE.LOG',
    foldLightsAria: 'Project list controls',
    foldClose: 'Collapse list',
    foldPreviewMode: 'Show preview (3 projects)',
    foldOpen: 'Expand full list',
    entries: buildMissionCaseLogEntries('en'),
  },
  bridge: {
    title: "Let's discuss your project",
    body:
      'Need a new feature, a legacy platform refresh, or workflow automation? Tell me about the goal — I will suggest a practical stack and implementation plan.',
    cta: 'Start a conversation',
    mailtoSubject: 'Project discussion',
  },
  ai: {
    line: 'AI speeds up routine work; architecture and production accountability stay with the engineer.',
  },
  footer: {
    contactsLabel: 'Contacts: EZ monogram, email, and LinkedIn',
  },
  cta: {
    email: 'Email me',
    telegram: 'Telegram',
    max: 'MAX',
  },
};

export function getMissionControl(lang: Lang): MissionControlContent {
  return lang === 'ru' ? ru : en;
}
