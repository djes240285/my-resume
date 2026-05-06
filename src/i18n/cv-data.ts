import { TECH_STACK_DOC_HREFS } from '../config/tech-stack-docs';

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

export type ProjectOutboundKind = 'partner' | 'customer' | 'website';

export type ProjectOutbound = {
  href: string;
  kind: ProjectOutboundKind;
};

export type ProjectEntry = {
  name: string;
  detail: string;
  /** Одна внешняя ссылка (по умолчанию подпись «Сайт»). Не используйте вместе с links. */
  href?: string;
  /** Несколько ссылок с разными подписями (кейс партнёра, сайт заказчика). */
  links?: ProjectOutbound[];
  log?: ProjectLogLine;
};

/** Проекты сгруппированы по периоду работы (в данных — от новых к старым). Внутри группы порядок = от более значимого. */
export type ExperienceProjectGroup = {
  period: string;
  /** Одна строка: зачем этот срез по времени (снижает ощущение «устаревшего» опыта). */
  context?: string;
  projects: ProjectEntry[];
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

/** Строка «файла» в блоке техностека (иконка = slug simple-icons v13) */
export type TechStackFileEntry = {
  name: string;
  ext: string;
  icon?: string;
  hint?: string;
  /** Прямая ссылка на документацию; если не задана, подставляется из `TECH_STACK_DOC_HREFS` по `name`, когда есть */
  docHref?: string;
};

/** Ветка роадмапа: блоки без нумераии (CMS → рантайм → UI → …) */
export type TechRoadmapLane = {
  title: string;
  summary: string;
  files: TechStackFileEntry[];
};

export type TerminalLabels = {
  email: string;
  telegram: string;
  max: string;
  /** Текст ссылки на профиль MAX (под телефоном) */
  maxProfileLink: string;
  linkedin: string;
  about: string;
  collaboration: string;
  help: string;
  projects: string;
  successPath: string;
  /** Неоновый бейдж у этапа «путь роста» (концепт SUCCESS / локализация) */
  successPathBadge: string;
  highlights: string;
  partnerNote: string;
  logStatus: string;
  logAction: string;
  logResult: string;
  coreStats: string;
  tech: string;
  approach: string;
  /** Подпись строки «статус» в HUD hero (живое значение по времени МСК) */
  hudStatus: string;
  /** Заголовок строки «окна» в правом верхнем углу первого terminal-module (декор) */
  heroWindowTitle: string;
  /** Заголовок мини-«окна» над столбцом контактов в hero (декор) */
  contactWindowTitle: string;
  /** Кнопка «вернуть» блок контактов после закрытия */
  contactRestore: string;
  contactWinMinAria: string;
  contactWinMaxAria: string;
  contactWinCloseAria: string;
  contactCopyEmailAria: string;
  contactCopyPhoneAria: string;
  contactCopied: string;
  /** Видимое уведомление после копирования (toast) */
  contactCopyToast: string;
  /** Копировать URL (Telegram, MAX, LinkedIn) */
  contactCopyLinkAria: string;
  /** Маленькая подпись у блока периода в списке проектов («эпоха») */
  projectEraBadge: string;
  projectLinkPartner: string;
  projectLinkCustomer: string;
  projectLinkWebsite: string;
  partnerShowcaseLinkAria: string;
  partnerShowcaseCta: string;
};

/** Тексты статуса по времени Europe/Moscow (скрипт на клиенте) */
export type HeroLiveStatus = {
  available: string;
  unavailable: string;
  lunch: string;
};

/** Консольный «питч» в hero: заголовок + строки после «>» (печать по одной) */
export type HeroConsoleScript = {
  title: string;
  commands: string[];
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
  /** Короткие HUD-строки в правой колонке hero (наполнение в стиле концепта; без строки статуса — она живёт отдельно) */
  heroHudFacts: { label: string; value: string }[];
  /** Статус «на связи» по времени МСК: 07–12, 14–22 — available; 22–07 — unavailable; 12–14 — lunch */
  heroLiveStatus: HeroLiveStatus;
  /** Блок «консоль» под ролью: зелёные строки с «>» и эффект печати */
  heroConsole: HeroConsoleScript;
  contact: {
    emails: string[];
    /** Если пусто — блок локации не показываем */
    location?: string;
    linkedinLabel: string;
    linkedinHref: string;
    /** Ссылка на профиль в мессенджере MAX */
    maxHref: string;
    /** Телефон под тегом [МАХ]/[MAX] (отображение) */
    maxInvite: string;
    /** Номер для tel: и копирования (E.164, без пробелов) */
    maxTel: string;
  };
  sections: {
    about: { title: string; body: string };
    collaboration: { title: string; body: string };
    help: { title: string; items: string[] };
    tech: { title: string; lanes: TechRoadmapLane[] };
    experience: {
      title: string;
      partnerNote: string;
      /** Явная ссылка на витрину партнёра (под текстом блока). */
      partnerShowcase?: { href: string; label: string };
      highlights: string[];
      selectedTitle: string;
      /** Подпись под заголовком: хронология / эпохи */
      timelineLead?: string;
      projectGroups: ExperienceProjectGroup[];
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
      'Инициализация решения: инженерная чистота против хаоса, цифровой актив вместо сметы по часам; три этапа и готовность к масштабированию.',
    contact: {
      emails: ['evgenii.zhukov.igorevich@gmail.com', 'evgenii.z.i@yandex.ru'],
      linkedinLabel: 'linkedin.com/in/eugene-zhukov-24a96164',
      linkedinHref: 'https://www.linkedin.com/in/eugene-zhukov-24a96164/',
      maxHref:
        'https://max.ru/u/f9LHodD0cOIQKhdp9uLyThPkZcKQRbIzWXiog-j90GhkeLT9cvMTqo9ytpM',
      maxInvite: '+7 978 160 49 74',
      maxTel: '+79781604974',
    },
    heroHudFacts: [
      { label: 'ФОРМАТ РАБОТЫ', value: 'УДАЛЁННО' },
      { label: 'ОПЫТ', value: '15+ ЛЕТ' },
      { label: 'ДОСТУПНОСТЬ', value: 'ОТКРЫТ К ПРОЕКТАМ' },
    ],
    heroLiveStatus: {
      available: 'ONLINE · НА СВЯЗИ',
      unavailable: 'OFFLINE · НЕ ДОСТУПЕН (МСК 22–07)',
      lunch: 'AWAY · ОБЕД · МОГУ ОТСУТСТВОВАТЬ (12–14 МСК)',
    },
    heroConsole: {
      title: 'ИНИЦИАЛИЗАЦИЯ РЕШЕНИЯ...',
      commands: [
        'Инженерная чистота против технического хаоса.',
        'Вместо бесконечной сметы «по часам» я создаю цифровой актив: система, которая работает на вас, а не требует постоянного внимания.',
        '[01/03] ЛИКВИДАЦИЯ ХАОСА',
        'Реанимация сложных систем и стабилизация легаси. Превращаю накопленный техдолг в надёжный фундамент, готовый к нагрузкам.',
        '[02/03] АРХИТЕКТУРА РОСТА',
        'Масштабируемые платформы и внедрение ИИ-контуров. Использую AI-агентов для кратного ускорения разработки и поставки решений.',
        '[03/03] ЭКОНОМИКА РЕЗУЛЬТАТА',
        'Фокус на конверсии и автономности. Вы получаете архитектуру, которая приносит прибыль и не требует переписывания «с нуля» каждый квартал.',
        '[STATUS] СИСТЕМА ГОТОВА К МАСШТАБИРОВАНИЮ',
      ],
    },
    bootLines: [
      '> инициализация профиля...',
      '> загрузка опыта...',
      '> система готова',
    ],
    terminalLabels: {
      email: '[EMAIL]',
      telegram: '[TELEGRAM]',
      max: '[МАХ]',
      maxProfileLink: 'Профиль в MAX →',
      linkedin: '[LINKEDIN]',
      about: '[ОБО МНЕ]',
      collaboration: '[ФОРМАТ РАБОТЫ]',
      help: '[ЧЕМ ПОЛЕЗЕН]',
      projects: '[ЖУРНАЛ ПРОЕКТОВ]',
      successPath: '[ПУТЬ РОСТА]',
      successPathBadge: 'УСПЕХ',
      highlights: '[СИГНАЛЫ СИСТЕМЫ]',
      partnerNote: '[ПАРТНЁР · ВИТРИНА]',
      logStatus: 'СТАТУС',
      logAction: 'КОНТЕКСТ',
      logResult: 'ИТОГ',
      coreStats: '[СНИМОК ПРАКТИКИ]',
      tech: '[ТЕХНОСТЕК]',
      approach: '[ПОДХОД К РАБОТЕ]',
      hudStatus: 'СТАТУС',
      heroWindowTitle: 'СИСТЕМА: EUGENE_ZHUKOV.EXE',
      contactWindowTitle: 'СИСТЕМА: КОНТАКТЫ.CFG',
      contactRestore: 'Показать КОНТАКТЫ.CFG',
      contactWinMinAria: 'Свернуть блок контактов',
      contactWinMaxAria: 'Развернуть блок контактов в колонке',
      contactWinCloseAria: 'Скрыть блок контактов',
      contactCopyEmailAria: 'Копировать email в буфер',
      contactCopyPhoneAria: 'Копировать номер в буфер',
      contactCopied: 'Скопировано',
      contactCopyToast: 'Скопировано в буфер обмена',
      contactCopyLinkAria: 'Копировать ссылку',
      projectEraBadge: 'эпоха',
      projectLinkPartner: 'Кейс партнёра',
      projectLinkCustomer: 'Сайт заказчика',
      projectLinkWebsite: 'Сайт',
      partnerShowcaseLinkAria: 'Сайт партнёра — витрина кейсов (новая вкладка)',
      partnerShowcaseCta: 'Витрина партнёра',
    },
    coreStats: [
      { label: 'Лет в продакшене', value: '15+' },
      {
        label: 'Горизонт ответственности',
        value: 'продукт · интеграции · эксплуатация',
      },
      { label: 'Обычные поля', value: 'E-com · корп · NDA' },
      { label: 'Характерные зоны', value: 'Laravel · новые системы с нуля · редизайн · переход на другие платформы до результата · Magento — легаси и миграции' },
      { label: 'Стыки с внешним миром', value: 'API · webhooks · банки' },
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
          'Когда прод и выручку уже нельзя «поставить на паузу», а любое изменение ощущается как лотерея — я подключаюсь за спокойной диагностикой и исправлениями, которые переживут следующий релиз, а не красивым обещанием «переписать всё». Более 15 лет в e-commerce, корпоративных контурах и под нагрузкой; смотрю на систему целиком — от архитектуры до эксплуатации. Современный стек и ИИ — только там, где ускоряют работу и не размывают ответственность за качество.',
      },
      collaboration: {
        title: 'Формат сотрудничества',
        body:
          'Пишите мне напрямую; юридически проект чаще оформляю через проверенного партнёра — договор и отчётность с его стороны. Процесс и документы согласуем до старта — под вашу модель или через юрлицо партнёра. На инженерной стороне ничего не перекладывается: сроки, коммуникация и результат остаются на мне.',
      },
      help: {
        title: 'Чем могу быть полезен',
        items: [
          'Легаси: вернуть предсказуемость релизов вместо тушения пожаров',
          'Миграции и смена стека без остановки витрины и критичных процессов',
          'Профилирование и ускорение — базы, кеш, очереди, поиск, фронтенд',
          'Архитектура и контракты интеграций, чтобы связки не ломались при росте',
          'Полный цикл в одних руках: backend, frontend, инфраструктура, CI/CD, мониторинг',
        ],
      },
      tech: {
        title: 'Технологии',
        lanes: [
          {
            title: 'CMS и платформы контента',
            summary:
              'Витрины, каталоги, редакционные процессы и интеграции — от классических CMS до headless и облачных контент‑хабов.',
            files: [
              {
                name: 'Magento · Open Source / Adobe Commerce',
                ext: '.xml',
                icon: 'magento',
                hint: 'M1→M2, модули, enterprise-витрины, performance, миграции',
              },
              {
                name: 'WordPress',
                ext: '.php',
                icon: 'wordpress',
                hint: 'темы, плагины, многосайтовость, безопасные обновления',
              },
              {
                name: 'WooCommerce',
                ext: '.php',
                icon: 'woocommerce',
                hint: 'каталоги, оплата, оформление заказов поверх WordPress',
              },
              {
                name: 'Shopify',
                ext: '.liquid',
                icon: 'shopify',
                hint: 'облачные витрины, темы Liquid, app-контуры',
              },
              {
                name: 'Drupal',
                ext: '.php',
                icon: 'drupal',
                hint: 'корпоративные порталы, сложные типы контента',
              },
              {
                name: 'Strapi',
                ext: '.json',
                icon: 'strapi',
                hint: 'headless API, админка, расширения под проект',
              },
              {
                name: 'Contentful',
                ext: '.graphql',
                icon: 'contentful',
                hint: 'облачная модель контента, локали, доставка в каналы',
              },
              {
                name: 'Storyblok',
                ext: '.json',
                icon: 'storyblok',
                hint: 'визуальные блоки, headless для маркетинговых сайтов',
              },
              {
                name: 'OpenCart',
                ext: '.php',
                icon: 'opencart',
                hint: 'витрины, модули, платежи и доставки под проект',
              },
              {
                name: 'Diafan CMS',
                ext: '.php',
                icon: 'diafan',
                hint: 'типовые и кастомные шаблоны, лёгкая структура сайта',
              },
              {
                name: 'Joomla',
                ext: '.php',
                icon: 'joomla',
                hint: 'расширения, ACL, корпоративные и контентные проекты',
              },
            ],
          },
          {
            title: 'Сервисы и рантайм',
            summary:
              'Бэкенд, который несёт бизнес-логику, интеграции и устойчивость под нагрузкой.',
            files: [
              {
                name: 'Laravel',
                ext: '.php',
                icon: 'laravel',
                hint: 'API, очереди, админки, интеграционные контуры',
              },
              {
                name: 'Laminas (Zend)',
                ext: '.php',
                icon: 'zend',
                hint: 'корпоративные и легаси-контуры PHP',
              },
              {
                name: 'Python',
                ext: '.py',
                icon: 'python',
                hint: 'asyncio, aiogram / Telegram, скрипты; REST при сценарии (FastAPI-level)',
              },
              {
                name: 'Bash',
                ext: '.sh',
                icon: 'gnubash',
                hint: 'автоматизация, деплой, glue между сервисами',
              },
            ],
          },
          {
            title: 'Интерфейс и витрина',
            summary:
              'Скорость загрузки, критический CSS, эволюция легаси без «ломания продакшена», базовая a11y.',
            files: [
              {
                name: 'HTML / CSS',
                ext: '.html',
                icon: 'html5',
                hint: 'семантика, адаптив, практичная доступность',
              },
              {
                name: 'JavaScript · Vue',
                ext: '.vue',
                icon: 'vuedotjs',
                hint: 'витрины и кабинеты, интеграция с API',
              },
              {
                name: 'JavaScript · React',
                ext: '.tsx',
                icon: 'react',
                hint: 'компоненты и сборки под задачу',
              },
              {
                name: 'Vite',
                ext: '.config.ts',
                icon: 'vite',
                hint: 'сборка фронта (в т.ч. рядом с NPM)',
              },
              {
                name: 'jQuery / легаси UI',
                ext: '.js',
                icon: 'jquery',
                hint: 'аккуратные изменения в проде без big-bang',
              },
            ],
          },
          {
            title: 'Данные и кеш',
            summary:
              'Запросы, миграции схем и данных, репликации, бэкапы и восстановление.',
            files: [
              {
                name: 'MySQL / MariaDB',
                ext: '.sql',
                icon: 'mysql',
                hint: 'индексы, миграции, репликации',
              },
              {
                name: 'PostgreSQL',
                ext: '.sql',
                icon: 'postgresql',
                hint: 'сложные схемы и отчётность',
              },
              {
                name: 'MongoDB',
                ext: '.json',
                icon: 'mongodb',
                hint: 'документооборот и нетипичные модели',
              },
              {
                name: 'Microsoft SQL Server',
                ext: '.sql',
                icon: 'microsoftsqlserver',
                hint: 'интеграции с корпоративным контуром',
              },
              {
                name: 'Redis',
                ext: '.conf',
                icon: 'redis',
                hint: 'кеш, сессии, rate-limit, быстрые структуры',
              },
              {
                name: 'OpenSearch / Elasticsearch',
                ext: '.json',
                icon: 'opensearch',
                hint: 'поиск по каталогам и аналитике',
              },
            ],
          },
          {
            title: 'Платформа и эксплуатация',
            summary:
              'Контейнеры, прокси, фоновые процессы, CI/CD, мониторинг и алерты.',
            files: [
              {
                name: 'Docker',
                ext: '.Dockerfile',
                icon: 'docker',
                hint: 'образы, compose, воспроизводимые среды',
              },
              {
                name: 'Nginx',
                ext: '.conf',
                icon: 'nginx',
                hint: 'прокси, TLS, статика и бэкенд-апстримы',
              },
              {
                name: 'Очереди и воркеры',
                ext: '.worker',
                icon: 'rabbitmq',
                hint: 'фоновые задания, отложенная обработка',
              },
              {
                name: 'CI/CD',
                ext: '.yml',
                icon: 'gitlab',
                hint: 'GitLab / GitHub — пайплайны, артефакты, релизная дисциплина',
              },
              {
                name: 'Мониторинг / логи',
                ext: '.cfg',
                icon: 'zabbix',
                hint: 'Zabbix и аналоги, логирование, алерты',
              },
            ],
          },
          {
            title: 'Инструменты и практики',
            summary:
              'Контракты, ревью, онбординг, трекеры — плюс ИИ-инструменты в рутине при контроле качества и архитектуры.',
            files: [
              {
                name: 'Git',
                ext: '.patch',
                icon: 'git',
                hint: 'flow, rebase когда уместно, история для команды',
              },
              {
                name: 'Composer',
                ext: '.json',
                icon: 'composer',
                hint: 'PHP-зависимости и автозагрузка',
              },
              {
                name: 'NPM',
                ext: '.json',
                icon: 'npm',
                hint: 'фронт и утилиты Node',
              },
              {
                name: 'IDE',
                ext: '.code-workspace',
                icon: 'visualstudiocode',
                hint: 'VS Code; WebStorm / JetBrains — по проекту',
              },
              {
                name: 'Cursor',
                ext: '.cursorrules',
                icon: 'cursor',
                hint: 'агентный IDE, рефакторинг и сценарии разработки под задачу',
              },
              {
                name: 'Claude (Anthropic)',
                ext: '.md',
                icon: 'claude',
                hint: 'длинный контекст, ревью, черновики документации и проектирования',
              },
              {
                name: 'Postman / HTTP-клиенты',
                ext: '.http',
                icon: 'postman',
                hint: 'отладка API и интеграций',
              },
              {
                name: 'OpenAPI',
                ext: '.yaml',
                icon: 'swagger',
                hint: 'контракты между сервисами и командами',
              },
              {
                name: 'Jira / трекеры',
                ext: '.issue',
                icon: 'jira',
                hint: 'постановка, статусы, прозрачность поставки',
              },
            ],
          },
        ],
      },
      experience: {
        title: 'Опыт и проекты',
        partnerNote:
          'Часть публичных сайтов и кейсов представлена на портфолио партнёра — там же описания отраслей и задач клиентов. Ниже — мой вклад в отдельные направления; внутренние системы и NDA-проекты по смыслу совпадают, но без публичной витрины. Годы у блоков — ориентир по основному контуру участия, не обязательно дата последнего релиза.',
        partnerShowcase: {
          href: 'https://webstartechnology.ru/',
          label: 'webstartechnology.ru',
        },
        highlights: [
          '1000+ проектов и задач разной сложности',
          'Рост конверсии и скорости работы за счёт архитектурных и продуктовых улучшений',
          'Успешные миграции Magento и долгосрочная поддержка крупных магазинов',
        ],
        selectedTitle: 'Избранные проекты',
        timelineLead:
          'Ось слева: сверху — настоящее, ниже — более ранние эпохи. При прокрутке усиливается тот срез, который в центре внимания — как слои опыта, уходящие в глубину.',
        projectGroups: [
          {
            period: '2022—н.в.',
            context: 'Текущий контур: сервисы, интеграции, наработки; в том числе долгие системы, которые продолжаю развивать.',
            projects: [
              {
                name: 'Доставка-ЗПР (dostavka-zpr.ru)',
                detail:
                  'Решение с нуля на Laravel под доставку в контуре CDEK: расчёты, работа с API и прикладная логика. Ранее — домен cdek-zpr.ru; актуальная витрина на dostavka-zpr.ru.',
                href: 'https://dostavka-zpr.ru/',
              },
              {
                name: 'Крымресурс — обучающий центр',
                detail:
                  'Внутренний корпоративный пласт: обучение, техники, ответственные лица, менеджеры, документооборот, генерация документов, объединение данных из множества приложений в единую модель. Контур в активной разработке и сопровождении (веду сейчас); публичный krymresurs.ru — витрина, не полное описание системы.',
                href: 'https://krymresurs.ru/',
              },
              {
                name: 'sechat.ru',
                detail: 'Развитие коммуникационного продукта по задачам заказчика.',
                href: 'https://sechat.ru',
              },
              {
                name: 'mozgovnet.com',
                detail: 'Платёжные интеграции и восстановление легаси.',
                href: 'https://mozgovnet.com/',
              },
              {
                name: 'biznesmashin.ru',
                detail: 'Интернет-магазин грузовой техники на «1С-Битрикс».',
                href: 'https://biznesmashin.ru/',
              },
              {
                name: 'AI Telegram-бот: напоминания и микро-коучинг (Python)',
                detail:
                  'Собственная разработка: бот напоминает о задачах и «мыслях», которые пользователь сам помечает важными, задаёт уточняющие вопросы по настраиваемому сценарию. Стек: Python, aiogram, FSM. Значительное время ушло на проработку UX диалога и устойчивого состояния.',
              },
              {
                name: 'layer.cafe',
                detail: 'Дизайн для ранних этапов публичного сайта продукта.',
                href: 'https://layer.cafe/',
              },
            ],
          },
          {
            period: '2019—2024',
            context: 'Корпоративные контуры и кейсы с партнёром; крупные миграции Magento 2.x.',
            projects: [
              {
                name: 'gratisiskolan.se (Швеция)',
                detail: 'Миграция на Magento 2.4; адаптация пользовательских модулей под 2.4.',
                href: 'https://gratisiskolan.se/',
              },
              {
                name: '102 ПЭС (Минобороны электрических сетей)',
                detail:
                  'Корпоративный контур для техников, клиентов, менеджеров и администратора; публичная витрина и рекламная оболочка.',
                links: [
                  { kind: 'partner', href: 'https://webstartechnology.ru/102pes' },
                  { kind: 'customer', href: 'https://102pes.ru/' },
                ],
              },
              {
                name: 'КПСК (страхование) — кейс партнёра',
                detail:
                  'Работа с системой банка: развитие и доработка уже существующего проекта под задачи страховой витрины и интеграций.',
                links: [{ kind: 'partner', href: 'https://webstartechnology.ru/kpsk' }],
              },
              {
                name: 'Фитнес-клуб «Гагарин»',
                detail: 'Корпоративный сайт: структура, вёрстка, интеграции и сопровождение по процессу партнёра.',
                links: [{ kind: 'partner', href: 'https://webstartechnology.ru/gagarin' }],
              },
              {
                name: 'Музыкальный театр Крыма, Завод Пневматика, концертный зал ККО',
                detail:
                  'Участие в отдельных блоках функциональности и доработках в рамках проектов партнёра (по задачам и этапам).',
                links: [{ kind: 'partner', href: 'https://webstartechnology.ru/muzteatr' }],
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
          {
            period: '≈2012—2021',
            context: 'Долгие международные витрины, сопровождение под нагрузкой, эволюция платформ.',
            projects: [
              {
                name: 'windowcleaner.com (США)',
                detail:
                  'Около пяти лет плотной работы и развития — ключевой клиент и проект. Путь: Magento 1.4 → сопровождение 1.9 → миграция на Magento 2. В том же бизнес-контуре — отдельные витрины и площадки, в т.ч. связанные с SWCR.',
                href: 'https://windowcleaner.com/',
              },
              {
                name: 'store.finaldraft.com',
                detail: 'Поддержка и развитие (Magento).',
                href: 'https://store.finaldraft.com/',
              },
              {
                name: 'microline.ua',
                detail: 'Поддержка и развитие (Magento).',
                href: 'https://microline.ua/',
              },
              {
                name: 'nancysbeauty.com (США)',
                detail: 'Поддержка и развитие витрины.',
                href: 'https://nancysbeauty.com/',
              },
              {
                name: 'epik.com',
                detail: 'Поддержка и развитие.',
                href: 'https://www.epik.com/',
              },
              {
                name: 'cargo.flowers',
                detail: 'Поддержка и развитие.',
                href: 'https://cargo.flowers/',
              },
              {
                name: 'kolyom.co.il',
                detail: 'Поддержка и развитие; фронт на Vue.js.',
                href: 'https://www.kolyom.co.il/',
              },
              {
                name: 'turexpertiza.ru',
                detail: 'Разработка уникальной системы подсчёта распределённой звёздности.',
                href: 'https://www.turexpertiza.ru/',
              },
            ],
          },
          {
            period: '≈2009—2018',
            context:
              'Ранние крупные контуры: тип задач и платформы остаются актуальной базой для текущей работы, а не «протухший» стек.',
            projects: [
              {
                name: 'dnforum.com',
                detail: 'Разработка дополнений.',
                href: 'https://www.dnforum.com/',
              },
              {
                name: 'terradelyssa.com',
                detail: 'Разработка дополнений.',
                href: 'https://terradelyssa.com/',
              },
              {
                name: 'Grungy Gentleman',
                detail:
                  'Контур Gluzdov: ювелирная тематика, магазины и франшизы. Публичная витрина со временем сильно менялась; актуальный вид — на сайте бренда.',
                href: 'https://www.grungygentleman.com/',
              },
              {
                name: 'Accuscore (accuscore.com)',
                detail:
                  'Временное подключение к команде: отдельные фрагменты логики по запросу заказчика, без долгого контура сопровождения.',
                href: 'https://www.accuscore.com',
              },
              {
                name: 'shkafkrovat.com.ua',
                detail: 'Сайт мебели (для отца товарища).',
                href: 'https://shkafkrovat.com.ua/',
              },
              {
                name: 'Dikoros-Taiga',
                detail: 'Интернет-магазин спецодежды; в том числе контур на OpenCart.',
              },
              {
                name: 'rkb-bank',
                detail: 'Разработка на Magento: банковская прослойка интернет-магазина.',
              },
            ],
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
            title: 'Владение проблемой',
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
      'Solution init: engineering clarity vs chaos, a digital asset instead of open-ended hours; three stages and readiness to scale.',
    contact: {
      emails: ['evgenii.zhukov.igorevich@gmail.com', 'evgenii.z.i@yandex.ru'],
      linkedinLabel: 'linkedin.com/in/eugene-zhukov-24a96164',
      linkedinHref: 'https://www.linkedin.com/in/eugene-zhukov-24a96164/',
      maxHref:
        'https://max.ru/u/f9LHodD0cOIQKhdp9uLyThPkZcKQRbIzWXiog-j90GhkeLT9cvMTqo9ytpM',
      maxInvite: '+7 978 160 49 74',
      maxTel: '+79781604974',
    },
    heroHudFacts: [
      { label: 'WORK FORMAT', value: 'REMOTE' },
      { label: 'EXPERIENCE', value: '15+ YEARS' },
      { label: 'AVAILABILITY', value: 'OPEN TO PROJECTS' },
    ],
    heroLiveStatus: {
      available: 'ONLINE · AVAILABLE',
      unavailable: 'OFFLINE · UNAVAILABLE (MSK 22–07)',
      lunch: 'AWAY · LUNCH · MAY BE AFK (12–14 MSK)',
    },
    heroConsole: {
      title: 'INITIALIZING SOLUTION...',
      commands: [
        'Engineering clarity vs technical chaos.',
        'Instead of an endless hourly tab, I build a digital asset: a system that works for you—not one that demands constant babysitting.',
        '[01/03] CHAOS LIQUIDATION',
        'Reviving complex systems and stabilizing legacy. I turn accumulated tech debt into a load-ready foundation.',
        '[02/03] GROWTH ARCHITECTURE',
        'Scalable platforms and AI-augmented delivery. I use AI agents to multiply development and shipping speed.',
        '[03/03] OUTCOME ECONOMICS',
        'Focus on conversion and autonomy. You get architecture that drives profit—without a full rewrite every quarter.',
        '[STATUS] SYSTEM READY TO SCALE',
      ],
    },
    bootLines: [
      '> initializing profile...',
      '> loading experience...',
      '> system ready',
    ],
    terminalLabels: {
      email: '[EMAIL]',
      telegram: '[TELEGRAM]',
      max: '[MAX]',
      maxProfileLink: 'MAX profile →',
      linkedin: '[LINKEDIN]',
      about: '[ABOUT ME]',
      collaboration: '[ENGAGEMENT]',
      help: '[HOW I HELP]',
      projects: '[PROJECT LOG]',
      successPath: '[SUCCESS PATH]',
      successPathBadge: 'SUCCESS',
      highlights: '[SYSTEM SIGNALS]',
      partnerNote: '[PARTNER · SHOWCASE]',
      logStatus: 'STATUS',
      logAction: 'CONTEXT',
      logResult: 'OUTCOME',
      coreStats: '[PRACTICE SNAPSHOT]',
      tech: '[TECH STACK]',
      approach: '[WORK APPROACH]',
      hudStatus: 'STATUS',
      heroWindowTitle: 'SYSTEM: EUGENE_ZHUKOV.EXE',
      contactWindowTitle: 'SYSTEM: CONTACTS.CFG',
      contactRestore: 'Show CONTACTS.CFG',
      contactWinMinAria: 'Minimize contact block',
      contactWinMaxAria: 'Maximize contact block within column',
      contactWinCloseAria: 'Hide contact block',
      contactCopyEmailAria: 'Copy email to clipboard',
      contactCopyPhoneAria: 'Copy phone number to clipboard',
      contactCopied: 'Copied',
      contactCopyToast: 'Copied to clipboard',
      contactCopyLinkAria: 'Copy link',
      projectEraBadge: 'era',
      projectLinkPartner: 'Partner case',
      projectLinkCustomer: 'Customer site',
      projectLinkWebsite: 'Website',
      partnerShowcaseLinkAria: 'Partner website — case showcase (opens in a new tab)',
      partnerShowcaseCta: 'Partner showcase',
    },
    coreStats: [
      { label: 'Years in production', value: '15+' },
      {
        label: 'Ownership span',
        value: 'product · integrations · operations',
      },
      { label: 'Typical contexts', value: 'E-com · enterprise · NDA' },
      {
        label: 'Where I’m usually brought in',
        value:
          'Laravel · greenfield systems · redesign · platform moves through to outcomes · Magento in legacy/migration work',
      },
      { label: 'External boundaries', value: 'API · webhooks · banks' },
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
          'When production and revenue don’t get a maintenance window—and every deploy feels like a lottery—I step in for calm diagnosis and fixes that survive the next release, not a vanity “rewrite everything” pitch. 15+ years across e-commerce, enterprise boundaries, and real load; I look at the whole system—from architecture to operations. Modern tooling and AI only where they speed delivery without diluting accountability for quality.',
      },
      collaboration: {
        title: 'How engagements work',
        body:
          'Message me directly; contracts and billing usually run through a trusted partner on their side. We align process and paperwork before kickoff—your workflow or the partner’s legal entity. On the engineering side, nothing gets “handed off”: timelines, communication, and delivery stay with me.',
      },
      help: {
        title: 'How I can help',
        items: [
          'Legacy: bring back predictable releases instead of constant firefighting',
          'Platform migrations and stack shifts without storefront or critical-flow downtime',
          'Profiling and speed: databases, cache, queues, search, frontend',
          'Architecture and integration contracts that don’t snap under growth',
          'Full cycle in one ownership line: backend, frontend, infra, CI/CD, monitoring',
        ],
      },
      tech: {
        title: 'Tech stack',
        lanes: [
          {
            title: 'CMS & content platforms',
            summary:
              'Storefronts, catalogs, editorial workflows, and integrations—from classic CMS to headless stacks and cloud content hubs.',
            files: [
              {
                name: 'Magento · Open Source / Adobe Commerce',
                ext: '.xml',
                icon: 'magento',
                hint: 'M1→M2, modules, enterprise storefronts, performance, migrations',
              },
              {
                name: 'WordPress',
                ext: '.php',
                icon: 'wordpress',
                hint: 'themes, plugins, multisite, safe upgrade paths',
              },
              {
                name: 'WooCommerce',
                ext: '.php',
                icon: 'woocommerce',
                hint: 'catalogs, payments, checkout flows on WordPress',
              },
              {
                name: 'Shopify',
                ext: '.liquid',
                icon: 'shopify',
                hint: 'cloud storefronts, Liquid themes, app extensions',
              },
              {
                name: 'Drupal',
                ext: '.php',
                icon: 'drupal',
                hint: 'enterprise portals, rich content modeling',
              },
              {
                name: 'Strapi',
                ext: '.json',
                icon: 'strapi',
                hint: 'headless APIs, admin UI, project-specific extensions',
              },
              {
                name: 'Contentful',
                ext: '.graphql',
                icon: 'contentful',
                hint: 'cloud content models, locales, multi-channel delivery',
              },
              {
                name: 'Storyblok',
                ext: '.json',
                icon: 'storyblok',
                hint: 'visual blocks, headless for marketing sites',
              },
              {
                name: 'OpenCart',
                ext: '.php',
                icon: 'opencart',
                hint: 'storefronts, modules, payments and shipping flows',
              },
              {
                name: 'Diafan CMS',
                ext: '.php',
                icon: 'diafan',
                hint: 'templates and custom themes, lightweight site structure',
              },
              {
                name: 'Joomla',
                ext: '.php',
                icon: 'joomla',
                hint: 'extensions, ACL, corporate and editorial builds',
              },
            ],
          },
          {
            title: 'Services & runtime',
            summary:
              'Backend that carries business logic, integrations, and reliability under load.',
            files: [
              {
                name: 'Laravel',
                ext: '.php',
                icon: 'laravel',
                hint: 'APIs, queues, admin tooling, integration boundaries',
              },
              {
                name: 'Laminas (Zend)',
                ext: '.php',
                icon: 'zend',
                hint: 'enterprise and legacy PHP contours',
              },
              {
                name: 'Python',
                ext: '.py',
                icon: 'python',
                hint: 'asyncio, aiogram / Telegram, scripting; REST when needed (FastAPI-level)',
              },
              {
                name: 'Bash',
                ext: '.sh',
                icon: 'gnubash',
                hint: 'automation, deploy glue between services',
              },
            ],
          },
          {
            title: 'Interface & storefront',
            summary:
              'Load speed, critical CSS, legacy UI evolution without breaking prod, pragmatic a11y.',
            files: [
              {
                name: 'HTML / CSS',
                ext: '.html',
                icon: 'html5',
                hint: 'semantics, responsive layout, practical accessibility',
              },
              {
                name: 'JavaScript · Vue',
                ext: '.vue',
                icon: 'vuedotjs',
                hint: 'storefronts and portals wired to APIs',
              },
              {
                name: 'JavaScript · React',
                ext: '.tsx',
                icon: 'react',
                hint: 'components and builds as the project demands',
              },
              {
                name: 'Vite',
                ext: '.config.ts',
                icon: 'vite',
                hint: 'frontend bundling (alongside NPM)',
              },
              {
                name: 'jQuery / legacy UI',
                ext: '.js',
                icon: 'jquery',
                hint: 'careful production changes without a big-bang rewrite',
              },
            ],
          },
          {
            title: 'Data & cache',
            summary:
              'Query design, schema/data migrations, replication, backups and recovery.',
            files: [
              {
                name: 'MySQL / MariaDB',
                ext: '.sql',
                icon: 'mysql',
                hint: 'indexes, migrations, replication',
              },
              {
                name: 'PostgreSQL',
                ext: '.sql',
                icon: 'postgresql',
                hint: 'rich schemas and reporting',
              },
              {
                name: 'MongoDB',
                ext: '.json',
                icon: 'mongodb',
                hint: 'document models where they fit',
              },
              {
                name: 'Microsoft SQL Server',
                ext: '.sql',
                icon: 'microsoftsqlserver',
                hint: 'enterprise integrations',
              },
              {
                name: 'Redis',
                ext: '.conf',
                icon: 'redis',
                hint: 'cache, sessions, rate limits, fast structures',
              },
              {
                name: 'OpenSearch / Elasticsearch',
                ext: '.json',
                icon: 'opensearch',
                hint: 'catalog/search and analytics indices',
              },
            ],
          },
          {
            title: 'Platform & operations',
            summary:
              'Containers, proxies, background processing, CI/CD, monitoring and alerts.',
            files: [
              {
                name: 'Docker',
                ext: '.Dockerfile',
                icon: 'docker',
                hint: 'images, compose, reproducible environments',
              },
              {
                name: 'Nginx',
                ext: '.conf',
                icon: 'nginx',
                hint: 'reverse proxy, TLS, static and upstreams',
              },
              {
                name: 'Queues & workers',
                ext: '.worker',
                icon: 'rabbitmq',
                hint: 'async jobs and deferred processing',
              },
              {
                name: 'CI/CD',
                ext: '.yml',
                icon: 'gitlab',
                hint: 'GitLab / GitHub — pipelines, artifacts, release hygiene',
              },
              {
                name: 'Monitoring / logs',
                ext: '.cfg',
                icon: 'zabbix',
                hint: 'Zabbix-class tooling, logging, alerting',
              },
            ],
          },
          {
            title: 'Tooling & practices',
            summary:
              'Contracts, review, onboarding, trackers — plus AI tools in the loop with engineering judgment.',
            files: [
              {
                name: 'Git',
                ext: '.patch',
                icon: 'git',
                hint: 'team flows, rebase when it helps, readable history',
              },
              {
                name: 'Composer',
                ext: '.json',
                icon: 'composer',
                hint: 'PHP dependencies and autoloading',
              },
              {
                name: 'NPM',
                ext: '.json',
                icon: 'npm',
                hint: 'frontend and Node-side utilities',
              },
              {
                name: 'IDE',
                ext: '.code-workspace',
                icon: 'visualstudiocode',
                hint: 'VS Code; WebStorm / JetBrains when the team standard says so',
              },
              {
                name: 'Cursor',
                ext: '.cursorrules',
                icon: 'cursor',
                hint: 'agentic IDE, refactors and dev workflows tuned to the task',
              },
              {
                name: 'Claude (Anthropic)',
                ext: '.md',
                icon: 'claude',
                hint: 'long context, reviews, docs/design drafts',
              },
              {
                name: 'Postman / HTTP clients',
                ext: '.http',
                icon: 'postman',
                hint: 'API debugging and integration work',
              },
              {
                name: 'OpenAPI',
                ext: '.yaml',
                icon: 'swagger',
                hint: 'contracts between services and teams',
              },
              {
                name: 'Jira / trackers',
                ext: '.issue',
                icon: 'jira',
                hint: 'work items, status, delivery transparency',
              },
            ],
          },
        ],
      },
      experience: {
        title: 'Experience & projects',
        partnerNote:
          'Some public sites and case pages appear on my partner’s portfolio—along with industry context and client goals. Below is my contribution; internal systems and NDA work are described at a high level only. Year ranges mark the main engagement window—not necessarily the last shipped release.',
        partnerShowcase: {
          href: 'https://webstartechnology.ru/',
          label: 'webstartechnology.ru',
        },
        highlights: [
          '1000+ projects and tasks across a wide complexity range',
          'Conversion and performance improvements driven by architecture and product changes',
          'Successful Magento migrations and long-term support for large stores',
        ],
        selectedTitle: 'Selected projects',
        timelineLead:
          'The rail on the left: present at the top, deeper past below. As you scroll, the era nearest the focus brightens—layers of experience stacking backward in time.',
        projectGroups: [
          {
            period: '2022—present',
            context: 'Current workstreams: product builds, integrations, experiments—including long-running systems I still develop.',
            projects: [
              {
                name: 'Dostavka-ZPR (dostavka-zpr.ru)',
                detail:
                  'Greenfield Laravel build for a CDEK-aligned delivery workflow: pricing logic, API usage, and operational flows. Earlier domain cdek-zpr.ru; production site moved to dostavka-zpr.ru.',
                href: 'https://dostavka-zpr.ru/',
              },
              {
                name: 'Krymresurs training center',
                detail:
                  'Internal corporate stack: training workflows, technicians, responsible officers, managers, document lifecycle, generation, and merging data from many apps into one model. Still in active development and maintenance on my side; krymresurs.ru is the public brochure, not the full system story.',
                href: 'https://krymresurs.ru/',
              },
              {
                name: 'sechat.ru',
                detail: 'Product engineering work for a communications platform (scoped by the client).',
                href: 'https://sechat.ru',
              },
              {
                name: 'mozgovnet.com',
                detail: 'Payment integrations and legacy recovery work.',
                href: 'https://mozgovnet.com/',
              },
              {
                name: 'biznesmashin.ru',
                detail: 'Heavy machinery store on 1C-Bitrix.',
                href: 'https://biznesmashin.ru/',
              },
              {
                name: 'AI Telegram bot: reminders & micro-coaching (Python)',
                detail:
                  'Personal build: reminders for tasks and “thoughts” the user marks as important, follow-up questions driven by configurable flows. Stack: Python, aiogram, FSM. Significant time spent on dialog UX and durable conversation state.',
              },
              {
                name: 'layer.cafe',
                detail: 'Design work for early-stage marketing site of the product.',
                href: 'https://layer.cafe/',
              },
            ],
          },
          {
            period: '2019–2024',
            context: 'Corporate programs and partner-led cases; larger Magento 2.x migrations.',
            projects: [
              {
                name: 'gratisiskolan.se (Sweden)',
                detail: 'Magento 2.4 migration; adapting custom modules to 2.4.',
                href: 'https://gratisiskolan.se/',
              },
              {
                name: '102 PES (Ministry of Defense electrical networks)',
                detail:
                  'Corporate layer for technicians, customers, managers, and admins; public marketing shell.',
                links: [
                  { kind: 'partner', href: 'https://webstartechnology.ru/102pes' },
                  { kind: 'customer', href: 'https://102pes.ru/' },
                ],
              },
              {
                name: 'KPSK (insurance) — partner case page',
                detail:
                  'Work on a bank-related system: extending and hardening an existing project for the insurance front office and integrations.',
                links: [{ kind: 'partner', href: 'https://webstartechnology.ru/kpsk' }],
              },
              {
                name: 'Gagarin fitness club',
                detail: 'Corporate site: structure, implementation, integrations, and ongoing work within the partner delivery process.',
                links: [{ kind: 'partner', href: 'https://webstartechnology.ru/gagarin' }],
              },
              {
                name: 'Crimean Musical Theatre, Pneumo plant, KKO concert hall',
                detail:
                  'Contributions to specific functional areas and iterations inside partner-led projects (scope varied by phase).',
                links: [{ kind: 'partner', href: 'https://webstartechnology.ru/muzteatr' }],
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
          {
            period: '≈2012–2021',
            context: 'Long-running international storefronts, load-bearing maintenance, platform evolution.',
            projects: [
              {
                name: 'windowcleaner.com (USA)',
                detail:
                  'Roughly five years of sustained engineering and growth—a core client and project. Path: Magento 1.4 → 1.9 support → Magento 2 migration. Same business umbrella included additional storefronts and properties (including SWCR-related work).',
                href: 'https://windowcleaner.com/',
              },
              {
                name: 'store.finaldraft.com',
                detail: 'Maintenance and evolution (Magento).',
                href: 'https://store.finaldraft.com/',
              },
              {
                name: 'microline.ua',
                detail: 'Maintenance and evolution (Magento).',
                href: 'https://microline.ua/',
              },
              {
                name: 'nancysbeauty.com (USA)',
                detail: 'Ongoing maintenance and improvements.',
                href: 'https://nancysbeauty.com/',
              },
              {
                name: 'epik.com',
                detail: 'Maintenance and evolution.',
                href: 'https://www.epik.com/',
              },
              {
                name: 'cargo.flowers',
                detail: 'Maintenance and evolution.',
                href: 'https://cargo.flowers/',
              },
              {
                name: 'kolyom.co.il',
                detail: 'Maintenance and evolution (Vue.js on the frontend).',
                href: 'https://www.kolyom.co.il/',
              },
              {
                name: 'turexpertiza.ru',
                detail: 'Custom system for distributed “star rating” calculations.',
                href: 'https://www.turexpertiza.ru/',
              },
            ],
          },
          {
            period: '≈2009–2018',
            context:
              'Early large engagements—the work patterns and platforms still anchor how I approach e-commerce today.',
            projects: [
              {
                name: 'dnforum.com',
                detail: 'Extension and addon development.',
                href: 'https://www.dnforum.com/',
              },
              {
                name: 'terradelyssa.com',
                detail: 'Extension and addon development.',
                href: 'https://terradelyssa.com/',
              },
              {
                name: 'Grungy Gentleman',
                detail:
                  'Within Gluzdov-led work: jewelry Retail and franchise store builds. The public site changed substantially over time; current brand presence is on the live domain.',
                href: 'https://www.grungygentleman.com/',
              },
              {
                name: 'Accuscore (accuscore.com)',
                detail:
                  'Short-term engagement: implemented specific logic pieces as needed—no long-running ownership.',
                href: 'https://www.accuscore.com',
              },
              {
                name: 'shkafkrovat.com.ua',
                detail: 'Furniture site for a family friend’s father.',
                href: 'https://shkafkrovat.com.ua/',
              },
              {
                name: 'Dikoros-Taiga',
                detail: 'Specialty apparel store; included an OpenCart-based stack.',
              },
              {
                name: 'rkb-bank',
                detail: 'Magento engineering for a bank-related storefront integration layer.',
              },
            ],
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
            title: 'Problem ownership',
            body: 'I don’t “check the box on a ticket”—I own the problem: find root causes, propose options, implement.',
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

function withTechStackDocs(content: CVContent): CVContent {
  const map = TECH_STACK_DOC_HREFS;
  return {
    ...content,
    sections: {
      ...content.sections,
      tech: {
        ...content.sections.tech,
        lanes: content.sections.tech.lanes.map((lane) => ({
          ...lane,
          files: lane.files.map((f) => {
            const fromMap = map[f.name];
            const docHref =
              f.docHref ?? (typeof fromMap === 'string' && fromMap.length > 0 ? fromMap : undefined);
            if (docHref) return { ...f, docHref };
            return { ...f };
          }),
        })),
      },
    },
  };
}

export function isLang(value: string | undefined): value is Lang {
  return value === 'ru' || value === 'en';
}

export function getCv(lang: Lang): CVContent {
  return withTechStackDocs(cv[lang]);
}
