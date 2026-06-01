/** Сопоставление фрагментов строки стека со slug иконок (как в tech-roadmap). */
const STACK_PATTERNS: { pattern: RegExp; slug: string }[] = [
  { pattern: /magento/i, slug: 'magento' },
  { pattern: /laravel/i, slug: 'laravel' },
  { pattern: /\bphp\b/i, slug: 'php' },
  { pattern: /mysql/i, slug: 'mysql' },
  { pattern: /docker/i, slug: 'docker' },
  { pattern: /elasticsearch/i, slug: 'elasticsearch' },
  { pattern: /redis/i, slug: 'redis' },
  { pattern: /vue\.?js|vue\b/i, slug: 'vuedotjs' },
  { pattern: /react/i, slug: 'react' },
  { pattern: /node\.?js/i, slug: 'nodedotjs' },
  { pattern: /postgresql/i, slug: 'postgresql' },
  { pattern: /mongodb/i, slug: 'mongodb' },
  { pattern: /nginx/i, slug: 'nginx' },
  { pattern: /rabbitmq|очеред/i, slug: 'rabbitmq' },
  { pattern: /gitlab/i, slug: 'gitlab' },
  { pattern: /wordpress/i, slug: 'wordpress' },
  { pattern: /xenforo/i, slug: 'xenforo' },
  { pattern: /woocommerce/i, slug: 'woocommerce' },
  { pattern: /bitrix|битрикс/i, slug: 'bitrix' },
  { pattern: /apache/i, slug: 'apache' },
];

/** До 5 иконок на строку кейса — из явного списка или разбора stack. */
export function resolveCaseStackIcons(explicit: string[] | undefined, stack: string): string[] {
  const slugs: string[] = [];
  const add = (slug: string) => {
    if (!slugs.includes(slug)) slugs.push(slug);
  };

  if (explicit?.length) {
    for (const s of explicit) add(s);
  } else {
    for (const { pattern, slug } of STACK_PATTERNS) {
      if (pattern.test(stack)) add(slug);
    }
  }

  const max = explicit?.length ? Math.min(explicit.length, 7) : 5;
  return slugs.slice(0, max);
}
