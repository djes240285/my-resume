import type { Lang } from '../i18n/cv-data';
import { buildMissionCaseLogEntries } from './build-mission-case-log';
import { missionControlYamlPath } from './content-paths';
import { loadYamlContent } from './load-yaml-content';
import type { MissionControlContent } from '../i18n/mission-control-data';

/** YAML без entries — строки case log собираются из CV-проектов на build. */
type MissionControlYaml = Omit<MissionControlContent, 'caseLog'> & {
  caseLog: Omit<MissionControlContent['caseLog'], 'entries'>;
};

export function loadMissionControlContent(lang: Lang): MissionControlContent {
  const data = loadYamlContent<MissionControlYaml>(missionControlYamlPath(lang));
  return {
    ...data,
    caseLog: {
      ...data.caseLog,
      entries: buildMissionCaseLogEntries(lang),
    },
  };
}
