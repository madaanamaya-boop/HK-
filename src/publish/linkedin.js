import fs from "node:fs";
import { requireEnv } from "../config.js";

const API = "https://api.linkedin.com/rest";
const LINKEDIN_VERSION = process.env.LINKEDIN_VERSION || "202506";

function headers(extra = {}) {
  return {
    Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}`,
    "LinkedIn-Version": LINKEDIN_VERSION,
    "X-Restli-Protocol-Version": "2.0.0",
    ...extra,
  };
}

async function uploadImage(filePath, owner) {
  const init = await fetch(`${API}/images?action=initializeUpload`, {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({ initializeUploadRequest: { owner } }),
  });
  if (!init.ok) throw new Error(`LinkedIn initializeUpload failed: ${init.status} ${await init.text()}`);
  const { value } = await init.json();

  const put = await fetch(value.uploadUrl, {
    method: "PUT",
    headers: { Authorization: `Bearer ${process.env.LINKEDIN_ACCESS_TOKEN}` },
    body: fs.readFileSync(filePath),
  });
  if (!put.ok) throw new Error(`LinkedIn image upload failed: ${put.status} ${await put.text()}`);
  return value.image; // urn:li:image:...
}

/**
 * Publishes a multi-image post to LinkedIn via the versioned Posts API.
 * Images are uploaded as binary — no public hosting required.
 * LINKEDIN_AUTHOR_URN is "urn:li:person:XXXX" for a personal profile or
 * "urn:li:organization:XXXX" for a company page.
 */
export async function publishToLinkedIn({ imageFiles, caption, altTexts = [] }) {
  requireEnv(["LINKEDIN_ACCESS_TOKEN", "LINKEDIN_AUTHOR_URN"]);
  const owner = process.env.LINKEDIN_AUTHOR_URN;

  const images = [];
  for (let i = 0; i < imageFiles.length; i++) {
    const urn = await uploadImage(imageFiles[i], owner);
    images.push({ id: urn, altText: altTexts[i] ?? `Slide ${i + 1}` });
    console.log(`LinkedIn: uploaded ${imageFiles[i]} -> ${urn}`);
  }

  const res = await fetch(`${API}/posts`, {
    method: "POST",
    headers: headers({ "Content-Type": "application/json" }),
    body: JSON.stringify({
      author: owner,
      commentary: caption,
      visibility: "PUBLIC",
      distribution: { feedDistribution: "MAIN_FEED", targetEntities: [], thirdPartyDistributionChannels: [] },
      content: { multiImage: { images } },
      lifecycleState: "PUBLISHED",
      isReshareDisabledByAuthor: false,
    }),
  });
  if (!res.ok) throw new Error(`LinkedIn post creation failed: ${res.status} ${await res.text()}`);
  const postId = res.headers.get("x-restli-id");
  console.log(`LinkedIn: published post ${postId}`);
  return postId;
}
