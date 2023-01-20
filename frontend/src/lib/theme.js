/* Cookies */
import Cookies from 'universal-cookie';

const cookies = new Cookies();

/* Get the theme */
export const theme = () => {
  let defaultTheme = 'default';
  let currentTheme = cookies.get('theme');
  if (currentTheme === undefined) {
    currentTheme = defaultTheme;
    cookies.set('theme', currentTheme, { path: '/' });
  }
  return currentTheme;
}

/* Set the theme */
export const setTheme = () => {
  let currentTheme = theme();
  if (currentTheme === 'dark') {
    cookies.set('theme', 'default', { path: '/' });
    toggleTheme();
  } else {
    cookies.set('theme', 'dark', { path: '/' });
    toggleTheme();
  }
}

const toggleTheme = () => {
  if (document.getElementById('theme-root')) {
    document.getElementById('theme-root').classList.toggle('dark');
    document.getElementById('theme-root').classList.toggle('default');
  }
}
