(() => {
  const storageKey = 'aanya-portfolio-theme';
  const root = document.documentElement;
  let theme = 'light';

  // Apply a saved choice before rendering; storage may be unavailable in private contexts.
  try {
    const saved = window.localStorage.getItem(storageKey);
    if (saved === 'dark' || saved === 'light') theme = saved;
  } catch { /* The toggle still works without persistent storage. */ }

  function applyTheme(nextTheme) {
    theme = nextTheme;
    root.dataset.theme = theme;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', theme === 'dark' ? '#201b24' : '#392834');
    const button = document.getElementById('theme-toggle');
    if (button) {
      const action = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
      button.setAttribute('aria-label', action);
      button.setAttribute('title', action);
    }
  }

  applyTheme(theme);
  document.addEventListener('DOMContentLoaded', () => {
    applyTheme(theme);
    const button = document.getElementById('theme-toggle');
    if (!button) return;
    button.addEventListener('click', () => {
      applyTheme(theme === 'dark' ? 'light' : 'dark');
      try { window.localStorage.setItem(storageKey, theme); } catch { /* Optional persistence. */ }
    });
  });
})();
