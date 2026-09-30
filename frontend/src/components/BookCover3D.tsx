type Props = {
  cover: string;
  title: string;
  author: string;
  color: string;
  width?: number;
  height?: number;
};

/**
 * 3D book — ported from the main site's Book3D widget.
 * Real cover photo; on hover the book lifts and the front cover
 * swings open (-45°) revealing page lines, with a title tooltip.
 * Fixed 340×465 (Figma), scaled down on small screens.
 */
export default function BookCover3D({ cover, title, author, color, width = 340, height = 465 }: Props) {
  return (
    <div
      className="bk3d-scene select-none"
      role="button"
      aria-label={`${title} by ${author}`}
      tabIndex={0}
    >
      <div className="bk3d" style={{ width, height }}>
        {/* Spine (left edge) */}
        <div className="bk3d-spine" style={{ backgroundColor: color, height }} aria-hidden />

        {/* Front cover — rotates open on hover */}
        <div className="bk3d-cover">
          <img src={cover} width={width} height={height} alt="" draggable={false} className="block h-full w-full object-cover" />
          <div aria-hidden className="bk3d-sheen" />
        </div>

        {/* Inside page (visible when the cover opens) */}
        <div aria-hidden className="bk3d-inside">
          <div className="bk3d-lines">
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>

        {/* Page block thickness (right edge) */}
        <div aria-hidden className="bk3d-pages" />

        {/* Back cover */}
        <div aria-hidden className="bk3d-back" style={{ backgroundColor: color }} />
      </div>
    </div>
  );
}
