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
  cta: fields.object(
    {
      email: fields.text({
        label: 'Email button label',
        description: 'Link → Contacts · emails[0]',
      }),
      telegram: fields.text({
        label: 'Telegram button label',
        description: 'URL → Contacts · telegramHref',
      }),
      max: fields.text({
        label: 'MAX button label',
        description: 'URL → Contacts · maxHref (hidden on EN site)',
      }),
    },
    { label: 'Hero CTA labels only (URLs → Contacts · RU/EN)' },
  ),
};
