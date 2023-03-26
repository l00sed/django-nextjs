'use client';

/* Next Link */
import Link from 'next/link'
/* Styles */
import menu_overlay_styles from '../styles/MenuOverlay.module.scss'
/* Dark Mode */
import DarkModeToggle from './dark_mode_toggle'

export default function MenuOverlay() {
  return (
    <>
      <input type="checkbox" id="menu-overlay-input" className={ menu_overlay_styles.menu_checkbox } hidden />
      <div id="menu-overlay" className={ menu_overlay_styles.menu_overlay }>
        <div className={ menu_overlay_styles.menu_text }>
          <div className={ menu_overlay_styles.menu_controls }>
            <label htmlFor="menu-overlay-input">
              <span className={ menu_overlay_styles.close_menu }>ᳵ</span>
            </label>
            <DarkModeToggle/>
          </div>
          <Link href="/"><p>Home</p></Link>
          <Link href="/about"><p>About</p></Link>
          <Link rel="nofollow noreferrer"target="_blank" href="https://dato.work"><p>Portfolio</p></Link>
          <Link href="mailto:dan@l-o-o-s-e-d.net"><p>Contact</p></Link>
        </div>
        <label htmlFor="menu-overlay-input" className={ menu_overlay_styles.close_area } />
      </div>
    </>
  );
}
