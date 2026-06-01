import type { Lang } from '../i18n/cv-data';
import type { SiteContact } from './load-contact';

export type ContactButtonKind = 'email' | 'telegram' | 'max' | 'linkedin' | 'custom';
export type ContactButtonStyle = 'primary' | 'ghost';

export type ContactButtonDef = {
  kind: ContactButtonKind;
  label: string;
  style?: ContactButtonStyle;
  /** Для kind: custom или переопределение URL */
  href?: string;
  mailSubject?: string;
  showOnHero?: boolean;
  showInPin?: boolean;
  showInBridge?: boolean;
};

export type ContactChannelKind = 'email' | 'telegram' | 'max' | 'linkedin';

export type ResolvedContactButton = {
  kind: ContactButtonKind;
  label: string;
  href: string;
  style: ContactButtonStyle;
  external: boolean;
  iconSrc: string;
  pinGlyph: string;
  marioSfx?: 'coin' | 'jump' | 'powerup';
  showOnHero: boolean;
  showInPin: boolean;
  showInBridge: boolean;
};

const ICON: Record<ContactButtonKind, string> = {
  email: '/logo-mail.svg',
  telegram: '/logo-telegram.svg',
  max: '/logo-max.svg',
  linkedin: '/logo-linkedin.svg',
  custom: '/logo-mail.svg',
};

const PIN_GLYPH: Record<ContactButtonKind, string> = {
  email: '@',
  telegram: 'TG',
  max: 'M',
  linkedin: 'in',
  custom: '↗',
};

const MARIO_SFX: Partial<Record<ContactButtonKind, ResolvedContactButton['marioSfx']>> = {
  email: 'coin',
  telegram: 'jump',
  max: 'powerup',
};

function resolveHref(def: ContactButtonDef, contact: SiteContact): string | null {
  if (def.kind === 'custom') {
    return def.href?.trim() || null;
  }
  if (def.href?.trim()) return def.href.trim();

  switch (def.kind) {
    case 'email': {
      const email = contact.emails[0];
      if (!email) return null;
      const subject = def.mailSubject?.trim() || contact.mailSubjectPin;
      return `mailto:${email}?subject=${encodeURIComponent(subject)}`;
    }
    case 'telegram':
      return contact.telegramHref || null;
    case 'max':
      return contact.maxHref || null;
    case 'linkedin':
      return contact.linkedinHref || null;
    default:
      return null;
  }
}

export function resolveContactButtons(
  contact: SiteContact,
  lang: Lang,
): ResolvedContactButton[] {
  const out: ResolvedContactButton[] = [];

  const defs = contact.buttons?.length ? contact.buttons : [];
  for (const def of defs) {
    if (def.kind === 'max' && lang === 'en') continue;

    const href = resolveHref(def, contact);
    if (!href) continue;

    const external = def.kind !== 'email';
    out.push({
      kind: def.kind,
      label: def.label,
      href,
      style: def.style === 'primary' ? 'primary' : 'ghost',
      external,
      iconSrc: ICON[def.kind],
      pinGlyph: PIN_GLYPH[def.kind],
      marioSfx: MARIO_SFX[def.kind],
      showOnHero: def.showOnHero !== false,
      showInPin: def.showInPin !== false,
      showInBridge: def.showInBridge === true,
    });
  }

  return out;
}

export function heroButtons(buttons: ResolvedContactButton[]): ResolvedContactButton[] {
  return buttons.filter((b) => b.showOnHero);
}

export function pinButtons(buttons: ResolvedContactButton[]): ResolvedContactButton[] {
  return buttons.filter((b) => b.showInPin);
}

export function bridgeButtons(buttons: ResolvedContactButton[]): ResolvedContactButton[] {
  return buttons.filter((b) => b.showInBridge);
}

const DEFAULT_CHANNEL_ORDER: ContactChannelKind[] = ['email', 'telegram', 'max', 'linkedin'];

export function contactChannelOrder(contact: SiteContact, lang: Lang): ContactChannelKind[] {
  const order = contact.channelOrder?.length ? contact.channelOrder : DEFAULT_CHANNEL_ORDER;
  return order.filter((k) => k !== 'max' || lang === 'ru');
}
