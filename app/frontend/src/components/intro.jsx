"use client"

import { useEffect } from "react";

export default function Intro () {
  let outerWrapperClass = [
    'flex',
    'flex-col',
    'h-192',
    'w-full'
  ].join(' ');

  let innerWrapperClass = [
    'border',
    'border-black',
    'p-4',
    'max-w-sm',
    'm-auto',
    'bg-white',
    'dark:bg-black',
    'dark:border-white',
    'after:w-full',
    'after:h-full',
    'after:block',
    'after:content-[""]',
    'after:relative',
    'after:-top-full',
    'after:left-0',
    'after:bg-gradient-to-t',
    'after:from-white',
    'after:to-transparent',
    'after:dark:from-black',
  ].join(' ');

  let ifYouClass = [
    'uppercase',
    'text-xl',
    'flex',
    'justify-between',
    'w-full',
    'text-left',
    'mb-0'
  ].join(' ');

  let buzzwordClass = [
    'uppercase',
    'text-4xl',
    'text-left',
    'flex',
    'flex-wrap',
    'justify-between',
    'my-0',
    'after:hidden'
  ].join(' ');

  let rightPlaceClass = ifYouClass;
  rightPlaceClass += ' opacity-0 transition-opacity z-10 relative';

  const tags = [
    'art',
    'design',
    'technology',
    'politics',
    'freedom',
    'privacy',
    'media',
    'code',
    'robotics',
    'architecture',
    'fabrication',
    'Linux',
    'Vim',
    'blogging',
    'DIY',
    'blockchain',
    'electronics',
  ]

  useEffect(() => {
    let i = 0;
    let interval = 1000;
    const timer = () => {
      if (i < tags.length) {
        let interpunct = false;
        let word = tags[i];

        if ((word.length + tags[i+1]?.length) < 12) {
          if (i === 0 || document.getElementById('bws').lastChild?.innerHTML !== '·') {
            interpunct = true;
          }
        }

        buildIntro(word, interpunct)

        i++
        interval -= 100;
        setTimeout(timer, interval);
      }
    }

    const buildIntro = (w, ip) => {
      const wrap = document.createElement('span');
      wrap.classList.add('flex');
      wrap.classList.add('justify-between');

      if (!ip) {
        if (document.getElementById('bws').lastChild?.innerHTML !== '·') {
          wrap.classList.add('w-full');
        } else {
          wrap.classList.add('flex-grow');
        }
      } else {
        wrap.classList.add('flex-grow');
      }

      for (let l=0; l < w.length; l++) {
        const letterSpan = document.createElement('span');
        letterSpan.innerHTML = w[l];
        letterSpan.classList.add('mx-auto');
        letterSpan.classList.add('first:ml-0');
        letterSpan.classList.add('last:mr-0');
        wrap.appendChild(letterSpan);
      }

      document.getElementById('bws').appendChild(wrap);

      if (ip) {
        const punctSpan = document.createElement('span');
        punctSpan.innerHTML = '·';
        punctSpan.classList.add('mx-4');
        document.getElementById('bws').appendChild(punctSpan);
      }
    }

    timer();
    setTimeout(() => {
      document.getElementById('yitrp').classList.replace('opacity-0', 'opacity-1');
    }, 2000);
  });

  return (
    <div className={ outerWrapperClass }>
      <div className={ innerWrapperClass }>
        <p className={ ifYouClass }>
          <span>If</span>
          <span>you</span>
          <span>share</span>
          <span>a</span>
          <span>passion</span>
          <span>for</span>
        </p>
        <h2 id="bws" className={ buzzwordClass }></h2>
        <p id="yitrp" className={ rightPlaceClass }>
          <span>You&apos;re</span>
          <span>in</span>
          <span>the</span>
          <span>right</span>
          <span>place</span>
        </p>
      </div>
    </div>
  )
}
