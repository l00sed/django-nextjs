"use client"

import { useEffect } from "react";

export default function Intro () {
  let outerWrapperClass = [
    'flex',
    'flex-col',
    'px-8',
    'pt-4',
    'mt-4',
    'w-full'
  ].join(' ');

  let innerWrapperClass = [
    'border',
    'border-black',
    'py-3',
    'px-4',
    'max-w-full',
    'sm:max-w-sm',
    'md:max-w-md',
    'lg:max-w-lg',
    'xl:max-w-xl',
    '2xl:max-w-2xl',
    '3xl:max-w-3xl',
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
    'text-lg',
    'sm:text-xl',
    'md:text-2xl',
    'flex',
    'justify-between',
    'w-full',
    'text-center',
    'first:text-left',
    'last:text-right',
    'mb-0'
  ].join(' ');

  let buzzwordClass = [
    'uppercase',
    'text-2xl',
    'sm:text-4xl',
    'xl:text-5xl',
    '2xl:text-6xl',
    '3xl:text-8xl',
    'text-left',
    'flex',
    'flex-wrap',
    'justify-between',
    'my-0',
    'after:hidden'
  ].join(' ');

  let bwwClass = [
    'opacity-0',
    'flex',
    'flex-row',
    'w-full',
    'transition-opacity',
    'duration-200',
    'justify-between'
  ].join(' ');

  let rightPlaceClass = ifYouClass;
  rightPlaceClass += ' opacity-0 transition-opacity duration-1000 z-10 relative';

  useEffect(() => {
    let i = 0;
    let interval = 250;

    const timer = () => {
      const bws = document.getElementById('bws').children;
      if (i < bws.length) {
        bws[i].classList.replace('opacity-0', 'opacity-1');
        i++
        interval -= 25;
        setTimeout(timer, interval);
      }
    }

    timer();
    setTimeout(() => {
      document.getElementById('yitrp').classList.replace('opacity-0', 'opacity-1');
    }, 1500);
  });

  return (
    <div className={ outerWrapperClass }>
      <div className={ innerWrapperClass }>
        <p className={ ifYouClass }>
          <span>If</span>
          <span>you</span>
          <span>have</span>
          <span>a</span>
          <span>passion</span>
          <span>for</span>
        </p>
        <h2 id="bws" className={ buzzwordClass }>
          <span className={ bwwClass }>
            <span>a</span>
            <span>r</span>
            <span>t</span>
            <span>·</span>
            <span>d</span>
            <span>e</span>
            <span>s</span>
            <span>i</span>
            <span>g</span>
            <span>n</span>
          </span>
          <span className={ bwwClass }>
            <span>t</span>
            <span>e</span>
            <span>c</span>
            <span>h</span>
            <span>n</span>
            <span>o</span>
            <span>l</span>
            <span>o</span>
            <span>g</span>
            <span>y</span>
          </span>
          <span className={ bwwClass }>
            <span>p</span>
            <span>o</span>
            <span>l</span>
            <span>i</span>
            <span>t</span>
            <span>i</span>
            <span>c</span>
            <span>s</span>
          </span>
          <span className={ bwwClass }>
            <span>f</span>
            <span>r</span>
            <span>e</span>
            <span>e</span>
            <span>d</span>
            <span>o</span>
            <span>m</span>
          </span>
          <span className={ bwwClass }>
            <span>p</span>
            <span>r</span>
            <span>i</span>
            <span>v</span>
            <span>a</span>
            <span>c</span>
            <span>y</span>
          </span>
          <span className={ bwwClass }>
            <span>m</span>
            <span>e</span>
            <span>d</span>
            <span>i</span>
            <span>a</span>
            <span>·</span>
            <span>c</span>
            <span>o</span>
            <span>d</span>
            <span>e</span>
          </span>
          <span className={ bwwClass }>
            <span>r</span>
            <span>o</span>
            <span>b</span>
            <span>o</span>
            <span>t</span>
            <span>i</span>
            <span>c</span>
            <span>s</span>
          </span>
          <span className={ bwwClass }>
            <span>a</span>
            <span>r</span>
            <span>c</span>
            <span>h</span>
            <span>i</span>
            <span>t</span>
            <span>e</span>
            <span>c</span>
            <span>t</span>
            <span>u</span>
            <span>r</span>
            <span>e</span>
          </span>
          <span className={ bwwClass }>
            <span>f</span>
            <span>a</span>
            <span>b</span>
            <span>r</span>
            <span>i</span>
            <span>c</span>
            <span>a</span>
            <span>t</span>
            <span>i</span>
            <span>o</span>
            <span>n</span>
          </span>
          <span className={ bwwClass }>
            <span>L</span>
            <span>i</span>
            <span>n</span>
            <span>u</span>
            <span>x</span>
            <span>·</span>
            <span>V</span>
            <span>i</span>
            <span>m</span>
          </span>
          <span className={ bwwClass }>
            <span>b</span>
            <span>l</span>
            <span>o</span>
            <span>g</span>
            <span>g</span>
            <span>i</span>
            <span>n</span>
            <span>g</span>
            <span>·</span>
            <span>D</span>
            <span>I</span>
            <span>Y</span>
          </span>
          <span className={ bwwClass }>
            <span>b</span>
            <span>l</span>
            <span>o</span>
            <span>c</span>
            <span>k</span>
            <span>c</span>
            <span>h</span>
            <span>a</span>
            <span>i</span>
            <span>n</span>
          </span>
          <span className={ bwwClass }>
            <span>e</span>
            <span>l</span>
            <span>e</span>
            <span>c</span>
            <span>t</span>
            <span>r</span>
            <span>o</span>
            <span>n</span>
            <span>i</span>
            <span>c</span>
            <span>s</span>
          </span>
        </h2>
        <p id="yitrp" className={ rightPlaceClass }>
          <span>We</span>
          <span>have</span>
          <span>something</span>
          <span>in</span>
          <span>common</span>
        </p>
      </div>
    </div>
  )
}
