import type { Lang } from '../i18n/cv-data';
import { contactYamlPath } from './content-paths';
import { loadYamlContent } from './load-yaml-content';
import type { ContactButtonDef, ContactChannelKind } from './resolve-contact-buttons';

export type SiteContact = {
  emails: string[];
  location?: string;
  linkedinLabel: string;
  linkedinHref: string;
  telegramHref: string;
  telegramHandle: string;
  maxHref: string;
  maxInvite: string;
  maxTel: string;
  mailSubjectPin: string;
  mailSubjectPortfolio: string;
  buttons: ContactButtonDef[];
  channelOrder?: ContactChannelKind[];
};

export function getContactContent(lang: Lang): SiteContact {
  return loadYamlContent<SiteContact>(contactYamlPath(lang));
}
