import type { Lang } from './cv-data';

export type CaseLogEntry = {
  id: string;
  slug: string;
  name: string;
  /** Уточнение, если бренд ≠ весь контур системы */
  context?: string;
  operation: string;
  stack: string;
  status: string;
};

export type PassportMetric = {
  label: string;
  value: string;
  /** Дополнение к value (например «частичная занятость») */
  valueNote?: string;
};

export type MissionMindsetStep = {
  phase: string;
  title: string;
  detail: string;
};

export type MissionEngineerPassport = {
  name: string;
  role: string;
  metricsTitle: string;
  metrics: PassportMetric[];
  stackTitle: string;
  stackGroups: PassportMetric[];
  stabilityLabel: string;
  stabilityValue: string;
  aiContourLabel: string;
  aiContourValue: string;
  activityLabel: string;
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
    lead: string;
    colId: string;
    colTarget: string;
    colOperation: string;
    colStack: string;
    colStatus: string;
    rowAction: string;
    drumHint: string;
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
      },
      {
        label: 'Frontend',
        value: 'Vue.js, React, Blade, Tailwind CSS, Figma (Pixel Perfect)',
      },
      {
        label: 'AI-Driven',
        value: 'Cursor-агенты, автоматизация процессов, LLM-интеграции',
      },
    ],
    stabilityLabel: 'Стабильность продакшена',
    stabilityValue: '99.9%',
    aiContourLabel: 'AI в рабочих процессах',
    aiContourValue: 'ускоряет поставку',
    activityLabel: 'Активность в контурах (12 мес.)',
    vizAriaLabel: 'График стабильности и индикатор активности',
  },
  mindset: {
    title: 'Как я работаю',
    badge: 'ПРИНЦИП',
    steps: [
      {
        phase: '01 · Диагностика',
        title: 'Сначала контекст, не переписывание',
        detail:
          'Разбираю бизнес-ограничения, узкие места и риски релиза — прежде чем предлагать стек или «большой рефакторинг».',
      },
      {
        phase: '02 · Стабильность',
        title: 'Предсказуемость важнее хайпа',
        detail:
          'Релизы, мониторинг и откатные сценарии проектирую так, чтобы команда не боялась выкатывать изменения.',
      },
      {
        phase: '03 · Коммуникация',
        title: 'Честные оценки и прозрачный процесс',
        detail:
          'Фиксирую объём, этапы и критерии готовности — без сюрпризов по срокам и скрытых доработок.',
      },
      {
        phase: '04 · Рост',
        title: 'Система переживает нагрузку',
        detail:
          'Закладываю запас по архитектуре и эксплуатации: кеш, очереди, контракты API, наблюдаемость.',
      },
    ],
  },
  caseLog: {
    title: 'Примеры из практики',
    intro:
      'Ниже — задокументированные операции. Каждый кейс в портфолио содержит разбор, схемы и результаты оптимизации.',
    lead: 'Клик по строке откроет post-mortem в основном портфолио.',
    colId: 'ID',
    colTarget: 'Проект',
    colOperation: 'Что сделано',
    colStack: 'Стек',
    colStatus: 'Статус',
    rowAction: 'Подробнее',
    drumHint: 'Список прокручивается по кругу — наведите курсор, чтобы остановить.',
    entries: [
      {
        id: 'ID_01',
        slug: 'windowcleaner',
        name: 'windowcleaner.com',
        context: 'e-commerce · США',
        operation: 'Magento 1→2, кастомные платежи, релизы под нагрузкой',
        stack: 'Magento 1/2, PHP, MySQL, Docker',
        status: 'В проде · 5+ лет',
      },
      {
        id: 'ID_02',
        slug: 'dostavka-zpr',
        name: 'dostavka-zpr.ru',
        context: 'логистика · CDEK',
        operation: 'Сервис доставки с нуля: расчёты, API, прикладная логика',
        stack: 'Laravel, PHP, CDEK API',
        status: 'В проде',
      },
      {
        id: 'ID_03',
        slug: 'krymresurs',
        name: 'krymresurs.ru',
        context: 'корпоративный контур · витрина',
        operation: 'Документооборот, роли, генерация документов',
        stack: 'Laravel, PHP, API, интеграции',
        status: 'В эксплуатации',
      },
      {
        id: 'ID_04',
        slug: 'gratisiskolan',
        name: 'gratisiskolan.se',
        context: 'миграция · Швеция',
        operation: 'Переход на Magento 2.4, адаптация кастомных модулей',
        stack: 'Magento 2.4, PHP, custom modules',
        status: 'Запущен',
      },
      {
        id: 'ID_05',
        slug: 'sechat',
        name: 'sechat.ru',
        context: 'коммуникационный продукт',
        operation: 'Развитие продукта по задачам заказчика',
        stack: 'Laravel, WebSockets, Redis',
        status: 'В развитии',
      },
      {
        id: 'ID_06',
        slug: 'mozgovnet',
        name: 'mozgovnet.com',
        context: 'платежи · легаси',
        operation: 'Платёжные интеграции и восстановление легаси',
        stack: 'PHP, API, платежи',
        status: 'Стабилизирован',
      },
      {
        id: 'ID_07',
        slug: 'biznesmashin-ru',
        name: 'biznesmashin.ru',
        context: 'e-commerce · грузовая техника',
        operation: 'Интернет-магазин на «1С-Битрикс»: каталог, заказы, сопровождение',
        stack: '1С-Битрикс, PHP, MySQL',
        status: 'В проде',
      },
      {
        id: 'ID_08',
        slug: 'turexpertiza-ru',
        name: 'turexpertiza.ru',
        context: 'наука · расчёты',
        operation: 'Уникальная система подсчёта распределённой звёздности',
        stack: 'PHP, MySQL, прикладная математика',
        status: 'В эксплуатации',
      },
      {
        id: 'ID_09',
        slug: 'store-finaldraft-com',
        name: 'store.finaldraft.com',
        context: 'e-commerce · США',
        operation: 'Поддержка и развитие витрины на Magento',
        stack: 'Magento, PHP, MySQL',
        status: 'Долгий контур',
      },
      {
        id: 'ID_10',
        slug: 'nancysbeauty-com',
        name: 'nancysbeauty.com',
        context: 'e-commerce · США',
        operation: 'Сопровождение витрины и релизы под нагрузкой',
        stack: 'Magento, PHP, MySQL',
        status: 'В проде',
      },
    ],
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
      },
      {
        label: 'Frontend',
        value: 'Vue.js, React, Blade, Tailwind CSS, Figma (pixel-perfect)',
      },
      {
        label: 'AI-Driven',
        value: 'Cursor agents, workflow automation, LLM integrations',
      },
    ],
    stabilityLabel: 'Production stability',
    stabilityValue: '99.9%',
    aiContourLabel: 'AI in workflows',
    aiContourValue: 'faster delivery',
    activityLabel: 'Contour activity (12 mo.)',
    vizAriaLabel: 'Stability chart and activity heatmap',
  },
  mindset: {
    title: 'How I work',
    badge: 'PRINCIPLE',
    steps: [
      {
        phase: '01 · Diagnosis',
        title: 'Context before rewriting',
        detail:
          'I map business constraints, bottlenecks, and release risks before proposing a stack or a large refactor.',
      },
      {
        phase: '02 · Stability',
        title: 'Predictability over hype',
        detail:
          'Releases, monitoring, and rollback paths are designed so the team is not afraid to ship.',
      },
      {
        phase: '03 · Communication',
        title: 'Honest estimates, clear process',
        detail:
          'Scope, milestones, and done criteria are explicit — no surprise deadlines or hidden rework.',
      },
      {
        phase: '04 · Growth',
        title: 'Systems survive load',
        detail:
          'Architecture and ops include cache, queues, API contracts, and observability with headroom.',
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
    drumHint: 'The list scrolls in a loop — hover to pause.',
    entries: [
      {
        id: 'ID_01',
        slug: 'windowcleaner',
        name: 'windowcleaner.com',
        context: 'e-commerce · USA',
        operation: 'Magento 1→2, custom payments, releases under load',
        stack: 'Magento 1/2, PHP, MySQL, Docker',
        status: 'In prod · 5+ yrs',
      },
      {
        id: 'ID_02',
        slug: 'dostavka-zpr',
        name: 'dostavka-zpr.ru',
        context: 'logistics · CDEK',
        operation: 'Greenfield delivery service: pricing, API, business logic',
        stack: 'Laravel, PHP, CDEK API',
        status: 'Live',
      },
      {
        id: 'ID_03',
        slug: 'krymresurs',
        name: 'krymresurs.ru',
        context: 'enterprise · public site',
        operation: 'Document workflows, roles, document generation',
        stack: 'Laravel, PHP, API, integrations',
        status: 'In production',
      },
      {
        id: 'ID_04',
        slug: 'gratisiskolan',
        name: 'gratisiskolan.se',
        context: 'migration · Sweden',
        operation: 'Magento 2.4 migration, custom module adaptation',
        stack: 'Magento 2.4, PHP, custom modules',
        status: 'Launched',
      },
      {
        id: 'ID_05',
        slug: 'sechat',
        name: 'sechat.ru',
        context: 'communication product',
        operation: 'Product evolution per client roadmap',
        stack: 'Laravel, WebSockets, Redis',
        status: 'In progress',
      },
      {
        id: 'ID_06',
        slug: 'mozgovnet',
        name: 'mozgovnet.com',
        context: 'payments · legacy',
        operation: 'Payment integrations and legacy recovery',
        stack: 'PHP, API, payments',
        status: 'Stabilized',
      },
      {
        id: 'ID_07',
        slug: 'biznesmashin-ru',
        name: 'biznesmashin.ru',
        context: 'e-commerce · heavy machinery',
        operation: 'Bitrix store: catalog, checkout, ongoing support',
        stack: '1C-Bitrix, PHP, MySQL',
        status: 'Live',
      },
      {
        id: 'ID_08',
        slug: 'turexpertiza-ru',
        name: 'turexpertiza.ru',
        context: 'science · computation',
        operation: 'Custom distributed star-rating calculation system',
        stack: 'PHP, MySQL, applied math',
        status: 'In production',
      },
      {
        id: 'ID_09',
        slug: 'store-finaldraft-com',
        name: 'store.finaldraft.com',
        context: 'e-commerce · USA',
        operation: 'Magento storefront support and evolution',
        stack: 'Magento, PHP, MySQL',
        status: 'Long-running',
      },
      {
        id: 'ID_10',
        slug: 'nancysbeauty-com',
        name: 'nancysbeauty.com',
        context: 'e-commerce · USA',
        operation: 'Storefront support and releases under load',
        stack: 'Magento, PHP, MySQL',
        status: 'In prod',
      },
    ],
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
