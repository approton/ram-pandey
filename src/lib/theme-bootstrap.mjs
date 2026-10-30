/** Runs before hydration; local scope also makes repeated evaluation safe in development. */
export const themeBootstrap = `(() => {
  let savedTheme;
  try { savedTheme = localStorage.getItem('ram-theme'); } catch {}
  const useLightTheme = savedTheme === 'light' ||
    (savedTheme !== 'dark' && matchMedia('(prefers-color-scheme: light)').matches);
  document.documentElement.dataset.theme = useLightTheme ? 'light' : 'dark';
})();`;
