import type { RangeKey } from '../lib/contour-activity-types';
import type { Lang } from '../i18n/cv-data';

type InitOptions = {
  lang: Lang;
  periodLabels: Record<RangeKey, string>;
  totalTemplate: string;
};

export function initContributionGraph(root: HTMLElement, options: InitOptions): void {
  const periodEl = root.querySelector<HTMLElement>('[data-contrib-period]');
  const totalEl = root.querySelector<HTMLElement>('[data-contrib-total]');
  const panels = root.querySelectorAll<HTMLElement>('[data-range-panel]');
  const buttons = root.querySelectorAll<HTMLButtonElement>('[data-range]');

  if (!periodEl || !totalEl || !panels.length) return;

  const { lang, periodLabels, totalTemplate } = options;
  let activeKey =
    (root.dataset.defaultRange as RangeKey | undefined) ?? 'year';

  function applyRange(key: RangeKey): void {
    activeKey = key;
    let period = '';
    let total = '';

    panels.forEach((panel) => {
      const on = panel.dataset.rangePanel === key;
      panel.hidden = !on;
      if (on) {
        period = panel.dataset.period ?? '';
        total = panel.dataset.total ?? '';
      }
    });

    periodEl.textContent = period;
    totalEl.textContent = totalTemplate.replace('{count}', total);

    buttons.forEach((btn) => {
      const on = btn.dataset.range === key;
      btn.classList.toggle('mc-contrib__period-btn--active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
  }

  buttons.forEach((btn) => {
    const key = btn.dataset.range as RangeKey | undefined;
    if (!key) return;
    const panel = root.querySelector(`[data-range-panel="${key}"]`);
    if (!panel) {
      btn.hidden = true;
      return;
    }
    btn.textContent = periodLabels[key] ?? key;
    btn.addEventListener('click', () => applyRange(key));
  });

  applyRange(activeKey);
}
