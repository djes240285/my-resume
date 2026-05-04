export type Lang = 'ru' | 'en';

export const SUPPORTED_LANGS: Lang[] = ['ru', 'en'];

export const CIS_COUNTRY_CODES = new Set([
  'RU',
  'BY',
  'KZ',
  'UA',
  'AM',
  'AZ',
  'GE',
  'MD',
  'TJ',
  'TM',
  'UZ',
  'KG',
]);

export type PortfolioCard = {
  title: string;
  tag: string;
  body: string;
  href?: string;
};

/** Опциональный «лог» проекта как на концепте: статус / действие / итог */
export type ProjectLogLine = {
  status: string;
  action: string;
  result: string;
};

export type ProjectEntry = {
  name: string;
  detail: string;
  href?: string;
  log?: ProjectLogLine;
};

export type CareerMilestone = {
  phase: string;
  title: string;
  detail: string;
};

export type CoreStat = {
  label: string;
  value: string;
};

export type TerminalLabels = {
  email: string;
  telegram: string;
  linkedin: string;
  about: string;
  collaboration: string;
  help: string;
  projects: string;
  successPath: string;
  highlights: string;
  partnerNote: string;
  logStatus: string;
  logAction: string;
  logResult: string;
  coreStats: string;
  tech: string;
  approach: string;
};

export type CVContent = {
  metaTitle: string;
  metaDescription: string;
  navResume: string;
  navPortfolio: string;
  name: string;
  role: string;
  summary: string;
  /** Строки «boot» в шапке резюме */
  bootLines: string[];
  /** Подписи секций в стиле [BRACKETS] для терминального UI */
  terminalLabels: TerminalLabels;
  /** Короткие метрики «ядра» опыта */
  coreStats: CoreStat[];
  /** Визуальный «путь успеха» — этапы карьеры */
  careerPath: CareerMilestone[];
  contact: {
    emails: string[];
    /** Если пусто — блок локации не показываем */
    location?: string;
    linkedinLabel: string;
    linkedinHref: string;
  };
  sections: {
    about: { title: string; body: string };
    collaboration: { title: string; body: string };
    help: { title: string; items: string[] };
    tech: { title: string; groups: { label: string; value: string }[] };
    experience: {
      title: string;
      partnerNote: string;
      highlights: string[];
      selectedTitle: string;
      projects: ProjectEntry[];
    };
    approach: {
      title: string;
      pillars: { title: string; body: string }[];
    };
  };
  footerQuote: string;
  portfolio: {
    metaTitle: string;
    metaDescription: string;
    title: string;
    lead: string;
    introTitle: string;
    introBody: string;
    cards: PortfolioCard[];
    ctaResume: string;
  };
};

export const cv: Record<Lang, CVContent> = {
  ru: {
    metaTitle: 'Евгений Жуков — Fullstack / архитектор решений',
    metaDescription:
      'Резюме: 15+ лет веб-разработки, e-commerce, корпоративные и высоконагруженные системы, интеграции, архитектура и DevOps.',
    navResume: 'Резюме',
    navPortfolio: 'Портфолио',
    name: 'Евгений Жуков',
    role: 'Fullstack разработчик / архитектор решений',
    summary:
      'Помогаю бизнесу закрывать сложные технические задачи: от стабилизации легаси до масштабируемых платформ и роста конверсии. Строю решения, которые можно сопровождать и развивать годами.',
    contact: {
      emails: ['evgenii.zhukov.igorevich@gmail.com', 'evgenii.z.i@yandex.ru'],
      linkedinLabel: 'linkedin.com/in/eugene-zhukov-24a96164',
      linkedinHref: 'https://www.linkedin.com/in/eugene-zhukov-24a96164/',
    },
    bootLines: [
      '> инициализация профиля...',
      '> загрузка опыта...',
      '> система готова',
    ],
    terminalLabels: {
      email: '[EMAIL]',
      telegram: '[TELEGRAM]',
      linkedin: '[LINKEDIN]',
      about: '[ОБО МНЕ]',
      collaboration: '[ФОРМАТ РАБОТЫ]',
      help: '[ЧЕМ ПОЛЕЗЕН]',
      projects: '[ЖУРНАЛ ПРОЕКТОВ]',
      successPath: '[ПУТЬ РОСТА]',
      highlights: '[СИГНАЛЫ СИСТЕМЫ]',
      partnerNote: '[ПАРТНЁР · ВИТРИНА]',
      logStatus: 'СТАТУС',
      logAction: 'КОНТЕКСТ',
      logResult: 'ИТОГ',
      coreStats: '[ЯДРО МЕТРИК]',
      tech: '[ТЕХНОСТЕК]',
      approach: '[ПОДХОД К РАБОТЕ]',
    },
    coreStats: [
      { label: 'Лет в продакшене', value: '15+' },
      { label: 'Задач и релизов', value: '1000+' },
      { label: 'Домены', value: 'E-com · корп · NDA' },
      { label: 'Миграции Magento', value: 'M1→2 · M2.4' },
      { label: 'Интеграции', value: 'API · webhooks · банки' },
    ],
    careerPath: [
      {
        phase: '2009–2012',
        title: 'Старт: веб и e-commerce',
        detail: 'Вёрстка, PHP, первые коммерческие и корпоративные сайты, работа с заказчиком напрямую.',
      },
      {
        phase: '2013–2016',
        title: 'Крупные витрины и легаси',
        detail: 'Magento, долгие релизы, платёжные и складские сценарии, сопровождение под нагрузкой.',
      },
      {
        phase: '2017–2020',
        title: 'Архитектура и миграции',
        detail: 'Платформенные переходы, профилирование, кеш и поиск, ответственность за контуры системы.',
      },
      {
        phase: '2021–2024',
        title: 'Корпоративные контуры',
        detail: 'NDA, документооборот, многорольевые кабинеты, мониторинг и эксплуатация.',
      },
      {
        phase: '2025–',
        title: 'ИИ-инструменты и качество',
        detail: 'LLM в рутине и ревью, фокус на измеримом эффекте и устойчивой архитектуре.',
      },
    ],
    sections: {
      about: {
        title: 'Обо мне',
        body:
          'Более 15 лет в веб-разработке: e-commerce, корпоративные системы и высоконагруженные решения. Подключаюсь к проектам на этапе «всё горит»: восстановление стабильности, миграции платформ, оптимизация узких мест. Системно смотрю на продукт — от архитектуры до эксплуатации. Активно использую современные инструменты и ИИ-помощников, чтобы ускорять рутину и повышать качество решений.',
      },
      collaboration: {
        title: 'Формат сотрудничества',
        body:
          'Сейчас не веду деятельность как индивидуальный предприниматель по семейным обстоятельствам; коммерческие проекты закрываю через проверенного партнёра с договором и прозрачной отчётностью с его стороны. При необходимости подключаюсь под процесс заказчика или через юрлицо партнёра — формат и документооборот согласуем заранее. Это не влияет на качество и зону ответственности по задачам: сроки, коммуникация и результат остаются на мне.',
      },
      help: {
        title: 'Чем могу быть полезен',
        items: [
          'Восстановление и стабилизация сложных легаси-систем',
          'Миграции платформ и смена технологического стека без остановки бизнеса',
          'Профилирование и ускорение: базы, кеш, очереди, поиск, фронтенд',
          'Проектирование архитектуры и контрактов интеграций',
          'Полный цикл: backend, frontend, инфраструктура, CI/CD, мониторинг',
        ],
      },
      tech: {
        title: 'Технологии',
        groups: [
          {
            label: 'Backend',
            value:
              'PHP: Magento 1/2, Laravel, Zend/Laminas — модули, интеграции, performance. Python: asyncio, aiogram/Telegram-боты, скрипты и утилиты под задачу; при необходимости REST (FastAPI-уровень по сценарию). Bash для автоматизации и деплоя.',
          },
          {
            label: 'Frontend',
            value:
              'HTML/CSS, JavaScript (Vue, React), сборки NPM/Vite, jQuery и легаси-интерфейсы без «ломания продакшена». Внимание к скорости загрузки, критическому CSS и практичной доступности.',
          },
          {
            label: 'Инфраструктура',
            value:
              'Docker / docker-compose, Nginx, Redis, Elasticsearch/OpenSearch, очереди и фоновые воркеры, CI/CD (GitLab/GitHub), Zabbix/мониторинг, логирование и алерты.',
          },
          {
            label: 'Базы данных',
            value:
              'MySQL/MariaDB (индексы, репликации, миграции схем), PostgreSQL, MongoDB, MS SQL — проектирование запросов, миграции данных, бэкапы и восстановление.',
          },
          {
            label: 'Инструменты и практики',
            value:
              'Git (flow, rebase при необходимости), Composer, NPM, WebStorm/VS Code, Postman/HTTP-клиенты, OpenAPI-контракты. Code review, документация для онбординга, работа с Jira/трекерами.',
          },
        ],
      },
      experience: {
        title: 'Опыт и проекты',
        partnerNote:
          'Часть публичных сайтов и кейсов представлена на портфолио партнёра (webstartechnology.ru): там же описания отраслей и задач клиентов. Ниже — мой вклад в отдельные направления; внутренние системы и NDA-проекты по смыслу совпадают, но без публичной витрины.',
        highlights: [
          '1000+ проектов и задач разной сложности',
          'Рост конверсии и скорости работы за счёт архитектурных и продуктовых улучшений',
          'Успешные миграции Magento и долгосрочная поддержка крупных магазинов',
        ],
        selectedTitle: 'Избранные проекты',
        projects: [
          {
            name: 'windowcleaner.com (США)',
            detail: '5+ лет разработки и сопровождения; миграция Magento 1 → 2.',
            log: {
              status: 'PROD',
              action: 'Magento 1 → 2, релизы, платежи и операционные сценарии',
              result: 'Долгосрочная стабильная витрина и бизнес-процессы',
            },
          },
          {
            name: 'gratisiskolan.se (Швеция)',
            detail: 'Миграция на Magento 2.4, кастомные модули и интеграции.',
            log: {
              status: 'OK',
              action: 'Magento 2.4, кастомные модули, внешние интеграции',
              result: 'Миграция и развитие в продакшене',
            },
          },
          {
            name: 'AI Telegram-бот: напоминания и микро-коучинг (Python)',
            detail:
              'Собственная разработка: бот напоминает о задачах и «мыслях», которые пользователь сам помечает важными, задаёт уточняющие вопросы по настраиваемому сценарию. Значительное время ушло на проработку UX диалога и устойчивого состояния.',
            log: {
              status: 'OK',
              action: 'Python · aiogram · FSM · асинхронные сценарии опроса',
              result: 'Рабочий прототип для личного использования; сильный опыт проектирования диалогов',
            },
          },
          {
            name: 'КПСК (страхование) — кейс партнёра',
            detail:
              'Работа с системой банка: развитие и доработка уже существующего проекта под задачи страховой витрины и интеграций.',
            href: 'https://webstartechnology.ru/kpsk',
          },
          {
            name: 'Фитнес-клуб «Гагарин»',
            detail: 'Корпоративный сайт: структура, вёрстка, интеграции и сопровождение по процессу партнёра.',
            href: 'https://webstartechnology.ru/gagarin',
          },
          {
            name: 'Музыкальный театр Крыма, Завод Пневматика, концертный зал ККО',
            detail:
              'Участие в отдельных блоках функциональности и доработках в рамках проектов партнёра (по задачам и этапам).',
            href: 'https://webstartechnology.ru/muzteatr',
          },
          {
            name: '102 ПЭС',
            detail:
              'Отдельный корпоративный контур для техников, клиентов, менеджеров и администратора — под процессы заказчика; публичный сайт — рекламная оболочка поверх решения.',
            href: 'https://webstartechnology.ru/102pes',
          },
          {
            name: 'Крымресурс — обучающий центр',
            detail:
              'Внутренний корпоративный пласт: обучение, техники, ответственные лица, менеджеры, полный документооборот, генерация документов, объединение данных из множества приложений в единую модель; публичный krymresurs.ru — витрина, не финальное описание всей системы.',
            href: 'https://krymresurs.ru/',
          },
          {
            name: 'Медицинский колл-центр (архив)',
            detail:
              'Закрытая система под бизнес заказчика; опиралась на контур КПСК (страховые случаи, больницы). Проект был технически сложным; сейчас не развивается по внешним причинам заказчика.',
          },
          {
            name: 'Корпоративные решения (NDA)',
            detail: 'Мониторинг, управление и интеграции для энергетики, фитнеса и образования без публичного доступа.',
          },
        ],
      },
      approach: {
        title: 'Подход к работе',
        pillars: [
          {
            title: 'Самостоятельность',
            body: 'Беру ответственность за результат и довожу задачи до конца без лишней бюрократии.',
          },
          {
            title: 'Системное мышление',
            body: 'Связываю бизнес-цели, архитектуру, код и эксплуатацию в одну картину.',
          },
          {
            title: 'Ownership',
            body: 'Не «отдал таск» — а владею проблемой: ищу корень, предлагаю варианты, внедряю.',
          },
          {
            title: 'Непрерывное обучение',
            body: 'Слежу за стеком и практиками индустрии; быстро осваиваю то, что нужно проекту.',
          },
        ],
      },
    },
    footerQuote:
      'Цель — не просто написать код, а построить решения, которые двигают бизнес вперёд.',
    portfolio: {
      metaTitle: 'Портфолио — Евгений Жуков',
      metaDescription:
        'Кейсы: Magento, корпоративные системы, проекты с Веб-Стар Технологии, интеграции и внутренние контуры.',
      title: 'Портфолио',
      lead: 'Публичные витрины и описания кейсов — частично на сайте партнёра; здесь — сжатый обзор и ссылки.',
      introTitle: 'Про сайт и SEO',
      introBody:
        'Этот сайт — лёгкий статический Astro: быстрый HTML, предсказуемая вёрстка, нормальные заголовки h1–h3, meta description, Open Graph и разметка Person (JSON-LD) для поисковиков. У партнёра на webstartechnology.ru — отдельные URL под кейсы, тексты под отрасль и коммерческие блоки: это удобно для SEO под услуги студии. У личного резюме цели другие (поиск по имени и роли), поэтому достаточно чистой структуры, скорости и честных описаний без перегруза ключевыми словами.',
      cards: [
        {
          title: 'Веб-Стар Технологии — кейсы',
          tag: 'Партнёр · Симферополь',
          body: 'Каталог проектов и отраслевые страницы: удобно заимствовать идею «один URL — один кейс» и явные блоки «задача / стек / результат».',
          href: 'https://webstartechnology.ru',
        },
        {
          title: 'КПСК, Гагарин, 102 ПЭС',
          tag: 'Корпоративные сайты',
          body: 'От страховой витрины до кастомных кабинетов и рекламных оболочек — см. ссылки на страницы кейсов партнёра.',
          href: 'https://webstartechnology.ru/kpsk',
        },
        {
          title: 'Крымресурс',
          tag: 'Корпоративный контур',
          body: 'Публичная витрина; основная система — внутренний документооборот и объединение данных.',
          href: 'https://krymresurs.ru/',
        },
      ],
      ctaResume: 'К резюме',
    },
  },
  en: {
    metaTitle: 'Eugene Zhukov — Fullstack developer / solution architect',
    metaDescription:
      'Resume: 15+ years in web development, e-commerce, enterprise and high-load systems, integrations, architecture and DevOps.',
    navResume: 'Resume',
    navPortfolio: 'Portfolio',
    name: 'Eugene Zhukov',
    role: 'Fullstack developer / solution architect',
    summary:
      'I help businesses solve hard technical problems—from stabilizing legacy systems to scalable platforms and conversion growth. I build solutions that are maintainable and evolve for years.',
    contact: {
      emails: ['evgenii.zhukov.igorevich@gmail.com', 'evgenii.z.i@yandex.ru'],
      linkedinLabel: 'linkedin.com/in/eugene-zhukov-24a96164',
      linkedinHref: 'https://www.linkedin.com/in/eugene-zhukov-24a96164/',
    },
    bootLines: [
      '> initializing profile...',
      '> loading experience...',
      '> system ready',
    ],
    terminalLabels: {
      email: '[EMAIL]',
      telegram: '[TELEGRAM]',
      linkedin: '[LINKEDIN]',
      about: '[ABOUT ME]',
      collaboration: '[ENGAGEMENT]',
      help: '[HOW I HELP]',
      projects: '[PROJECT LOG]',
      successPath: '[SUCCESS PATH]',
      highlights: '[SYSTEM SIGNALS]',
      partnerNote: '[PARTNER · SHOWCASE]',
      logStatus: 'STATUS',
      logAction: 'CONTEXT',
      logResult: 'OUTCOME',
      coreStats: '[CORE STATS]',
      tech: '[TECH STACK]',
      approach: '[WORK APPROACH]',
    },
    coreStats: [
      { label: 'Years in production', value: '15+' },
      { label: 'Tasks & releases', value: '1000+' },
      { label: 'Domains', value: 'E-com · enterprise · NDA' },
      { label: 'Magento migrations', value: 'M1→2 · M2.4' },
      { label: 'Integrations', value: 'API · webhooks · banks' },
    ],
    careerPath: [
      {
        phase: '2009–2012',
        title: 'Start: web & e-commerce',
        detail: 'Markup, PHP, first commercial and corporate sites, direct client collaboration.',
      },
      {
        phase: '2013–2016',
        title: 'Large storefronts & legacy',
        detail: 'Magento, long release cycles, payments/warehouse flows, production support.',
      },
      {
        phase: '2017–2020',
        title: 'Architecture & migrations',
        detail: 'Platform moves, profiling, cache & search, owning broader system boundaries.',
      },
      {
        phase: '2021–2024',
        title: 'Enterprise layers',
        detail: 'NDA work, document workflows, multi-role portals, monitoring and operations.',
      },
      {
        phase: '2025–',
        title: 'AI tooling & quality',
        detail: 'LLMs for routine/review, focus on measurable impact and durable architecture.',
      },
    ],
    sections: {
      about: {
        title: 'About me',
        body:
          '15+ years in web development: e-commerce, enterprise systems, and high-load solutions. I often join when stability is at risk: recovery, platform migrations, and performance bottlenecks. I think end-to-end—from architecture to operations. I actively use modern tooling and AI assistants to speed up routine work and improve quality.',
      },
      collaboration: {
        title: 'How engagements work',
        body:
          'I am not operating as a sole proprietor due to family circumstances; commercial work is delivered through a trusted partner arrangement with contracts and billing on their side. When needed, I onboard under the client’s process or via the partner’s legal entity—paperwork is agreed upfront. This does not change ownership of engineering outcomes: timelines, communication, and delivery remain on me.',
      },
      help: {
        title: 'How I can help',
        items: [
          'Recovering and stabilizing complex legacy systems',
          'Platform migrations and stack changes without stopping the business',
          'Profiling and acceleration: databases, cache, queues, search, frontend',
          'Architecture design and integration contracts',
          'Full cycle: backend, frontend, infrastructure, CI/CD, monitoring',
        ],
      },
      tech: {
        title: 'Tech stack',
        groups: [
          {
            label: 'Backend',
            value:
              'PHP: Magento 1/2, Laravel, Zend/Laminas — modules, integrations, performance work. Python: asyncio, aiogram/Telegram bots, scripting; REST-style services when the project calls for it (e.g. FastAPI-level patterns). Bash for automation and deploy glue.',
          },
          {
            label: 'Frontend',
            value:
              'HTML/CSS, JavaScript (Vue, React), NPM/Vite builds, jQuery/legacy UIs evolved without breaking production. Practical performance (critical paths, payload) and sensible accessibility defaults.',
          },
          {
            label: 'Infrastructure',
            value:
              'Docker / compose, Nginx, Redis, Elasticsearch/OpenSearch, queues & background workers, CI/CD (GitLab/GitHub), Zabbix/monitoring, logging and alerting.',
          },
          {
            label: 'Databases',
            value:
              'MySQL/MariaDB (indexes, replication-aware design, schema migrations), PostgreSQL, MongoDB, MS SQL — query design, data migrations, backup/restore discipline.',
          },
          {
            label: 'Tools & practices',
            value:
              'Git (team flows, rebase when it helps), Composer, NPM, WebStorm/VS Code, Postman/HTTP clients, OpenAPI-style contracts. Code review, onboarding docs, Jira/issue trackers.',
          },
        ],
      },
      experience: {
        title: 'Experience & projects',
        partnerNote:
          'Some public sites and case pages live on my partner’s portfolio (webstartechnology.ru), with industry context and client goals. Below is my contribution; internal systems and NDA work are described at a high level only.',
        highlights: [
          '1000+ projects and tasks across a wide complexity range',
          'Conversion and performance improvements driven by architecture and product changes',
          'Successful Magento migrations and long-term support for large stores',
        ],
        selectedTitle: 'Selected projects',
        projects: [
          {
            name: 'windowcleaner.com (USA)',
            detail: '5+ years of development and support; Magento 1 → 2 migration.',
            log: {
              status: 'PROD',
              action: 'Magento 1 → 2, releases, payments and operational flows',
              result: 'Long-running stable storefront and business operations',
            },
          },
          {
            name: 'gratisiskolan.se (Sweden)',
            detail: 'Magento 2.4 migration, custom modules and integrations.',
            log: {
              status: 'OK',
              action: 'Magento 2.4, custom modules, external integrations',
              result: 'Shipped migration and ongoing production evolution',
            },
          },
          {
            name: 'AI Telegram bot: reminders & micro-coaching (Python)',
            detail:
              'Personal build: reminders for tasks and “thoughts” the user marks as important, follow-up questions driven by configurable flows. Significant time spent on dialog UX and durable conversation state.',
            log: {
              status: 'OK',
              action: 'Python · aiogram · FSM · async prompting flows',
              result: 'Working personal prototype; strong dialog design and state-handling experience',
            },
          },
          {
            name: 'KPSK (insurance) — partner case page',
            detail:
              'Work on a bank-related system: extending and hardening an existing project for the insurance front office and integrations.',
            href: 'https://webstartechnology.ru/kpsk',
          },
          {
            name: 'Gagarin fitness club',
            detail: 'Corporate site: structure, implementation, integrations, and ongoing work within the partner delivery process.',
            href: 'https://webstartechnology.ru/gagarin',
          },
          {
            name: 'Crimean Musical Theatre, Pneumo plant, KKO concert hall',
            detail:
              'Contributions to specific functional areas and iterations inside partner-led projects (scope varied by phase).',
            href: 'https://webstartechnology.ru/muzteatr',
          },
          {
            name: '102 PES',
            detail:
              'Dedicated corporate layer for technicians, clients, managers, and admins tailored to the client’s operations; the public site is the marketing shell around that solution.',
            href: 'https://webstartechnology.ru/102pes',
          },
          {
            name: 'Krymresurs training center',
            detail:
              'Internal corporate stack: training workflows, technicians, responsible officers, managers, full document lifecycle, generation, and merging data from many apps into one model; krymresurs.ru is the public wrapper, not the full system story.',
            href: 'https://krymresurs.ru/',
          },
          {
            name: 'Medical call center (archived)',
            detail:
              'A bespoke system for the client’s operations, tied to the KPSK insurance/hospital workflow. Technically demanding; no longer active for external client reasons.',
          },
          {
            name: 'Corporate solutions (NDA)',
            detail: 'Monitoring, management, and integrations for energy, fitness, and education without public access.',
          },
        ],
      },
      approach: {
        title: 'How I work',
        pillars: [
          {
            title: 'Independence',
            body: 'I own outcomes and push work to completion without unnecessary overhead.',
          },
          {
            title: 'Systems thinking',
            body: 'I connect business goals, architecture, code, and operations into one coherent picture.',
          },
          {
            title: 'Ownership',
            body: 'I don’t “hand off a ticket”—I own the problem, find root causes, propose options, implement.',
          },
          {
            title: 'Continuous learning',
            body: 'I keep up with the stack and industry practices; I ramp quickly on what the project needs.',
          },
        ],
      },
    },
    footerQuote:
      'The goal is not just to write code, but to build solutions that drive business forward.',
    portfolio: {
      metaTitle: 'Portfolio — Eugene Zhukov',
      metaDescription:
        'Cases: Magento, enterprise systems, WebStar Technology projects, integrations and internal platforms.',
      title: 'Portfolio',
      lead: 'Public case pages partly live on the partner site; this page is a compact map with links.',
      introTitle: 'This site and SEO',
      introBody:
        'This is a lightweight static Astro site: fast HTML, predictable headings (h1–h3), meta descriptions, Open Graph, and Person JSON-LD. The partner site uses dedicated URLs per case and service-oriented copy—great for local commercial SEO. A personal resume targets different queries (name + role), so clean structure, speed, and accurate copy beat keyword stuffing.',
      cards: [
        {
          title: 'WebStar Technology — case hub',
          tag: 'Partner · Simferopol',
          body: 'Project catalog and industry pages: worth mirroring the pattern “one URL per case” with explicit goal / stack / outcome blocks.',
          href: 'https://webstartechnology.ru',
        },
        {
          title: 'KPSK, Gagarin, 102 PES',
          tag: 'Corporate web',
          body: 'From insurance storefronts to custom portals and marketing shells—see the partner case pages.',
          href: 'https://webstartechnology.ru/kpsk',
        },
        {
          title: 'Krymresurs',
          tag: 'Corporate layer',
          body: 'Public site; the main system is internal document flow and unified data from multiple sources.',
          href: 'https://krymresurs.ru/',
        },
      ],
      ctaResume: 'Back to resume',
    },
  },
};

export function isLang(value: string | undefined): value is Lang {
  return value === 'ru' || value === 'en';
}

export function getCv(lang: Lang): CVContent {
  return cv[lang];
}
