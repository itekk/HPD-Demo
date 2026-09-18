/**
 * HPD Demo - page behaviour.
 *
 * Structure: one small module per feature, wired up in init() at the bottom.
 * No frameworks and no external dependencies.
 */

const THEME_STORAGE_KEY = 'hpd-demo-theme';
const COUNTER_DURATION_MS = 1200;

/* ============================================================
   Theme
   ============================================================ */

/**
 * Apply a theme to the document and sync the toggle button state.
 *
 * @param {'light' | 'dark'} theme - Theme to apply.
 * @returns {void}
 */
function applyTheme(theme) {
  const toggle = document.querySelector('#themeToggle');
  const isDark = theme === 'dark';

  document.documentElement.dataset.theme = theme;

  if (toggle) {
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Switch to light theme' : 'Switch to dark theme');
    const icon = toggle.querySelector('.theme-toggle__icon');
    if (icon) {
      icon.textContent = isDark ? '☀' : '☾';
    }
  }
}

/**
 * Read the saved theme, falling back to the operating system preference.
 *
 * @returns {'light' | 'dark'} The theme to start with.
 */
function getPreferredTheme() {
  let saved = null;

  try {
    saved = window.localStorage.getItem(THEME_STORAGE_KEY);
  } catch (error) {
    // Storage can be unavailable in private browsing; the default is fine.
    saved = null;
  }

  if (saved === 'light' || saved === 'dark') {
    return saved;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

/**
 * Wire up the theme toggle button.
 *
 * @returns {void}
 */
function initThemeToggle() {
  const toggle = document.querySelector('#themeToggle');

  applyTheme(getPreferredTheme());

  if (!toggle) {
    return;
  }

  toggle.addEventListener('click', () => {
    const nextTheme = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);

    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
    } catch (error) {
      // Nothing to do; the choice simply will not persist.
    }
  });
}

/* ============================================================
   Stat counters
   ============================================================ */

/**
 * Animate a single element from zero to its target value.
 *
 * @param {HTMLElement} element - Element carrying a data-count-to attribute.
 * @returns {void}
 */
function animateCount(element) {
  const target = Number(element.dataset.countTo);

  if (Number.isNaN(target)) {
    return;
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion || target === 0) {
    element.textContent = String(target);
    return;
  }

  const startTime = performance.now();

  /**
   * Advance the counter on each animation frame.
   *
   * @param {number} now - Current timestamp supplied by requestAnimationFrame.
   * @returns {void}
   */
  function step(now) {
    const progress = Math.min((now - startTime) / COUNTER_DURATION_MS, 1);
    element.textContent = String(Math.round(target * progress));

    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  }

  window.requestAnimationFrame(step);
}

/**
 * Start the stat counters once the stats section scrolls into view.
 *
 * @returns {void}
 */
function initStatCounters() {
  const counters = document.querySelectorAll('[data-count-to]');

  if (counters.length === 0) {
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });

  counters.forEach((counter) => observer.observe(counter));
}

/* ============================================================
   Contact form
   ============================================================ */

/**
 * Validate the contact form fields.
 *
 * @param {HTMLFormElement} form - The contact form.
 * @returns {string} An error message, or an empty string when the form is valid.
 */
function validateContactForm(form) {
  const name = form.elements.name.value.trim();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (name === '' || email === '' || message === '') {
    return 'Please fill in every field.';
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return 'Please enter a valid email address.';
  }

  return '';
}

/**
 * Handle contact form submission locally; nothing is sent anywhere.
 *
 * @returns {void}
 */
function initContactForm() {
  const form = document.querySelector('#contactForm');
  const status = document.querySelector('#formStatus');

  if (!form || !status) {
    return;
  }

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const error = validateContactForm(form);

    if (error !== '') {
      status.textContent = error;
      status.className = 'form__status form__status--error';
      return;
    }

    status.textContent = 'Thanks! This is a demo, so your message was not sent anywhere.';
    status.className = 'form__status form__status--success';
    form.reset();
  });
}

/* ============================================================
   Bootstrap
   ============================================================ */

/**
 * Initialise every feature on the page.
 *
 * @returns {void}
 */
function init() {
  initThemeToggle();
  initStatCounters();
  initContactForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
