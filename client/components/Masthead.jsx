import { S } from "../theme.js";

export function Masthead() {
  return (
    <header style={S.masthead}>
      <div style={S.demoBadge}>PRODUCT DEMO</div>
      <div style={S.mastheadRule} />
      <h1 style={S.brand}>THE ART OF THE DEAL</h1>
      <div style={S.tagline}>AI EXECUTIVE COACHING</div>
      <div style={S.byline}>
        The Deal · The Mindset — with Keith Ablow, author of <em>Trump Your Life</em>
      </div>
      <div style={S.mastheadRule} />
    </header>
  );
}
