/** Ключ localStorage для настроек отображения (a11y). */
export const A11Y_PREFS_STORAGE_KEY = 'a11y-prefs-v1';

export type A11yFontSize = '100' | '125' | '150';
export type A11yContrast = 'default' | 'high';
export type A11yMotion = 'default' | 'reduce';
export type A11ySimple = 'off' | 'on';

export type A11yPrefs = {
  font: A11yFontSize;
  contrast: A11yContrast;
  motion: A11yMotion;
  simple: A11ySimple;
};

export const A11Y_DEFAULTS: A11yPrefs = {
  font: '100',
  contrast: 'default',
  motion: 'default',
  simple: 'off',
};

export const A11Y_FONT_OPTIONS: A11yFontSize[] = ['100', '125', '150'];
