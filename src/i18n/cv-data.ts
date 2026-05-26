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

/** Иконка readout на /mission — линейные SVG, как на концепте пульта */
export type CoreStatIcon = 'target' | 'layers' | 'platform' | 'trend' | 'junction';

export type CoreStat = {
  label: string;
  value: string;
  icon: CoreStatIcon;
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
  /** Альтернативная страница резюме (Mission Control / «пульт») */
  navMission: string;
  /** Короткий статус в шапке сайта на /mission (как в koncept2) */
  navStatusMark: string;
  navStatusReady: string;
  mission: {
    metaTitle: string;
    metaDescription: string;
    /** Короткая позиционная строка над заголовком режима /mission (смысл — «чем занимаюсь»; на RU лучше по-русски, на EN — как слоган/оффер) */
    headerBrand: string;
    /** Заголовок режима в шапке на /mission */
    headerTitle: string;
  };
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
    metaTitle: 'Евгений Жуков — восстановление систем, fullstack и архитектура',
    metaDescription:
      'Fullstack и архитектор: стабилизирую легаси, миграции Magento, e-commerce и корпоративные контуры под нагрузкой. 15+ лет в продакшене. Симферополь / удалённо.',
    navResume: 'Резюме',
    navPortfolio: 'Портфолио',
    navMission: 'Пульт',
    navStatusMark: 'СТАТУС',
    navStatusReady: 'НА СВЯЗИ',
    mission: {
      metaTitle: 'Евгений Жуков — инженерный пульт · восстановление систем',
      metaDescription:
        'Пульт управления: стабилизация легаси, миграции, архитектура, e-commerce и инженерия с ИИ. Более 15 лет в продакшене.',
      headerBrand: 'ЕЖ · ИНЖЕНЕРНЫЙ ПУЛЬТ',
      headerTitle: 'ПУЛЬТ УПРАВЛЕНИЯ',
    },
    name: 'Евгений Жуков',
    role: 'Fullstack · архитектор · инженер восстановления систем',
    summary:
      'Стабилизирую системы, к которым другие не подключаются — легаси, миграции, интеграции — когда прод не терпит паузы.',
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
      { label: 'ФОКУС', value: 'RESCUE · LEGACY · E-COM' },
      { label: 'ОПЫТ', value: '15+ ЛЕТ ПРОДАКШЕНА' },
      { label: 'РЕЖИМ', value: 'УДАЛЁННО · ОТКРЫТ' },
    ],
    heroLiveStatus: {
      available: 'ONLINE · НА СВЯЗИ',
      unavailable: 'OFFLINE · НЕ ДОСТУПЕН (МСК 22–07)',
      lunch: 'AWAY · ОБЕД · МОГУ ОТСУТСТВОВАТЬ (12–14 МСК)',
    },
    heroConsole: {
      title: 'ЗАПУСК КОНТУРА RESCUE...',
      commands: [
        'Стабилизирую системы, к которым другие не подключаются — когда прод не терпит паузы.',
        'Не бесконечные часы «на доработки», а цифровой актив: меньше хаоса после каждого релиза.',
        '[RESCUE] Восстановление',
        'Симптом: пожары, нестабильные релизы, интеграции «на скотче». Результат: управляемый контур и понятная эксплуатация.',
        '[ARCHITECTURE] Архитектура',
        'Платформа под рост: миграции M1→M2, кеш, поиск, API-контракты, наблюдаемость.',
        '[AUTOMATION] Автоматизация',
        'CI/CD, очереди, мониторинг — и ИИ там, где ускоряет рутину без потери качества в проде.',
        '[RELIABILITY] Надёжность',
        'Релизы, которые не страшно катить; команда и владелец видят, что происходит.',
        '[STATUS] КОНТУР ГОТОВ К МАСШТАБИРОВАНИЮ',
      ],
    },
    bootLines: [
      '> подключение к контуру rescue...',
      '> загрузка опыта (15+ лет)...',
      '> готов к разбору задачи',
    ],
    terminalLabels: {
      email: '[EMAIL]',
      telegram: '[TELEGRAM]',
      max: '[МАХ]',
      maxProfileLink: 'Профиль в MAX →',
      linkedin: '[LINKEDIN]',
      about: '[ОБО МНЕ]',
      collaboration: '[ФОРМАТ РАБОТЫ]',
      help: '[СБОИ · РЕШЕНИЯ]',
      projects: '[ЖУРНАЛ ПРОЕКТОВ]',
      successPath: '[ПУТЬ РОСТА]',
      successPathBadge: 'УСПЕХ',
      highlights: '[СИГНАЛЫ УСТОЙЧИВОСТИ]',
      partnerNote: '[ПАРТНЁР · ВИТРИНА]',
      logStatus: 'СТАТУС',
      logAction: 'КОНТЕКСТ',
      logResult: 'ИТОГ',
      coreStats: '[СНИМОК ПРАКТИКИ]',
      tech: '[ТЕХНОСТЕК]',
      approach: '[ПОДХОД К РАБОТЕ]',
      hudStatus: 'СТАТУС',
      heroWindowTitle: 'СИСТЕМА: RESCUE · EUGENE_ZHUKOV',
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
      {
        icon: 'target',
        value: '15+',
        label: 'лет в продакшене: e-commerce, корпоративные контуры, легаси под нагрузкой',
      },
      {
        icon: 'layers',
        value: '1000+',
        label: 'задач и релизов — от правки до архитектуры, когда система уже в бою',
      },
      {
        icon: 'platform',
        value: 'M1→M2',
        label: 'миграции Magento и витрины без «большого взрыва»',
      },
      {
        icon: 'trend',
        value: 'API·CI',
        label: 'интеграции, платежи, банки — контракты, которые держат рост',
      },
      {
        icon: 'junction',
        value: 'AI+инж.',
        label: 'ИИ ускоряет рутину; решения в проде — за инженером',
      },
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
        title: 'Сбои, которые разбираю',
        items: [
          'Легаси «живёт на адреналине» → предсказуемые релизы и понятное сопровождение',
          'Миграция «в один выходные» → поэтапный переход без паузы критичных продаж',
          'Медленные сценарии и «узкие места» → БД, кеш, очереди, поиск, фронтенд там, где больно',
          'Интеграции ломаются при росте → архитектура и контракты API, которые переживают изменения',
          'Размытая ответственность → один контур: backend, frontend, CI/CD, мониторинг',
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
        title: 'Кейсы и контуры',
        partnerNote:
          'Отрасли и публичные кейсы — на витрине партнёра. Здесь — мой слой: задачи, стек, результат. NDA — по смыслу, без детализации. Годы эпох — ориентир участия, не дата последнего коммита.',
        partnerShowcase: {
          href: 'https://webstartechnology.ru/',
          label: 'webstartechnology.ru',
        },
        highlights: [
          'Контуры, где простой и ошибка бьют по выручке — витрины, кабинеты, внутренние сервисы',
          'M1→M2 и долгие релизы без остановки бизнеса',
          'Интеграции с банками и API — с контрактами, которые переживают изменения',
        ],
        selectedTitle: 'Избранные проекты',
        timelineLead:
          'Сверху — то, что веду сейчас; ниже — эпохи опыта. Прокрутите — в фокусе один слой времени.',
        projectGroups: [
          {
            period: '2022—н.в.',
            context: 'Текущий контур: сервисы, интеграции, наработки; в том числе долгие системы, которые продолжаю развивать.',
            projects: [
              {
                name: 'Доставка-ЗПР (dostavka-zpr.ru)',
                detail:
                  'Задача: сервис доставки с нуля. Решение: Laravel, API CDEK, расчёты и прикладная логика. Результат: рабочий контур на dostavka-zpr.ru (ранее cdek-zpr.ru).',
                href: 'https://dostavka-zpr.ru/',
              },
              {
                name: 'Крымресурс — обучающий центр',
                detail:
                  'Симптом: разрозненные приложения и документооборот. Решение: единая модель обучения, техник, менеджеров и генерации документов. Веду контур сейчас; krymresurs.ru — публичная витрина, не весь объём системы.',
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
                  'Ключевой долгий контур (~5 лет): Magento 1.4 → 1.9 → M2 без «большого взрыва», кастомные платежи и релизы под нагрузкой. В том же бизнесе — связанные витрины, в т.ч. SWCR.',
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
        title: 'Подход rescue',
        pillars: [
          {
            title: 'Диагностика',
            body: 'Симптомы, ограничения, риски — затем план с этапами, а не «сразу переписать».',
          },
          {
            title: 'Прозрачность',
            body: 'Варианты, сроки и цена компромиссов — до того, как катим в прод.',
          },
          {
            title: 'Устойчивость',
            body: 'После релиза система остаётся понятной: команда, мониторинг, документация по смыслу.',
          },
          {
            title: 'Владение',
            body: 'Не «отдал таск» — владею проблемой до измеримого эффекта для бизнеса.',
          },
        ],
      },
    },
    footerQuote:
      'Не «закрыть тикет», а вернуть контуру предсказуемость — чтобы рост снова был задачей бизнеса, а не пожаротушения.',
    portfolio: {
      metaTitle: 'Портфолио — Евгений Жуков',
      metaDescription:
        'Кейсы в формате post-mortem: Magento, корпоративные системы, e-commerce, миграции. Фильтры и режимы экспертизы.',
      title: 'Портфолио',
      lead:
        'Сжатые разборы коммерческих проектов: что было сломано, что сделано, какой результат. Ниже — карточки, фильтры по типу системы и переключатель акцента.',
      introTitle: 'Как пользоваться страницей',
      introBody:
        'Каждая карточка — post-mortem: цель, диагноз, работы, метрики и стек. Фильтры «Фокус» показывают только нужный тип (e-commerce, enterprise, миграции, процесс). «Режим экспертизы» меняет подачу заголовков и кнопок. Ссылка «Открыть контур» ведёт на материалы кейса, если они доступны публично.',
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
    metaTitle: 'Eugene Zhukov — system rescue, fullstack & architecture',
    metaDescription:
      'Fullstack engineer and architect: legacy stabilization, Magento migrations, e-commerce and enterprise systems under load. 15+ years in production. Crimea / remote.',
    navResume: 'Resume',
    navPortfolio: 'Portfolio',
    navMission: 'Control',
    navStatusMark: 'STATUS',
    navStatusReady: 'AVAILABLE',
    mission: {
      metaTitle: 'Eugene Zhukov — engineering mission control',
      metaDescription:
        'Mission control page: legacy stabilization, migrations, architecture, e-commerce, and AI-augmented engineering. 15+ years in production.',
      headerBrand: 'EZ · MISSION CONTROL',
      headerTitle: 'ENGINEERING CONTROL',
    },
    name: 'Eugene Zhukov',
    role: 'Fullstack · architect · system rescue engineer',
    summary:
      'I stabilize systems others won’t touch—legacy, migrations, integrations—when production can’t pause.',
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
      { label: 'FOCUS', value: 'RESCUE · LEGACY · E-COM' },
      { label: 'EXPERIENCE', value: '15+ YEARS IN PROD' },
      { label: 'MODE', value: 'REMOTE · OPEN' },
    ],
    heroLiveStatus: {
      available: 'ONLINE · AVAILABLE',
      unavailable: 'OFFLINE · UNAVAILABLE (MSK 22–07)',
      lunch: 'AWAY · LUNCH · MAY BE AFK (12–14 MSK)',
    },
    heroConsole: {
      title: 'BOOTING RESCUE CONTUR...',
      commands: [
        'I stabilize systems others won’t touch—when production can’t pause.',
        'Not endless “hourly fixes”—a digital asset with less chaos after every release.',
        '[RESCUE] Recovery',
        'Symptom: firefighting, brittle releases, taped integrations. Outcome: a controllable system and clear operations.',
        '[ARCHITECTURE] Architecture',
        'Platforms that scale: M1→M2, cache, search, API contracts, observability.',
        '[AUTOMATION] Automation',
        'CI/CD, queues, monitoring—and AI where it speeds routine without lowering prod quality.',
        '[RELIABILITY] Reliability',
        'Releases you can ship; owners and teams see what’s happening.',
        '[STATUS] CONTUR READY TO SCALE',
      ],
    },
    bootLines: [
      '> connecting to rescue contur...',
      '> loading experience (15+ years)...',
      '> ready for triage',
    ],
    terminalLabels: {
      email: '[EMAIL]',
      telegram: '[TELEGRAM]',
      max: '[MAX]',
      maxProfileLink: 'MAX profile →',
      linkedin: '[LINKEDIN]',
      about: '[ABOUT ME]',
      collaboration: '[ENGAGEMENT]',
      help: '[FAILURES · FIXES]',
      projects: '[PROJECT LOG]',
      successPath: '[SUCCESS PATH]',
      successPathBadge: 'SUCCESS',
      highlights: '[STABILITY SIGNALS]',
      partnerNote: '[PARTNER · SHOWCASE]',
      logStatus: 'STATUS',
      logAction: 'CONTEXT',
      logResult: 'OUTCOME',
      coreStats: '[PRACTICE SNAPSHOT]',
      tech: '[TECH STACK]',
      approach: '[WORK APPROACH]',
      hudStatus: 'STATUS',
      heroWindowTitle: 'SYSTEM: RESCUE · EUGENE_ZHUKOV',
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
      {
        icon: 'target',
        value: '15+',
        label: 'years in production: e-commerce, enterprise boundaries, legacy under load',
      },
      {
        icon: 'layers',
        value: '1000+',
        label: 'tasks and releases—from patches to architecture while systems stay live',
      },
      {
        icon: 'platform',
        value: 'M1→M2',
        label: 'Magento migrations and storefronts without a big-bang rewrite',
      },
      {
        icon: 'trend',
        value: 'API·CI',
        label: 'integrations, payments, banks—contracts that survive change',
      },
      {
        icon: 'junction',
        value: 'AI+eng.',
        label: 'AI speeds routine; production decisions stay with the engineer',
      },
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
        title: 'Failures I work through',
        items: [
          'Legacy running on adrenaline → predictable releases and clear ownership',
          '“Migrate over one weekend” → phased moves without pausing critical sales',
          'Slow paths and bottlenecks → DB, cache, queues, search, frontend where it hurts',
          'Integrations breaking under growth → architecture and API contracts that survive change',
          'Blurred ownership → one thread: backend, frontend, CI/CD, monitoring',
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
        title: 'Cases & systems',
        partnerNote:
          'Industries and public cases live on the partner showcase. Here—my layer: tasks, stack, outcome. NDA work at meaning level only. Era years mark participation, not last commit date.',
        partnerShowcase: {
          href: 'https://webstartechnology.ru/',
          label: 'webstartechnology.ru',
        },
        highlights: [
          'Systems where downtime and errors hit revenue—storefronts, portals, internal services',
          'M1→M2 and long release cycles without stopping the business',
          'Bank and API integrations with contracts that survive change',
        ],
        selectedTitle: 'Selected projects',
        timelineLead:
          'Top—what I run now; below—eras of experience. Scroll to bring one time layer into focus.',
        projectGroups: [
          {
            period: '2022—present',
            context: 'Current workstreams: product builds, integrations, experiments—including long-running systems I still develop.',
            projects: [
              {
                name: 'Dostavka-ZPR (dostavka-zpr.ru)',
                detail:
                  'Problem: delivery service from scratch. Solution: Laravel, CDEK API, pricing and ops logic. Outcome: live contur on dostavka-zpr.ru (formerly cdek-zpr.ru).',
                href: 'https://dostavka-zpr.ru/',
              },
              {
                name: 'Krymresurs training center',
                detail:
                  'Symptom: scattered apps and document chaos. Solution: unified training, technicians, managers, doc generation. I still own the contur; krymresurs.ru is the public face, not the full system.',
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
                  'Core long engagement (~5y): Magento 1.4 → 1.9 → M2 without big-bang, custom payments and releases under load. Same business—related storefronts including SWCR.',
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
        title: 'Rescue approach',
        pillars: [
          {
            title: 'Triage',
            body: 'Symptoms, constraints, risks—then a staged plan, not “rewrite everything” by default.',
          },
          {
            title: 'Transparency',
            body: 'Options, timelines, and trade-off cost—before we ship to production.',
          },
          {
            title: 'Durability',
            body: 'After release the system stays understandable: team, monitoring, docs that matter.',
          },
          {
            title: 'Ownership',
            body: 'Not “ticket closed”—I own the problem until the business sees the effect.',
          },
        ],
      },
    },
    footerQuote:
      'Not “close the ticket”—restore predictability so growth is the business job again, not firefighting.',
    portfolio: {
      metaTitle: 'Portfolio — Eugene Zhukov',
      metaDescription:
        'Post-mortem cases: Magento, enterprise systems, e-commerce, migrations. Filters and expertise modes.',
      title: 'Portfolio',
      lead:
        'Compact post-mortems from commercial work: what broke, what was done, what changed. Cards, filters by system type, and an expertise mode switch below.',
      introTitle: 'How to use this page',
      introBody:
        'Each card is a post-mortem: target, diagnosis, work done, metrics, and stack. Focus filters narrow the list (e-commerce, enterprise, migrations, process). Expertise mode changes how titles and CTAs are framed. “Open contour” links to public case material when available.',
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
