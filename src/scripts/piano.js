// Save this as src/scripts/piano-analytics.js
window.pdl = window.pdl || {};
window.pdl.requireConsent = "v2";
window.pdl.consent = {
  defaultPreset: {
    PA: "exempt",
  },
};
window.pdl.consent.products = ["PA"];

window._pac = window._pac || {};
window._pac.cookieDomain = ".localhost:3000";

// Initialize Piano Analytics
const initPianoAnalytics = () => {
  pa.setConfigurations({
    site: 641819,
    collectDomain: "gqjbcfz.pa-cd.com",
  });
  pa.consent.setMode("exempt");
  // pa.privacy.setMode("{{consent}}");
};
