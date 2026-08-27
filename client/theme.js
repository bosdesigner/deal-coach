// 1980s Trump Tower luxury: near-black bronze, brass accents, ivory text.
export const C = {
  ink: "#0d0a07",
  inkTop: "#120e0a",
  panel: "#181310",
  panelRaised: "#1b1510",
  line: "#2a231a",
  lineWarm: "#33291c",
  lineMuted: "#3a3226",
  brass: "#c9a44c",
  brassLight: "#e3c878",
  brassDark: "#9c7b2e",
  ivory: "#efe6d2",
  muted: "#a79b85",
  faint: "#8a7d68",
  fainter: "#5e5343",
  userBubble: "#26364a",
  alert: "#d98c7a",
};

const serif = "'Marcellus',Georgia,serif";
const sans = "'Archivo',system-ui,-apple-system,sans-serif";

export const S = {
  page: { minHeight: "100vh", background: `linear-gradient(180deg,${C.inkTop} 0%,${C.ink} 100%)`, color: C.ivory, fontFamily: sans, display: "flex", flexDirection: "column", alignItems: "center", padding: "0 0 24px" },

  masthead: { textAlign: "center", padding: "28px 16px 18px", width: "100%", maxWidth: 720 },
  demoBadge: { display: "inline-block", fontSize: 10, letterSpacing: "0.25em", color: C.faint, border: `1px solid ${C.lineMuted}`, padding: "4px 10px", borderRadius: 2, marginBottom: 14 },
  mastheadRule: { height: 1, background: `linear-gradient(90deg,transparent,${C.brass},transparent)`, margin: "10px auto", maxWidth: 420 },
  brand: { fontFamily: serif, fontSize: "clamp(26px,6vw,40px)", letterSpacing: "0.12em", margin: 0, color: C.ivory, fontWeight: 400 },
  tagline: { fontSize: 11, letterSpacing: "0.45em", color: C.brass, marginTop: 6 },
  byline: { fontSize: 11, color: C.faint, marginTop: 8, letterSpacing: "0.04em" },

  tabRow: { display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap", justifyContent: "center", padding: "0 16px" },
  tab: { background: "none", border: `1px solid ${C.lineMuted}`, color: C.faint, fontSize: 11, letterSpacing: "0.12em", cursor: "pointer", padding: "8px 14px", borderRadius: 3, fontFamily: sans },
  tabActive: { borderColor: C.brass, color: C.ivory, background: C.panelRaised },

  rail: { width: "100%", maxWidth: 720, padding: "0 16px 12px", display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 8 },
  card: { display: "flex", gap: 12, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 4, padding: "10px 12px" },
  cardNum: { fontFamily: serif, color: C.brass, fontSize: 18, lineHeight: 1.2 },
  cardTitle: { fontWeight: 600, fontSize: 13, letterSpacing: "0.04em" },
  cardBody: { fontSize: 12, color: C.muted, marginTop: 2, lineHeight: 1.45 },

  chatWrap: { width: "100%", maxWidth: 720, display: "flex", flexDirection: "column", flex: 1, padding: "0 16px" },
  chat: { flex: 1, minHeight: 300, maxHeight: "52vh", overflowY: "auto", display: "flex", flexDirection: "column", gap: 12, padding: "12px 2px", scrollBehavior: "smooth" },

  empty: { textAlign: "center", padding: "28px 8px" },
  emptyHead: { fontFamily: serif, fontSize: 22, letterSpacing: "0.06em" },
  emptySub: { fontSize: 13, color: C.muted, maxWidth: 440, margin: "8px auto 18px", lineHeight: 1.5 },
  starterWrap: { display: "flex", flexDirection: "column", gap: 8, maxWidth: 440, margin: "0 auto" },
  starter: { background: "none", border: `1px solid ${C.lineMuted}`, color: C.muted, borderRadius: 4, padding: "10px 14px", fontSize: 13, cursor: "pointer", textAlign: "left", fontFamily: sans },

  userMsg: { alignSelf: "flex-end", background: C.userBubble, borderRadius: "10px 10px 2px 10px", padding: "10px 14px", maxWidth: "85%", fontSize: 14, lineHeight: 1.5, whiteSpace: "pre-wrap" },
  aiMsg: { alignSelf: "flex-start", background: C.panelRaised, border: `1px solid ${C.lineWarm}`, borderLeft: `3px solid ${C.brass}`, borderRadius: "2px 10px 10px 10px", padding: "10px 14px", maxWidth: "88%", fontSize: 14, lineHeight: 1.55, whiteSpace: "pre-wrap" },
  aiLabel: { fontSize: 9, letterSpacing: "0.22em", color: C.brass, marginBottom: 6 },
  error: { color: C.alert, fontSize: 13, textAlign: "center", lineHeight: 1.5 },

  inputBar: { display: "flex", gap: 10, alignItems: "stretch", marginTop: 8 },
  textarea: { flex: 1, background: C.panel, border: `1px solid ${C.lineWarm}`, borderRadius: 4, color: C.ivory, padding: "12px 14px", fontSize: 14, resize: "none", fontFamily: sans, lineHeight: 1.5, maxHeight: 160, overflowY: "auto" },
  plaque: { fontFamily: serif, fontSize: 12, letterSpacing: "0.1em", lineHeight: 1.35, color: "#241a08", background: `linear-gradient(180deg,${C.brassLight} 0%,${C.brass} 45%,${C.brassDark} 100%)`, border: "1px solid #71581f", borderRadius: 4, padding: "8px 16px", cursor: "pointer", boxShadow: "0 3px 0 #4a3a15, 0 5px 12px rgba(0,0,0,.55)", whiteSpace: "nowrap" },

  footer: { textAlign: "center", fontSize: 10, color: C.fainter, marginTop: 12, letterSpacing: "0.06em", lineHeight: 1.6 },
};
