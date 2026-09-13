/* ==========================================================================
   Vibes · Mobile — frame.js
   Shared desktop "phone frame" wiring used by index.html and app.html.
   On viewports ≥ 900px the mobile layout is presented inside a device
   bezel; all scrolling then happens inside .device__screen.
   Opt-out: ?noframe=1
   ========================================================================== */
(function () {
  "use strict";

  const html = document.documentElement;
  const wide = window.matchMedia("(min-width: 900px)");
  const noFrame = new URLSearchParams(location.search).has("noframe");
  const screenEl = document.querySelector(".device__screen");

  function isFramed() { return html.classList.contains("framed"); }

  function syncVars() {
    if (!isFramed() || !screenEl) return;
    const r = screenEl.getBoundingClientRect();
    const s = html.style;
    s.setProperty("--frame-top", r.top + "px");
    s.setProperty("--frame-left", r.left + "px");
    s.setProperty("--frame-w", r.width + "px");
    s.setProperty("--frame-h", r.height + "px");
  }

  function syncMode() {
    html.classList.toggle("framed", wide.matches && !noFrame && !!screenEl);
    requestAnimationFrame(() => {
      syncVars();
      document.dispatchEvent(new CustomEvent("vibes:frame"));
    });
  }

  function scrollY() { return isFramed() && screenEl ? screenEl.scrollTop : window.scrollY; }
  function scroller() { return isFramed() && screenEl ? screenEl : document.scrollingElement; }

  wide.addEventListener("change", syncMode);
  window.addEventListener("resize", syncVars);
  window.addEventListener("orientationchange", syncVars);
  syncMode();

  window.VibesFrame = { isFramed, syncVars, syncMode, scrollY, scroller, screenEl };
})();
