/// <reference types="node" />
/**
 * Live NVIDIA NIM catalog — backing for the console `model` list.
 * Cached 5 minutes; falls back to the pinned roster on any failure.
 */
const NIM_BASE = "https://integrate.api.nvidia.com/v1";

let cache: { at: number; models: string[] } | null = null;
const CACHE_MS = 5 * 60_000;

function jsonError(status: number, statusMessage: string) {
  return new Response(JSON.stringify({ statusCode: status, statusMessage }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

export default async function handler(): Promise<Response> {
  if (cache && Date.now() - cache.at < CACHE_MS) {
    return Response.json({ models: cache.models });
  }

  const apiKey = process.env.NIM_API_KEY || "";
  if (!apiKey) {
    return jsonError(500, "NIM API key missing. Set NIM_API_KEY in project env.");
  }

  const res = await fetch(`${NIM_BASE}/models`, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });
  if (!res.ok) {
    return jsonError(502, `NIM catalog unreachable (${res.status}).`);
  }
  const data = await res.json();
  const models = Array.isArray(data?.data)
    ? (data.data as { id?: string }[]).map((m) => m.id).filter((id): id is string => !!id)
    : [];
  cache = { at: Date.now(), models };
  return Response.json({ models });
}
