/** Static board data transcribed from the four reference images. Canvas space: 1200 x 640. */

export type Edge = {
  id: string;
  from: string;
  to: string;
  /** straight line, elbow (horizontal then vertical), or drop (vertical then horizontal) */
  via: "line" | "elbow" | "drop";
  label?: string;
  /** which endpoint the label sits near */
  labelAt?: "start" | "end";
};

export type FlowNode = {
  id: string;
  kind: "step" | "diamond" | "cta";
  x: number;
  y: number;
  w: number;
  h: number;
  text: string;
  drift?: number;
};

export type CardLine =
  | { t: "title"; text: string }
  | { t: "cmd"; text: string }
  | { t: "dot"; text: string; sub?: string }
  | { t: "plain"; text: string }
  | { t: "ok"; text: string }
  | { t: "dim"; text: string };

export type Card = {
  id: string;
  tag: string;
  x: number;
  y: number;
  w: number;
  lines: CardLine[];
  /** Alternate content sets, rotated automatically. */
  variants?: {lines: CardLine[]}[];
  /** Loop lines: erase one-by-one then retype (squad card). */
  loopLines?: boolean;
  drift?: number;
};

export type Sticky = {
  id: string;
  x: number;
  y: number;
  w: number;
  text: string;
  tone: "purple" | "blue" | "green";
  tilt: number;
  drift?: number;
};

export type Board = {
  id: string;
  crumb: string;
  canvasTag: string;
  canvasMeta: string;
  sidebarTitle: string;
  sidebarSub: string;
  tools: string[];
  flow: FlowNode[];
  edges: Edge[];
  cards: Card[];
  stickies: Sticky[];
  stageLabels: { x: number; text: string }[];
  terminal: string[];
  tryCmd: string;
  opened: string;
  /** Dangling connector stub (canvas-coord path d) — static. */
  stub?: string;
};

export const SIDEBAR = [
  { id: "workspace", title: "Workspace", sub: "BENCH · LIVE" },
  { id: "ai", title: "AI Workflow", sub: "AGENTS · DAILY" },
  { id: "system", title: "Design System", sub: "LIBRARY · 12 PARTS" },
  { id: "product", title: "Product Design", sub: "END TO END · 8+ YRS" },
];

export const BOARDS: Board[] = [
  {
    id: "workspace",
    crumb: "PORTFOLIO / WORKSPACE / WORKSPACE",
    canvasTag: "WORKSPACE",
    canvasMeta: "BENCH · LIVE",
    sidebarTitle: "Workspace",
    sidebarSub: "BENCH · LIVE",
    tools: ["FIGMA", "CURSOR", "CLAUDE"],
    flow: [
      { id: "brief", kind: "step", x: 120, y: 150, w: 130, h: 52, text: "BRIEF", drift: 5 },
      { id: "explore", kind: "step", x: 290, y: 150, w: 130, h: 52, text: "EXPLORE", drift: 6 },
      { id: "system", kind: "diamond", x: 470, y: 128, w: 150, h: 96, text: "IN THE SYSTEM?", drift: 5 },
      { id: "reuse", kind: "step", x: 660, y: 150, w: 130, h: 52, text: "REUSE", drift: 6 },
      { id: "newpattern", kind: "step", x: 490, y: 320, w: 150, h: 52, text: "NEW PATTERN", drift: 5 },
      { id: "addtolib", kind: "step", x: 680, y: 320, w: 150, h: 52, text: "ADD TO LIB", drift: 6 },
      { id: "ship", kind: "cta", x: 860, y: 235, w: 90, h: 52, text: "SHIP" },
    ],
    edges: [
      { id: "e1", from: "brief", to: "explore", via: "line" },
      { id: "e2", from: "explore", to: "system", via: "line" },
      { id: "e3", from: "system", to: "reuse", via: "line", label: "YES", labelAt: "start" },
      { id: "e4", from: "system", to: "newpattern", via: "drop", label: "NO", labelAt: "start" },
      { id: "e5", from: "newpattern", to: "addtolib", via: "line" },
      { id: "e6", from: "reuse", to: "ship", via: "elbow" },
      { id: "e7", from: "addtolib", to: "ship", via: "elbow" },
    ],
    cards: [
      {
        id: "chat",
        tag: "CHAT",
        x: 950,
        y: 80,
        w: 210,
        drift: 4,
        lines: [
          { t: "cmd", text: "make the rail crop the second car" },
          { t: "dot", text: "On it — a 24px reveal on the second.", sub: "Editing WorkRail.tsx" },
        ],
        variants: [
          {
            lines: [
              { t: "cmd", text: "stretch the rail full bleed" },
              { t: "dot", text: "On it — edge to edge on desktop.", sub: "Editing WorkRail.tsx" },
            ],
          },
          {
            lines: [
              { t: "cmd", text: "empty state for the rail" },
              { t: "dot", text: "Done — asks design when lost.", sub: "Editing EmptyRail.tsx" },
            ],
          },
        ],
      },
    ],
    stickies: [
      {
        id: "s1",
        x: 170,
        y: 420,
        w: 170,
        tone: "purple",
        tilt: -3,
        drift: 5,
        text: "Reuse before you add. Every new pattern is a thing somebody has to maintain.",
      },
      {
        id: "s2",
        x: 560,
        y: 440,
        w: 140,
        tone: "blue",
        tilt: 2,
        drift: 6,
        text: "Empty state? ask design",
      },
    ],
    stageLabels: [],
    terminal: [
      "· restoring the board — notes, shapes, what is open",
      "✓ workspace live — it carries on without you",
      "> open workspace",
      "· opening the workspace",
      "· ↳ Ask for it, draw it, ship it.",
      "· restoring the board — notes, shapes, what is open",
      "✓ workspace live — it carries on without you",
    ],
    tryCmd: "try: open workspace",
    opened: "3 / 4 OPENED",
    stub: "M 1050 200 L 1050 130 L 1120 130",
  },
  {
    id: "ai",
    crumb: "PORTFOLIO / WORKSPACE / AI",
    canvasTag: "AI WORKFLOW",
    canvasMeta: "AGENTS · DAILY",
    sidebarTitle: "AI Workflow",
    sidebarSub: "AGENTS · DAILY",
    tools: ["AGENTS", "MCP", "CLAUDE"],
    flow: [],
    edges: [],
    cards: [
      {
        id: "brief",
        tag: "BRIEF",
        x: 170,
        y: 110,
        w: 230,
        drift: 5,
        lines: [
          { t: "cmd", text: "/sena build the Badge componer" },
          { t: "dot", text: "Reading the registry — 12 parts, 3 pending.", sub: "Handing off to the squad" },
        ],
        variants: [
          {
            lines: [
              { t: "cmd", text: "/sena build the Input componer" },
              { t: "dot", text: "Reading the registry — 12 parts, 1 pending.", sub: "Handing off to the squad" },
            ],
          },
          {
            lines: [
              { t: "cmd", text: "/sena build the Dialog componer" },
              { t: "dot", text: "Reading the registry — 12 parts, 0 pending.", sub: "Handing off to the squad" },
            ],
          },
        ],
      },
      {
        id: "squad",
        tag: "SQUAD",
        loopLines: true,        x: 470,
        y: 110,
        w: 230,
        drift: 6,
        lines: [
          { t: "dot", text: "Plan", sub: "scope + variants" },
          { t: "dot", text: "Build", sub: "Figma → React" },
          { t: "dot", text: "Check", sub: "WCAG AA, contrast" },
          { t: "dot", text: "Ship", sub: "docs + registry" },
        ],
      },
      {
        id: "run",
        tag: "RUN",
        x: 770,
        y: 110,
        w: 230,
        drift: 5,
        lines: [
          { t: "plain", text: "agents: 11 · tools: mcp" },
          { t: "ok", text: "badge.tsx + badge.css" },
          { t: "ok", text: "contrast 4.9:1 — AA" },
          { t: "plain", text: "registry updated" },
          { t: "dim", text: "1.4s" },
        ],
        variants: [
          {
            lines: [
              { t: "plain", text: "agents: 11 · tools: mcp" },
              { t: "ok", text: "input.tsx + input.css" },
              { t: "ok", text: "contrast 5.2:1 — AA" },
              { t: "plain", text: "registry updated" },
              { t: "dim", text: "1.1s" },
            ],
          },
          {
            lines: [
              { t: "plain", text: "agents: 11 · tools: mcp" },
              { t: "ok", text: "dialog.tsx + dialog.css" },
              { t: "ok", text: "contrast 4.7:1 — AA" },
              { t: "plain", text: "registry updated" },
              { t: "dim", text: "1.6s" },
            ],
          },
        ],
      },
    ],
    stickies: [
      {
        id: "s1",
        x: 170,
        y: 400,
        w: 160,
        tone: "blue",
        tilt: -2,
        drift: 5,
        text: "Agents do the parts that are the same every time.",
      },
      {
        id: "s2",
        x: 880,
        y: 410,
        w: 130,
        tone: "green",
        tilt: 3,
        drift: 6,
        text: "I still pick what ships",
      },
    ],
    stageLabels: [
      { x: 400, text: "Queue" },
      { x: 620, text: "Run" },
      { x: 830, text: "Review" },
    ],
    terminal: [
      "· restoring the board — notes, shapes, what is open",
      "✓ workspace live — it carries on without you",
      "> open ai",
      "· opening the ai workflow",
      "· ↳ Eleven agents and I, working as one team.",
      "· restoring the board — notes, shapes, what is open",
      "✓ workspace live — it carries on without you",
    ],
    tryCmd: "try: open ai",
    opened: "3 / 4 OPENED",
  },
  {
    id: "system",
    crumb: "PORTFOLIO / WORKSPACE / SYSTEM",
    canvasTag: "DESIGN SYSTEM",
    canvasMeta: "LIBRARY · 12 PARTS",
    sidebarTitle: "Design System",
    sidebarSub: "LIBRARY · 12 PARTS",
    tools: ["TOKENS", "REACT", "DOCS"],
    flow: [],
    edges: [],
    cards: [
      {
        id: "tokens",
        tag: "TOKENS",
        x: 170,
        y: 110,
        w: 230,
        drift: 5,
        lines: [
          { t: "plain", text: "▪ paper  #FBF7E6" },
          { t: "plain", text: "▪ ink  #16140E" },
          { t: "plain", text: "▪ line  #D0D5BE" },
          { t: "dim", text: "paper → #FBF7E6" },
        ],
      },
      {
        id: "components",
        tag: "COMPONENTS",
        x: 470,
        y: 110,
        w: 230,
        drift: 6,
        lines: [
          { t: "plain", text: "12 PARTS · BRANDS" },
          { t: "dim", text: "▦ ▦ ▦ ▦ ▦ ▦" },
        ],
      },
      {
        id: "docs",
        tag: "DOCS",
        x: 770,
        y: 110,
        w: 230,
        drift: 5,
        lines: [
          { t: "plain", text: "tokens.css" },
          { t: "ok", text: "--paper: #FBF7E6;" },
          { t: "ok", text: "12 components rebuilt" },
          { t: "plain", text: "preview live" },
          { t: "dim", text: "SYNCED" },
        ],
        variants: [
          {
            lines: [
              { t: "plain", text: "tokens.css" },
              { t: "ok", text: "--line: #D0D5BE;" },
              { t: "ok", text: "12 components rebuilt" },
              { t: "plain", text: "preview live" },
              { t: "dim", text: "SYNCED" },
            ],
          },
        ],
      },
    ],
    stickies: [
      {
        id: "s1",
        x: 170,
        y: 400,
        w: 160,
        tone: "blue",
        tilt: -2,
        drift: 5,
        text: "One token moves and it lands in every part at once.",
      },
      {
        id: "s2",
        x: 880,
        y: 410,
        w: 130,
        tone: "green",
        tilt: 3,
        drift: 6,
        text: "12 parts, one source",
      },
    ],
    stageLabels: [
      { x: 400, text: "Token" },
      { x: 620, text: "Part" },
      { x: 830, text: "Page" },
    ],
    terminal: [
      "· restoring the board — notes, shapes, what is open",
      "✓ workspace live — it carries on without you",
      "> open system",
      "· opening the design system",
      "· ↳ Tokens to components to docs, in one pass.",
      "· restoring the board — notes, shapes, what is open",
      "✓ workspace live — it carries on without you",
    ],
    tryCmd: "try: open system",
    opened: "3 / 4 OPENED",
  },
  {
    id: "product",
    crumb: "PORTFOLIO / WORKSPACE / PRODUCT",
    canvasTag: "PRODUCT DESIGN",
    canvasMeta: "END TO END · 8+ YRS",
    sidebarTitle: "Product Design",
    sidebarSub: "END TO END · 8+ YRS",
    tools: ["RESEARCH", "UI", "SHIP"],
    flow: [],
    edges: [],
    cards: [
      {
        id: "research",
        tag: "RESEARCH",
        x: 170,
        y: 110,
        w: 230,
        drift: 5,
        lines: [
          { t: "cmd", text: "drivers can't find the" },
          { t: "dot", text: "14 interviews · 3 patterns", sub: "Route first, list second" },
        ],
        variants: [
          {
            lines: [
              { t: "cmd", text: "checkout drops at pay" },
              { t: "dot", text: "22 sessions · 2 patterns", sub: "Pay first, confirm second" },
            ],
          },
          {
            lines: [
              { t: "cmd", text: "riders miss the total" },
              { t: "dot", text: "11 sessions · 2 patterns", sub: "Total first, details second" },
            ],
          },
        ],
      },
      {
        id: "wireframe",
        tag: "WIREFRAME",
        x: 470,
        y: 110,
        w: 230,
        drift: 6,
        lines: [
          { t: "plain", text: "▭▭▭" },
          { t: "dim", text: "V3 · AFTER THE THIRD ROUND" },
        ],
      },
      {
        id: "shipped",
        tag: "SHIPPED",
        x: 770,
        y: 110,
        w: 230,
        drift: 5,
        lines: [
          { t: "plain", text: "▬▬▬ LIVE" },
          { t: "dim", text: "LIVE" },
        ],
      },
    ],
    stickies: [
      {
        id: "s1",
        x: 170,
        y: 400,
        w: 170,
        tone: "blue",
        tilt: -2,
        drift: 5,
        text: "Watch fourteen people miss the same thing, then move it.",
      },
      {
        id: "s2",
        x: 880,
        y: 410,
        w: 120,
        tone: "green",
        tilt: 3,
        drift: 6,
        text: "Ship, then learn",
      },
    ],
    stageLabels: [
      { x: 400, text: "Talk" },
      { x: 620, text: "Sketch" },
      { x: 830, text: "Test" },
    ],
    terminal: [
      "· restoring the board — notes, shapes, what is open",
      "✓ workspace live — it carries on without you",
      "> open product",
      "· opening the product design",
      "· ↳ Messy brief to shipped product.",
      "· restoring the board — notes, shapes, what is open",
      "✓ workspace live — it carries on without you",
    ],
    tryCmd: "try: open product",
    opened: "4 / 4 OPENED",
  },
];
