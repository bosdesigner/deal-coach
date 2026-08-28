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

  masthead: { textAlign: "center", padding: "38px 16px 20px", width: "100%", maxWidth: 720 },
  demoBadge: { display: "inline-block", fontSize: 10, letterSpacing: "0.25em", color: C.faint, border: `1px solid ${C.lineMuted}`, padding: "4px 10px", borderRadius: 2, marginBottom: 14 },
  mastheadRule: { height: 1, background: `linear-gradient(90deg,transparent,${C.brass},transparent)`, margin: "10px auto", maxWidth: 420 },
  brand: { fontFamily: serif, fontSize: "clamp(29px,7.2vw,50px)", letterSpacing: "0.15em", margin: 0, color: C.ivory, fontWeight: 400 },
  tagline: { fontSize: 10.5, letterSpacing: "0.5em", color: C.brass, marginTop: 9, paddingLeft: "0.5em" },
  byline: { fontSize: 11, color: C.faint, marginTop: 8, letterSpacing: "0.04em" },

  tabRow: { display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap", justifyContent: "center", padding: "0 16px" },
  tab: { background: "none", border: `1px solid ${C.lineMuted}`, color: C.faint, fontSize: 11, letterSpacing: "0.12em", cursor: "pointer", padding: "8px 14px", borderRadius: 3, fontFamily: sans },
  // Full `border` shorthand, not borderColor: React warns when a shorthand and
  // its longhand are swapped across rerenders, and it can genuinely mis-paint.
  tabActive: { border: `1px solid ${C.brass}`, color: C.ivory, background: C.panelRaised },

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

  // ---- The Deal Room -----------------------------------------------------
  // Engraved plaque in the masthead; the only entry point to the Room.
  roomBanner: { width: "100%", maxWidth: 720, margin: "2px auto 10px", padding: "0 16px" },
  roomPlaque: { width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 12, flexWrap: "wrap", background: "linear-gradient(180deg,#1d1710 0%,#141009 100%)", border: `1px solid ${C.lineWarm}`, borderTop: `1px solid ${C.brassDark}`, borderRadius: 3, padding: "11px 14px", cursor: "pointer", fontFamily: serif, color: C.ivory, fontSize: 11.5, letterSpacing: "0.14em" },
  roomPlaqueCount: { fontFamily: sans, fontSize: 9, letterSpacing: "0.12em", color: C.brass },
  roomPlaqueDemo: { fontFamily: sans, fontSize: 8, letterSpacing: "0.18em", color: C.fainter, border: `1px solid ${C.lineMuted}`, borderRadius: 2, padding: "2px 5px" },

  roomWrap: { width: "100%", maxWidth: 720, padding: "0 16px", display: "flex", flexDirection: "column", gap: 20 },
  roomBack: { alignSelf: "flex-start", background: "none", border: "none", color: C.faint, fontSize: 10, letterSpacing: "0.18em", cursor: "pointer", padding: "6px 0", fontFamily: sans },

  roomHeadline: { fontFamily: serif, fontSize: "clamp(19px,3.6vw,25px)", lineHeight: 1.35, letterSpacing: "0.02em", color: C.ivory, margin: 0 },
  roomSub: { fontSize: 13, color: C.muted, lineHeight: 1.6, marginTop: 10 },

  sectionLabel: { fontSize: 9.5, letterSpacing: "0.28em", color: C.brass, marginBottom: 10 },
  panel: { background: C.panel, border: `1px solid ${C.line}`, borderRadius: 4, padding: "16px 18px" },
  panelBrass: { background: C.panel, border: `1px solid ${C.brassDark}`, borderRadius: 4, padding: "16px 18px" },
  smallPrint: { fontSize: 10.5, color: C.fainter, lineHeight: 1.6, marginTop: 10 },

  rankRow: { display: "grid", gridTemplateColumns: "auto 1fr", gap: "0 16px", padding: "13px 0", borderTop: `1px solid ${C.line}` },
  rankName: { fontFamily: serif, fontSize: 13, letterSpacing: "0.16em", color: C.brass, whiteSpace: "nowrap" },
  rankCap: { fontFamily: sans, fontSize: 9, letterSpacing: "0.14em", color: C.fainter, marginTop: 4 },
  rankAdmission: { fontSize: 12.5, color: C.ivory, lineHeight: 1.5 },
  rankAccess: { fontSize: 11.5, color: C.muted, marginTop: 5, lineHeight: 1.65 },

  barGroupLabel: { fontSize: 11, color: C.faint, letterSpacing: "0.04em", marginBottom: 6 },
  barItem: { fontSize: 12.5, color: C.ivory, lineHeight: 1.6, paddingLeft: 14, position: "relative" },
  barTerms: { display: "flex", flexWrap: "wrap", gap: "6px 10px", marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.lineWarm}` },
  barTerm: { fontSize: 10.5, letterSpacing: "0.1em", color: C.brass, border: `1px solid ${C.lineWarm}`, borderRadius: 2, padding: "5px 9px" },

  stepRow: { display: "flex", gap: 6, marginBottom: 16, flexWrap: "wrap" },
  stepPip: { flex: "1 1 60px", height: 2, background: C.line },
  stepPipDone: { background: C.brass },
  stepTitle: { fontFamily: serif, fontSize: 16, letterSpacing: "0.08em", color: C.ivory },
  stepCount: { fontSize: 9.5, letterSpacing: "0.2em", color: C.faint, marginBottom: 6 },
  field: { display: "block", marginTop: 12 },
  fieldLabel: { display: "block", fontSize: 10.5, letterSpacing: "0.12em", color: C.faint, marginBottom: 6 },
  radioRow: { display: "flex", alignItems: "flex-start", gap: 9, padding: "7px 0", fontSize: 12.5, color: C.ivory, cursor: "pointer", lineHeight: 1.5 },
  select: { width: "100%", background: C.ink, border: `1px solid ${C.lineWarm}`, borderRadius: 3, color: C.ivory, padding: "9px 10px", fontSize: 13, fontFamily: sans },
  input: { width: "100%", background: C.ink, border: `1px solid ${C.lineWarm}`, borderRadius: 3, color: C.ivory, padding: "9px 10px", fontSize: 13, fontFamily: sans },
  contributionPrompt: { fontFamily: serif, fontSize: "clamp(17px,3.2vw,21px)", lineHeight: 1.4, color: C.ivory, marginBottom: 10 },
  charCount: { fontSize: 10, color: C.fainter, textAlign: "right", marginTop: 5, letterSpacing: "0.08em" },
  stepNav: { display: "flex", justifyContent: "space-between", gap: 10, marginTop: 20 },
  btnGhost: { background: "none", border: `1px solid ${C.lineMuted}`, color: C.faint, fontSize: 10.5, letterSpacing: "0.16em", cursor: "pointer", padding: "10px 16px", borderRadius: 3, fontFamily: sans },
  btnBrass: { background: `linear-gradient(180deg,${C.brassLight} 0%,${C.brass} 45%,${C.brassDark} 100%)`, border: "1px solid #71581f", color: "#241a08", fontFamily: serif, fontSize: 11.5, letterSpacing: "0.14em", cursor: "pointer", padding: "10px 18px", borderRadius: 3 },

  ledgerGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(128px,1fr))", gap: 14, marginTop: 4 },
  ledgerCell: {},
  ledgerVal: { fontFamily: serif, fontSize: 22, color: C.brass, lineHeight: 1.1 },
  ledgerKey: { fontSize: 9.5, letterSpacing: "0.14em", color: C.faint, marginTop: 5, lineHeight: 1.5 },

  intentGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 10 },
  intentCard: { background: C.panel, border: `1px solid ${C.line}`, borderRadius: 4, padding: "13px 14px", display: "flex", flexDirection: "column", gap: 9 },
  intentKind: { fontSize: 9.5, letterSpacing: "0.18em", color: C.brass },
  intentBody: { fontSize: 12.5, color: C.ivory, lineHeight: 1.55, flex: 1 },
  intentBtn: { background: "none", border: `1px solid ${C.brassDark}`, color: C.brass, fontSize: 9.5, letterSpacing: "0.14em", padding: "8px 10px", borderRadius: 2, cursor: "not-allowed", opacity: 0.75, fontFamily: sans, display: "flex", alignItems: "center", justifyContent: "center", gap: 6 },

  summitStrip: { background: "linear-gradient(180deg,#1a140e 0%,#100c08 100%)", border: `1px solid ${C.lineWarm}`, borderRadius: 4, padding: "16px 18px", display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap" },
  summitName: { fontFamily: serif, fontSize: 14, letterSpacing: "0.18em", color: C.ivory },
  summitMeta: { fontSize: 9.5, letterSpacing: "0.18em", color: C.brass, marginTop: 6 },

  receiptWrap: { textAlign: "center", padding: "34px 12px" },
  receiptHead: { fontFamily: serif, fontSize: "clamp(20px,3.6vw,26px)", letterSpacing: "0.06em", color: C.ivory },
  receiptBody: { fontSize: 13, color: C.muted, lineHeight: 1.7, maxWidth: 400, margin: "14px auto 0" },

  // ---- The Pledge --------------------------------------------------------
  pledgeWrap: { width: "100%", maxWidth: 720, padding: "0 16px", display: "flex", flexDirection: "column", gap: 26 },
  pledgeHead: { textAlign: "center", padding: "6px 0 2px" },
  pledgeTitle: { fontFamily: serif, fontSize: "clamp(22px,4.6vw,32px)", letterSpacing: "0.14em", color: C.ivory, margin: 0 },
  pledgeIntro: { fontSize: 12, color: C.faint, lineHeight: 1.7, maxWidth: 430, margin: "12px auto 0" },

  article: { display: "grid", gridTemplateColumns: "34px 1fr", gap: "0 14px", padding: "16px 0", borderTop: `1px solid ${C.line}` },
  articleNum: { fontFamily: serif, fontSize: 15, color: C.brass, letterSpacing: "0.06em", paddingTop: 1 },
  articleHeading: { fontFamily: serif, fontSize: 14.5, color: C.ivory, letterSpacing: "0.04em", marginBottom: 6 },
  articleBody: { fontSize: 13, color: C.muted, lineHeight: 1.72 },

  assentBox: { display: "flex", alignItems: "flex-start", gap: 11, padding: "16px 0 4px", fontSize: 12.5, color: C.ivory, cursor: "pointer", lineHeight: 1.55 },
  signRow: { display: "flex", gap: 10, alignItems: "stretch", marginTop: 12, flexWrap: "wrap" },
  signInput: { flex: "1 1 220px", background: C.ink, border: `1px solid ${C.lineWarm}`, borderRadius: 3, color: C.ivory, padding: "11px 13px", fontSize: 15, fontFamily: serif, letterSpacing: "0.05em" },

  sealWrap: { textAlign: "center", padding: "26px 12px 8px" },
  sealName: { fontFamily: serif, fontSize: "clamp(20px,4vw,28px)", color: C.ivory, letterSpacing: "0.06em", borderBottom: `1px solid ${C.lineWarm}`, paddingBottom: 12, display: "inline-block", minWidth: 220 },
  sealMeta: { fontSize: 9.5, letterSpacing: "0.22em", color: C.brass, marginTop: 14 },

  cohortBand: { background: "linear-gradient(180deg,#1a140e 0%,#100c08 100%)", border: `1px solid ${C.lineWarm}`, borderRadius: 4, padding: "22px 20px" },
  cohortTitle: { fontFamily: serif, fontSize: 15, letterSpacing: "0.2em", color: C.ivory },
  cohortYear: { fontFamily: serif, fontSize: 15, color: C.brass, letterSpacing: "0.2em" },
  cohortBody: { fontSize: 12.5, color: C.muted, lineHeight: 1.7, marginTop: 12, maxWidth: 470 },

  voiceRow: { display: "flex", justifyContent: "center", gap: 8, marginBottom: 4, padding: "0 16px" },
  voiceBtn: { display: "inline-flex", alignItems: "center", gap: 7, background: "none", border: `1px solid ${C.lineMuted}`, color: C.faint, fontSize: 10, letterSpacing: "0.18em", cursor: "pointer", padding: "6px 12px", borderRadius: 3, fontFamily: sans },
  voiceBtnOn: { border: `1px solid ${C.brass}`, color: C.ivory, background: C.panelRaised },
  voiceBtnOff: { opacity: 0.45, cursor: "not-allowed" },
  msgSpeak: { background: "none", border: "none", color: C.brass, cursor: "pointer", padding: "2px 4px", marginLeft: 6, fontSize: 11, lineHeight: 1, opacity: 0.65, fontFamily: sans },

  footer: { textAlign: "center", fontSize: 10, color: C.fainter, marginTop: 12, letterSpacing: "0.06em", lineHeight: 1.6 },
};
