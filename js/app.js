/* ==========================================================================
   Vibes · Mobile — app.js (interactive app mock)
   Tabs, snapping feed, like/remix/share, simulated generation,
   projects, profile switches, toasts.
   Requires js/frame.js and js/i18n.js.
   ========================================================================== */
(function () {
  "use strict";

  const $ = (s, r) => (r || document).querySelector(s);
  const $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const t = (k) => window.VibesI18N.t(k);

  const feed = $("#feed");
  const screenEl = window.VibesFrame ? VibesFrame.screenEl : null;

  /* ---------- Tabs ---------- */
  const tabs = $$(".tab");
  const screens = $$(".screen");
  function showTab(name) {
    tabs.forEach((b) => b.setAttribute("aria-selected", String(b.dataset.tab === name)));
    screens.forEach((s) => s.classList.toggle("is-active", s.dataset.screen === name));
  }
  tabs.forEach((b) => b.addEventListener("click", () => showTab(b.dataset.tab)));

  /* ---------- Toast ---------- */
  const toast = $("#toast");
  let toastTimer = 0;
  function say(msg) {
    toast.textContent = msg;
    toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-on"), 2200);
  }

  /* ---------- Feed scope (For you / Following) ---------- */
  const FOLLOWING = new Set(["mira", "petal", "you"]);
  $$("[data-feed-scope]").forEach((btn) =>
    btn.addEventListener("click", () => {
      $$("[data-feed-scope]").forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));
      const following = btn.dataset.feedScope === "following";
      $$(".vibe", feed).forEach((v) => {
        v.style.display = !following || FOLLOWING.has(v.dataset.author) ? "" : "none";
      });
      feed.scrollTop = 0;
    })
  );

  /* ---------- Feed actions (event delegation) ---------- */
  function fmt(n) {
    return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
  }
  function toggleLike(btn) {
    const on = btn.classList.toggle("is-liked");
    let n = parseInt(btn.dataset.count, 10) || 0;
    n += on ? 1 : -1;
    btn.dataset.count = String(n);
    btn.querySelector(".cnt").textContent = fmt(n);
  }

  feed.addEventListener("click", (e) => {
    const like = e.target.closest(".act-like");
    if (like) { toggleLike(like); return; }

    const remix = e.target.closest(".act-remix");
    if (remix) {
      const card = remix.closest(".vibe");
      const promptEl = $("#prompt");
      promptEl.value = card.querySelector(".vibe__prompt").textContent;
      showTab("create");
      say(t("toast.remix"));
      return;
    }

    const share = e.target.closest(".act-share");
    if (share) {
      const url = location.href;
      if (navigator.share) {
        navigator.share({ title: document.title, url }).catch(() => {});
      } else if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(url).then(() => say(t("toast.share")), () => say(t("toast.share")));
      } else {
        say(t("toast.share"));
      }
    }
  });

  /* ---------- Create: single-select chip groups ---------- */
  function singleSelect(selector) {
    $$(selector).forEach((ch) =>
      ch.addEventListener("click", () => {
        $$(selector).forEach((c) => c.setAttribute("aria-pressed", String(c === ch)));
      })
    );
  }
  singleSelect("[data-style]");
  singleSelect("[data-ratio]");

  $$(".tool").forEach((b) =>
    b.addEventListener("click", () =>
      b.setAttribute("aria-pressed", String(b.getAttribute("aria-pressed") !== "true"))
    )
  );

  $$("[data-spark]").forEach((b) =>
    b.addEventListener("click", () => { $("#prompt").value = t(b.dataset.spark); })
  );

  /* ---------- Simulated generation ---------- */
  const STYLE_IMG = {
    cinematic: "images/feed-1.jpg",
    anime: "images/feed-2.jpg",
    retro: "images/feed-3.jpg",
    clay: "images/feed-4.jpg",
    water: "images/feed-4.jpg"
  };
  const genBtn = $("#generateBtn");
  const overlay = $("#genOverlay");
  const stepEl = $("#genStep");
  const barEl = $("#genBar");
  const pctEl = $("#genPct");
  let busy = false;

  function addVibe(text, style) {
    const art = document.createElement("article");
    art.className = "vibe";
    art.dataset.author = "you";
    art.innerHTML =
      '<div class="vibe__card is-new">' +
      '  <span class="vibe__badge" data-i18n="style.' + style + '"></span>' +
      '  <img src="' + STYLE_IMG[style] + '" alt="" />' +
      '  <div class="vibe__meta">' +
      '    <div><p class="who"><i aria-hidden="true"></i>@you</p><p class="vibe__prompt"></p></div>' +
      "  </div>" +
      "</div>";
    const actions = feed.querySelector(".vibe__actions");
    if (actions) {
      const clone = actions.cloneNode(true);
      clone.querySelectorAll(".is-liked").forEach((n) => n.classList.remove("is-liked"));
      const likeBtn = clone.querySelector(".act-like");
      if (likeBtn) { likeBtn.dataset.count = "1"; likeBtn.querySelector(".cnt").textContent = "1"; }
      art.querySelector(".vibe__meta > div").after(clone);
    }
    art.querySelector(".vibe__prompt").textContent = text;
    feed.prepend(art);
  }

  genBtn.addEventListener("click", () => {
    if (busy) return;
    const promptEl = $("#prompt");
    let text = promptEl.value.trim();
    if (!text) {
      const sparks = ["create.spark1", "create.spark2", "create.spark3"];
      text = t(sparks[Math.floor(Math.random() * sparks.length)]);
      promptEl.value = text;
    }
    const styleBtn = $('[data-style][aria-pressed="true"]');
    const style = styleBtn ? styleBtn.dataset.style : "cinematic";

    busy = true;
    genBtn.disabled = true;
    genBtn.textContent = t("create.genBusy");
    overlay.hidden = false;

    const steps = [t("create.s1"), t("create.s2"), t("create.s3")];
    stepEl.textContent = steps[0];
    barEl.style.width = "0%";
    pctEl.textContent = "0%";

    let p = 0;
    const iv = setInterval(() => {
      p = Math.min(100, p + 3 + Math.random() * 8);
      barEl.style.width = p + "%";
      pctEl.textContent = Math.round(p) + "%";
      stepEl.textContent = steps[Math.min(steps.length - 1, Math.floor(p / 34))];
      if (p >= 100) {
        clearInterval(iv);
        setTimeout(() => {
          overlay.hidden = true;
          busy = false;
          genBtn.disabled = false;
          addVibe(text, style);
          showTab("feed");
          feed.scrollTop = 0;
          say(t("create.result"));
        }, 280);
      }
    }, 90);
  });

  /* ---------- Projects ---------- */
  const projList = $("#projList");
  let newCount = 0;
  $("#newProject").addEventListener("click", () => {
    newCount += 1;
    const el = document.createElement("button");
    el.type = "button";
    el.className = "proj is-new";
    el.innerHTML =
      '<img class="proj__thumb" src="images/feed-3.jpg" width="64" height="64" alt="" />' +
      '<span class="proj__txt"><b></b><small></small></span>' +
      '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';
    el.querySelector("b").textContent = t("projects.untitled") + " " + newCount;
    el.querySelector("small").textContent = t("projects.newMeta");
    projList.prepend(el);
    say(t("toast.project"));
  });

  /* ---------- Profile ---------- */
  let deferredInstall = null;
  window.addEventListener("beforeinstallprompt", (e) => { e.preventDefault(); deferredInstall = e; });

  $("#installBtn").addEventListener("click", async () => {
    if (deferredInstall) {
      deferredInstall.prompt();
      try { await deferredInstall.userChoice; } catch (e) { /* ignore */ }
      deferredInstall = null;
    } else {
      say(t("toast.installed"));
    }
  });

  const sw = $("#offlineSwitch");
  function flip() { sw.setAttribute("aria-checked", String(sw.getAttribute("aria-checked") !== "true")); }
  sw.addEventListener("click", flip);
  sw.addEventListener("keydown", (e) => {
    if (e.key === " " || e.key === "Enter") { e.preventDefault(); flip(); }
  });

  $("#settingsBtn").addEventListener("click", () => say(t("toast.soon")));

  /* ---------- PWA ---------- */
  if ("serviceWorker" in navigator && /^https?:$/.test(location.protocol)) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("sw.js").catch(() => {});
    });
  }
})();
