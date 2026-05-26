/**
 * Цветные SVG через Iconify: у simple-icons с jsDelivr нет fill → в <img> они чёрные.
 * simple-icons:{slug}?color=%23{hex} задаёт brand fill.
 */
const SIMPLE_ICONS_HEX: Record<string, string> = {
  magento: 'EE672F',
  wordpress: '21759B',
  woocommerce: '96588A',
  shopify: '7AB55C',
  drupal: '0678BE',
  strapi: '4945FF',
  contentful: '2478CC',
  statamic: 'FF269E',
  storyblok: '09B3AF',
  joomla: '5091CD',
  laravel: 'FF2D20',
  zend: '0679EA',
  python: '3776AB',
  gnubash: '4EAA25',
  html5: 'E34F26',
  vuedotjs: '4FC08D',
  react: '61DAFB',
  vite: '646CFF',
  jquery: '0769AD',
  mysql: '4479A1',
  postgresql: '4169E1',
  mongodb: '47A248',
  microsoftsqlserver: 'CC2927',
  redis: 'DC382D',
  opensearch: '005EB8',
  docker: '2496ED',
  nginx: '009639',
  rabbitmq: 'FF6600',
  gitlab: 'FC6D26',
  git: 'F05032',
  composer: '885630',
  npm: 'CB3837',
  visualstudiocode: '007ACC',
  postman: 'FF6C37',
  swagger: '85EA2D',
  jira: '0052CC',
  cursor: 'EBECEF',
  claude: 'CC785C',
  figma: 'F24E1E',
  tailwindcss: '06B6D4',
  php: '777BB4',
  nodedotjs: '339933',
};

export function techStackIconUrl(slug: string): string {
  if (slug === 'diafan') {
    return '/icons/diafan.svg';
  }
  if (slug === 'opencart') {
    return 'https://api.iconify.design/logos:opencart.svg';
  }
  if (slug === 'zabbix') {
    return 'https://api.iconify.design/logos:zabbix.svg';
  }
  const hex = SIMPLE_ICONS_HEX[slug];
  if (hex) {
    return `https://api.iconify.design/simple-icons:${slug}.svg?color=%23${hex}`;
  }
  return `https://api.iconify.design/simple-icons:${slug}.svg`;
}
