export default function CommentsCount() {
  return (
    <a
      className="select-none w-fit h-fit py-0.5 px-3 outer-sheen"
      href="#id_author"
    >
      <div className="inner-sheen h-10 px-3 py-1 gap-x-1 font-mono cursor-pointer flex flex-row text-black dark:text-white">
        <span
          id="comment_count"
          className="my-auto"
        >0</span>
        <svg
          className="my-auto pb-0.5"
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="18"
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
    </a>
  )
}
