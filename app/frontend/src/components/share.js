"use client";

import article_styles from '../styles/ArticleMeta.module.scss';
import { toggleOverlay } from './message_overlay';

export default function Share() {
  return (
    <div
      className={ article_styles.article__share }
      onClick={ () => { toggleOverlay('share-overlay') } }
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M18 2a3 3 0 0 0-2.947 3.562l-7.114 4.15a3 3 0 1 0 0 4.578l7.114 4.148a3 3 0 1 0 1.008-1.727l-7.114-4.15a3.011 3.011 0 0 0 0-1.123l7.114-4.15A3 3 0 1 0 18 2Z"
          clipRule="evenodd"
        />
      </svg>
    </div>
  )
}
