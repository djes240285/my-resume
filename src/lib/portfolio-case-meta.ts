export type PortfolioMode = 'legacy' | 'profit' | 'ai';

export type PortfolioMeta = {
  tags: string[];
  modes: PortfolioMode[];
  aiEnhanced: boolean;
  rescue: boolean;
};

/** Теги «Фокус» и режимы экспертизы для карточек портфолио (согласовано с cv-data). */
export function inferPortfolioMeta(
  name: string,
  detail: string,
  groupContext = ''
): PortfolioMeta {
  const nameLc = name.toLowerCase();
  const text = `${nameLc} ${detail} ${groupContext}`.toLowerCase();
  const tags = new Set<string>(['all']);

  const ecom =
    /(magento|opencart|битрикс|bitrix|windowcleaner|gratisiskolan|verkter|rattan|microline|nancysbeauty|finaldraft|biznesmashin|grungy|dikoros|shop|store\.|витрин)/.test(
      text
    );
  if (ecom) tags.add('ecom');

  const enterprise =
    /(erp|крымресурс|krymresurs|sechat|mozgovnet|102 пэс|102 pes|кпск|kpsk|гагарин|gagarin|колл-центр|call center|концертный зал|kko|музыкальн|musical theatre|pixel perfect|corporate)/.test(
      text
    ) || /(кабинет|portal|документооборот)/.test(text);
  if (enterprise) tags.add('enterprise');

  const migrations =
    /(мигра|migrat|\bm1\b|\bm2\b|1\.4|1\.9|2\.4|переход|upgrade|эволюц)/.test(text) ||
    nameLc.includes('windowcleaner') ||
    nameLc.includes('gratisiskolan');
  if (migrations) tags.add('migrations');

  if (
    /(интеграц|integration|процесс|workflow|очеред|rabbit|redis|api|релиз|release|devops|синхрон|document)/.test(
      text
    ) ||
    tags.has('enterprise') ||
    tags.has('ecom') ||
    tags.has('migrations')
  ) {
    tags.add('process');
  }
  if (tags.size === 1) tags.add('process');

  const modes = new Set<PortfolioMode>();

  if (/(крымресурс|krymresurs)/.test(nameLc)) modes.add('ai');
  if (/(telegram|aiogram|claude|микро-коучинг|micro-coaching)/.test(text)) modes.add('ai');
  if (nameLc.includes('sechat') && /(ии|ai|llm|anti-spam)/i.test(detail)) modes.add('ai');

  if (tags.has('migrations')) modes.add('legacy');
  if (
    /(легаси|legacy|zend|xenforo|dnforum|кпск|kpsk|mozgovnet|archive|архив|accuscore|terradelyssa|epik|turexpertiza|cargo\.flowers|shkafkrovat|rkb-bank)/.test(
      text
    )
  ) {
    modes.add('legacy');
  }
  if (nameLc.includes('biznesmashin')) modes.add('legacy');
  if (nameLc.includes('колл-центр') || nameLc.includes('call center')) modes.add('legacy');
  if (nameLc.includes('pixel perfect') || /pixel perfect/.test(text)) modes.add('legacy');

  if (tags.has('ecom') && !nameLc.includes('biznesmashin')) modes.add('profit');
  if (/(102 пэс|102 pes|гагарин|gagarin|доставка|dostavka|layer\.cafe)/.test(nameLc)) modes.add('profit');
  if (nameLc.includes('windowcleaner')) modes.add('profit');
  if (nameLc.includes('krymresurs') || nameLc.includes('крымресурс')) modes.add('profit');

  if (modes.size === 0) {
    modes.add('legacy');
    modes.add('profit');
  }

  const aiEnhanced =
    modes.has('ai') &&
    !/(windowcleaner|gratisiskolan|verkter|rattan|finaldraft|microline|nancysbeauty|pixel perfect)/.test(
      nameLc
    );

  const rescue =
    modes.has('legacy') &&
    (tags.has('migrations') ||
      /(легаси|legacy|кпск|kpsk|mozgovnet|архив|archive|zend|xenforo|dnforum|мигра)/.test(text));

  return {
    tags: Array.from(tags),
    modes: Array.from(modes),
    aiEnhanced,
    rescue,
  };
}
