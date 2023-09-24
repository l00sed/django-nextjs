import styles from '../styles/Search.module.scss';

import MessageOverlay from './message_overlay';

export default function SearchOverlay() {
  return (
    <MessageOverlay overlayId="search-overlay">
      <div className={ styles.searchWrapper }>
        <input
          className={ styles.searchInput }
          type="text"
          placeholder="Search"
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="28"
          viewBox="0 0 24 24"
        >
          <path d="M20 4v9a4 4 0 0 1-4 4H6.914l2.5 2.5L8 20.914L3.086 16L8 11.086L9.414 12.5l-2.5 2.5H16a2 2 0 0 0 2-2V4h2Z" />
        </svg>
      </div>
    </MessageOverlay>
  )
}
