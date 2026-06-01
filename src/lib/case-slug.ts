/** Slug якоря #case-* в портфолио (единый для portfolio и mission). */
export function caseSlug(name: string): string {
  const lc = name.toLowerCase();
  if (lc.includes('windowcleaner')) return 'windowcleaner';
  if (lc.includes('крымресурс') || lc.includes('krymresurs')) return 'krymresurs';
  if (lc.includes('доставка') || lc.includes('dostavka-zpr') || lc.includes('dostavka')) return 'dostavka-zpr';
  if (lc.includes('sechat')) return 'sechat';
  if (lc.includes('gratisiskolan')) return 'gratisiskolan';
  if (lc.includes('mozgovnet')) return 'mozgovnet';
  if (lc.includes('biznesmashin')) return 'biznesmashin';
  if (lc.includes('кпск') || lc.includes('kpsk')) return 'kpsk';
  if (lc.includes('гагарин') || lc.includes('gagarin')) return 'gagarin';
  if (lc.includes('102 пэс') || lc.includes('102 pes')) return '102pes';
  if (lc.includes('музыкальн') || lc.includes('musical theatre')) return 'muzteatr';
  if (lc.includes('кко') || lc.includes('kko concert')) return 'kko';
  if (lc.includes('dnforum')) return 'dnforum';
  if (lc.includes('grungy')) return 'grungy-gentleman';
  if (lc.includes('shkafkrovat')) return 'shkafkrovat';
  if (lc.includes('verkter')) return 'verkter';
  return lc
    .replace(/[^a-z0-9а-яё]+/gi, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 48);
}
