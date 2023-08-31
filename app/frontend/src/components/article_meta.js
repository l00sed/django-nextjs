"use client";

import article_styles from '../styles/ArticleMeta.module.scss';
import { toggleOverlay } from './message_overlay';
import Toc from './toc';
import csrfToken from '../utils/csrf_token';
import ResponseError from '../utils/error_handling';
import HOST_URL from '../utils/api_server';

export default function ArticleMeta({ meta, headings }) {
  const parseLikes = likes_count => {
    if (likes_count > 999) {
      likes_count = `${likes_count.toString().slice(0, -3)}k`;
    }
    return likes_count;
  }

  // "Like" button event handler
  const handleLike = async e => {
    e.preventDefault();
    const header_like = {
      method: "PUT",
      supportHeaderParams: true,
      headers: {
        'Accept': 'application/json;encoding=utf-8',
        'Content-Type': 'application/json;encoding=utf-8',
        'X-CSRFToken': csrfToken()
      },
      body: JSON.stringify({ likes: 1 })
    }
    const like_promise = await fetch(`${HOST_URL()}/api/articles/like/${meta.slug}`, header_like);
    /* Empty array to receive JSON response */
    let like_response = [];
    if (like_promise.ok) {
      like_response = await like_promise.json();
      let like = document.querySelector(`.${article_styles.likes__count}`).dataset.likeCount ?? 0
      document.querySelector(`.${article_styles.likes__count}`).dataset.likeCount = parseInt(like) + 1;
      document.querySelector(`.${article_styles.likes__count}`).innerText = parseLikes(parseInt(like) + 1);
    } else {
      /* Provide error log if endpoint is having issues. */
      throw new ResponseError( 'Could not like article.', like_promise);
    }
  }

  return (
    <div className={ article_styles.meta__row }>
      <div
        className={ article_styles.article__likes }
        onClick={ (e) => { handleLike(e) } }
        onKeyDown={ (e) => { handleLike(e) } }
      >
        <span
          className={ article_styles.likes__count }
          data-like-count={ parseInt(meta.likes).toString() }
        >{ parseInt(meta.likes).toString() }</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillOpacity="0.5"
            d="M12 20.325q-.35 0-.713-.125t-.637-.4l-1.725-1.575q-2.65-2.425-4.788-4.813T2 8.15Q2 5.8 3.575 4.225T7.5 2.65q1.325 0 2.5.562t2 1.538q.825-.975 2-1.538t2.5-.562q2.35 0 3.925 1.575T22 8.15q0 2.875-2.125 5.275T15.05 18.25l-1.7 1.55q-.275.275-.637.4t-.713.125ZM11.05 6.75q-.725-1.025-1.55-1.562t-2-.538q-1.5 0-2.5 1t-1 2.5q0 1.3.925 2.763t2.213 2.837q1.287 1.375 2.65 2.575T12 18.3q.85-.775 2.213-1.975t2.65-2.575q1.287-1.375 2.212-2.837T20 8.15q0-1.5-1-2.5t-2.5-1q-1.175 0-2 .537T12.95 6.75q-.175.25-.425.375T12 7.25q-.275 0-.525-.125t-.425-.375Zm.95 4.725Z"
          />
        </svg>
      </div>
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
      <Toc headings={ headings } />
    </div>
  )
}
