/**
 * План «идеального» аватара (итерации, не всё сразу):
 *
 * P0 (сейчас) — один канонический ретро-кадр из концепта (квадрат + ломаная зелёная
 *     обводка на арте), натуральный кадр из пула, вертикальная киноплёнка, лёгкий
 *     chiptune-blip по pointerenter (без файлов, Web Audio), уважение reduced-motion.
 *
 * P1 — несколько ретро-PNG под стеки (Magento, WordPress, Laravel, …): тот же
 *     натуральный кадр, смена только верхнего кадра ленты; выбор по cookie / localStorage
 *     или по секции страницы (например, при скролле к [TECH]).
 *
 * P2 — «роботизация» перехода: 1–2 промежуточных кадра (глитч-спрайт / низкое разрешение),
 *     синхронизация звука с шагами translateY, опционально короткий base64 WAV вместо OSC.
 *
 * P3 — доступность и контроль: явный toggle «звук / без звука», запоминание в localStorage;
 *     при reduced-motion — без звука и без лишних анимаций.
 */

/** Основной ретро-кадр при загрузке (Im-retro-kocept.png → public) */
export const AVATAR_RETRO_CONCEPT = '/avatar-retro-concept.png';

/** Круглый вариант из концепта — для P1 (ротация / привязка к стеку) */
export const AVATAR_RETRO_CIRCLE = '/avatar-retro-circle.png';

/** Старый пиксельный кадр — запасной ассет для экспериментов P1 */
export const AVATAR_RETRO_LEGACY_PIXEL = '/avatar-retro-pixel.png';

export const AVATAR_NATURAL_POOL = ['/avatar-natural-im.png', '/profile.png'] as const;

/** Кандидаты для будущей ротации ретро (пока не подключено к UI) */
export const AVATAR_RETRO_STACK_CANDIDATES = [
  { id: 'concept', src: AVATAR_RETRO_CONCEPT, label: 'concept' },
  { id: 'circle', src: AVATAR_RETRO_CIRCLE, label: 'circle' },
  { id: 'legacy', src: AVATAR_RETRO_LEGACY_PIXEL, label: 'legacy-pixel' },
] as const;
