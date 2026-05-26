/**
 * Ужимает contact-pin-lisa-source.png до пиксельного спрайта (nearest-neighbor).
 * Убирает светлый/серый фон (прозрачность). Требует: python3 + Pillow
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const py = `
from collections import deque
from PIL import Image

root = ${JSON.stringify(root)}
src = root + "/src/assets/contact-pin-lisa-source.png"
out = root + "/public/contact-pin-lisa.png"

TOL = 42
TARGET_W, TARGET_H = 44, 52
FILL = 0.97


def color_close(c1, c2, tol=TOL):
    return all(abs(int(a) - int(b)) <= tol for a, b in zip(c1, c2))


def flood_clear(img, seeds):
    px = img.load()
    w, h = img.size
    seen = set()
    for seed in seeds:
        if seed in seen:
            continue
        sx, sy = seed
        if not (0 <= sx < w and 0 <= sy < h):
            continue
        base = px[sx, sy][:3]
        q = deque([seed])
        while q:
            x, y = q.popleft()
            if (x, y) in seen or x < 0 or y < 0 or x >= w or y >= h:
                continue
            cur = px[x, y]
            if not color_close(cur[:3], base):
                continue
            seen.add((x, y))
            px[x, y] = (cur[0], cur[1], cur[2], 0)
            q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])


def clear_near_white(img, min_rgb=228):
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if r >= min_rgb and g >= min_rgb and b >= min_rgb:
                px[x, y] = (r, g, b, 0)


def opaque_bounds(img):
    px = img.load()
    w, h = img.size
    minx, miny, maxx, maxy = w, h, 0, 0
    found = False
    for y in range(h):
        for x in range(w):
            if px[x, y][3] > 12:
                found = True
                minx, miny = min(minx, x), min(miny, y)
                maxx, maxy = max(maxx, x), max(maxy, y)
    if not found:
        return (0, 0, w, h)
    return (minx, miny, maxx, maxy)


img = Image.open(src).convert("RGBA")
w, h = img.size
seeds = [
    (0, 0),
    (w - 1, 0),
    (0, h - 1),
    (w - 1, h - 1),
    (w // 2, 0),
    (0, h // 2),
    (w - 1, h // 2),
]
flood_clear(img, seeds)
clear_near_white(img, 220)

minx, miny, maxx, maxy = opaque_bounds(img)
pad = 1
minx = max(0, minx - pad)
miny = max(0, miny - pad)
maxx = min(w - 1, maxx + pad)
maxy = min(h - 1, maxy + pad)
crop = img.crop((minx, miny, maxx + 1, maxy + 1))

cw, ch = crop.size
scale = min(TARGET_W / cw, TARGET_H / ch) * FILL
nw = max(1, int(cw * scale))
nh = max(1, int(ch * scale))
small = crop.resize((nw, nh), Image.Resampling.NEAREST)
clear_near_white(small, 200)

canvas = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
ox = (TARGET_W - nw) // 2
oy = (TARGET_H - nh) // 2
canvas.paste(small, (ox, oy), small)
clear_near_white(canvas, 195)
canvas.save(out)
print("OK", out, canvas.size)
`;

const r = spawnSync('python3', ['-c', py], { stdio: 'inherit' });
process.exit(r.status ?? 1);
