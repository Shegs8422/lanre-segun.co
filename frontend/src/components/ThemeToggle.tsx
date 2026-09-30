type Props = {
  theme: "light" | "dark";
  onToggle?: () => void;
  className?: string;
};

/**
 * Theme switcher — state-driven `is-on` motion (reference theme-m98XvadK).
 * Sun rays rotate + fade while the disc fills accent; transform/opacity/
 * fill all transitioned, frozen under reduced-motion.
 */
export default function ThemeToggle({ theme, onToggle, className = "" }: Props) {
  const on = theme === "dark";
  return (
    <button
      type="button"
      aria-label={on ? "Switch to light" : "Switch to dark"}
      aria-pressed={on}
      onClick={onToggle}
      className={`th-toggle group flex size-[30px] items-center justify-center rounded-[15px] transition hover:bg-[rgba(22,20,14,0.06)] focus-visible:outline-2 focus-visible:outline-[#c77e0a] active:scale-90 ${on ? "is-on" : ""} ${className}`}
    >
      <svg viewBox="0 0 18 18" width={18} height={18} aria-hidden className="block size-[18px] text-[#16140e] dark:text-[#f1eee6]">
        <g className="th-rays" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M9 1.5 V3.4" />
          <path d="M9 14.6 V16.5" />
          <path d="M1.5 9 H3.4" />
          <path d="M14.6 9 H16.5" />
          <path d="M3.7 3.7 L5 5" />
          <path d="M13 13 L14.3 14.3" />
          <path d="M14.3 3.7 L13 5" />
          <path d="M5 13 L3.7 14.3" />
        </g>
        <circle className="th-halo" cx="9" cy="9" r="6.2" />
        <circle className="th-disc" cx="9" cy="9" r="4" />
      </svg>
    </button>
  );
}
