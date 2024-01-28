'use client';

import csrfToken from 'utils/csrf_token';
import { waitForElem } from 'lib/wait_for_elem';
import ResponseError from 'utils/error_handling';
import HOST_URL from 'utils/api_server';


export default function Likes({ meta }) {
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
      if (like_response.indexOf('ERROR') < 0) {
        waitForElem('#likes_count').then(elem => {
          let like = elem.dataset.likeCount ?? 0
          elem.dataset.likeCount = parseInt(like) + 1;
          elem.innerText = parseLikes(parseInt(like) + 1);
          if (! document.getElementById('heart').classList.contains("text-loosed-400")) {
            document.getElementById('heart').classList.add("text-loosed-400", "dark:text-loosed-600");
            document.getElementById('heart_fill').classList.add("opacity-100");
          }
        });
      }
    } else {
      /* Provide error log if endpoint is having issues. */
      throw new ResponseError( 'Could not like article.', like_promise);
    }
  }

  return (
    <div
      className="select-none bg-opacity-50 backdrop-blur-sm py-0.5 w-fit h-fit px-3 outer-sheen"
      onClick={ (e) => { handleLike(e) } }
      onKeyDown={ (e) => { handleLike(e) } }
    >
      <div className="inner-sheen h-9 bg-opacity-50 px-3 gap-x-1 font-mono cursor-pointer flex flex-row">
        <span
          id="likes_count"
          className="my-auto leading-none pt-0.5"
          data-like-count={ parseInt(meta.likes).toString() }
        >{ parseInt(meta.likes).toString() }</span>
        <svg
          id="heart"
          className="relative my-auto"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
          viewBox="0 0 256 256"
        >
          <g
            fill="currentColor"
          >
            <path
              id="heart_fill"
              d="M232 94c0 66-104 122-104 122S24 160 24 94a54 54 0 0 1 54-54c22.59 0 41.94 12.31 50 32c8.06-19.69 27.41-32 50-32a54 54 0 0 1 54 54Z"
              opacity="0"
            />
            <path
              d="M178 32c-20.65 0-38.73 8.88-50 23.89C116.73 40.88 98.65 32 78 32a62.07 62.07 0 0 0-62 62c0 70 103.79 126.66 108.21 129a8 8 0 0 0 7.58 0C136.21 220.66 240 164 240 94a62.07 62.07 0 0 0-62-62Zm-50 174.8C109.74 196.16 32 147.69 32 94a46.06 46.06 0 0 1 46-46c19.45 0 35.78 10.36 42.6 27a8 8 0 0 0 14.8 0c6.82-16.67 23.15-27 42.6-27a46.06 46.06 0 0 1 46 46c0 53.61-77.76 102.15-96 112.8Z"
              opacity="1"
              stroke="currentColor"
              strokeWidth="1"
            />
          </g>
        </svg>
      </div>
    </div>
  )
}
