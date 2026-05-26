import { techStackIconUrl } from './tech-stack-icons';

/** Приглушённая иконка для mission CASE_LOG (серый fill вместо brand). */
export function techStackIconUrlMuted(slug: string): string {
  if (slug === 'diafan') return '/icons/diafan.svg';
  if (slug === 'opencart') {
    return 'https://api.iconify.design/logos:opencart.svg';
  }
  if (slug === 'zabbix') {
    return 'https://api.iconify.design/logos:zabbix.svg';
  }
  const known = [
    'magento',
    'laravel',
    'php',
    'mysql',
    'docker',
    'redis',
    'vuedotjs',
    'react',
    'nodedotjs',
    'postgresql',
    'mongodb',
    'nginx',
    'git',
    'gitlab',
    'jira',
    'figma',
    'tailwindcss',
    'cursor',
    'claude',
  ];
  if (known.includes(slug)) {
    return `https://api.iconify.design/simple-icons:${slug}.svg?color=%2394a3b8`;
  }
  return techStackIconUrl(slug);
}
