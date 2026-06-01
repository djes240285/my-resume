/**
 * Скан коммитов → src/data/contour-activity.json
 * Конфиг: src/content/contour-scan/config.yaml (Keystatic: Contour scan · repos)
 * Несколько периодов для переключателя на фронте.
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse as parseYaml } from 'yaml';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const configPath = path.join(root, 'src/content/contour-scan/config.yaml');
const legacyConfigPath = path.join(__dirname, 'contour-repos.yaml');
const outPath = path.join(root, 'src/data/contour-activity.json');

const DAYS = 7;
const MONTH_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** @type {Record<string, { days: number | null, maxWeeks?: number, alignSunday?: boolean }>} */
const RANGE_DEFS = {
  week: { days: 7, alignSunday: false },
  month: { days: 30, alignSunday: false },
  year: { days: 365, maxWeeks: 53, alignSunday: true },
  twoYears: { days: 730, maxWeeks: 106, alignSunday: true },
  all: { days: null, maxWeeks: 156, alignSunday: true },
};

/** @param {Date} d */
function dateKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** @param {Date} d */
function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function loadConfig() {
  const p = fs.existsSync(configPath) ? configPath : legacyConfigPath;
  if (!fs.existsSync(p)) {
    throw new Error(`No config: ${configPath}`);
  }
  return parseYaml(fs.readFileSync(p, 'utf8'));
}

/** @param {string} repoPath @param {string} sinceIso @param {string[]} authors @param {boolean} noMerges */
function gitCommitTimestamps(repoPath, sinceIso, authors, noMerges) {
  if (!fs.existsSync(path.join(repoPath, '.git'))) {
    console.warn(`skip (no .git): ${repoPath}`);
    return [];
  }
  const args = ['-C', repoPath, 'log', `--since=${sinceIso}`, '--format=%aI'];
  if (noMerges) args.push('--no-merges');
  for (const a of authors) args.push(`--author=${a}`);
  try {
    const out = execFileSync('git', args, { encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });
    return out
      .split('\n')
      .map((l) => l.trim())
      .filter(Boolean)
      .map((iso) => new Date(iso))
      .filter((d) => !Number.isNaN(d.getTime()));
  } catch (e) {
    console.warn(`git log failed: ${repoPath}`, e.message);
    return [];
  }
}

/** @param {number} count */
function countToLevel(count) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 7) return 3;
  return 4;
}

/**
 * @param {Date[]} allStamps
 * @param {Date} now
 * @param {{ days: number | null, maxWeeks?: number }} rangeDef
 */
function buildGitHubGrid(allStamps, now, rangeDef) {
  const end = startOfDay(now);
  let gridStart;
  let weeks;

  if (rangeDef.days === null) {
    let min = end;
    for (const d of allStamps) {
      const day = startOfDay(d);
      if (day < min) min = day;
    }
    gridStart = new Date(min);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());
    const msWeek = 7 * 86400000;
    weeks = Math.max(1, Math.floor((end - gridStart) / msWeek) + 1);
    if (rangeDef.maxWeeks) weeks = Math.min(weeks, rangeDef.maxWeeks);
  } else if (rangeDef.alignSunday === false) {
    gridStart = new Date(end);
    gridStart.setDate(gridStart.getDate() - (rangeDef.days - 1));
    weeks = Math.max(1, Math.ceil(rangeDef.days / 7));
  } else {
    gridStart = new Date(end);
    gridStart.setDate(gridStart.getDate() - rangeDef.days + 1);
    gridStart.setDate(gridStart.getDate() - gridStart.getDay());
    const msWeek = 7 * 86400000;
    weeks = Math.max(1, Math.floor((end - gridStart) / msWeek) + 1);
    if (rangeDef.maxWeeks) weeks = Math.min(weeks, rangeDef.maxWeeks);
  }

  const countByDate = new Map();
  for (const d of allStamps) {
    const day = startOfDay(d);
    if (day < gridStart || day > end) continue;
    const key = dateKey(day);
    countByDate.set(key, (countByDate.get(key) ?? 0) + 1);
  }

  const dayCells = [];
  let maxCount = 0;

  for (let w = 0; w < weeks; w++) {
    for (let dow = 0; dow < DAYS; dow++) {
      const cellDate = new Date(gridStart);
      cellDate.setDate(gridStart.getDate() + w * 7 + dow);
      const key = dateKey(cellDate);
      const future = cellDate > end;
      const outOfRange = cellDate < gridStart;
      const count = future || outOfRange ? 0 : (countByDate.get(key) ?? 0);
      if (!future && !outOfRange && count > maxCount) maxCount = count;
      dayCells.push({
        date: key,
        count: future || outOfRange ? 0 : count,
        future: future || outOfRange,
      });
    }
  }

  for (const cell of dayCells) {
    cell.level = cell.future ? 0 : countToLevel(cell.count);
  }

  const monthLabels = [];
  if (weeks > 8) {
    let lastMonth = -1;
    for (let w = 0; w < weeks; w++) {
      const weekDate = new Date(gridStart);
      weekDate.setDate(gridStart.getDate() + w * 7);
      const m = weekDate.getMonth();
      if (m !== lastMonth) {
        monthLabels.push({ weekIndex: w, label: MONTH_SHORT[m] });
        lastMonth = m;
      }
    }
  }

  let totalCommits = 0;
  for (const d of allStamps) {
    const day = startOfDay(d);
    if (day >= gridStart && day <= end) totalCommits++;
  }

  return {
    weeks,
    daysPerWeek: DAYS,
    gridStart: dateKey(gridStart),
    gridEnd: dateKey(end),
    maxCount,
    totalCommits,
    monthLabels,
    days: dayCells,
  };
}

function main() {
  const config = loadConfig();
  const authors = config.authors ?? [];
  const noMerges = config.noMerges !== false;
  const repos = (config.repos ?? []).filter((r) => r.enabled && r.path);

  const now = new Date();
  const sinceAll = new Date(now);
  sinceAll.setFullYear(sinceAll.getFullYear() - 15);
  const sinceIso = sinceAll.toISOString();

  const allStamps = [];
  const repoStats = [];

  for (const repo of repos) {
    const stamps = gitCommitTimestamps(repo.path, sinceIso, authors, noMerges);
    allStamps.push(...stamps);
    repoStats.push({ id: repo.id, commits: stamps.length });
    console.log(`${repo.id}: ${stamps.length} commits (fetched)`);
  }

  /** @type {Record<string, ReturnType<typeof buildGitHubGrid>>} */
  const ranges = {};
  for (const [key, def] of Object.entries(RANGE_DEFS)) {
    ranges[key] = buildGitHubGrid(allStamps, now, def);
    console.log(`  range ${key}: ${ranges[key].totalCommits} commits, ${ranges[key].weeks} weeks`);
  }

  const payload = {
    source: 'git',
    layout: 'github',
    version: 2,
    generatedAt: now.toISOString(),
    defaultRange: 'year',
    authors: authors.length ? authors : null,
    noMerges,
    repoIds: repos.map((r) => r.id),
    ranges,
    repos: repoStats,
    // legacy single-range (default year) for old loaders
    weeks: ranges.year.weeks,
    gridStart: ranges.year.gridStart,
    gridEnd: ranges.year.gridEnd,
    maxCount: ranges.year.maxCount,
    totalCommits: ranges.year.totalCommits,
    monthLabels: ranges.year.monthLabels,
    days: ranges.year.days,
  };

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, `${JSON.stringify(payload, null, 2)}\n`);
  console.log(`\nWrote ${outPath}`);
}

main();
