import type { Lang } from '../i18n/cv-data';
import { contactYamlPath } from './content-paths';
import { loadYamlContent } from './load-yaml-content';

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
};

export function getContactContent(lang: Lang): SiteContact {
  return loadYamlContent<SiteContact>(contactYamlPath(lang));
}
