import article_styles from '../styles/ArticleMeta.module.scss';

export default function CommentsCount() {
  return (
    <a
      className={ article_styles.article__comments }
      href="#id_author"
    >
      <span id="comment_count">0</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeOpacity="0.5"
          strokeWidth="2"
          d="M7 8h10M7 11h10M7 14h4m-8 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.667a2 2 0 0 0-1.2.4L3 21v-3z"
        />
      </svg>
    </a>
  )
}
