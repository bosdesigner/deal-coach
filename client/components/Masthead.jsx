import { S } from "../theme.js";
import { Reveal } from "./Reveal.jsx";

export function Masthead() {
  return (
    <header style={S.masthead}>
      <Reveal i={0} style={S.demoBadge} as="div">PRODUCT DEMO</Reveal>
      <Reveal i={1} style={S.mastheadRule} />
      <Reveal i={2} as="h1" style={S.brand}>
        <span className="wordmark">THE 500</span>
      </Reveal>
      <Reveal i={3} style={S.tagline}>BY APPLICATION ONLY</Reveal>
      <Reveal i={4} style={S.byline}>
        AI executive coaching built on <em>The Art of the Deal</em> — with Keith
        Ablow, author of <em>Trump Your Life</em>
      </Reveal>
      <Reveal i={5} style={S.mastheadRule} />
    </header>
  );
}
