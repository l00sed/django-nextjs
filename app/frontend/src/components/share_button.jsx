"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Button from 'components/button.jsx';
import button from 'styles/Button.module.scss';
import { copyToClipboard } from 'utils/copyToClipboard';
import { waitForElem } from 'lib/wait_for_elem';

/* SVG icons */
const linkSvg =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 16 16"
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
const emailSvg =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6zm-2 0l-8 4.99L4 6h16zm0 12H4V8l8 5l8-5v10z"
    />
  </svg>;
const discordSvg =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      d="M13.553 3.016A13.233 13.233 0 0 0 10.253 2a9.068 9.068 0 0 0-.423.86a12.293 12.293 0 0 0-3.664 0A9.112 9.112 0 0 0 5.744 2A13.358 13.358 0 0 0 2.44 3.018C.351 6.108-.215 9.123.068 12.094a13.306 13.306 0 0 0 4.048 2.033a9.78 9.78 0 0 0 .867-1.399a8.605 8.605 0 0 1-1.365-.652c.115-.083.227-.168.335-.251a9.51 9.51 0 0 0 8.094 0c.11.09.222.175.335.251a8.648 8.648 0 0 1-1.368.654a9.7 9.7 0 0 0 .867 1.396a13.248 13.248 0 0 0 4.051-2.03c.332-3.446-.568-6.433-2.379-9.08Zm-8.21 7.25c-.79 0-1.442-.715-1.442-1.596c0-.881.63-1.603 1.439-1.603s1.456.722 1.442 1.603c-.014.88-.636 1.597-1.44 1.597Zm5.315 0c-.79 0-1.44-.715-1.44-1.596c0-.881.63-1.603 1.44-1.603c.81 0 1.452.722 1.438 1.603c-.014.88-.634 1.597-1.438 1.597Z"
    />
  </svg>;
const facebookSvg =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"
    />
  </svg>;
const mastodonSvg =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 16 16"
  >
    <path
      fill="currentColor"
      d="M11.19 12.195c2.016-.24 3.77-1.475 3.99-2.603c.348-1.778.32-4.339.32-4.339c0-3.47-2.286-4.488-2.286-4.488C12.062.238 10.083.017 8.027 0h-.05C5.92.017 3.942.238 2.79.765c0 0-2.285 1.017-2.285 4.488l-.002.662c-.004.64-.007 1.35.011 2.091c.083 3.394.626 6.74 3.78 7.57c1.454.383 2.703.463 3.709.408c1.823-.1 2.847-.647 2.847-.647l-.06-1.317s-1.303.41-2.767.36c-1.45-.05-2.98-.156-3.215-1.928a3.614 3.614 0 0 1-.033-.496s1.424.346 3.228.428c1.103.05 2.137-.064 3.188-.189zm1.613-2.47H11.13v-4.08c0-.859-.364-1.295-1.091-1.295c-.804 0-1.207.517-1.207 1.541v2.233H7.168V5.89c0-1.024-.403-1.541-1.207-1.541c-.727 0-1.091.436-1.091 1.296v4.079H3.197V5.522c0-.859.22-1.541.66-2.046c.456-.505 1.052-.764 1.793-.764c.856 0 1.504.328 1.933.983L8 4.39l.417-.695c.429-.655 1.077-.983 1.934-.983c.74 0 1.336.259 1.791.764c.442.505.661 1.187.661 2.046v4.203z"
    />
  </svg>;
const linkedinSvg =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 128 128"
  >
    <path
      fill="currentColor"
      d="M116 3H12a8.91 8.91 0 0 0-9 8.8v104.42a8.91 8.91 0 0 0 9 8.78h104a8.93 8.93 0 0 0 9-8.81V11.77A8.93 8.93 0 0 0 116 3zM39.17 107H21.06V48.73h18.11zm-9-66.21a10.5 10.5 0 1 1 10.49-10.5a10.5 10.5 0 0 1-10.54 10.48zM107 107H88.89V78.65c0-6.75-.12-15.44-9.41-15.44s-10.87 7.36-10.87 15V107H50.53V48.73h17.36v8h.24c2.42-4.58 8.32-9.41 17.13-9.41C103.6 47.28 107 59.35 107 75z"
    />
  </svg>;
const redditSvg =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      fillRule="evenodd"
      d="M19.96 1.75c-.873 0-1.636.479-2.038 1.188l-3.6-.739a.75.75 0 0 0-.841.442c-.411.966-1.027 2.431-1.542 3.685c-.226.552-.434 1.066-.596 1.48c-1.918.092-3.692.59-5.157 1.384a3.066 3.066 0 1 0-3.817 4.57a5.371 5.371 0 0 0-.132 1.187c0 2.04 1.151 3.842 2.921 5.114c1.77 1.273 4.191 2.044 6.842 2.044c2.65 0 5.071-.771 6.842-2.044c1.77-1.272 2.921-3.073 2.921-5.114c0-.405-.045-.802-.132-1.186a3.065 3.065 0 1 0-3.817-4.57c-1.39-.755-3.059-1.241-4.864-1.368l.377-.928c.419-1.021.907-2.185 1.295-3.103l3.018.62a2.343 2.343 0 1 0 2.32-2.662Zm-.842 2.342a.842.842 0 1 1 1.685 0a.842.842 0 0 1-1.685 0Zm1.983 8.25c-.47-.883-1.166-1.673-2.024-2.334a1.566 1.566 0 1 1 2.024 2.334ZM4.923 10.008A1.566 1.566 0 1 0 2.9 12.342c.47-.883 1.166-1.673 2.024-2.334Zm10.614 4.94a1.447 1.447 0 1 0 0-2.895a1.447 1.447 0 0 0 0 2.894ZM9.905 13.5a1.447 1.447 0 1 1-2.895 0a1.447 1.447 0 0 1 2.895 0ZM8.85 16.629a.75.75 0 0 0-.8 1.268l.345.218a6.75 6.75 0 0 0 7.202 0l.345-.217a.75.75 0 1 0-.8-1.27l-.345.218a5.25 5.25 0 0 1-5.602 0l-.345-.217Z"
      clipRule="evenodd"
    />
  </svg>;
const twitterSvg =
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M18.205 2.25h3.308l-7.227 8.26l8.502 11.24H16.13l-5.214-6.817L4.95 21.75H1.64l7.73-8.835L1.215 2.25H8.04l4.713 6.231l5.45-6.231Zm-1.161 17.52h1.833L7.045 4.126H5.078L17.044 19.77Z"
    />
  </svg>

export default function ShareButton (props) {
  let href = "";
  let svg = <></>;

  switch (props.type) {
    case 'link':
      href = "#";
      svg = linkSvg;
      break;
    case 'email':
      let title = waitForElem('title').then(elem => { return elem.innerHTML });
      let description = waitForElem('meta[name="description"]').then(elem => { return elem.value });
      href = `mailto:?subject=${ title }&amp;body=${ description }`
      svg = emailSvg;
      break;
    case 'discord':
      href = 'https://discord.com';
      svg = discordSvg;
      break;
    case 'facebook':
      href = 'https://facebook.com';
      svg = facebookSvg;
      break;
    case 'linkedin':
      href = 'https://linkedin.com';
      svg = linkedinSvg;
      break;
    case 'mastodon':
      href = 'https://mastodon.com';
      svg = mastodonSvg;
      break;
    case 'reddit':
      href = 'https://reddit.com';
      svg = redditSvg;
      break;
    case 'twitter':
      href = 'https://twitter.com';
      svg = twitterSvg;
      break;
  }

  const handleShare = (e) => {
    const exclude = ['email'];
    if (!exclude.includes(props.type)) {
      switch (props.type) {
        default: break;
        case 'link':
          e.preventDefault();
          copyToClipboard(`${ process.env.NEXT_PUBLIC_BASE_URL }/${ props.slug }`)
          break;
      }
    }
  }

  return (
    <Link
      className={ button.share__button }
      href={ href }
      onClick={ handleShare }
      onKeyDown={ handleShare }
    >
      <Button>{ svg }</Button>
    </Link>
  )
}