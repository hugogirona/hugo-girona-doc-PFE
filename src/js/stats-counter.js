const DURATION = 1100;
const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export const statsCounter = {
  init() {
    const nums = [...document.querySelectorAll('[data-count]')];
    const gauges = [...document.querySelectorAll('.gauge__fill[data-gauge]')];
    if (!nums.length && !gauges.length) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      this.renderFinal(nums, gauges);
      return;
    }

    this.animateOnVisible(nums, gauges);
  },

  renderFinal(nums, gauges) {
    nums.forEach((el) => { el.textContent = el.dataset.count; });
    this.fillGauges(gauges);
  },

  animateOnVisible(nums, gauges) {
    const panel = nums[0]?.closest('section') || document.body;
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        this.fillGauges(gauges);
        this.rollNumbers(nums);
        obs.disconnect();
      }
    }, { threshold: 0.25 });
    observer.observe(panel);
  },

  fillGauges(gauges) {
    gauges.forEach((g) => {
      const pct = Math.max(0, Math.min(100, Number(g.dataset.gauge) || 0));
      g.style.inset = `0 ${100 - pct}% 0 0`;
    });
  },

  rollNumbers(nums) {
    const targets = nums.map((el) => ({ el, to: parseInt(el.dataset.count, 10) || 0 }));
    targets.forEach(({ el }) => { el.textContent = '0'; });

    const start = performance.now();
    const step = (now) => {
      const progress = Math.min(1, (now - start) / DURATION);
      const eased = easeOutExpo(progress);
      targets.forEach(({ el, to }) => { el.textContent = String(Math.round(to * eased)); });
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  },
};
