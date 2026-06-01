import { config, singleton } from '@keystatic/core';
import { contactSchema, contourScanSchema, missionControlSchema } from './keystatic/schemas';

export default config({
  storage: {
    kind: 'local',
  },
  singletons: {
    contactRu: singleton({
      label: '🔗 Contacts · RU (URL кнопок)',
      path: 'src/content/contact/ru',
      format: { data: 'yaml' },
      schema: contactSchema,
    }),
    contactEn: singleton({
      label: '🔗 Contacts · EN (button URLs)',
      path: 'src/content/contact/en',
      format: { data: 'yaml' },
      schema: contactSchema,
    }),
    missionControlRu: singleton({
      label: 'Mission Control · RU (тексты)',
      path: 'src/content/mission-control/ru',
      format: { data: 'yaml' },
      schema: missionControlSchema,
    }),
    missionControlEn: singleton({
      label: 'Mission Control · EN (copy)',
      path: 'src/content/mission-control/en',
      format: { data: 'yaml' },
      schema: missionControlSchema,
    }),
    contourScan: singleton({
      label: 'Contour scan · repos (git heatmap)',
      path: 'src/content/contour-scan/config',
      format: { data: 'yaml' },
      schema: contourScanSchema,
    }),
  },
});
