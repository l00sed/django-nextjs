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
        <Link rel="author" href="/about">
          <p>About</p>
        </Link>
        <Link rel="external" target="_blank" href="https://dato.work">
          <p>
            <span>Portfolio</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 16 16"
            >
              <path fill-rule="evenodd" d="M10.75 1a.75.75 0 0 0 0 1.5h1.69L8.22 6.72a.75.75 0 0 0 1.06 1.06l4.22-4.22v1.69a.75.75 0 0 0 1.5 0V1h-4.25ZM2.5 4v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V8.75a.75.75 0 0 1 1.5 0V13a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4.25a.75.75 0 0 1 0 1.5H3a.5.5 0 0 0-.5.5Z" clip-rule="evenodd" />
            </svg>
          </p>
        </Link>
        <Link className={ menu_overlay_styles.contact } href="mailto:dan@l-o-o-s-e-d.net">
          <p>
            <span>Contact</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              style={{ marginBottom: 1 + 'px' }}
            >
              <path fillOpacity={ 0.9 } d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H4V8l8 5l8-5v10zm-8-7L4 6h16l-8 5z" />
            </svg>
          </p>
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
