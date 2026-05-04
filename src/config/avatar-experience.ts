/**
 * Аватар: стек-карусель (клик), прицел при hover, без лишней анимации рамки.
 *
 * P0 — слайды только с реально существующими файлами в /public.
 * P1 — добавить PNG в public и строку в AVATAR_STACK_SLIDES (WordPress, React, Magento, …).
 *
 * Имена файлов-заготовок (положить рядом с avatar-stack-laravel.png):
 *   avatar-stack-wordpress.png, avatar-stack-react.png, avatar-stack-magento.png, …
 */

import type { Lang } from '../i18n/cv-data';

export const AVATAR_RETRO_CONCEPT = '/avatar-retro-concept.png';

export type AvatarStackSlide = {
  id: string;
  src: string;
  labelRu: string;
  labelEn: string;
};

/**
 * Порядок = порядок переключения по клику. Первый кадр — дефолт при загрузке.
 *
 * Согласованный «хот-лист» иконок/кадров под стек (добавляйте PNG в /public):
 *   — retro (HUD)          → avatar-retro-concept.png
 *   — Laravel             → avatar-stack-laravel.png
 *   — Magento             → avatar-stack-magento.png   (TODO)
 *   — WordPress           → avatar-stack-wordpress.png (TODO)
 *   — React               → avatar-stack-react.png     (TODO)
 *   — Vue                 → avatar-stack-vue.png       (TODO)
 *   — Docker / infra      → avatar-stack-docker.png    (опционально)
 * Плюс 1–2 «живых» портрета без бренда (studio, profile).
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
    id: 'laravel',
    src: '/avatar-stack-laravel.png',
    labelRu: 'Laravel',
    labelEn: 'Laravel',
  },
  {
    id: 'studio',
    src: '/avatar-natural-im.png',
    labelRu: 'Студийное',
    labelEn: 'Studio',
  },
  {
    id: 'profile',
    src: '/profile.png',
    labelRu: 'Профиль',
    labelEn: 'Profile',
  },
];

export function avatarSlideLabel(slide: AvatarStackSlide, lang: Lang): string {
  return lang === 'ru' ? slide.labelRu : slide.labelEn;
}

/** @deprecated оставлено для совместимости импортов; карусель использует слайды */
export const AVATAR_NATURAL_POOL = ['/avatar-natural-im.png', '/profile.png'] as const;

export const AVATAR_RETRO_CIRCLE = '/avatar-retro-circle.png';
export const AVATAR_RETRO_LEGACY_PIXEL = '/avatar-retro-pixel.png';
