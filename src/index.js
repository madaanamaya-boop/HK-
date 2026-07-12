import fs from "node:fs";
import path from "node:path";
import { generatePlan } from "./generate.js";
import { renderCarousel } from "./render.js";
import { publishToInstagram } from "./publish/instagram.js";
import { publishToThreads } from "./publish/threads.js";
import { publishToLinkedIn } from "./publish/linkedin.js";
import {
  loadHistory,
  saveHistory,
  todayStamp,
  outDirFor,
  publicImageBaseUrl,
  PATHS,
} from "./config.js";

const [, , command, ...rest] = process.argv;
const flags = new Set(rest.filter((a) => a.startsWith("--")));
const date = process.env.POST_DATE || todayStamp();

// Which platforms to publish to. Default: all. Override: PLATFORMS=instagram,linkedin
const platforms = (process.env.PLATFORMS || "instagram,threads,linkedin")
  .split(",")
  .map((p) => p.trim().toLowerCase())
  .filter(Boolean);

// LinkedIn "little text" format requires escaping of reserved characters in commentary.
function escapeLinkedIn(text) {
  return text.replace(/[(){}<>\[\]|~*_@\\]/g, (ch) => `\\${ch}`);
}

const SAMPLE_PLAN = {
  topic: "Preview: why most people quit right before it works",
  caption:
    "Most people don't fail. They quit on mile 25 of a marathon.\n\nHere's how to tell the difference between a dead end and a plateau - and what to do about it.\n\nWhich one are you in right now?",
  hashtags: ["#growth", "#founders", "#consistency"],
  slides: [
    { kind: "hook", kicker: "", title: "Most people quit right before it works.", body: "" },
    {
      kind: "content",
      kicker: "The plateau",
      title: "Progress is invisible before it's obvious.",
      body: "Results compound quietly. The graph looks flat for months, then bends. Quitting on the flat part is the most common mistake in the game.",
    },
    {
      kind: "content",
      kicker: "The test",
      title: "Dead end or plateau? Ask one question.",
      body: "Are you getting better, even if the numbers aren't? Improving inputs with flat outputs is a plateau. Flat inputs and flat outputs is a dead end.",
    },
    {
      kind: "content",
      kicker: "The fix",
      title: "Shrink the goal until it's stupid easy.",
      body: "Momentum beats motivation. One post a day. One call a day. Small enough that skipping feels sillier than doing it.",
    },
    {
      kind: "cta",
      kicker: "Your move",
      title: "Stay in the game one more month.",
      body: "Follow for daily insights. Save this for later.",
    },
  ],
};

async function publish() {
  const dir = outDirFor(date);
  const plan = JSON.parse(fs.readFileSync(path.join(dir, "plan.json"), "utf8"));
  const caption = fs.readFileSync(path.join(dir, "caption.txt"), "utf8").trim();
  const imageFiles = fs
    .readdirSync(dir)
    .filter((f) => f.startsWith("slide-") && f.endsWith(".png"))
    .sort()
    .map((f) => path.join(dir, f));

  if (imageFiles.length < 2) throw new Error("Carousels need at least 2 slides.");

  // Instagram and Threads pull images from public URLs (served from the
  // published/ folder of this repo by default); LinkedIn takes binary uploads.
  const base = publicImageBaseUrl();
  const imageUrls = imageFiles.map(
    (f) => `${base}/published/${date}/${path.basename(f)}`
  );

  const results = {};
  const errors = [];

  for (const platform of platforms) {
    try {
      if (platform === "instagram") {
        if (!base) throw new Error("No public image base URL (set PUBLIC_IMAGE_BASE_URL or run in GitHub Actions).");
        results.instagram = await publishToInstagram({ imageUrls, caption });
      } else if (platform === "threads") {
        if (!base) throw new Error("No public image base URL (set PUBLIC_IMAGE_BASE_URL or run in GitHub Actions).");
        results.threads = await publishToThreads({ imageUrls, caption });
      } else if (platform === "linkedin") {
        results.linkedin = await publishToLinkedIn({
          imageFiles,
          caption: escapeLinkedIn(caption),
          altTexts: plan.slides.map((s) => s.title),
        });
      }
    } catch (err) {
      console.error(`FAILED ${platform}: ${err.message}`);
      errors.push(platform);
    }
  }

  const history = loadHistory();
  history.posts.push({ date, topic: plan.topic, results });
  saveHistory(history);
  console.log(`History updated -> ${PATHS.history}`);

  if (errors.length === platforms.length) {
    throw new Error(`Publishing failed on every platform: ${errors.join(", ")}`);
  }
  if (errors.length) console.warn(`Published with failures on: ${errors.join(", ")}`);
  return results;
}

try {
  switch (command) {
    case "generate":
      await generatePlan({ date });
      break;
    case "render":
      await renderCarousel({ date });
      break;
    case "publish":
      await publish();
      break;
    case "run":
      await generatePlan({ date });
      await renderCarousel({ date });
      if (flags.has("--no-publish")) {
        console.log("Skipping publish (--no-publish).");
      } else {
        await publish();
      }
      break;
    case "preview": {
      // Render the built-in sample plan — no API keys needed. Use this to
      // iterate on brand/brandbook.yml and see your visual style.
      const dir = outDirFor(date);
      fs.writeFileSync(path.join(dir, "plan.json"), JSON.stringify(SAMPLE_PLAN, null, 2) + "\n");
      await renderCarousel({ date, plan: SAMPLE_PLAN });
      break;
    }
    default:
      console.log(`Usage: node src/index.js <command>

Commands:
  generate   Ask Claude for today's carousel plan (needs ANTHROPIC_API_KEY)
  render     Render the plan into slide PNGs + caption.txt
  publish    Publish today's carousel to the configured platforms
  run        generate + render + publish (use --no-publish to skip posting)
  preview    Render a built-in sample carousel to preview your brand styling

Environment:
  PLATFORMS=instagram,threads,linkedin   Choose platforms (default: all)
  POST_DATE=YYYY-MM-DD                   Operate on a specific date folder`);
      process.exit(command ? 1 : 0);
  }
} catch (err) {
  console.error(err.message ?? err);
  process.exit(1);
}
