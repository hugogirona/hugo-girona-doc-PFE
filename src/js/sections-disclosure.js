export const sectionsDisclosure = {
  toggle: null,
  panel: null,

  init() {
    this.toggle = document.querySelector('[data-sections-toggle]');
    this.panel = document.querySelector('[data-sections-panel]');
    if (!this.toggle || !this.panel) return

    this.setOpen(false);
    this.addEventListeners();
  },

  addEventListeners() {
    this.toggle.addEventListener('click', () => {
      this.setOpen(!this.isOpen());
    })

    document.addEventListener('click', (e) => {
      if (
        this.isOpen() &&
        !this.panel.contains(e.target) &&
        !this.toggle.contains(e.target)
      ) {
        this.setOpen(false);
      }
    })

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.setOpen(false);
        this.toggle.focus();
      }
    })
  },

  isOpen() {
    return this.toggle.getAttribute('aria-expanded') === 'true'
  },

  setOpen(open) {
    this.toggle.setAttribute('aria-expanded', String(open));
    this.panel.toggleAttribute('data-open', open);
    this.panel.toggleAttribute('inert', !open);
  },
}
