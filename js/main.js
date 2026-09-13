/* ==========================================================================
   Vibes · Mobile — main.js (landing page behaviour)
   - sticky top bar state + scroll progress
   - full-screen menu sheet (focus trapped)
   - sticky bottom dock CTA
   - scroll reveals + rail dots
   - cookie sheet
   - PWA service worker registration
   Requires js/frame.js (device bezel) and js/i18n.js.
   ========================================================================== */
(function () {
  "use strict";

  const html = document.documentElement;
  const body = document.body;
  const screenEl = window.VibesFrame ? VibesFrame.screenEl : null;

  /* Shared element refs (read by onScroll). */
  let dock = null;
  let hero = null;

  /* ---------- Top bar + progress + dock ---------- */
  const topbar = document.querySelector(".topbar");
  const progress = document.querySelector(".progress i");

  function onScroll() {
    const framed = VibesFrame.isFramed();
    const y = VibesFrame.scrollY();
    if (topbar) topbar.classList.toggle("is-stuck", y > 8);
    if (progress) {
      const el = VibesFrame.scroller();
      const max = el.scrollHeight - el.clientHeight;
      progress.style.width = (max > 0 ? (y / max) * 100 : 0) + "%";
    }
    if (dock && hero) {
      const heroBottom = framed
        ? hero.offsetTop + hero.offsetHeight
        : hero.getBoundingClientRect().bottom + window.scrollY;
      dock.classList.toggle("is-visible", y > heroBottom - 140);
    }
  }
  function onScrollRaf() { requestAnimationFrame(onScroll); }

  /* ---------- Menu sheet ---------- */
  const sheet = document.getElementById("menuSheet");
  const menuBtn = document.getElementById("menuBtn");
  let lastFocus = null;

  function openSheet() {
    if (!sheet) return;
    lastFocus = document.activeElement;
    sheet.hidden = false;
    requestAnimationFrame(() => sheet.classList.add("is-open"));
    body.style.overflow = "hidden";
    const first = sheet.querySelector("a, button");
    if (first) first.focus();
  }
  function closeSheet() {
    if (!sheet || sheet.hidden) return;
    sheet.classList.remove("is-open");
    body.style.overflow = "";
    setTimeout(() => { sheet.hidden = true; }, 320);
    if (lastFocus) lastFocus.focus();
  }
  if (menuBtn) menuBtn.addEventListener("click", openSheet);
  if (sheet) {
    sheet.addEventListener("click", (e) => {
      if (e.target.closest("a[href^='#']") || e.target.closest("[data-close]")) closeSheet();
    });
    sheet.addEventListener("keydown", (e) => {
      if (e.key === "Escape") { closeSheet(); return; }
      if (e.key !== "Tab") return;
      const items = [...sheet.querySelectorAll("a[href], button:not([disabled])")]
        .filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0], last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) { last.focus(); e.preventDefault(); }
      else if (!e.shiftKey && document.activeElement === last) { first.focus(); e.preventDefault(); }
    });
  }

  /* ---------- Dock + cookie ---------- */
  dock = document.querySelector(".dock");
  hero = document.querySelector(".hero");
  const cookie = document.querySelector(".cookie");

  let cookieSeen = false;
  try { cookieSeen = !!localStorage.getItem("vibes.cookie"); } catch (e) { /* ignore */ }
  if (cookie && !cookieSeen) {
    setTimeout(() => { cookie.classList.add("is-open"); body.classList.add("has-cookie"); }, 1100);
  }
  if (cookie) {
    cookie.addEventListener("click", (e) => {
      if (e.target.closest("[data-cookie-accept]")) {
        cookie.classList.remove("is-open");
        body.classList.remove("has-cookie");
        setTimeout(() => { cookie.hidden = true; }, 450);
        try { localStorage.setItem("vibes.cookie", "1"); } catch (err) { /* ignore */ }
      }
    });
  }

  /* ---------- Reveals ---------- */
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const revealEls = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("is-in"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -6% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  }

  /* ---------- Rail dots ---------- */
  const rail = document.querySelector(".rail");
  const dotsWrap = document.querySelector(".rail-dots");
  if (rail && dotsWrap) {
    const items = [...rail.children];
    dotsWrap.innerHTML = items.map(() => "<i></i>").join("");
    const dots = [...dotsWrap.children];
    const mark = (i) => dots.forEach((d, k) => d.classList.toggle("is-on", k === i));
    mark(0);
    rail.addEventListener("scroll", () => {
      const center = rail.scrollLeft + rail.clientWidth / 2;
      let best = 0, bestDist = Infinity;
      items.forEach((it, i) => {
        const c = it.offsetLeft + it.offsetWidth / 2;
        const d = Math.abs(c - center);
        if (d < bestDist) { bestDist = d; best = i; }
      });
      mark(best);
    }, { passive: true });
  }

  /* ---------- Boot ---------- */
  window.addEventListener("scroll", onScrollRaf, { passive: true });
  if (screenEl) screenEl.addEventListener("scroll", onScrollRaf, { passive: true });
  window.addEventListener("resize", onScrollRaf);
  document.addEventListener("vibes:frame", onScroll);
  onScroll();

  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
