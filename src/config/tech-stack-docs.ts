/**
 * Официальная документация для строк техностека.
 * Ключ = точное значение `name` из `cv-data` (русский и английский, если строки различаются).
 * Если записи нет — ссылка не показывается (можно дописать или задать `docHref` на элементе).
 */
export const TECH_STACK_DOC_HREFS: Record<string, string> = {
  'Magento · Open Source / Adobe Commerce': 'https://experienceleague.adobe.com/en/docs/commerce',
  WordPress: 'https://developer.wordpress.org/',
  WooCommerce: 'https://woocommerce.com/documentation/',
  Shopify: 'https://shopify.dev/docs',
  Drupal: 'https://www.drupal.org/documentation',
  Strapi: 'https://docs.strapi.io/',
  Contentful: 'https://www.contentful.com/developers/docs/',
  Storyblok: 'https://www.storyblok.com/docs',
  OpenCart: 'https://docs.opencart.com/',
  'Diafan CMS': 'https://www.diafan.ru/dokument/',
  Joomla: 'https://docs.joomla.org/',

  Laravel: 'https://laravel.com/docs',
  'Laminas (Zend)': 'https://docs.laminas.dev/',
  Python: 'https://docs.python.org/3/',
  Bash: 'https://www.gnu.org/software/bash/manual/bash.html',

  'HTML / CSS': 'https://developer.mozilla.org/docs/Web/HTML',
  'JavaScript · Vue': 'https://vuejs.org/guide/',
  'JavaScript · React': 'https://react.dev/',
  Vite: 'https://vite.dev/guide/',
  'jQuery / легаси UI': 'https://api.jquery.com/',
  'jQuery / legacy UI': 'https://api.jquery.com/',

  'MySQL / MariaDB': 'https://dev.mysql.com/doc/',
  PostgreSQL: 'https://www.postgresql.org/docs/',
  MongoDB: 'https://www.mongodb.com/docs/',
  'Microsoft SQL Server': 'https://learn.microsoft.com/sql/sql-server/',
  Redis: 'https://redis.io/docs/',
  'OpenSearch / Elasticsearch': 'https://opensearch.org/docs/latest/',

  Docker: 'https://docs.docker.com/',
  Nginx: 'https://nginx.org/en/docs/',
  'Очереди и воркеры': 'https://www.rabbitmq.com/documentation.html',
  'Queues & workers': 'https://www.rabbitmq.com/documentation.html',
  'CI/CD': 'https://docs.gitlab.com/ee/ci/',
  'Мониторинг / логи': 'https://www.zabbix.com/documentation/current/en',
  'Monitoring / logs': 'https://www.zabbix.com/documentation/current/en',

  Git: 'https://git-scm.com/doc',
  Composer: 'https://getcomposer.org/doc/',
  NPM: 'https://docs.npmjs.com/',
  IDE: 'https://code.visualstudio.com/docs',
  Cursor: 'https://cursor.com/docs',
  'Claude (Anthropic)': 'https://docs.anthropic.com/',
  'Postman / HTTP-клиенты': 'https://learning.postman.com/docs/',
  'Postman / HTTP clients': 'https://learning.postman.com/docs/',
  OpenAPI: 'https://spec.openapis.org/oas/latest.html',
  'Jira / трекеры': 'https://support.atlassian.com/jira-software-cloud/',
  'Jira / trackers': 'https://support.atlassian.com/jira-software-cloud/',
};
