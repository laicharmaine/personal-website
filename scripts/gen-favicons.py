"""Pixel-grid favicons for charmainel.ai. Native Jersey 10 C/L, not a downscaled font."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

CHERRY = (200, 16, 46, 255)       # #c8102e
CHERRY_LIT = (224, 38, 63, 255)   # #e0263f
BLUSH = (246, 225, 234, 255)      # #f6e1ea
INK = (31, 26, 23, 255)           # #1f1a17
WHITE = (255, 255, 255, 255)
GLOSS = (255, 232, 236, 255)

# Jersey 10 native glyphs, y=0 is TOP (7x10 and 5x10)
C = [
    ".#####.",
    "#######",
    "###..##",
    "##.....",
    "##.....",
    "##.....",
    "##.....",
    "###..##",
    "#######",
    ".#####.",
]
L = [
    "##...",
    "##...",
    "##...",
    "##...",
    "##...",
    "##...",
    "##...",
    "##...",
    "#####",
    "#####",
]

def rounded_square_mask(n=16, radius=2):
    m = [[False] * n for _ in range(n)]
    for y in range(n):
        for x in range(n):
            left, right, top, bot = x, n - 1 - x, y, n - 1 - y
            if left < radius and top < radius and left + top < radius:
                continue
            if right < radius and top < radius and right + top < radius:
                continue
            if left < radius and bot < radius and left + bot < radius:
                continue
            if right < radius and bot < radius and right + bot < radius:
                continue
            m[y][x] = True
    return m

MASK = rounded_square_mask(16, 2)

def blank(n=16):
    return [[(0, 0, 0, 0) for _ in range(n)] for _ in range(n)]

def blit_glyph(grid, glyph, gx, gy, color, shadow=None, shadow_off=(1, 1)):
    if shadow:
        sx, sy = shadow_off
        for y, row in enumerate(glyph):
            for x, ch in enumerate(row):
                if ch == "#":
                    px, py = gx + x + sx, gy + y + sy
                    if 0 <= py < len(grid) and 0 <= px < len(grid[0]):
                        grid[py][px] = shadow
    for y, row in enumerate(glyph):
        for x, ch in enumerate(row):
            if ch == "#":
                px, py = gx + x, gy + y
                if 0 <= py < len(grid) and 0 <= px < len(grid[0]):
                    grid[py][px] = color

def apply_bg(grid, mask, color):
    for y in range(len(grid)):
        for x in range(len(grid[0])):
            if mask[y][x] and grid[y][x][3] == 0:
                grid[y][x] = color

def setp(grid, x, y, color, mask_only=True):
    if 0 <= y < len(grid) and 0 <= x < len(grid[0]):
        if (not mask_only) or MASK[y][x]:
            grid[y][x] = color

def grid_to_img(grid):
    n = len(grid)
    im = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    px = im.load()
    for y in range(n):
        for x in range(n):
            px[x, y] = grid[y][x]
    return im

def scale_nn(im, factor):
    return im.resize((im.width * factor, im.height * factor), Image.Resampling.NEAREST)

def make_c():
    # Transparent tile: just the cherry C and a 1px ink offset shadow.
    # No blush square — that stays on apple-icon.png only, because iOS
    # fills transparency with black.
    g = blank()
    blit_glyph(g, C, 4, 3, CHERRY, shadow=INK, shadow_off=(1, 1))
    return g

def make_cl():
    g = blank()
    apply_bg(g, MASK, BLUSH)
    cl = [C[i] + "." + L[i] for i in range(10)]
    assert all(len(r) == 13 for r in cl)
    blit_glyph(g, cl, 1, 3, CHERRY)
    return g

def make_heart():
    # Transparent tile: cherry heart, 1px ink offset shadow, and two gloss pixels.
    # No blush square — that stays on apple-icon.png only, because iOS
    # fills transparency with black.
    g = blank()
    # 11x10 pixel heart + 1px ink shadow, centered in the 16 tile.
    heart = [
        ".##.....##.",
        "####...####",
        "###########",
        "###########",
        "###########",
        ".#########.",
        "..#######..",
        "...#####...",
        "....###....",
        ".....#.....",
    ]
    blit_glyph(g, heart, 2, 2, CHERRY, shadow=INK, shadow_off=(1, 1))
    for x, y in ((4, 3), (5, 4)):
        if g[y][x][:3] == CHERRY[:3]:
            g[y][x] = GLOSS
    return g


def make_cherries():
    g = blank()
    apply_bg(g, MASK, BLUSH)
    # 1px Y-stem and two 5x5 cherries, white die-cut (4-connected), no ink rim.
    stem = {
        (8, 1),
        (7, 2), (6, 3), (5, 4), (5, 5),
        (9, 2), (10, 3), (11, 4), (11, 5),
    }

    def circ(cx, cy):
        cells = set()
        for dy in range(-2, 3):
            for dx in range(-2, 3):
                if abs(dx) == 2 and abs(dy) == 2:
                    continue
                cells.add((cx + dx, cy + dy))
        return cells

    left = circ(5, 9)
    right = circ(11, 10)
    body = left | right
    painted = stem | body
    outline = set()
    for x, y in painted:
        for dx, dy in ((-1, 0), (1, 0), (0, -1), (0, 1)):
            n = (x + dx, y + dy)
            if n not in painted:
                outline.add(n)
    for x, y in outline:
        setp(g, x, y, WHITE)
    for x, y in stem:
        setp(g, x, y, INK)
    for x, y in left:
        setp(g, x, y, CHERRY)
    for x, y in right:
        setp(g, x, y, CHERRY_LIT)
    for x, y in ((4, 8), (10, 9)):
        if (x, y) in body:
            setp(g, x, y, GLOSS)
    return g


DESIGNS = {
    "c": make_c,
    "cl": make_cl,
    "heart": make_heart,
    "cherry-pair": make_cherries,
}

def img_to_svg(grid, path: Path):
    n = len(grid)
    parts = [
        f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {n} {n}" shape-rendering="crispEdges">',
    ]
    for y in range(n):
        for x in range(n):
            r, g, b, a = grid[y][x]
            if a == 0:
                continue
            fill = f"#{r:02x}{g:02x}{b:02x}"
            opac = "" if a == 255 else f' fill-opacity="{a / 255:.3f}"'
            parts.append(f'<rect x="{x}" y="{y}" width="1" height="1" fill="{fill}"{opac}/>')
    parts.append("</svg>")
    path.write_text("\n".join(parts) + "\n")

def write_ico(im16: Image.Image, path: Path, sizes=(16, 32, 48)):
    # Write PNG-in-ICO frames ourselves so Pillow cannot bilinear-downscale.
    import io, struct
    frames = []
    for s in sizes:
        im = im16.resize((s, s), Image.Resampling.NEAREST)
        buf = io.BytesIO()
        im.save(buf, format="PNG")
        frames.append((s, buf.getvalue()))
    header = struct.pack("<HHH", 0, 1, len(frames))
    entries = b""
    payload = b""
    offset = 6 + 16 * len(frames)
    for s, data in frames:
        w = 0 if s >= 256 else s
        entries += struct.pack("<BBBBHHII", w, w, 0, 0, 1, 32, len(data), offset)
        payload += data
        offset += len(data)
    path.write_bytes(header + entries + payload)



def apple_icon(im16: Image.Image) -> Image.Image:
    # 16 * 11 = 176, centered on 180 blush (matches the tile; corners stay transparent-ish
    # if we use blush only under the scaled tile, plus a 2px blush pad).
    big = scale_nn(im16, 11)  # 176
    canvas = Image.new("RGBA", (180, 180), (0, 0, 0, 0))
    canvas.alpha_composite(big, (2, 2))
    return canvas


if __name__ == "__main__":
    root = Path(__file__).resolve().parents[1]
    work = Path("/tmp/favicon-work")
    work.mkdir(exist_ok=True)
    dest = root / "public" / "favicons"
    dest.mkdir(parents=True, exist_ok=True)

    images = {}
    for name, fn in DESIGNS.items():
        grid = fn()
        im = grid_to_img(grid)
        images[name] = im
        for folder in (work, dest):
            im.save(folder / f"{name}-16.png")
            scale_nn(im, 2).save(folder / f"{name}-32.png")
            scale_nn(im, 3).save(folder / f"{name}-48.png")
            scale_nn(im, 8).save(folder / f"{name}-128.png")
            img_to_svg(grid, folder / f"{name}.svg")
        bg = Image.new("RGBA", (256, 256), (180, 180, 180, 255))
        bg.alpha_composite(scale_nn(im, 16))
        bg.save(work / f"{name}-zoom.png")
        print("wrote", name)

    # Site icons: main pick is the pixel heart (transparent; apple stays opaque blush)
    main = images["heart"]
    write_ico(main, root / "app" / "favicon.ico", sizes=(16, 32, 48))
    write_ico(main, dest / "heart.ico", sizes=(16, 32, 48))
    img_to_svg(make_heart(), root / "app" / "icon.svg")
    # Keep apple-icon opaque blush. iOS fills transparent apple-touch
    # icons with black, which would hide the ink shadow and muddy the heart.
    apple = apple_icon(main)
    opaque = Image.new("RGBA", (180, 180), BLUSH)
    opaque.alpha_composite(apple)
    opaque.convert("RGBA").save(root / "app" / "apple-icon.png", "PNG")
    opaque.save(dest / "heart-apple-180.png")
    print("wrote app/favicon.ico, app/icon.svg, app/apple-icon.png")
