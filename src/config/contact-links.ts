import type { Lang } from '../i18n/cv-data';
import type { ContactPinVariant } from './contact-pin-variant';

export const SITE_TELEGRAM_URL = 'https://t.me/DJES240285';

export type ContactMenuLabels = {
  button: string;
  menuTitle: string;
  email: string;
  telegram: string;
  max: string;
};

export function getContactMenuLabels(
  lang: Lang,
  variant: ContactPinVariant = 'lisa',
): ContactMenuLabels {
  if (variant === 'mario') {
    return lang === 'ru'
      ? {
          button: 'Связь — удержите или нажмите для меню',
          menuTitle: '★ Марио · на связи',
          email: 'Email',
          telegram: 'Telegram',
          max: 'MAX',
        }
      : {
          button: 'Contact — hold or tap for menu',
          menuTitle: '★ Mario · here to help',
          email: 'Email',
          telegram: 'Telegram',
          max: 'MAX',
        };
  }

  return lang === 'ru'
    ? {
        button: 'Связь — удержите или нажмите для меню',
        menuTitle: 'Леди Лиза · на вашей стороне',
        email: 'Email',
        telegram: 'Telegram',
        max: 'MAX',
      }
    : {
        button: 'Contact — hold or tap for menu',
        menuTitle: 'Lady Lisa · on your side',
        email: 'Email',
        telegram: 'Telegram',
        max: 'MAX',
      };
}
