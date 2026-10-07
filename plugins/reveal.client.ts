// Scroll-reveal for elements marked with data-aos (optional data-aos-delay in ms).
// IntersectionObserver tracks real positions, so lazy-loaded images shifting the
// layout can never leave content stuck invisible. Without JS, or with reduced
// motion, nothing is hidden at all.
export default defineNuxtPlugin((nuxtApp) => {
  if (!("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const root = document.documentElement;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        const delay = Number(el.dataset.aosDelay);
        if (delay) el.style.transitionDelay = `${Math.min(delay, 400)}ms`;
        el.classList.add("is-revealed");
        io.unobserve(el);
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.01 }
  );

  const scan = () => {
    document.querySelectorAll<HTMLElement>("[data-aos]:not(.is-revealed)").forEach((el) => io.observe(el));
  };

  // Pick up content rendered later (route changes, filters, v-if blocks).
  let queued = false;
  const queueScan = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => {
      queued = false;
      scan();
    });
  };

  nuxtApp.hook("app:mounted", () => {
    root.classList.add("reveal-ready");
    scan();
    new MutationObserver(queueScan).observe(document.body, { childList: true, subtree: true });
  });
  nuxtApp.hook("page:finish", queueScan);
});
