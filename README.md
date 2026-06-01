# ezhukov-site

Резюме и портфолио (Astro + Tailwind). Зависимости — **Bun**, Node **≥ 22.12**.

## Команды

Нужен **Node ≥ 22.12** (см. `.nvmrc`). Перед dev: `nvm use` или убедитесь, что `node -v` ≥ 22.12.

| Команда | Действие |
| ------- | -------- |
| `bun install` | Установка зависимостей |
| `bun run dev` | Dev-сервер → http://127.0.0.1:4321 |
| `bun run build` | Сборка в `./dist/` |
| `bun run preview` | Просмотр собранного сайта |
| `bun run content:seed` | Перезаписать YAML из `cv-data` / mission (бэкап) |
| `bun run activity:scan` | Heatmap пульта: git из `src/content/contour-scan/config.yaml` → `src/data/contour-activity.json` |

## Heatmap коммитов (пульт /mission)

1. **Keystatic** → `Contour scan · repos` (`src/content/contour-scan/config.yaml`): пути, `enabled`.
2. Локально: `bun run activity:scan` → `src/data/contour-activity.json` (все периоды: неделя … всё время).
3. Закоммитьте JSON — на Netlify локальный git недоступен; на сайте переключатель периодов без пересчёта.

Пересчёт **только** через `activity:scan` (не в браузере): git читает диск при сборке/скане.

## Контент

Тексты пульта и контактов — в `src/content/` (YAML). Остальное пока в `src/i18n/cv-data.ts`.

**Keystatic → Contacts · RU/EN:** список **Contact buttons** (перетаскивание = порядок на пульте и в пине), поля URL/Telegram/MAX ниже, **Resume contact tree order** — порядок блоков в терминале резюме.

**Редактирование:** YAML в редакторе или Keystatic → `git push` → Netlify.

**Keystatic (опционально):** при `bun run dev` админка на http://127.0.0.1:4321/keystatic. На production не деплоится.

Если dev в папке Nextcloud падает с `transport invoke timed out` — перенесите клон на локальный диск или правьте YAML + push.

**Если `bun run dev` сразу exit 1:** проверьте, что `node_modules` — обычная папка, не симлинк на `~/.cache` (`ls -la node_modules`). Если симлинк: `rm node_modules && bun install`.

## Документация

[docs.astro.build](https://docs.astro.build)
