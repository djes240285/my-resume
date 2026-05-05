/**
 * Аватар: стек-карусель по клику, SVG-видоискатель при hover, звук из `AVATAR_SHUTTER_MP3`.
 *
 * P0 — слайды только с реально существующими файлами в /public.
 * P1 — доп. технологии (Vue, Docker, …): PNG в public + слайд в AVATAR_STACK_SLIDES.
 *
 * Имена файлов-заготовок (положить рядом с avatar-stack-laravel.png):
 *   avatar-stack-wordpress.png, avatar-stack-react.png, avatar-stack-magento.png, …
 */

import type { Lang } from '../i18n/cv-data';

/** Локальный MP3 щелчка затвора — проверьте лицензию источника перед публичным коммерческим использованием */
export const AVATAR_SHUTTER_MP3 = '/sounds/avatar-shutter.mp3';

/** Сколько мс играть после фактического старта (`playing`); отсчёт от клика ломал воспроизведение на медленном decode */
export const AVATAR_SHUTTER_PLAY_MS = 900;

export const AVATAR_RETRO_CONCEPT = '/avatar-retro-concept.png';

/** «Чистое» фото 1:1 — второй кадр после HUD (файл из Im-clean.png) */
export const AVATAR_CLEAN_PHOTO = '/avatar-clean.png';

export type AvatarStackSlide = {
  id: string;
  src: string;
  labelRu: string;
  labelEn: string;
};

/**
 * Порядок = порядок переключения по клику. Первый кадр — дефолт при загрузке.
 *
 * Согласованный порядок (PNG в /public):
 *   — retro (HUD)     → avatar-retro-concept.png
 *   — чистое фото     → avatar-clean.png (исходник Im-clean.png, 1254×1254)
 *   — стек            → avatar-stack-{laravel,magento,wordpress,react}.png
 *   — Vue, Docker     → по желанию
 *
 * Не делайте цикл длиннее 6–7 кадров: иначе мало кто докликает, шутка
 * превращается в навигационный квест.
 */
export const AVATAR_STACK_SLIDES: AvatarStackSlide[] = [
  {
    id: 'retro',
    src: AVATAR_RETRO_CONCEPT,
    labelRu: 'HUD / пиксель',
    labelEn: 'HUD / pixel',
  },
  {
    id: 'clean',
    src: AVATAR_CLEAN_PHOTO,
    labelRu: 'Фото',
    labelEn: 'Photo',
  },
  {
    id: 'laravel',
    src: '/avatar-stack-laravel.png',
    labelRu: 'Laravel',
    labelEn: 'Laravel',
  },
  {
    id: 'magento',
    src: '/avatar-stack-magento.png',
    labelRu: 'Magento',
    labelEn: 'Magento',
  },
  {
    id: 'wordpress',
    src: '/avatar-stack-wordpress.png',
    labelRu: 'WordPress',
    labelEn: 'WordPress',
  },
  {
    id: 'react',
    src: '/avatar-stack-react.png',
    labelRu: 'React',
    labelEn: 'React',
  },
];

export function avatarSlideLabel(slide: AvatarStackSlide, lang: Lang): string {
  return lang === 'ru' ? slide.labelRu : slide.labelEn;
}

/** @deprecated оставлено для совместимости импортов; карусель использует слайды */
export const AVATAR_NATURAL_POOL = [
  AVATAR_CLEAN_PHOTO,
  '/avatar-natural-im.png',
  '/profile.png',
] as const;

export const AVATAR_RETRO_CIRCLE = '/avatar-retro-circle.png';
export const AVATAR_RETRO_LEGACY_PIXEL = '/avatar-retro-pixel.png';
