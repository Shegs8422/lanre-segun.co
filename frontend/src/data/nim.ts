/** NVIDIA NIM model roster for the console playground — free-endpoint chat models. */
export type NimModel = {
  id: string;
  short: string;
  label: string;
  blurb: string;
  /** Approximate context window, for the `context` readout. */
  ctx: number;
};

export const NIM_ROSTER: NimModel[] = [
  { id: "nvidia/nemotron-3-super-120b-a12b", short: "nemotron-super", label: "Nemotron Super 120B", blurb: "flagship reasoning · verified", ctx: 1000000 },
  { id: "deepseek-ai/deepseek-v4.1-flash", short: "deepseek", label: "DeepSeek V4.1 Flash", blurb: "fast 552B MoE", ctx: 128000 },
  { id: "z-ai/glm-5-3", short: "glm", label: "GLM 5.3", blurb: "reasoning + tools", ctx: 128000 },
  { id: "moonshotai/kimi-k3", short: "kimi", label: "Kimi K3", blurb: "long-horizon coding", ctx: 128000 },
  { id: "nvidia/nemotron-3.5-lightning-30b-a3b", short: "lightning", label: "Nemotron Lightning 30B", blurb: "rapid answers", ctx: 128000 },
  { id: "meta/muse-glimmer-30b", short: "muse", label: "Muse Glimmer 30B", blurb: "multimodal reasoning", ctx: 128000 },
  { id: "nvidia/nemotron-3-ultra-550b-a55b", short: "ultra", label: "Nemotron Ultra 550B", blurb: "1M context reasoning", ctx: 1000000 },
  { id: "z-ai/glm-5-3-flash", short: "glm-flash", label: "GLM 5.3 Flash", blurb: "fast multimodal", ctx: 128000 },
  { id: "openai/gpt-oss-20b", short: "gpt-oss", label: "GPT-OSS 20B", blurb: "open-weights alt", ctx: 128000 },
];

export const DEFAULT_NIM_MODEL = NIM_ROSTER[0].id;

export function resolveNimModel(q: string): NimModel | undefined {
  const needle = q.trim().toLowerCase();
  return NIM_ROSTER.find(
    (m) =>
      m.id.toLowerCase() === needle ||
      m.short === needle ||
      m.label.toLowerCase().replace(/[^a-z0-9]/g, "") === needle.replace(/[^a-z0-9]/g, "")
  );
}

export function modelListLines(activeId: string): string[] {
  return [
    "· models — switch with `model <name>`",
    ...NIM_ROSTER.map((m, i) => `${m.id === activeId ? "●" : "·"} ${i + 1} · ${m.short} — ${m.label} · ${m.blurb}`),
  ];
}
