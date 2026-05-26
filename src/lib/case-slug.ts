/** Slug якоря #case-* в портфолио (единый для portfolio и mission). */
export function caseSlug(name: string): string {
  const lc = name.toLowerCase();
  if (lc.includes('windowcleaner')) return 'windowcleaner';
  if (lc.includes('крымресурс') || lc.includes('krymresurs')) return 'krymresurs';
  if (lc.includes('доставка') || lc.includes('dostavka-zpr') || lc.includes('dostavka')) return 'dostavka-zpr';
  if (lc.includes('sechat')) return 'sechat';
  if (lc.includes('gratisiskolan')) return 'gratisiskolan';
  if (lc.includes('mozgovnet')) return 'mozgovnet';
  if (lc.includes('verkter')) return 'verkter';
  return lc
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}
