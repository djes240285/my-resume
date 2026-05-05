import type {
  ExperienceProjectGroup,
  ProjectEntry,
  ProjectOutbound,
  ProjectOutboundKind,
} from '../i18n/cv-data';
import { checkUrlResolves } from './check-url-resolves';

export type ResolvedProjectLink = {
  href: string;
  kind: ProjectOutboundKind;
  show: boolean;
};

export type ProjectEntryWithCaseLink = ProjectEntry & {
  resolvedLinks: ResolvedProjectLink[];
};

export type ExperienceProjectGroupWithCaseLink = Omit<ExperienceProjectGroup, 'projects'> & {
  projects: ProjectEntryWithCaseLink[];
};

function collectOutbound(p: ProjectEntry): ProjectOutbound[] {
  if (p.links?.length) {
    return p.links;
  }
  if (p.href) {
    return [{ kind: 'website', href: p.href }];
  }
  return [];
}

export async function resolveProjectCaseLinks(
  groups: ExperienceProjectGroup[]
): Promise<ExperienceProjectGroupWithCaseLink[]> {
  const hrefs = [
    ...new Set(
      groups.flatMap((g) => g.projects.flatMap((p) => collectOutbound(p).map((l) => l.href)))
    ),
  ];
  const ok = new Map<string, boolean>();
  await Promise.all(
    hrefs.map(async (h) => {
      ok.set(h, await checkUrlResolves(h));
    })
  );

  return groups.map((g) => ({
    ...g,
    projects: g.projects.map((p) => {
      const outbound = collectOutbound(p);
      const resolvedLinks = outbound.map((l) => ({
        href: l.href,
        kind: l.kind,
        show: ok.get(l.href) ?? false,
      }));
      return {
        ...p,
        resolvedLinks,
      };
    }),
  }));
}
