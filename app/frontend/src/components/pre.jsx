'use client';

import { useState, useRef } from 'react'
import styles from 'styles/Pre.module.scss';

export default function Pre (props) {
  const wrapperClasses = [
    'relative',
    'my-8',
    'mx-auto',
    'border',
    'border-neutral-300',
    'dark:border-neutral-700'
  ].join(' ');

  const textInput = useRef(null);

  const [hovered, setHovered] = useState(false);
  const [copied, setCopied] = useState(false);

  let copyButton = true;
  if (props.copyButton === false) {
    copyButton = false;
  }

  const onEnter = () => {
    setHovered(true)
  }

  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }

  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current.querySelector('figure[data-rehype-pretty-code-figure]').textContent)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <div
      ref={textInput}
      onMouseEnter={onEnter}
      onMouseLeave={onExit}
      className={ `${styles.code_wrapper} ${wrapperClasses}` }
    >
      {(
        <button
          aria-label="Copy code"
          type="button"
          className={`code-copy-button ${
            copied ? 'code-copied' : 'code-uncopied'
          }${
            copyButton ? '' : ' hidden'
          }`}
          onClick={onCopy}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            className={copied ? 'text-green-400' : 'text-gray-300'}
          >
            {copied ? (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </>
            ) : (
              <>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </>
            )}
          </svg>
        </button>
      )}

      { props.children }
    </div>
  )
}
