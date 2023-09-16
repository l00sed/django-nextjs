'use client';

/* Next Link */
import Link from 'next/link';
import Button from './button';
/* Styles */
import button_styles from '../styles/Button.module.scss';
import menu_overlay_styles from '../styles/MenuOverlay.module.scss';
/* Dark Mode */
import DarkModeToggle from './dark_mode_toggle';
import MessageOverlay from './message_overlay';

export default function MenuOverlay(props) {
  return (
    <MessageOverlay
      overlayId="menu-overlay"
      className={ menu_overlay_styles.menu_overlay }
    >
      <div className={ menu_overlay_styles.menu_text }>
        <div className={ menu_overlay_styles.menu_controls }>
          <button className={ menu_overlay_styles.close_menu }>
            <label htmlFor="menu-overlay-input">
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M23 23L76.033 76.033M76.033 23L23 76.033"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </label>
          </button>
          <DarkModeToggle/>
        </div>
        <Link href="/">
          <p>Home</p>
        </Link>
        <Link href="/about">
          <p>About</p>
        </Link>
        <Link rel="nofollow noreferrer"target="_blank" href="https://dato.work">
          <p>Portfolio</p>
        </Link>
        <Link href="mailto:dan@l-o-o-s-e-d.net">
          <p>Contact</p>
        </Link>
        {
          props.slug === 'live' ?
          <></>
          :
          <Link
            className={ button_styles.live__menu }
            href="/live"
          >
            <Button
              type={ 'live' }
            >live</Button>
          </Link>
        }
      </div>
    </MessageOverlay>
  );
}