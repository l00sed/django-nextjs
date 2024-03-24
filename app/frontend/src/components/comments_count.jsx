'use client';

export default function CommentsCount() {
  const toggleComments = e => {
    e.preventDefault();
    const aside = document.getElementsByTagName('aside')[0];
    if (['0px', ''].includes(aside.style.width)) {
      aside.style.width = '33.333%';
      aside.style.opacity = 1;
      document.getElementById('id_author')?.focus();
    } else {
      aside.style.width = 0;
      aside.style.opacity = 0;
    }
  }

  return (
    <div
      className="select-none w-fit h-fit py-0.5 px-3 outer-sheen"
      onClick={ toggleComments }
    >
      <div className="inner-sheen h-9 px-3 gap-x-1 font-mono cursor-pointer flex flex-row text-black dark:text-white">
        <span
          id="comment_count"
          className="my-auto leading-none pt-0.5"
        >0</span>
        <svg
          className="my-auto pb-1"
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          viewBox="0 0 24 24"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeOpacity="1"
            strokeWidth="1"
            d="M7 8h10M7 11h10M7 14h4m-8 4V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7.667a2 2 0 0 0-1.2.4L3 21v-3z"
          />
        </svg>
      </div>
    </div>
  )
}
