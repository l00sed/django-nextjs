import styles from '../styles/Search.module.scss';

import MessageOverlay from './message_overlay';

export default function SearchOverlay() {
  return (
    <MessageOverlay overlayId="search-overlay">
      <input
        className={ styles.searchInput }
        type="text"
        placeholder="Search"
      />
    </MessageOverlay>
  )
}
