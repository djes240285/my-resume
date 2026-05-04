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

export type CVContent = {
  metaTitle: string;
  metaDescription: string;
  navResume: string;
  navPortfolio: string;
  name: string;
  role: string;
  summary: string;
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
      projects: { name: string; detail: string; href?: string }[];
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
          { label: 'Backend', value: 'PHP (Laravel, Zend), Python, Bash' },
          { label: 'Frontend', value: 'JavaScript (Vue, React), HTML, CSS, jQuery' },
          { label: 'Инфраструктура', value: 'Docker, Nginx, Redis, ElasticSearch, CI/CD, Zabbix' },
          { label: 'Базы данных', value: 'MySQL, PostgreSQL, MongoDB, MS SQL' },
          { label: 'Инструменты', value: 'Git, Composer, NPM, WebStorm, VS Code, Postman' },
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
          },
          {
            name: 'gratisiskolan.se (Швеция)',
            detail: 'Миграция на Magento 2.4, кастомные модули и интеграции.',
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
          { label: 'Backend', value: 'PHP (Laravel, Zend), Python, Bash' },
          { label: 'Frontend', value: 'JavaScript (Vue, React), HTML, CSS, jQuery' },
          { label: 'Infrastructure', value: 'Docker, Nginx, Redis, ElasticSearch, CI/CD, Zabbix' },
          { label: 'Databases', value: 'MySQL, PostgreSQL, MongoDB, MS SQL' },
          { label: 'Tools', value: 'Git, Composer, NPM, WebStorm, VS Code, Postman' },
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
          },
          {
            name: 'gratisiskolan.se (Sweden)',
            detail: 'Magento 2.4 migration, custom modules and integrations.',
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
