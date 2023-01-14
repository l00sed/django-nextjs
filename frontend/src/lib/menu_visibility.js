/* Cookies */
import Cookies from 'universal-cookie';
import menu_overlay_styles from '../styles/MenuOverlay.module.css'

const cookies = new Cookies();

/* Toggle show/hide the menu */
export const menuVisibility = () => {
  let defaultVisibility = false;
  let currentVisibility = cookies.get('menuVisibility');
  if (currentVisibility == null) {
    currentVisibility = defaultVisibility;
    cookies.set('menuVisibility', currentVisibility, { path: '/' });
    return currentVisibility;
  } else {
    return currentVisibility;
  }
}

/* Toggle show/hide the menu */
export const toggleMenuVisibility = () => {
  let currentVisibility = menuVisibility();
  if (currentVisibility === false) {
    cookies.set('menuVisibility', true, { path: '/' });
  } else {
    cookies.set('menuVisibility', false, { path: '/' });
  }
  if (typeof window !== 'undefined') {
    if (document.getElementById('menu-overlay')) {
      document.getElementById('menu-overlay').classList.toggle(menu_overlay_styles.open);
    }
  }
}
