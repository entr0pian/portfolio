// Click-to-load YouTube: the page shows a local poster until the visitor
// presses play, so no YouTube scripts or cookies load before that. Without JS
// the poster is a plain link to the video.
document.querySelectorAll(".video[data-video-id]").forEach((box) => {
  const facade = box.querySelector(".video-facade");
  facade.addEventListener("click", (event) => {
    event.preventDefault();
    const iframe = document.createElement("iframe");
    iframe.src = `https://www.youtube-nocookie.com/embed/${box.dataset.videoId}?autoplay=1&rel=0`;
    iframe.title = facade.getAttribute("aria-label") || "Video";
    iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture";
    iframe.allowFullscreen = true;
    box.replaceChildren(iframe);
  });
});

// View demo: is the live platform up? Its clusters only run while it's being
// worked on. Online only if Backstage's own icon loads within the timeout: DNS
// failure (torn down), the load balancer's 503 page (starting up) and a hang all
// read as offline, so a visitor is never sent to an error page. Without JS the
// button stays a plain link with a "may be offline" bubble.
const live = document.querySelector(".live");
if (live) {
  const link = live.querySelector("a");
  const probe = (timeoutMs = 4000) => new Promise((resolve) => {
    const img = new Image();
    const done = (ok) => { clearTimeout(timer); img.onload = img.onerror = null; resolve(ok); };
    const timer = setTimeout(() => done(false), timeoutMs);
    img.onload = () => done(true);
    img.onerror = () => done(false);
    img.src = `https://platform.gerodimos.dev/favicon.svg?t=${Date.now()}`;  // never a cached copy
  });
  let pending = null;
  const check = async () => {
    if (pending) return pending;
    if (live.dataset.live === "unknown") live.dataset.live = "checking";  // first check only: re-checks don't flicker
    pending = probe();
    const ok = await pending;
    pending = null;
    live.dataset.live = ok ? "online" : "offline";
    if (ok) live.classList.remove("pinned");
    return ok;
  };
  check();
  // Re-check every minute while the tab is visible, so it turns green on its
  // own when the platform comes up.
  setInterval(() => { if (document.visibilityState === "visible") check(); }, 60000);

  // Online: a normal link. Checking: wait for the answer. Offline: stay on the
  // page and pin the bubble open, the only way to read it on a touch screen.
  link.addEventListener("click", async (event) => {
    if (live.dataset.live === "online") return;
    event.preventDefault();
    if (pending && await pending) { location.href = link.href; return; }
    live.classList.toggle("pinned");
  });
  document.addEventListener("click", (event) => { if (!live.contains(event.target)) live.classList.remove("pinned"); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") live.classList.remove("pinned"); });
}

// The hero's reconciliation loop animates with SMIL, which CSS media queries
// can't stop: pause it for visitors who asked for reduced motion.
if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.querySelectorAll(".hero-visual svg").forEach((svg) => svg.pauseAnimations());
}
