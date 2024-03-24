"use client";

import { useEffect } from 'react';

export default function ScrollTop() {
  let scrollTopStyles = [
    'group',
    'hidden',
    'border-none',
    'h-12',
    'w-12',
    'cursor-pointer',
    'right-3',
    'bottom-3',
    'fixed',
    'z-10',
    'bg-opacity-50',
    'rounded-full',
    'backdrop-blur-sm',
    'hover:shadow-y-inset',
    'hover:pause',
    'hover:bg-loosed-400',
  ].join(' ');

  let scrollTopSvgStyles = [
    'h-7',
    'w-7',
    'm-auto',
    'fill-gray-800',
    'group-hover:fill-white',
    'dark:fill-gray-100'
  ].join(' ');

  const scrollToTop = () => {
    // Scroll to top button
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  useEffect(() => {
    const handleScroll = _e => {
      if ( window.scrollY && ( window.scrollY > 500 ) ) {
        if ( document.getElementById('scrollTop').classList.contains('hidden') ) {
          document.getElementById('scrollTop').classList.remove('hidden');
        }
      } else {
        if ( ! document.getElementById('scrollTop').classList.contains('hidden') ) {
          document.getElementById('scrollTop').classList.add('hidden');
        }
      }
    }
    window.addEventListener( 'scroll', handleScroll );
    return () => {
      window.removeEventListener( 'scroll', handleScroll );
    }
  }, []);

  return (
    <button
      id="scrollTop"
      type="button"
      title="Click to jump to the top of the page."
      className={ scrollTopStyles }
      onClick={ scrollToTop }
    >
      <svg
        className={ scrollTopSvgStyles }
        width="50"
        height="50"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M37.2165 21.0436C36.263 21.867 34.8137 21.7717 33.9794 20.8306L30.7392 17.1759C29.8093 16.127 28.0588 16.7762 28.0588 18.1699V41.9811C28.0588 43.6484 26.6893 45 25 45C23.3107 45 21.9412 43.6484 21.9412 41.9811V18.1699C21.9412 16.7762 20.1907 16.127 19.2608 17.1759L16.0206 20.8306C15.1863 21.7717 13.737 21.867 12.7835 21.0436C11.8299 20.2202 11.7333 18.7898 12.5676 17.8487L23.2486 5.80137C23.2894 5.75387 23.3325 5.7077 23.3779 5.66302C23.5674 5.47557 23.7833 5.3273 24.0145 5.21893C24.327 5.07207 24.6647 4.99967 25.0014 5C25.3371 5.00006 25.6738 5.07247 25.9855 5.21893C26.2167 5.32732 26.4326 5.47563 26.6222 5.66313C26.6675 5.70774 26.7106 5.75383 26.7513 5.80125L37.4323 17.8487C38.2667 18.7898 38.1701 20.2202 37.2165 21.0436Z" />
      </svg>
    </button>
  )
}
