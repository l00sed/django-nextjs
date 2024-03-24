"use client"

import { copyToClipboard } from 'utils/copyToClipboard';

export default function Share(props) {
  const slug = props.meta.slug;
  const url = `${ process.env.NEXT_PUBLIC_BASE_URL }/${ slug }`

  const handleShare = (e) => {
    e.preventDefault();
    copyToClipboard(url)
  }

  const linkSvg =
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 16 16"
      className="m-auto"
      onClick={ handleShare }
      onKeyDown={ handleShare }
    >
      <g fill="currentColor">
        <path
          d="M4.715 6.542L3.343 7.914a3 3 0 1 0 4.243 4.243l1.828-1.829A3 3 0 0 0 8.586 5.5L8 6.086a1.002 1.002 0 0 0-.154.199a2 2 0 0 1 .861 3.337L6.88 11.45a2 2 0 1 1-2.83-2.83l.793-.792a4.018 4.018 0 0 1-.128-1.287z"
        />
        <path
          d="M6.586 4.672A3 3 0 0 0 7.414 9.5l.775-.776a2 2 0 0 1-.896-3.346L9.12 3.55a2 2 0 1 1 2.83 2.83l-.793.792c.112.42.155.855.128 1.287l1.372-1.372a3 3 0 1 0-4.243-4.243L6.586 4.672z"
        />
      </g>
    </svg>;

  return (
    <div
      className="select-none bg-opacity-50 backdrop-blur-sm w-fit h-fit py-0.5 px-3 outer-sheen"
    >
      <div className="inner-sheen h-9 w-10 bg-opacity-50 font-mono cursor-pointer flex flex-row">
        { linkSvg }
      </div>
    </div>
  )
}
