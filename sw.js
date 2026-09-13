/* ==========================================================================
   Vibes · Mobile — sw.js
   Network-first service worker with an offline cache fallback, so the
   installed app keeps working without a connection.
   ========================================================================== */
const CACHE = "vibes-mobile-v1";

const CORE = [
  "./",
  "./index.html",
  "./app.html",
  "./manifest.webmanifest",
  "./css/base.css",
  "./css/landing.css",
  "./css/app.css",
  "./js/i18n.js",
  "./js/frame.js",
  "./js/main.js",
  "./js/app.js",
  "./images/icon-192.png",
  "./images/hero.jpg",
  "./images/feed-1.jpg",
  "./images/feed-2.jpg",
  "./images/feed-3.jpg",
  "./images/feed-4.jpg",
  "./images/ingredients.jpg",
  "./images/timeline.jpg",
  "./images/workflows.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(CORE)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET" || !req.url.startsWith(self.location.origin)) return;

  event.respondWith(
    fetch(req)
      .then((res) => {
        if (res && res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then((cache) => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then((hit) => {
          if (hit) return hit;
          if (req.mode === "navigate") return caches.match("./index.html");
          return Response.error();
        })
      )
  );
});
