export default function Share() {
  return (
    <label
      className="select-none bg-opacity-50 backdrop-blur-sm w-fit h-fit py-0.5 px-3 outer-sheen"
      htmlFor="share-overlay-input"
    >
      <div className="inner-sheen h-9 w-10 bg-opacity-50 font-mono cursor-pointer flex flex-row">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="m-auto"
          width="18"
          height="18"
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
      </div>
    </label>
  )
}
