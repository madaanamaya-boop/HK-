import { requireEnv } from "../config.js";

const GRAPH = "https://graph.facebook.com/v23.0";

async function api(pathname, params) {
  const res = await fetch(`${GRAPH}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(`Instagram API error on ${pathname}: ${JSON.stringify(data.error ?? data)}`);
  }
  return data;
}

async function waitForContainer(id, token, timeoutMs = 120_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const res = await fetch(`${GRAPH}/${id}?fields=status_code&access_token=${encodeURIComponent(token)}`);
    const data = await res.json();
    if (data.status_code === "FINISHED") return;
    if (data.status_code === "ERROR") {
      throw new Error(`Instagram container ${id} failed processing.`);
    }
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`Instagram container ${id} not ready after ${timeoutMs / 1000}s.`);
}

/**
 * Publishes a carousel to Instagram via the Content Publishing API.
 * Requires an Instagram Business/Creator account. `imageUrls` must be
 * publicly reachable.
 */
export async function publishToInstagram({ imageUrls, caption }) {
  requireEnv(["IG_USER_ID", "IG_ACCESS_TOKEN"]);
  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;

  const children = [];
  for (const url of imageUrls) {
    const { id } = await api(`/${userId}/media`, {
      image_url: url,
      is_carousel_item: "true",
      access_token: token,
    });
    children.push(id);
  }
  for (const id of children) await waitForContainer(id, token);

  const { id: carouselId } = await api(`/${userId}/media`, {
    media_type: "CAROUSEL",
    children: children.join(","),
    caption,
    access_token: token,
  });
  await waitForContainer(carouselId, token);

  const { id: mediaId } = await api(`/${userId}/media_publish`, {
    creation_id: carouselId,
    access_token: token,
  });
  console.log(`Instagram: published media ${mediaId}`);
  return mediaId;
}
