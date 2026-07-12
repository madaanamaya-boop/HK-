import fs from "node:fs";
import path from "node:path";
import Anthropic from "@anthropic-ai/sdk";
import { loadBrandbook, loadTopics, loadHistory, outDirFor, todayStamp } from "./config.js";

const MODEL = process.env.ANTHROPIC_MODEL || "claude-opus-4-8";

const PLAN_SCHEMA = {
  type: "object",
  properties: {
    topic: { type: "string" },
    caption: {
      type: "string",
      description:
        "The post caption: a strong first line (it gets truncated in feeds), 2-4 short paragraphs of value, and a call to action. No hashtags here.",
    },
    hashtags: {
      type: "array",
      items: { type: "string" },
      description: "Hashtags without spaces, each starting with #",
    },
    slides: {
      type: "array",
      items: {
        type: "object",
        properties: {
          kind: { type: "string", enum: ["hook", "content", "cta"] },
          kicker: {
            type: "string",
            description: "Tiny label above the title, 2-4 words. Empty string if not needed.",
          },
          title: { type: "string", description: "The main statement of the slide, short and punchy." },
          body: {
            type: "string",
            description: "Supporting text, max ~35 words. Empty string on the hook slide if the title carries it.",
          },
        },
        required: ["kind", "kicker", "title", "body"],
        additionalProperties: false,
      },
    },
  },
  required: ["topic", "caption", "hashtags", "slides"],
  additionalProperties: false,
};

function pickTopic() {
  const topics = loadTopics();
  const used = new Set(loadHistory().posts.map((p) => p.topic));
  return topics.find((t) => !used.has(t)) ?? null;
}

function buildPrompt(brand, topic, recentTopics) {
  const voice = brand.voice ?? {};
  const carousel = brand.carousel ?? {};
  return `You are the content engine for the brand "${brand.brand?.name}" (${brand.brand?.handle}).

BRAND VOICE
- Tone: ${voice.tone}
- Audience: ${voice.audience}
- Language: ${voice.language ?? "English"}
- Rules:
${(voice.rules ?? []).map((r) => `  - ${r}`).join("\n")}

CONTENT PILLARS
${(brand.content_pillars ?? []).map((p) => `- ${p}`).join("\n")}

TASK
Create today's carousel post${topic ? ` on this topic: "${topic}"` : " on a fresh topic drawn from the content pillars"}.
${recentTopics.length ? `Do NOT repeat these recently covered topics:\n${recentTopics.map((t) => `- ${t}`).join("\n")}` : ""}

REQUIREMENTS
- Between ${carousel.slides_min ?? 6} and ${carousel.slides_max ?? 9} slides total.
- Slide 1 must be kind "hook": a scroll-stopping curiosity gap, under 10 words in the title.
- Middle slides are kind "content": one concrete idea each, specific and actionable.
- The last slide must be kind "cta" with this call to action woven in naturally: "${carousel.cta ?? "Follow for more."}"
- Caption: strong first line, real value, ends with a question or CTA. No hashtags inside the caption text.
- At most ${brand.hashtags?.max ?? 8} hashtags, relevant and specific${
    brand.hashtags?.always_include?.length
      ? `, always including: ${brand.hashtags.always_include.join(" ")}`
      : ""
  }.`;
}

export async function generatePlan({ date = todayStamp() } = {}) {
  const brand = loadBrandbook();
  const topic = pickTopic();
  const recentTopics = loadHistory().posts.slice(-30).map((p) => p.topic);

  const client = new Anthropic();
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 8000,
    thinking: { type: "adaptive" },
    output_config: { format: { type: "json_schema", schema: PLAN_SCHEMA } },
    messages: [{ role: "user", content: buildPrompt(brand, topic, recentTopics) }],
  });

  if (response.stop_reason === "refusal") {
    throw new Error("Model refused to generate content for this topic.");
  }
  const text = response.content.find((b) => b.type === "text")?.text;
  if (!text) throw new Error("No text content in model response.");
  const plan = JSON.parse(text);

  const dir = outDirFor(date);
  fs.writeFileSync(path.join(dir, "plan.json"), JSON.stringify(plan, null, 2) + "\n");
  console.log(`Generated plan for "${plan.topic}" with ${plan.slides.length} slides -> ${dir}/plan.json`);
  return plan;
}
