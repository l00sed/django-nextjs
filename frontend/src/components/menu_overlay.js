'use client';

import React, { useEffect } from 'react';
/* Next Link */
import Link from 'next/link'
/* Styles */
import menu_overlay_styles from '../styles/MenuOverlay.module.scss'
/* Dark Mode */
import DarkModeToggle from './dark_mode_toggle'

export default function MenuOverlay() {
  useEffect(() => {
    const toggleMenu = (e) => {
      let checkbox = document.getElementById('menu-overlay-input');
      if (e.code !== 9) {
        checkbox.checked = !checkbox.checked
      }
    }

    if (typeof window !== 'undefined') {
      document.getElementsByClassName(menu_overlay_styles.close_menu)[0].addEventListener('keydown', toggleMenu);
      document.getElementById('menu-toggle').addEventListener('keydown', toggleMenu);
    }

    return () => {
      if (document.getElementsByClassName(menu_overlay_styles.close_menu)) {
        document.getElementsByClassName(menu_overlay_styles.close_menu)[0].removeEventListener('keydown', toggleMenu);
      }
      if (document.getElementById('menu-toggle')) {
        document.getElementById('menu-toggle').removeEventListener('keydown', toggleMenu);
      }
    }
  }, []);

  return (
    <>
      <input type="checkbox" id="menu-overlay-input" className={ menu_overlay_styles.menu_checkbox } hidden />
      <div id="menu-overlay" className={ menu_overlay_styles.menu_overlay }>
        <div className={ menu_overlay_styles.menu_text }>
          <div className={ menu_overlay_styles.menu_controls }>
            <button className={ menu_overlay_styles.close_menu }>
              <label htmlFor="menu-overlay-input">
                <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 23L76.033 76.033M76.033 23L23 76.033" strokeWidth="6" strokeLinecap="round"/>
                </svg>
              </label>
            </button>
            <DarkModeToggle/>
          </div>
          <Link href="/"><p>Home</p></Link>
          <Link href="/about"><p>About</p></Link>
          <Link rel="nofollow noreferrer"target="_blank" href="https://dato.work"><p>Portfolio</p></Link>
          <Link href="mailto:dan@l-o-o-s-e-d.net"><p>Contact</p></Link>
        </div>
      </div>
      <label htmlFor="menu-overlay-input" className={ menu_overlay_styles.close_area } />
    </>
  );
}
