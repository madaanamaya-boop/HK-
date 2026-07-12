import { requireEnv } from "../config.js";

const GRAPH = "https://graph.threads.net/v1.0";

async function api(pathname, params) {
  const res = await fetch(`${GRAPH}${pathname}`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams(params),
  });
  const data = await res.json();
  if (!res.ok || data.error) {
    throw new Error(`Threads API error on ${pathname}: ${JSON.stringify(data.error ?? data)}`);
  }
  return data;
}

async function waitForContainer(id, token, timeoutMs = 120_000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    const res = await fetch(`${GRAPH}/${id}?fields=status&access_token=${encodeURIComponent(token)}`);
    const data = await res.json();
    if (data.status === "FINISHED") return;
    if (data.status === "ERROR") throw new Error(`Threads container ${id} failed processing.`);
    await new Promise((r) => setTimeout(r, 3000));
  }
  throw new Error(`Threads container ${id} not ready after ${timeoutMs / 1000}s.`);
}

/**
 * Publishes an image carousel to Threads via the Threads API.
 * Threads text is capped at 500 characters, so the caption is trimmed.
 * `imageUrls` must be publicly reachable.
 */
export async function publishToThreads({ imageUrls, caption }) {
  requireEnv(["THREADS_USER_ID", "THREADS_ACCESS_TOKEN"]);
  const userId = process.env.THREADS_USER_ID;
  const token = process.env.THREADS_ACCESS_TOKEN;

  const text = caption.length > 490 ? caption.slice(0, 487) + "..." : caption;

  const children = [];
  for (const url of imageUrls) {
    const { id } = await api(`/${userId}/threads`, {
      media_type: "IMAGE",
      image_url: url,
      is_carousel_item: "true",
      access_token: token,
    });
    children.push(id);
  }
  for (const id of children) await waitForContainer(id, token);

  const { id: carouselId } = await api(`/${userId}/threads`, {
    media_type: "CAROUSEL",
    children: children.join(","),
    text,
    access_token: token,
  });
  await waitForContainer(carouselId, token);

  const { id: postId } = await api(`/${userId}/threads_publish`, {
    creation_id: carouselId,
    access_token: token,
  });
  console.log(`Threads: published post ${postId}`);
  return postId;
}
