import claude from "../assets/tools/claude.png";
import figma from "../assets/tools/figma.png";
import cursor from "../assets/tools/cursor.png";
import supabase from "../assets/tools/supabase.png";
import vercel from "../assets/tools/vercel.png";
import openai from "../assets/tools/openai.png";
import meta from "../assets/tools/meta.svg";
import grok from "../assets/tools/grok.svg";
import github from "../assets/tools/github.svg";
import tailwind from "../assets/tools/tailwind.svg";

export type Tool = { name: string; src?: string };

export const TOOLS: Tool[] = [
  { name: "Claude", src: claude },
  { name: "Figma", src: figma },
  { name: "Cursor", src: cursor },
  { name: "Supabase", src: supabase },
  { name: "Vercel", src: vercel },
  { name: "OpenAI", src: openai },
  { name: "Meta", src: meta },
  { name: "Grok", src: grok },
  { name: "Github", src: github },
  { name: "Tailwind", src: tailwind },
];
