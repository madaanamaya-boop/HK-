function esc(s = "") {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

export function slideDimensions(brand) {
  const format = brand.layout?.format ?? "portrait";
  return format === "square" ? { width: 1080, height: 1080 } : { width: 1080, height: 1350 };
}

/**
 * Renders one slide as a self-contained HTML document driven entirely by
 * the brand book tokens (colors, typography, layout).
 */
export function slideHtml(brand, slide, index, total) {
  const { width, height } = slideDimensions(brand);
  const c = brand.colors ?? {};
  const t = brand.typography ?? {};
  const l = brand.layout ?? {};
  const pad = l.padding ?? 96;
  const radius = l.corner_radius ?? 28;

  const fontLinks = (t.google_fonts ?? [])
    .map(
      (f) =>
        `<link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(f).replaceAll(
          "%3A",
          ":"
        )}&display=swap" rel="stylesheet">`
    )
    .join("\n");

  const isHook = slide.kind === "hook";
  const isCta = slide.kind === "cta";
  const progressPct = total > 1 ? (index / (total - 1)) * 100 : 100;

  const kicker = slide.kicker
    ? `<div class="kicker">${esc(slide.kicker)}</div>`
    : isHook
      ? ""
      : `<div class="kicker num">${String(index).padStart(2, "0")}</div>`;

  return `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
${fontLinks}
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body { width: ${width}px; height: ${height}px; }
  body {
    background: ${c.background};
    color: ${c.text};
    font-family: ${t.body_font};
    font-weight: ${t.body_weight ?? 400};
    display: flex;
    flex-direction: column;
    padding: ${pad}px;
    position: relative;
    overflow: hidden;
  }
  .glow {
    position: absolute;
    width: ${Math.round(width * 0.9)}px;
    height: ${Math.round(width * 0.9)}px;
    border-radius: 50%;
    background: radial-gradient(circle, ${c.accent}22 0%, transparent 65%);
    top: ${isHook ? "-20%" : "70%"};
    right: ${isHook ? "-25%" : "60%"};
    pointer-events: none;
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 30px;
    color: ${c.muted};
    letter-spacing: 0.04em;
  }
  header .brand { font-weight: 600; color: ${c.text}; }
  main { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 44px; }
  .kicker {
    display: inline-block;
    align-self: flex-start;
    background: ${c.surface};
    color: ${c.accent};
    font-size: 28px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 16px 28px;
    border-radius: ${radius}px;
  }
  .kicker.num { font-size: 34px; letter-spacing: 0.06em; }
  h1 {
    font-family: ${t.heading_font};
    font-weight: ${t.heading_weight ?? 700};
    font-size: ${isHook ? 108 : 76}px;
    line-height: 1.08;
    letter-spacing: -0.015em;
    text-wrap: balance;
  }
  h1 .accent { color: ${c.accent}; }
  .body {
    font-size: 42px;
    line-height: 1.45;
    color: ${isCta ? c.text : c.muted};
    max-width: ${width - pad * 2 - 40}px;
    text-wrap: pretty;
  }
  .cta-card {
    background: ${c.accent};
    color: ${c.accent_contrast};
    border-radius: ${radius}px;
    padding: 40px 48px;
    font-size: 40px;
    font-weight: 600;
    align-self: flex-start;
  }
  .swipe {
    color: ${c.accent};
    font-size: 34px;
    font-weight: 600;
    letter-spacing: 0.08em;
  }
  footer {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    font-size: 30px;
    color: ${c.muted};
  }
  .progress {
    position: absolute;
    left: 0; right: 0; bottom: 0;
    height: 12px;
    background: ${c.surface};
  }
  .progress .fill {
    height: 100%;
    width: ${progressPct}%;
    background: ${c.accent};
  }
</style>
</head>
<body>
  <div class="glow"></div>
  <header>
    <span class="brand">${esc(brand.brand?.name ?? "")}</span>
    <span>${esc(brand.brand?.handle ?? "")}</span>
  </header>
  <main>
    ${kicker}
    <h1>${esc(slide.title)}</h1>
    ${slide.body ? `<div class="body">${esc(slide.body)}</div>` : ""}
    ${isCta ? `<div class="cta-card">${esc(brand.brand?.website ?? brand.brand?.handle ?? "")}</div>` : ""}
  </main>
  <footer>
    <span>${isHook ? `<span class="swipe">SWIPE &rarr;</span>` : esc(brand.brand?.tagline ?? "")}</span>
    ${
      brand.layout?.show_slide_numbers === false
        ? "<span></span>"
        : `<span>${index + 1} / ${total}</span>`
    }
  </footer>
  ${brand.layout?.show_progress_bar === false ? "" : `<div class="progress"><div class="fill"></div></div>`}
</body>
</html>`;
}
