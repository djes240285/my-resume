/**
 * Спрайт Mario → public/contact-pin-mario.png (nearest-neighbor, прозрачный фон).
 * Требует: python3 + Pillow
 */
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const py = `
from collections import deque
from PIL import Image

root = ${JSON.stringify(root)}
src = root + "/src/assets/contact-pin-mario-source.png"
out = root + "/public/contact-pin-mario.png"

TOL = 48
TARGET_W, TARGET_H = 44, 52
FILL = 0.97


def color_close(c1, c2, tol=TOL):
    return all(abs(int(a) - int(b)) <= tol for a, b in zip(c1, c2))


def is_checker_gray(r, g, b):
    """Клетки шахматки Gemini (~185 / ~254), не белые детали персонажа."""
    if abs(r - g) > 10 or abs(g - b) > 10:
        return False
    for v in (185, 192, 204, 170, 238, 254):
        if abs(r - v) <= 24:
            return True
    return False


def clear_checker_fringe(img):
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a < 12 or not is_checker_gray(r, g, b):
                continue
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = x + dx, y + dy
                if 0 <= nx < w and 0 <= ny < h and px[nx, ny][3] < 12:
                    px[x, y] = (r, g, b, 0)
                    break


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
        if not is_checker_gray(base[0], base[1], base[2]) and not color_close(base, px[0, 0][:3]):
            continue
        q = deque([seed])
        while q:
            x, y = q.popleft()
            if (x, y) in seen or x < 0 or y < 0 or x >= w or y >= h:
                continue
            cur = px[x, y]
            rgb = cur[:3]
            if not is_checker_gray(rgb[0], rgb[1], rgb[2]) and not color_close(rgb, base):
                continue
            seen.add((x, y))
            px[x, y] = (rgb[0], rgb[1], rgb[2], 0)
            q.extend([(x + 1, y), (x - 1, y), (x, y + 1), (x, y - 1)])


def clear_near_white(img, min_rgb=248):
    px = img.load()
    w, h = img.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a == 0:
                continue
            if r >= min_rgb and g >= min_rgb and b >= min_rgb and is_checker_gray(r, g, b):
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
# все точки по периметру — шахматка доходит до краёв
seeds = []
for x in range(0, w, max(1, w // 80)):
    seeds.append((x, 0))
    seeds.append((x, h - 1))
for y in range(0, h, max(1, h // 80)):
    seeds.append((0, y))
    seeds.append((w - 1, y))
seeds.extend([(0, 0), (w - 1, 0), (0, h - 1), (w - 1, h - 1), (w // 2, 0), (w // 2, h - 1)])

flood_clear(img, seeds)
clear_checker_fringe(img)
clear_near_white(img, 248)

minx, miny, maxx, maxy = opaque_bounds(img)
pad = 2
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
clear_checker_fringe(small)
clear_near_white(small, 248)

canvas = Image.new("RGBA", (TARGET_W, TARGET_H), (0, 0, 0, 0))
ox = (TARGET_W - nw) // 2
oy = (TARGET_H - nh) // 2
canvas.paste(small, (ox, oy), small)
clear_checker_fringe(canvas)
clear_near_white(canvas, 248)
canvas.save(out)
print("OK", out, canvas.size, "crop", crop.size)
`;

const r = spawnSync('python3', ['-c', py], { stdio: 'inherit' });
process.exit(r.status ?? 1);
