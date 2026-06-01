import { fields } from '@keystatic/core';

export const contactSchema = {
  emails: fields.array(fields.text({ label: 'Email' }), {
    label: 'Emails',
    itemLabel: (props) => props.value || 'Email',
  }),
  location: fields.text({ label: 'Location (optional)' }),
  linkedinLabel: fields.text({ label: 'LinkedIn label' }),
  linkedinHref: fields.url({ label: 'LinkedIn URL' }),
  telegramHref: fields.url({ label: 'Telegram URL' }),
  telegramHandle: fields.text({ label: 'Telegram handle (display)' }),
  maxHref: fields.url({ label: 'MAX profile URL' }),
  maxInvite: fields.text({ label: 'MAX phone (display)' }),
  maxTel: fields.text({ label: 'MAX phone (tel: / E.164)' }),
  mailSubjectPin: fields.text({ label: 'Mailto subject — contact pin / site' }),
  mailSubjectPortfolio: fields.text({ label: 'Mailto subject — portfolio CTA' }),
  buttons: fields.array(
    fields.object({
      kind: fields.select({
        label: 'Type',
        options: [
          { label: 'Email', value: 'email' },
          { label: 'Telegram', value: 'telegram' },
          { label: 'MAX', value: 'max' },
          { label: 'LinkedIn', value: 'linkedin' },
          { label: 'Custom link', value: 'custom' },
        ],
        defaultValue: 'email',
      }),
      label: fields.text({ label: 'Button label' }),
      style: fields.select({
        label: 'Style (mission hero)',
        options: [
          { label: 'Primary', value: 'primary' },
          { label: 'Ghost', value: 'ghost' },
        ],
        defaultValue: 'ghost',
      }),
      href: fields.url({
        label: 'URL override',
        description: 'Only for Custom, or to override the default link for this type',
      }),
      mailSubject: fields.text({
        label: 'Mail subject',
        description: 'Only for Email (overrides mailSubjectPin)',
      }),
      showOnHero: fields.checkbox({ label: 'Show on mission hero', defaultValue: true }),
      showInPin: fields.checkbox({ label: 'Show in contact pin menu', defaultValue: true }),
      showInBridge: fields.checkbox({
        label: 'Show in bridge block (secondary)',
        defaultValue: false,
      }),
    }),
    {
      label: 'Contact buttons (drag to reorder)',
      itemLabel: (props) => props.fields.label.value || props.fields.kind.value,
    },
  ),
  channelOrder: fields.array(
    fields.select({
      label: 'Channel',
      options: [
        { label: 'Email', value: 'email' },
        { label: 'Telegram', value: 'telegram' },
        { label: 'MAX', value: 'max' },
        { label: 'LinkedIn', value: 'linkedin' },
      ],
      defaultValue: 'email',
    }),
    {
      label: 'Resume contact tree order',
      itemLabel: (props) => props.value || 'channel',
    },
  ),
};

const mindsetIndicator = fields.select({
  label: 'Indicator variant',
  options: [
    { label: 'Audit', value: 'audit' },
    { label: 'Regime', value: 'regime' },
    { label: 'Scale', value: 'scale' },
    { label: 'E2E', value: 'e2e' },
  ],
  defaultValue: 'audit',
});

const stackContour = fields.select({
  label: 'Contour',
  options: [
    { label: 'Backend', value: 'backend' },
    { label: 'Frontend', value: 'frontend' },
    { label: 'AI', value: 'ai' },
  ],
  defaultValue: 'backend',
});

const readoutTone = fields.select({
  label: 'Tone',
  options: [
    { label: 'Stability', value: 'stability' },
    { label: 'AI', value: 'ai' },
  ],
  defaultValue: 'stability',
});

export const missionControlSchema = {
  metaTitle: fields.text({ label: 'Meta title' }),
  metaDescription: fields.text({ label: 'Meta description', multiline: true }),
  hero: fields.object(
    {
      headline: fields.text({ label: 'Headline', multiline: true }),
      lead: fields.text({ label: 'Lead', multiline: true }),
      avatarAlt: fields.text({ label: 'Avatar alt' }),
    },
    { label: 'Hero' },
  ),
  engineerPassport: fields.object(
    {
      name: fields.text({ label: 'Name' }),
      role: fields.text({ label: 'Role' }),
      metricsTitle: fields.text({ label: 'Metrics title' }),
      metrics: fields.array(
        fields.object({
          label: fields.text({ label: 'Label' }),
          value: fields.text({ label: 'Value' }),
          valueNote: fields.text({ label: 'Value note (optional)' }),
        }),
        { label: 'Metrics', itemLabel: (props) => props.fields.label.value || 'Metric' },
      ),
      stackTitle: fields.text({ label: 'Stack title' }),
      stackGroups: fields.array(
        fields.object({
          label: fields.text({ label: 'Label' }),
          value: fields.text({ label: 'Value', multiline: true }),
          contour: stackContour,
        }),
        { label: 'Stack groups', itemLabel: (props) => props.fields.label.value || 'Group' },
      ),
      readouts: fields.array(
        fields.object({
          code: fields.text({ label: 'Code' }),
          label: fields.text({ label: 'Label' }),
          headline: fields.text({ label: 'Headline' }),
          detail: fields.text({ label: 'Detail', multiline: true }),
          tone: readoutTone,
        }),
        { label: 'Readouts', itemLabel: (props) => props.fields.code.value || 'Readout' },
      ),
      activityLabel: fields.text({ label: 'Activity label' }),
      activityHint: fields.text({ label: 'Activity hint' }),
      activityLegendLess: fields.text({ label: 'Activity legend (less)' }),
      activityLegendMore: fields.text({ label: 'Activity legend (more)' }),
      activityTotal: fields.text({ label: 'Activity total ({count})' }),
      activityPeriods: fields.object(
        {
          week: fields.text({ label: 'Period: week' }),
          month: fields.text({ label: 'Period: month' }),
          year: fields.text({ label: 'Period: year' }),
          twoYears: fields.text({ label: 'Period: 2 years' }),
          all: fields.text({ label: 'Period: all time' }),
        },
        { label: 'Activity period switcher' },
      ),
      vizAriaLabel: fields.text({ label: 'Viz aria label' }),
    },
    { label: 'Engineer passport' },
  ),
  mindset: fields.object(
    {
      title: fields.text({ label: 'Title' }),
      badge: fields.text({ label: 'Badge' }),
      steps: fields.array(
        fields.object({
          phase: fields.text({ label: 'Phase' }),
          title: fields.text({ label: 'Title' }),
          detail: fields.text({ label: 'Detail', multiline: true }),
          indicatorLabel: fields.text({ label: 'Indicator label' }),
          indicator: mindsetIndicator,
        }),
        { label: 'Steps', itemLabel: (props) => props.fields.title.value || 'Step' },
      ),
    },
    { label: 'Mindset' },
  ),
  caseLog: fields.object(
    {
      title: fields.text({ label: 'Title' }),
      intro: fields.text({ label: 'Intro', multiline: true }),
      statusLegend: fields.text({ label: 'Status legend', multiline: true }),
      colId: fields.text({ label: 'Column ID' }),
      colTarget: fields.text({ label: 'Column target' }),
      colOperation: fields.text({ label: 'Column operation' }),
      colStack: fields.text({ label: 'Column stack' }),
      colStatus: fields.text({ label: 'Column status' }),
      rowAction: fields.text({ label: 'Row action' }),
      drumAriaLabel: fields.text({ label: 'Drum aria label', multiline: true }),
      windowTitle: fields.text({ label: 'Window title' }),
      foldLightsAria: fields.text({ label: 'Fold lights aria' }),
      foldClose: fields.text({ label: 'Fold close' }),
      foldPreviewMode: fields.text({ label: 'Fold preview mode' }),
      foldOpen: fields.text({ label: 'Fold open' }),
    },
    { label: 'Case log (labels only; rows from CV projects)' },
  ),
  bridge: fields.object(
    {
      title: fields.text({ label: 'Title' }),
      body: fields.text({ label: 'Body', multiline: true }),
      cta: fields.text({ label: 'CTA label (button text only)' }),
      mailtoSubject: fields.text({
        label: 'Mailto subject',
        description: 'Email address is taken from Contacts · RU/EN → emails',
      }),
    },
    { label: 'Bridge (mailto subject only; email URL → Contacts)' },
  ),
  ai: fields.object(
    {
      line: fields.text({ label: 'Line', multiline: true }),
    },
    { label: 'AI note' },
  ),
  footer: fields.object(
    {
      contactsLabel: fields.text({ label: 'Contacts label' }),
    },
    { label: 'Footer' },
  ),
};

export const contourScanSchema = {
  authors: fields.array(fields.text({ label: 'Git author (email or name)' }), {
    label: 'Authors filter',
    description: 'git log --author; только эти авторы попадут в heatmap',
    itemLabel: (props) => props.value || 'author',
  }),
  noMerges: fields.checkbox({ label: 'Exclude merge commits', defaultValue: true }),
  repos: fields.array(
    fields.object({
      id: fields.text({ label: 'ID (slug)' }),
      note: fields.text({ label: 'Note (internal)' }),
      path: fields.text({
        label: 'Absolute path on disk',
        description: 'Папка с .git на вашем Mac. Скан только локально: bun run activity:scan',
      }),
      enabled: fields.checkbox({ label: 'Include in scan', defaultValue: true }),
    }),
    {
      label: 'Repositories',
      description:
        'Список репозиториев для карты коммитов. После правок: bun run activity:scan и закоммитить src/data/contour-activity.json',
      itemLabel: (props) => props.fields.id.value || props.fields.note.value || 'repo',
    },
  ),
};
