'use client';

/* Next Link */
import Link from 'next/link'
/* Styles */
import menu_overlay_styles from '../styles/MenuOverlay.module.css'
/* Dark Mode */
import DarkModeToggle from './dark_mode_toggle'
/* Menu overlay visibility */
import { toggleMenuVisibility } from '../lib/menu_visibility';

export default function MenuOverlay() {
  return (
    <div id="menu-overlay" className={ `${menu_overlay_styles.menu_overlay}` }>
      <div className={ menu_overlay_styles.menu_text }>
        <div className={ menu_overlay_styles.menu_controls }>
          <span className={ menu_overlay_styles.close_menu } onClick={ toggleMenuVisibility }>ᳵ</span>
          <DarkModeToggle/>
        </div>
        <Link href="/" legacyBehavior><p>Home</p></Link>
        <Link href="/about" legacyBehavior><p>About</p></Link>
        <Link href="https://dato.work" target="_blank" legacyBehavior><p>Portfolio</p></Link>
        <Link href="mailto:dan@l-o-o-s-e-d.net" target="_blank" legacyBehavior><p>Contact</p></Link>
      </div>
    </div>
  );
}
