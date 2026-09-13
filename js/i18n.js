/* ==========================================================================
   Vibes · Mobile — i18n.js
   Tiny EN/PL dictionary + applier.
   Usage in HTML:
     <h1 data-i18n="hero.title">…</h1>              -> textContent
     <p  data-i18n-html="cookie.text">…</p>         -> innerHTML (trusted strings only)
     <input data-i18n-ph="create.ph">               -> placeholder
     <button data-i18n-aria="topbar.menuAria">      -> aria-label
   Language is stored in localStorage("vibes.lang"); default follows the
   browser (pl* -> Polish, otherwise English).
   ========================================================================== */
(function () {
  "use strict";

  const DICT = {
    en: {
      "doc.title": "Vibes — bring ideas to life with vibes · mobile",
      "doc.desc": "Vibes on your phone: create images and videos from scratch, restyle them, add music, lip sync to songs and more.",

      "skip": "Skip to content",
      "topbar.menuAria": "Open menu",

      "hero.kicker": "Mobile experience",
      "hero.title": 'Bring ideas to life with <span class="grad-text">vibes</span>',
      "hero.sub": "Create images and videos from scratch, restyle them, add music, lip sync to songs and more.",
      "hero.ctaDownload": "Download app",
      "hero.ctaLogin": "Log in",
      "hero.chip1": "Image → video",
      "hero.chip2": "Lip sync",
      "hero.chip3": "Add music",
      "hero.scroll": "Scroll",

      "rail.label": "Fresh from the community",
      "rail.title": "Community gallery",
      "rail.hint": "Swipe to explore",
      "rail.c1.t": "Bioluminescent jellyfish over neon Tokyo",
      "rail.c2.t": "Astronaut kitten in a pastel nebula",
      "rail.c3.t": "Chrome coupe, sunset highway",
      "rail.c4.t": "Crystal bloom, macro",
      "rail.tagVideo": "Video",
      "rail.tagImage": "Image",

      "f1.label": "Ingredients",
      "f1.title": "Create and reuse ingredients",
      "f1.text": "Match the look and feel of any image or video by referencing the style, character or object. Turn references into reusable ingredients for a consistent story.",
      "f1.chip1": "Style match",
      "f1.chip2": "Characters",
      "f1.chip3": "Objects",
      "f1.chip4": "Reusable",

      "f2.label": "Timeline",
      "f2.title": "Get more precision and control",
      "f2.text": "Realize your vision by creating cinematic media and stitching together images, videos, text, music, voiceover and more.",
      "f2.chip1": "Images",
      "f2.chip2": "Video",
      "f2.chip3": "Text",
      "f2.chip4": "Music",
      "f2.chip5": "Voiceover",

      "f3.label": "Workflows",
      "f3.title": "Streamline your workflows",
      "f3.text": "Use tools built for creators, with creators. Optimize your workflow with a projects-based layout. Once you’re ready, share your creations on the Vibes app.",
      "f3.chip1": "Projects",
      "f3.chip2": "Sharing",
      "f3.chip3": "Creator tools",

      "perks.label": "Built for phones",
      "perks.title": "A mobile experience, not a shrunken site",
      "perks.sub": "Every screen is designed thumb-first: reachable controls, native gestures and zero hover-only tricks.",
      "perks.p1t": "One-thumb reach",
      "perks.p1d": "Primary actions live in the thumb zone — a bottom bar and generous 48 px touch targets.",
      "perks.p2t": "Swipe-native",
      "perks.p2d": "Feeds and carousels use native scroll snapping with momentum; nothing depends on hover.",
      "perks.p3t": "Installable",
      "perks.p3d": "Add Vibes to your home screen for a full-screen, app-like experience — it even works offline.",
      "perks.p4t": "Notch-aware",
      "perks.p4d": "Layout respects safe-area insets, notches and rotates gracefully to landscape.",

      "demo.label": "Live demo",
      "demo.title": "Try the mobile app right now",
      "demo.text": "An interactive mock of the Vibes app: a snapping feed, a create screen with a simulated render, projects and a profile — all in your browser.",
      "demo.cta": "Open app demo",

      "cta.title": "Welcome to Vibes.ai",
      "cta.sub": "Your pocket studio for images, video and sound.",
      "cta.btn": "Download app",
      "cta.stores": "iOS · Android · Web",

      "dock.btn": "Download app",
      "dock.note": "Free",

      "cookie.text": 'We use cookies that are essential to operate and provide our services. Learn more about our <a href="#" rel="noopener">Cookies Notice</a>.',
      "cookie.btn": "Continue",

      "menu.langLabel": "Language",
      "menu.login": "Log in",
      "menu.download": "Download app",

      "footer.privacy": "Privacy",
      "footer.terms": "Terms",
      "footer.cookies": "Cookies",
      "footer.help": "Help",
      "footer.note": "Unofficial mobile concept of vibes.ai built as a demo. Not affiliated with Meta.",
      "footer.rights": "© 2026 Vibes. All rights reserved.",

      /* ---- app.html ---- */
      "app.doc.title": "Vibes app — mobile demo",
      "app.back": "Back to site",
      "tab.feed": "Feed",
      "tab.create": "Create",
      "tab.projects": "Projects",
      "tab.profile": "Profile",
      "feed.forYou": "For you",
      "feed.following": "Following",
      "act.remix": "Remix",
      "act.like": "Like",
      "act.share": "Share",
      "act.sound": "Original sound",
      "feed.demoNote": "Demo interface — generation is simulated.",

      "create.title": "What are you creating today?",
      "create.ph": "Describe a scene, a character, a feeling…",
      "create.styles": "Style",
      "create.ratio": "Format",
      "create.tools": "Add to your vibe",
      "tool.ingredient": "Ingredient",
      "tool.music": "Music",
      "tool.lipsync": "Lip sync",
      "tool.voice": "Voiceover",
      "create.sparks": "Need a spark?",
      "create.gen": "Generate",
      "create.genBusy": "Generating…",
      "create.eta": "Rendered on-device in seconds",
      "create.s1": "Dreaming up frames…",
      "create.s2": "Color-grading the light…",
      "create.s3": "Mixing sound & motion…",
      "create.result": "Added to your feed",
      "create.again": "Remix again",
      "style.cinematic": "Cinematic",
      "style.anime": "Anime",
      "style.retro": "Retro VHS",
      "style.clay": "Claymation",
      "style.water": "Watercolor",

      "projects.title": "Projects",
      "projects.new": "New project",
      "projects.meta1": "12 items · edited 2 h ago",
      "projects.meta2": "8 items · edited yesterday",
      "projects.meta3": "21 items · edited 3 d ago",
      "projects.meta4": "5 items · draft",
      "projects.newMeta": "0 items · just now",

      "profile.name": "@you",
      "profile.handle": "Vibes creator · Kraków",
      "profile.s1": "Creations",
      "profile.s2": "Followers",
      "profile.s3": "Ingredients",
      "profile.install": "Add to home screen",
      "profile.offline": "Offline mode",
      "profile.off": "On",
      "profile.settings": "Settings",
      "profile.lang": "Language",

      "create.spark1": "Neon rain over Tokyo",
      "create.spark2": "Kitten astronaut, pastel nebula",
      "create.spark3": "Crystal flower, macro",
      "pr1": "Neon Tokyo drift",
      "pr2": "Space kitten saga",
      "pr3": "Sunset highway",
      "pr4": "Crystal garden",
      "projects.untitled": "Untitled project",
      "toast.share": "Link copied to clipboard",
      "toast.soon": "Coming soon in this demo",
      "toast.installed": "Install prompt will appear on supported browsers.",
      "toast.project": "Project created",
      "toast.remix": "Prompt copied to Create",
      "toast.lang": "Language: English"
    },

    pl: {
      "doc.title": "Vibes — ożyw pomysły dzięki vibes · mobile",
      "doc.desc": "Vibes na telefonie: twórz obrazy i wideo od zera, zmieniaj ich styl, dodawaj muzykę, synchronizuj ruch warg z piosenkami i nie tylko.",

      "skip": "Przejdź do treści",
      "topbar.menuAria": "Otwórz menu",

      "hero.kicker": "Wersja mobilna",
      "hero.title": 'Ożyw pomysły dzięki <span class="grad-text">vibes</span>',
      "hero.sub": "Twórz obrazy i wideo od zera, zmieniaj ich styl, dodawaj muzykę, synchronizuj ruch warg z piosenkami i nie tylko.",
      "hero.ctaDownload": "Pobierz aplikację",
      "hero.ctaLogin": "Zaloguj się",
      "hero.chip1": "Obraz → wideo",
      "hero.chip2": "Lip sync",
      "hero.chip3": "Dodaj muzykę",
      "hero.scroll": "Przewiń",

      "rail.label": "Świeże od społeczności",
      "rail.title": "Galeria społeczności",
      "rail.hint": "Przesuń, aby przeglądać",
      "rail.c1.t": "Bioluminescencyjne meduzy nad neonowym Tokio",
      "rail.c2.t": "Koci astronauta w pastelowej mgławicy",
      "rail.c3.t": "Chromowe coupé, autostrada o zachodzie słońca",
      "rail.c4.t": "Kryształowy kwiat, ujęcie makro",
      "rail.tagVideo": "Wideo",
      "rail.tagImage": "Obraz",

      "f1.label": "Składniki",
      "f1.title": "Twórz i używaj składników ponownie",
      "f1.text": "Dopasuj wygląd i klimat dowolnego obrazu lub wideo, odwołując się do stylu, postaci lub obiektu. Zamień referencje w wielokrotnego użytku składniki i zachowaj spójność opowieści.",
      "f1.chip1": "Dopasowanie stylu",
      "f1.chip2": "Postacie",
      "f1.chip3": "Obiekty",
      "f1.chip4": "Wielokrotnego użytku",

      "f2.label": "Oś czasu",
      "f2.title": "Więcej precyzji i kontroli",
      "f2.text": "Zrealizuj swoją wizję, tworząc kinowe materiały i łącząc obrazy, wideo, tekst, muzykę, lektora i wiele więcej.",
      "f2.chip1": "Obrazy",
      "f2.chip2": "Wideo",
      "f2.chip3": "Tekst",
      "f2.chip4": "Muzyka",
      "f2.chip5": "Lektor",

      "f3.label": "Procesy",
      "f3.title": "Usprawnij swoje procesy",
      "f3.text": "Korzystaj z narzędzi tworzonych dla twórców i razem z twórcami. Zoptymalizuj pracę dzięki układowi opartemu na projektach. Gdy skończysz, podziel się efektami w aplikacji Vibes.",
      "f3.chip1": "Projekty",
      "f3.chip2": "Udostępnianie",
      "f3.chip3": "Narzędzia twórców",

      "perks.label": "Zbudowane dla telefonów",
      "perks.title": "Mobilne doświadczenie, nie pomniejszona strona",
      "perks.sub": "Każdy ekran projektowany pod kciuk: osiągalne kontrolki, natywne gesty i zero trików tylko z hoverem.",
      "perks.p1t": "W zasięgu kciuka",
      "perks.p1d": "Główne akcje żyją w strefie kciuka — dolny pasek i duże, 48-pikselowe cele dotykowe.",
      "perks.p2t": "Natywnie przewijalne",
      "perks.p2d": "Feed i karuzele korzystają z natywnego scroll-snap z bezwładnością; nic nie zależy od hovera.",
      "perks.p3t": "Do zainstalowania",
      "perks.p3d": "Dodaj Vibes do ekranu głównego, aby uzyskać pełnoekranowy, apkowy wygląd — działa też offline.",
      "perks.p4t": "Świadome wcięcia",
      "perks.p4d": "Układ respektuje safe-area insets, wcięcia ekranu i elegancko obraca się do poziomu.",

      "demo.label": "Demo na żywo",
      "demo.title": "Wypróbuj aplikację mobilną teraz",
      "demo.text": "Interaktywna makieta apki Vibes: przewijany feed, ekran tworzenia z symulowanym renderem, projekty i profil — wszystko w przeglądarce.",
      "demo.cta": "Otwórz demo apki",

      "cta.title": "Witaj w Vibes.ai",
      "cta.sub": "Kieszonkowe studio obrazu, wideo i dźwięku.",
      "cta.btn": "Pobierz aplikację",
      "cta.stores": "iOS · Android · Web",

      "dock.btn": "Pobierz aplikację",
      "dock.note": "Za darmo",

      "cookie.text": 'Używamy plików cookie niezbędnych do działania i świadczenia naszych usług. Więcej w <a href="#" rel="noopener">informacji o plikach cookie</a>.',
      "cookie.btn": "Kontynuuj",

      "menu.langLabel": "Język",
      "menu.login": "Zaloguj się",
      "menu.download": "Pobierz aplikację",

      "footer.privacy": "Prywatność",
      "footer.terms": "Regulamin",
      "footer.cookies": "Cookies",
      "footer.help": "Pomoc",
      "footer.note": "Nieoficjalna mobilna koncepcja vibes.ai zbudowana jako demo. Bez powiązań z Meta.",
      "footer.rights": "© 2026 Vibes. Wszelkie prawa zastrzeżone.",

      /* ---- app.html ---- */
      "app.doc.title": "Aplikacja Vibes — demo mobilne",
      "app.back": "Wróć do strony",
      "tab.feed": "Feed",
      "tab.create": "Twórz",
      "tab.projects": "Projekty",
      "tab.profile": "Profil",
      "feed.forYou": "Dla Ciebie",
      "feed.following": "Obserwowani",
      "act.remix": "Remiks",
      "act.like": "Polub",
      "act.share": "Udostępnij",
      "act.sound": "Oryginalny dźwięk",
      "feed.demoNote": "Interfejs demo — generowanie jest symulowane.",

      "create.title": "Co dziś tworzysz?",
      "create.ph": "Opisz scenę, postać, nastrój…",
      "create.styles": "Styl",
      "create.ratio": "Format",
      "create.tools": "Dodaj do swojego vibe’u",
      "tool.ingredient": "Składnik",
      "tool.music": "Muzyka",
      "tool.lipsync": "Lip sync",
      "tool.voice": "Lektor",
      "create.sparks": "Brak iskry?",
      "create.gen": "Generuj",
      "create.genBusy": "Generowanie…",
      "create.eta": "Render na urządzeniu w sekundy",
      "create.s1": "Śnią się klatki…",
      "create.s2": "Korekcja kolorów światła…",
      "create.s3": "Miks dźwięku i ruchu…",
      "create.result": "Dodano do Twojego feedu",
      "create.again": "Remiksuj ponownie",
      "style.cinematic": "Kinowo",
      "style.anime": "Anime",
      "style.retro": "Retro VHS",
      "style.clay": "Plastelina",
      "style.water": "Akwarela",

      "projects.title": "Projekty",
      "projects.new": "Nowy projekt",
      "projects.meta1": "12 elementów · edytowano 2 godz. temu",
      "projects.meta2": "8 elementów · edytowano wczoraj",
      "projects.meta3": "21 elementów · edytowano 3 dni temu",
      "projects.meta4": "5 elementów · szkic",
      "projects.newMeta": "0 elementów · właśnie teraz",

      "profile.name": "@ty",
      "profile.handle": "Twórca Vibes · Kraków",
      "profile.s1": "Twory",
      "profile.s2": "Obserwujący",
      "profile.s3": "Składniki",
      "profile.install": "Dodaj do ekranu głównego",
      "profile.offline": "Tryb offline",
      "profile.off": "Wł.",
      "profile.settings": "Ustawienia",
      "profile.lang": "Język",

      "create.spark1": "Neonowy deszcz nad Tokio",
      "create.spark2": "Koci astronauta, pastelowa mgławica",
      "create.spark3": "Kryształowy kwiat, makro",
      "pr1": "Neonowy dryf po Tokio",
      "pr2": "Saga kosmicznego kociaka",
      "pr3": "Autostrada o zachodzie słońca",
      "pr4": "Kryształowy ogród",
      "projects.untitled": "Projekt bez nazwy",
      "toast.share": "Link skopiowany do schowka",
      "toast.soon": "Wkrótce w tym demo",
      "toast.installed": "Monit instalacji pojawi się we wspieranych przeglądarkach.",
      "toast.project": "Utworzono projekt",
      "toast.remix": "Prompt skopiowany do ekranu Twórz",
      "toast.lang": "Język: polski"
    }
  };

  const KEY = "vibes.lang";

  function detect() {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved && DICT[saved]) return saved;
    } catch (e) { /* private mode */ }
    return (navigator.language || "en").toLowerCase().startsWith("pl") ? "pl" : "en";
  }

  let current = detect();

  function t(key) {
    return (DICT[current] && DICT[current][key]) || DICT.en[key] || key;
  }

  function apply(root) {
    const scope = root || document;
    scope.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.getAttribute("data-i18n"));
    });
    scope.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.getAttribute("data-i18n-html"));
    });
    scope.querySelectorAll("[data-i18n-ph]").forEach((el) => {
      el.setAttribute("placeholder", t(el.getAttribute("data-i18n-ph")));
    });
    scope.querySelectorAll("[data-i18n-aria]").forEach((el) => {
      el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria")));
    });
    document.documentElement.setAttribute("lang", current);
    const titleKey = document.body.dataset.titleKey;
    if (titleKey) document.title = t(titleKey);
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", t("doc.desc"));
    document.querySelectorAll("[data-lang]").forEach((b) => {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-lang") === current));
    });
    document.dispatchEvent(new CustomEvent("vibes:lang", { detail: { lang: current } }));
  }

  function set(lang) {
    if (!DICT[lang] || lang === current) return;
    current = lang;
    try { localStorage.setItem(KEY, lang); } catch (e) { /* ignore */ }
    apply();
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-lang]");
    if (btn) set(btn.getAttribute("data-lang"));
  });

  window.VibesI18N = { get lang() { return current; }, t, set, apply, detect };

  /* Apply as early as possible (script is loaded with defer). */
  apply();
})();
