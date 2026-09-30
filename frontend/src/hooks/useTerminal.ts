import { useEffect, useRef, useState } from "react";
import { delayForLine, timeNow, type TermLine } from "../data/terminal";

/**
 * Streaming run log — batch-tagged lines print with marker-paced delays,
 * cancellable on switch/clear/unmount. Reduced-motion prints instantly.
 */
export function useTerminalLog(initial: string[], reduced: boolean) {
  const [lines, setLines] = useState<TermLine[]>(() =>
    initial.map((text) => ({ text, batch: 0, time: timeNow() }))
  );
  const batchRef = useRef(0);
  const queueRef = useRef<TermLine[]>([]);
  const streamTimer = useRef<number | null>(null);

  const pump = () => {
    const next = queueRef.current.shift();
    if (!next) return;
    next.time = timeNow();
    setLines((prev) => [...prev.slice(-40), next]);
    streamTimer.current = window.setTimeout(
      pump,
      delayForLine(next.text, batchRef.current, queueRef.current.length)
    );
  };

  const appendLines = (texts: string[]) => {
    const b = (batchRef.current += 1);
    if (reduced) {
      const t = timeNow();
      setLines((prev) => [...prev.slice(-40), ...texts.map((text) => ({ text, batch: b, time: t }))]);
      return;
    }
    if (streamTimer.current) window.clearTimeout(streamTimer.current);
    queueRef.current = texts.map((text) => ({ text, batch: b, time: "" }));
    pump();
  };

  const clear = () => {
    if (streamTimer.current) window.clearTimeout(streamTimer.current);
    queueRef.current = [];
    setLines([]);
  };

  // Live token stream — one line grows as tokens land (marked by sid).
  const sidRef = useRef(0);
  const startStream = (prefix = "» ") => {
    const sid = (sidRef.current += 1);
    const b = (batchRef.current += 1);
    setLines((prev) => [...prev.slice(-40), { text: prefix, batch: b, time: timeNow(), sid }]);
    return sid;
  };
  const pushStream = (sid: number, text: string) => {
    setLines((prev) => (prev.some((l) => l.sid === sid) ? prev.map((l) => (l.sid === sid ? { ...l, text } : l)) : prev));
  };

  useEffect(
    () => () => {
      if (streamTimer.current) window.clearTimeout(streamTimer.current);
    },
    []
  );

  return { lines, appendLines, clear, startStream, pushStream };
}

/** PowerShell-style copy — right-click copies the highlighted log text. */
export function copyLogSelection(e: { currentTarget: HTMLElement; preventDefault(): void }) {
  const sel = window.getSelection();
  if (sel && !sel.isCollapsed && e.currentTarget.contains(sel.anchorNode)) {
    e.preventDefault();
    try {
      void navigator.clipboard?.writeText(sel.toString())?.catch(() => {});
    } catch {
      /* clipboard unavailable — selection stays highlighted */
    }
  }
}

/** Session command history — ↑ older, ↓ newer, resets on submit. */
export function useCommandHistory() {
  const histRef = useRef<string[]>([]);
  const posRef = useRef(-1);

  const record = (raw: string) => {
    histRef.current = [raw, ...histRef.current].slice(0, 50);
    posRef.current = -1;
  };

  const travel = (dir: -1 | 1): string | undefined => {
    const hist = histRef.current;
    if (hist.length === 0) return undefined;
    if (dir === -1) {
      posRef.current = Math.min(posRef.current + 1, hist.length - 1);
      return hist[posRef.current];
    }
    posRef.current -= 1;
    return posRef.current < 0 ? "" : hist[posRef.current];
  };

  return { record, travel };
}
