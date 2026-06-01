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

## Контент

Тексты пульта и контактов — в `src/content/` (YAML). Остальное пока в `src/i18n/cv-data.ts`.

**Keystatic:** URL кнопок — раздел **Contacts · RU/EN** (`/keystatic/singleton/contactRu`). В Mission Control только подписи кнопок и тексты; ссылки подставляются из Contacts автоматически.

**Редактирование:** YAML в редакторе или Keystatic → `git push` → Netlify.

**Keystatic (опционально):** при `bun run dev` админка на http://127.0.0.1:4321/keystatic. На production не деплоится.

Если dev в папке Nextcloud падает с `transport invoke timed out` — перенесите клон на локальный диск или правьте YAML + push.

**Если `bun run dev` сразу exit 1:** проверьте, что `node_modules` — обычная папка, не симлинк на `~/.cache` (`ls -la node_modules`). Если симлинк: `rm node_modules && bun install`.

## Документация

[docs.astro.build](https://docs.astro.build)
