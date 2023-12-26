import article_styles from 'styles/ArticleMeta.module.scss';

export default function Share() {
  return (
    <label
      className={ article_styles.article__share }
      htmlFor="share-overlay-input"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <g
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M18 22a3 3 0 1 0 0-6a3 3 0 0 0 0 6Zm0-14a3 3 0 1 0 0-6a3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6a3 3 0 0 0 0 6Z"
          />
          <path
            d="m15.5 6.5l-7 4m0 3l7 4"
          />
        </g>
      </svg>
    </label>
  )
}
