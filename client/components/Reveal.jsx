/**
 * Staggered entrance. `i` is the position in a group; each step adds a beat so
 * a section assembles top-down instead of snapping into place at once.
 * The CSS honours prefers-reduced-motion, so this is inert for anyone who
 * has asked for stillness.
 */
export function Reveal({ i = 0, step = 70, as: Tag = "div", className = "", style, ...rest }) {
  return (
    <Tag
      // Merge rather than replace: a caller passing its own class must not
      // silently drop the animation.
      className={`reveal ${className}`.trim()}
      style={{ animationDelay: `${i * step}ms`, ...style }}
      {...rest}
    />
  );
}
