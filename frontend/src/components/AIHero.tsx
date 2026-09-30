import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useHeaderReveal } from "../hooks/useReveal";

/**
 * THE LOOP — AI workflow pipeline diagram with PCB/circuit board design.
 * Full circuit board metaphor: traces, vias, components, stations, agents, robot.
 * Spans full container width. No background — transparent strip on cream page.
 * Header copy uses mount reveal (above-fold, no scroll threshold).
 */
export default function AIHero() {
  const { ref, inView } = useHeaderReveal<HTMLElement>();
  const [robotState, setRobotState] = useState<"walking" | "stopped">(() =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "stopped"
      : "walking"
  );

  // Stop robot after walk animation completes (10s). Skipped under
  // reduced-motion (CSS already freezes `.rg-bot`); StrictMode-safe cleanup.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setTimeout(() => {
      setRobotState("stopped");
    }, 10000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section ref={ref} aria-label="AI — Design Engineering" className="relative">
      {/* Frame rule (contained) + corner mark */}
      <div aria-hidden className="h-px bg-line-strong" />
      <span
        aria-hidden
        className="absolute right-0 top-[1px] h-[20px] w-[20px] bg-[linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/20px_2px_no-repeat,linear-gradient(var(--accent-deep),var(--accent-deep))_100%_0/2px_20px_no-repeat]"
      />

      <div className="px-[24px] pb-[96px] pt-[126px] md:px-[68px] md:pb-[126px]">
        {/* Heading */}
        <div className="grid grid-cols-1 gap-x-[60px] gap-y-[40px] min-[1524px]:grid-cols-[1fr_400px]">
          <h1 className={`sv-lines font-sans text-[length:var(--fs-h1)] font-medium not-italic leading-[1.04] tracking-[-1.2px] text-ink md:tracking-[-1.92px] ${inView ? "is-in" : ""}`}>
            <span className="sv-ln">
              <span>AI does not design.</span>
            </span>
            <span className="sv-ln">
              <span className="text-faint">It does the other 80%</span>
            </span>
          </h1>

          <div
            className={`sv-rv max-w-[400px] pt-0 md:pt-[18px] lg:justify-self-end ${inView ? "is-in" : ""}`}
            style={{ transitionDelay: "0.12s" }}
          >
            <p className="font-sans text-[19px] font-normal leading-[29.45px] text-muted">
              Using AI across my daily workflow for faster execution, better
              decisions, rapid prototyping, and shipping real-world products.
            </p>
            <div className="flex flex-wrap items-start gap-[12px] pt-[32px]">
              <Link
                to="/ai"
                className="lift flex h-[50px] items-center gap-[12px] bg-accent px-[22px] font-sans text-[15px] font-medium text-accent-ink transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-2"
              >
                The workflow
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
              <Link
                to="/ai"
                className="lift flex h-[50px] items-center gap-[12px] px-[22px] font-sans text-[15px] font-medium text-ink shadow-[inset_0_0_0_1px_var(--line)] transition hover:bg-ink/[0.04] focus-visible:outline-2 focus-visible:outline-accent-deep focus-visible:outline-offset-2"
              >
                What it built
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                  <path d="M3 11L11 3M11 3H4M11 3V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </div>

        {/* Workflow loop diagram — PCB circuit board design */}
        <div className="relative mt-16">
          {/* PCB diagram — scales across breakpoints */}
          <div className="relative w-full">
            <svg
              viewBox="0 0 980 272"
              preserveAspectRatio="xMidYMax meet"
              className="block h-auto w-full min-[768px]:h-[272px] max-[767px]:h-[420px]"
              aria-hidden="true"
            >
              {/* Ground plane */}
              <path className="rg-ground" d="M0 250 H980" />

              {/* Board traces */}
              <g className="rg-brd">
                <path className="rg-brd-bus" d="M0 254 H980" />
                <path className="rg-brd-bus" d="M0 261 H980" />
                {/* Vias and components along the bus */}
                <circle className="rg-brd-via" cx="3" cy="254" r="1.1" />
                <g className="rg-brd-pkg">
                  <path className="rg-brd-chip" d="M0 255.5 h9 v4 h-9 z" />
                  <path className="rg-brd-pin" d="M1.5 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M4.5 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M7.5 255.5 v-1.6" />
                </g>
                <circle className="rg-brd-via" cx="34.6" cy="254" r="1.1" />
                <path className="rg-brd-res" d="M32.6 256 h5 v3 h-5 z" />
                <circle className="rg-brd-via" cx="66.2" cy="254" r="1.1" />
                <circle className="rg-brd-cap" cx="66.2" cy="257.5" r="2" />
                <path className="rg-brd-trace" d="M82 254 l3 3.5 H91" />
                <circle className="rg-brd-via" cx="97.8" cy="254" r="1.1" />
                <path className="rg-brd-silk" d="M97.8 262.6 h4" />
                <g className="rg-brd-pkg">
                  <path className="rg-brd-chip" d="M110.6 255.5 h9 v4 h-9 z" />
                  <path className="rg-brd-pin" d="M112.1 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M115.1 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M118.1 255.5 v-1.6" />
                </g>
                <circle className="rg-brd-via" cx="129.5" cy="254" r="1.1" />
                <path className="rg-brd-res" d="M143.3 256 h5 v3 h-5 z" />
                <circle className="rg-brd-via" cx="161.1" cy="254" r="1.1" />
                <circle className="rg-brd-cap" cx="176.9" cy="257.5" r="2" />
                <circle className="rg-brd-via" cx="192.7" cy="254" r="1.1" />
                <path className="rg-brd-trace" d="M192.7 254 l3 3.5 H201.7" />
                <path className="rg-brd-silk" d="M208.5 262.6 h4" />
                <circle className="rg-brd-via" cx="224.3" cy="254" r="1.1" />
                <g className="rg-brd-pkg">
                  <path className="rg-brd-chip" d="M221.3 255.5 h9 v4 h-9 z" />
                  <path className="rg-brd-pin" d="M222.8 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M225.8 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M228.8 255.5 v-1.6" />
                </g>
                <circle className="rg-brd-via" cx="255.9" cy="254" r="1.1" />
                <path className="rg-brd-res" d="M253.9 256 h5 v3 h-5 z" />
                <circle className="rg-brd-via" cx="287.5" cy="254" r="1.1" />
                <circle className="rg-brd-cap" cx="287.5" cy="257.5" r="2" />
                <path className="rg-brd-trace" d="M303.3 254 l3 3.5 H312.3" />
                <circle className="rg-brd-via" cx="319.1" cy="254" r="1.1" />
                <path className="rg-brd-silk" d="M319.1 262.6 h4" />
                <g className="rg-brd-pkg">
                  <path className="rg-brd-chip" d="M331.9 255.5 h9 v4 h-9 z" />
                  <path className="rg-brd-pin" d="M333.4 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M336.4 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M339.4 255.5 v-1.6" />
                </g>
                <circle className="rg-brd-via" cx="350.7" cy="254" r="1.1" />
                <path className="rg-brd-res" d="M364.5 256 h5 v3 h-5 z" />
                <circle className="rg-brd-via" cx="382.4" cy="254" r="1.1" />
                <circle className="rg-brd-cap" cx="398.2" cy="257.5" r="2" />
                <circle className="rg-brd-via" cx="414" cy="254" r="1.1" />
                <path className="rg-brd-trace" d="M414 254 l3 3.5 H423" />
                <path className="rg-brd-silk" d="M429.8 262.6 h4" />
                <circle className="rg-brd-via" cx="445.6" cy="254" r="1.1" />
                <g className="rg-brd-pkg">
                  <path className="rg-brd-chip" d="M442.6 255.5 h9 v4 h-9 z" />
                  <path className="rg-brd-pin" d="M444.1 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M447.1 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M450.1 255.5 v-1.6" />
                </g>
                <circle className="rg-brd-via" cx="477.2" cy="254" r="1.1" />
                <path className="rg-brd-res" d="M475.2 256 h5 v3 h-5 z" />
                <circle className="rg-brd-via" cx="508.8" cy="254" r="1.1" />
                <circle className="rg-brd-cap" cx="508.8" cy="257.5" r="2" />
                <path className="rg-brd-trace" d="M524.6 254 l3 3.5 H533.6" />
                <circle className="rg-brd-via" cx="540.4" cy="254" r="1.1" />
                <path className="rg-brd-silk" d="M540.4 262.6 h4" />
                <g className="rg-brd-pkg">
                  <path className="rg-brd-chip" d="M553.2 255.5 h9 v4 h-9 z" />
                  <path className="rg-brd-pin" d="M554.7 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M557.7 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M560.7 255.5 v-1.6" />
                </g>
                <circle className="rg-brd-via" cx="572" cy="254" r="1.1" />
                <path className="rg-brd-res" d="M585.8 256 h5 v3 h-5 z" />
                <circle className="rg-brd-via" cx="603.6" cy="254" r="1.1" />
                <circle className="rg-brd-cap" cx="619.5" cy="257.5" r="2" />
                <circle className="rg-brd-via" cx="635.3" cy="254" r="1.1" />
                <path className="rg-brd-trace" d="M635.3 254 l3 3.5 H644.3" />
                <path className="rg-brd-silk" d="M651.1 262.6 h4" />
                <circle className="rg-brd-via" cx="666.9" cy="254" r="1.1" />
                <g className="rg-brd-pkg">
                  <path className="rg-brd-chip" d="M663.9 255.5 h9 v4 h-9 z" />
                  <path className="rg-brd-pin" d="M665.4 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M668.4 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M671.4 255.5 v-1.6" />
                </g>
                <circle className="rg-brd-via" cx="698.5" cy="254" r="1.1" />
                <path className="rg-brd-res" d="M696.5 256 h5 v3 h-5 z" />
                <circle className="rg-brd-via" cx="730.1" cy="254" r="1.1" />
                <circle className="rg-brd-cap" cx="730.1" cy="257.5" r="2" />
                <path className="rg-brd-trace" d="M745.9 254 l3 3.5 H754.9" />
                <circle className="rg-brd-via" cx="761.7" cy="254" r="1.1" />
                <path className="rg-brd-silk" d="M761.7 262.6 h4" />
                <g className="rg-brd-pkg">
                  <path className="rg-brd-chip" d="M774.5 255.5 h9 v4 h-9 z" />
                  <path className="rg-brd-pin" d="M776 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M779 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M782 255.5 v-1.6" />
                </g>
                <circle className="rg-brd-via" cx="793.3" cy="254" r="1.1" />
                <path className="rg-brd-res" d="M807.1 256 h5 v3 h-5 z" />
                <circle className="rg-brd-via" cx="824.9" cy="254" r="1.1" />
                <circle className="rg-brd-cap" cx="840.7" cy="257.5" r="2" />
                <circle className="rg-brd-via" cx="856.5" cy="254" r="1.1" />
                <path className="rg-brd-trace" d="M856.5 254 l3 3.5 H865.5" />
                <path className="rg-brd-silk" d="M872.4 262.6 h4" />
                <circle className="rg-brd-via" cx="888.2" cy="254" r="1.1" />
                <g className="rg-brd-pkg">
                  <path className="rg-brd-chip" d="M885.2 255.5 h9 v4 h-9 z" />
                  <path className="rg-brd-pin" d="M886.7 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M889.7 255.5 v-1.6" />
                  <path className="rg-brd-pin" d="M892.7 255.5 v-1.6" />
                </g>
                <circle className="rg-brd-via" cx="919.8" cy="254" r="1.1" />
                <path className="rg-brd-res" d="M917.8 256 h5 v3 h-5 z" />
                <circle className="rg-brd-via" cx="951.4" cy="254" r="1.1" />
                <circle className="rg-brd-cap" cx="951.4" cy="257.5" r="2" />
                <path className="rg-brd-trace" d="M967.2 254 l3 3.5 H976.2" />
              </g>

              {/* Board skirt */}
              <path className="rg-skirt" d="M0 265 H980" />

              {/* Drop lines */}
              <path className="rg-drop" d="M534 113 H559" />
              <path className="rg-drop" d="M559 113 V124" />
              <path className="rg-drop" d="M559 124 V176" />
              <path className="rg-drop" d="M562 205 V250" />

              {/* Chip component */}
              <g transform="translate(548 102) scale(.66)">
                <g className="rg-prop rg-chip">
                  <path className="rg-pin" d="M8 0 v-5" />
                  <path className="rg-pin" d="M8 34 v5" />
                  <path className="rg-pin" d="M0 8 h-5" />
                  <path className="rg-pin" d="M34 8 h5" />
                  <path className="rg-pin" d="M15 0 v-5" />
                  <path className="rg-pin" d="M15 34 v5" />
                  <path className="rg-pin" d="M0 15 h-5" />
                  <path className="rg-pin" d="M34 15 h5" />
                  <path className="rg-pin" d="M22 0 v-5" />
                  <path className="rg-pin" d="M22 34 v5" />
                  <path className="rg-pin" d="M0 22 h-5" />
                  <path className="rg-pin" d="M34 22 h5" />
                  <path className="rg-pin" d="M29 0 v-5" />
                  <path className="rg-pin" d="M29 34 v5" />
                  <path className="rg-pin" d="M0 29 h-5" />
                  <path className="rg-pin" d="M34 29 h5" />
                  <path className="rg-chip-pkg" d="M0 0 h34 v34 h-34 z" />
                  <path className="rg-chip-die" d="M10 10 h14 v14 h-14 z" />
                </g>
              </g>

              {/* Database component */}
              <g transform="translate(552 176) scale(.72)">
                <g className="rg-prop rg-db">
                  <path className="rg-db-body" d="M0 24 v8 a13 4.6 0 0 0 26 0 v-8 z" />
                  <ellipse className="rg-db-top" cx="13" cy="24" rx="13" ry="4.6" />
                  <path className="rg-db-body" d="M0 12 v8 a13 4.6 0 0 0 26 0 v-8 z" />
                  <ellipse className="rg-db-top" cx="13" cy="12" rx="13" ry="4.6" />
                  <path className="rg-db-body" d="M0 0 v8 a13 4.6 0 0 0 26 0 v-8 z" />
                  <ellipse className="rg-db-top" cx="13" cy="0" rx="13" ry="4.6" />
                </g>
              </g>

              {/* Cloud/API component */}
              <g className="rg-prop rg-cloud">
                <path className="rg-cloud-body" d="M901 142 a9.5 9.5 0 0 1 2 -18 a12.5 12.5 0 0 1 23 -2.5 a8.5 8.5 0 0 1 7 20.5 z" />
                <text className="rg-chip-t" x="913" y="154">API</text>
              </g>

              {/* Code window component */}
              <g className="rg-prop rg-code">
                <path className="rg-code-box" d="M888 180 h84 v70 h-84 z" />
                <path className="rg-code-bar" d="M888 180 h84 v11 h-84 z" />
                <circle className="rg-code-dot" cx="896" cy="185.5" r="1.8" />
                <circle className="rg-code-dot" cx="903" cy="185.5" r="1.8" />
                <circle className="rg-code-dot" cx="910" cy="185.5" r="1.8" />
                <path className="rg-code-ln k-kw" d="M896 202 h22" />
                <path className="rg-code-ln k-id" d="M922 207.4 h30" />
                <path className="rg-code-ln k-kw" d="M902 212.8 h16" />
                <path className="rg-code-ln k-st" d="M922 218.2 h34" />
                <path className="rg-code-ln k-id" d="M902 223.6 h30" />
                <path className="rg-code-ln k-kw" d="M896 229 h14" />
                <path className="rg-code-ln k-st" d="M914 234.4 h26" />
                <path className="rg-code-ln k-id" d="M902 239.8 h20" />
                <path className="rg-code-ln k-kw" d="M926 245.2 h18" />
              </g>

              {/* Wire connections */}
              <path className="rg-wire rg-tie" d="M876 152 H930 V180" />

              {/* Store drops */}
              <g className="rg-store">
                <path className="rg-drop" d="M384 136 V250" />
                <path className="rg-drop" d="M440 192 V250" />
                <path className="rg-drop" d="M496 248 V250" />
              </g>

              {/* Rail lines */}
              <path className="rg-rail" d="M110 152 H300 M534 152 H606 M690 152 H760" />

              {/* Fan-out wires */}
              <g className="rg-fan" style={{ "--d": "0s" } as React.CSSProperties}>
                <path className="rg-wire" d="M300 152 C324 152 324 116 344 116" />
                <path className="rg-wire" d="M534 116 C554 116 554 152 578 152" />
              </g>
              <g className="rg-fan" style={{ "--d": "0.1s" } as React.CSSProperties}>
                <path className="rg-wire" d="M300 152 C324 152 324 172 344 172" />
                <path className="rg-wire" d="M534 172 C554 172 554 152 578 152" />
              </g>
              <g className="rg-fan" style={{ "--d": "0.2s" } as React.CSSProperties}>
                <path className="rg-wire" d="M300 152 C324 152 324 228 344 228" />
                <path className="rg-wire" d="M534 228 C554 228 554 152 578 152" />
              </g>

              {/* Back rail */}
              <path className="rg-rail rg-back" d="M648 246 H256 V196" />

              {/* Station: Prompt */}
              <g className="rg-stn prompt">
                <path className="rg-box" d="M62 250 V176 h100 V250 z" />
                <path className="rg-lip" d="M62 176 h100 v7 h-100 z" />
                <text className="rg-nm" x="73" y="199">Prompt</text>
                <text className="rg-sb" x="73" y="212">claude · 200k ctx</text>
                <g>
                  <path className="rg-unit" d="M70 210 h84 v15 h-84 z" />
                  <path className="rg-vent" d="M88 214 v7" />
                  <path className="rg-vent" d="M93 214 v7" />
                  <path className="rg-vent" d="M98 214 v7" />
                  <path className="rg-vent" d="M103 214 v7" />
                  <path className="rg-vent" d="M108 214 v7" />
                  <circle className="rg-led l0" cx="78" cy="217.5" r="2.6" />
                  <path className="rg-slot" d="M136 217.5 h14" />
                </g>
                <g>
                  <path className="rg-unit" d="M70 230 h84 v15 h-84 z" />
                  <path className="rg-vent" d="M88 234 v7" />
                  <path className="rg-vent" d="M93 234 v7" />
                  <path className="rg-vent" d="M98 234 v7" />
                  <path className="rg-vent" d="M103 234 v7" />
                  <path className="rg-vent" d="M108 234 v7" />
                  <circle className="rg-led l1" cx="78" cy="237.5" r="2.6" />
                  <path className="rg-slot" d="M136 237.5 h14" />
                </g>
                <path className="rg-feet" d="M68 250 v-4 M156 250 v-4" />
              </g>

              {/* Station: Router */}
              <g className="rg-stn router">
                <path className="rg-box" d="M218 250 V158 h88 V250 z" />
                <path className="rg-lip" d="M218 158 h88 v7 h-88 z" />
                <text className="rg-nm" x="229" y="181">Router</text>
                <text className="rg-sb" x="229" y="194">mcp · 7 tools</text>
                <g>
                  <path className="rg-unit" d="M226 210 h72 v15 h-72 z" />
                  <path className="rg-vent" d="M244 214 v7" />
                  <path className="rg-vent" d="M249 214 v7" />
                  <path className="rg-vent" d="M254 214 v7" />
                  <path className="rg-vent" d="M259 214 v7" />
                  <path className="rg-vent" d="M264 214 v7" />
                  <circle className="rg-led l0" cx="234" cy="217.5" r="2.6" />
                  <path className="rg-slot" d="M280 217.5 h14" />
                </g>
                <g>
                  <path className="rg-unit" d="M226 230 h72 v15 h-72 z" />
                  <path className="rg-vent" d="M244 234 v7" />
                  <path className="rg-vent" d="M249 234 v7" />
                  <path className="rg-vent" d="M254 234 v7" />
                  <path className="rg-vent" d="M259 234 v7" />
                  <path className="rg-vent" d="M264 234 v7" />
                  <circle className="rg-led l1" cx="234" cy="237.5" r="2.6" />
                  <path className="rg-slot" d="M280 237.5 h14" />
                </g>
                <path className="rg-feet" d="M224 250 v-4 M300 250 v-4" />
              </g>

              {/* Station: Gate */}
              <g className="rg-stn gate">
                <path className="rg-box" d="M606 250 V154 h92 V250 z" />
                <path className="rg-lip" d="M606 154 h92 v7 h-92 z" />
                <text className="rg-nm" x="617" y="177">Gate</text>
                <text className="rg-sb" x="617" y="190">tsc · axe · diff</text>
                <g>
                  <path className="rg-unit" d="M614 210 h76 v15 h-76 z" />
                  <path className="rg-vent" d="M632 214 v7" />
                  <path className="rg-vent" d="M637 214 v7" />
                  <path className="rg-vent" d="M642 214 v7" />
                  <path className="rg-vent" d="M647 214 v7" />
                  <path className="rg-vent" d="M652 214 v7" />
                  <circle className="rg-led l0" cx="622" cy="217.5" r="2.6" />
                  <path className="rg-slot" d="M672 217.5 h14" />
                </g>
                <g>
                  <path className="rg-unit" d="M614 230 h76 v15 h-76 z" />
                  <path className="rg-vent" d="M632 234 v7" />
                  <path className="rg-vent" d="M637 234 v7" />
                  <path className="rg-vent" d="M642 234 v7" />
                  <path className="rg-vent" d="M647 234 v7" />
                  <path className="rg-vent" d="M652 234 v7" />
                  <circle className="rg-led l1" cx="622" cy="237.5" r="2.6" />
                  <path className="rg-slot" d="M672 237.5 h14" />
                </g>
                <path className="rg-feet" d="M612 250 v-4 M692 250 v-4" />
              </g>

              {/* Station: Commit — live indicator */}
              <g className="rg-stn ship is-live">
                <path className="rg-box" d="M764 250 V172 h112 V250 z" />
                <path className="rg-lip" d="M764 172 h112 v7 h-112 z" />
                <text className="rg-nm" x="775" y="195">Commit</text>
                <text className="rg-sb" x="775" y="208">git · npm</text>
                <g>
                  <path className="rg-unit" d="M772 210 h96 v15 h-96 z" />
                  <path className="rg-vent" d="M790 214 v7" />
                  <path className="rg-vent" d="M795 214 v7" />
                  <path className="rg-vent" d="M800 214 v7" />
                  <path className="rg-vent" d="M805 214 v7" />
                  <path className="rg-vent" d="M810 214 v7" />
                  <circle className="rg-led l0" cx="780" cy="217.5" r="2.6" />
                  <path className="rg-slot" d="M850 217.5 h14" />
                </g>
                <g>
                  <path className="rg-unit" d="M772 230 h96 v15 h-96 z" />
                  <path className="rg-vent" d="M790 234 v7" />
                  <path className="rg-vent" d="M795 234 v7" />
                  <path className="rg-vent" d="M800 234 v7" />
                  <path className="rg-vent" d="M805 234 v7" />
                  <path className="rg-vent" d="M810 234 v7" />
                  <circle className="rg-led l1" cx="780" cy="237.5" r="2.6" />
                  <path className="rg-slot" d="M850 237.5 h14" />
                </g>
                <path className="rg-feet" d="M770 250 v-4 M870 250 v-4" />
              </g>

              {/* Agent cards: Build, Audit, Docs */}
              <g className="rg-ag" style={{ "--d": "0s" } as React.CSSProperties}>
                <path className="rg-ag-box" d="M344 96 h190 v40 h-190 z" />
                <circle className="rg-ag-dot" cx="359" cy="116" r="5" />
                <text className="rg-ag-nm" x="374" y="114">Build</text>
                <text className="rg-ag-out" x="374" y="127">badge.tsx · 142 loc</text>
                <path className="rg-ag-run" d="M345 134 h188" />
              </g>
              <g className="rg-ag" style={{ "--d": "0.12s" } as React.CSSProperties}>
                <path className="rg-ag-box" d="M344 152 h190 v40 h-190 z" />
                <circle className="rg-ag-dot" cx="359" cy="172" r="5" />
                <text className="rg-ag-nm" x="374" y="170">Audit</text>
                <text className="rg-ag-out" x="374" y="183">axe · 4.9:1 AA</text>
                <path className="rg-ag-run" d="M345 190 h188" />
              </g>
              <g className="rg-ag" style={{ "--d": "0.24s" } as React.CSSProperties}>
                <path className="rg-ag-box" d="M344 208 h190 v40 h-190 z" />
                <circle className="rg-ag-dot" cx="359" cy="228" r="5" />
                <text className="rg-ag-nm" x="374" y="226">Docs</text>
                <text className="rg-ag-out" x="374" y="239">mdx · registry +1</text>
                <path className="rg-ag-run" d="M345 246 h188" />
              </g>

              {/* Robot — walks to Commit block, then stops */}
              <g
                className={`rg-bot is-working ${robotState === "walking" ? "is-walking" : "is-stopped"}`}
                style={{ "--walk-dist": "82%" } as React.CSSProperties}
              >
                <g className="robot" transform="translate(0 0)">
                  <g className="front" aria-hidden="true">
                    <ellipse className="shadow" cx="0" cy="1.5" rx="14" ry="2.6" />
                    <rect className="limb" x="-8.4" y="-24" width="6.4" height="20" rx="2" />
                    <rect className="limb" x="2" y="-24" width="6.4" height="20" rx="2" />
                    <rect className="foot" x="-10" y="-5" width="9.6" height="4" rx="1.2" />
                    <rect className="foot" x="0.4" y="-5" width="9.6" height="4" rx="1.2" />
                    <rect className="body" x="-11" y="-46" width="22" height="23" rx="4.5" />
                    <rect className="vent" x="-6" y="-41" width="12" height="1.8" rx=".9" />
                    <rect className="vent" x="-6" y="-37.4" width="12" height="1.8" rx=".9" />
                    <circle className="core" cx="0" cy="-31" r="4" />
                    <rect className="limb" x="-15.5" y="-44" width="5" height="17" rx="2" />
                    <g className="wave">
                      <rect className="limb" x="10.5" y="-45" width="5" height="16" rx="2" />
                      <rect className="grip" x="10" y="-48.5" width="6" height="5" rx="1.8" />
                    </g>
                    <rect className="neck" x="-2.4" y="-50" width="4.8" height="4.6" />
                    <rect className="head" x="-11" y="-64" width="22" height="14.5" rx="4.5" />
                    <rect className="visor" x="-7.4" y="-60.4" width="14.8" height="6.4" rx="2.6" />
                    <circle className="eye" cx="-3.4" cy="-57.2" r="1.5" />
                    <circle className="eye" cx="3.4" cy="-57.2" r="1.5" />
                    <path className="ant" d="M0 -64 v-7" />
                    <circle className="ant-led" cx="0" cy="-72.5" r="2.4" />
                  </g>
                  <g className="side">
                    <ellipse className="shadow" cx="1" cy="1.5" rx="13" ry="2.4" />
                    <g className="jump">
                      <g className="hull">
                        <g className="leg leg-b" transform="translate(1.5 -26)">
                          <g className="thigh">
                            <rect className="limb" x="-3.2" y="0" width="6.4" height="11" rx="2" />
                            <circle className="joint" cx="0" cy="11.5" r="2.8" />
                            <g transform="translate(0 12)">
                              <g className="knee">
                                <rect className="limb" x="-2.8" y="0" width="5.6" height="10" rx="2" />
                                <rect className="foot" x="-4.6" y="9.4" width="9.6" height="4" rx="1.2" />
                              </g>
                            </g>
                          </g>
                        </g>
                        <g className="arm arm-b" transform="translate(1.2 -44)">
                          <g className="shoulder">
                            <rect className="limb" x="-2.6" y="0" width="5.2" height="9" rx="2" />
                            <circle className="joint" cx="0" cy="9.4" r="2.4" />
                            <g transform="translate(0 10)">
                              <g className="elbow">
                                <rect className="limb" x="-2.4" y="0" width="4.8" height="8" rx="2" />
                                <rect className="grip" x="-3" y="7.4" width="6" height="4.4" rx="1.6" />
                              </g>
                            </g>
                          </g>
                        </g>
                        <rect className="body" x="-8" y="-46" width="18.5" height="21" rx="4" />
                        <rect className="vent" x="-4.6" y="-41" width="11.5" height="1.8" rx=".9" />
                        <rect className="vent" x="-4.6" y="-37.4" width="11.5" height="1.8" rx=".9" />
                        <circle className="core" cx="1.2" cy="-31" r="3.4" />
                        <g className="leg leg-a" transform="translate(1.5 -26)">
                          <g className="thigh">
                            <rect className="limb" x="-3.2" y="0" width="6.4" height="11" rx="2" />
                            <circle className="joint" cx="0" cy="11.5" r="2.8" />
                            <g transform="translate(0 12)">
                              <g className="knee">
                                <rect className="limb" x="-2.8" y="0" width="5.6" height="10" rx="2" />
                                <rect className="foot" x="-4.6" y="9.4" width="9.6" height="4" rx="1.2" />
                              </g>
                            </g>
                          </g>
                        </g>
                        <g className="arm arm-a" transform="translate(1.2 -44)">
                          <g className="shoulder">
                            <rect className="limb" x="-2.6" y="0" width="5.2" height="9" rx="2" />
                            <circle className="joint" cx="0" cy="9.4" r="2.4" />
                            <g transform="translate(0 10)">
                              <g className="elbow">
                                <rect className="limb" x="-2.4" y="0" width="4.8" height="8" rx="2" />
                                <rect className="grip" x="-3" y="7.4" width="6" height="4.4" rx="1.6" />
                              </g>
                            </g>
                          </g>
                        </g>
                        <rect className="neck" x="-1" y="-50" width="4.6" height="4.6" />
                        <rect className="head" x="-7.5" y="-63" width="18" height="13.5" rx="4" />
                        <rect className="visor" x="-3.4" y="-59.6" width="12" height="5.6" rx="2.4" />
                        <path className="ant" d="M6.5 -63 v-7" />
                        <circle className="ant-led" cx="6.5" cy="-71.5" r="2.4" />
                      </g>
                    </g>
                  </g>
                </g>
              </g>

              {/* Thinking indicator */}
              <g className="rg-think" transform="translate(770 100)">
                <text className="rg-think-t" x="0" y="0">Thinking</text>
                <circle className="rg-think-d" cx="46" cy="-3" r="1.9" style={{ "--d": "0s" } as React.CSSProperties} />
                <circle className="rg-think-d" cx="54" cy="-3" r="1.9" style={{ "--d": "0.18s" } as React.CSSProperties} />
                <circle className="rg-think-d" cx="62" cy="-3" r="1.9" style={{ "--d": "0.36s" } as React.CSSProperties} />
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
