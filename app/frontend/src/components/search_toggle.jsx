import styles from 'styles/Search.module.scss';

export default function SearchToggle() {
  return (
    <label htmlFor="search-overlay-input">
      <div
        className={ styles.search }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 14 14"
        >
          <g
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="5.92" cy="5.92" r="5.42" />
            <path d="M13.5 13.5L9.75 9.75" />
          </g>
        </svg>
      </div>
    </label>
  )
}
