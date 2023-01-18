'use client';

import React, { useEffect } from 'react'
import Link from 'next/link'
import styles from '../styles/Title.module.css'

export default function Title() {
  useEffect(() => {
    const darkNeonBegin = () => {
      if (typeof window !== 'undefined') {
        document.getElementsByClassName('animate_blur')[0].beginElement();
        document.getElementsByClassName('animate_opacity')[0].beginElement();
        setTimeout(function() {
          document.getElementById('loosed-title').getElementsByTagName('g')[0].setAttribute('filter', 'url(#neon)');
        }, 100);
      }
    }

    const darkNeonEnd = () => {
      if (typeof window !== 'undefined') {
        document.getElementsByClassName('animate_blur')[0].endElement();
        document.getElementsByClassName('animate_opacity')[0].endElement();
        setTimeout(function() {
          document.getElementById('loosed-title').getElementsByTagName('g')[0].setAttribute('filter', '');
        }, 100);
      }
    }

    if (typeof window !== 'undefined') {
      document.getElementById('loosed-title').addEventListener( 'mouseover', darkNeonBegin );
      document.getElementById('loosed-title').addEventListener( 'mouseout', darkNeonEnd );
    }
  }, []);

  return (
    <div className={ styles.title__wrapper }>
      <div className={ styles.title }>
        <Link href="/">
          <svg id="loosed-title" className={ styles.title__word_logo } alt="loosed" width="200" height="75" viewBox="0 0 320 86" fill="#1B1B1B" xmlns="http://www.w3.org/2000/svg">
            <g filter="">
              <path d="M117.136 46.4571C116.713 43.1737 114.441 39.4936 111.016 37.0732C107.591 34.6529 103.014 33.4922 99.1416 33.5512C92.8147 33.3336 84.7435 36.7094 81.5424 41.9562C81.2882 42.314 81.2643 42.8769 81.4873 43.2545C81.684 43.6462 82.1724 43.9348 82.6136 43.9199L94.1512 43.9202C95.9793 39.5567 100.121 36.9134 102.169 38.4494C104.817 39.3295 105.629 46.2144 103.625 50.792C102.825 53.0443 101.293 55.4412 99.6344 56.7595C97.9757 58.0778 96.1899 58.3177 95.041 57.6145C93.9215 57.0281 92.9218 55.4992 92.5899 53.2569L82.4689 53.2567C82.0277 53.2419 81.5394 53.5302 81.3427 53.9217C81.1197 54.2991 81.1433 54.8619 81.3972 55.2197C84.3707 60.0508 91.625 62.975 97.6075 62.8087C101.505 62.8601 106.154 61.7355 109.802 59.4967C113.45 57.258 116.097 53.9051 116.91 50.7189L139.543 50.7196C140.041 50.7441 140.6 50.3552 140.747 49.883L140.913 49.406L141.305 48.0122C141.396 47.6541 141.298 47.2212 141.06 46.9369C140.834 46.6434 140.43 46.4505 140.058 46.4578L117.136 46.4571Z" />
              <path d="M200.38 47.5881C200.93 41.2655 204.685 38.0679 208.541 38.2108C211.967 38.0583 214.392 41.0018 213.299 46.4572L204.777 46.4587C204.45 46.4542 204.088 46.5976 203.839 46.8302C203.585 47.0566 203.41 47.4028 203.386 47.7274L203.236 49.4374C203.125 50.118 203.771 50.7511 204.405 50.7061L241.117 50.7196C241.615 50.7441 242.175 50.3552 242.321 49.883L242.487 49.406L242.879 48.0122C242.971 47.6541 242.872 47.2212 242.634 46.9369C242.408 46.6434 242.005 46.4505 241.632 46.4578L221.563 46.4572L221.689 45.799C222.322 42.354 220.769 38.99 217.819 36.7963C214.869 34.6026 210.524 33.5789 206.772 33.6169C202.877 33.5677 198.74 34.6702 195.511 37.0069C192.282 39.3437 189.962 42.9149 188.837 46.4792L173.913 46.479L172.67 45.203H167.785L168.993 46.4789L156.623 46.4788H156.628C156.128 42.9201 153.822 39.3387 150.414 36.9906C147.006 34.6424 142.496 33.5273 138.608 33.5729C132.509 33.3776 124.757 36.477 121.373 41.9566C121.119 42.3144 121.095 42.8772 121.318 43.2547C121.515 43.6462 122.003 43.9346 122.444 43.9198L133.67 43.9202C135.509 39.5801 139.624 36.9782 141.663 38.503C144.311 39.3831 145.123 46.2679 143.119 50.8455C142.319 53.0978 140.787 55.4947 139.128 56.813C137.47 58.1314 135.684 58.3713 134.535 57.668C133.406 57.0776 132.4 55.5268 132.076 53.2569L121.921 53.2566C121.48 53.2418 120.993 53.5296 120.796 53.9204C120.572 54.2972 120.595 54.8593 120.848 55.2173C123.813 60.061 131.081 62.9978 137.074 62.8302C140.972 62.8817 145.62 61.7571 149.268 59.5184C152.916 57.2796 155.564 53.9268 156.376 50.7407L173.028 50.7409L174.128 51.9023L179.169 51.8749L178.064 50.7409L188.039 50.741C188.676 50.7755 188.749 51.0346 188.823 51.2954C190.28 57.9474 197.482 63.2952 205.238 62.8742C210.356 62.9375 215.621 60.7627 217.242 58.8641C220.704 55.0464 217.006 55.9743 213.509 56.5953C210.054 57.1544 207.172 57.1183 205.346 56.758C203.503 56.5612 199.766 54.4966 200.38 47.5881Z" />
              <path d="M173.565 53.2784L183.274 53.2784C184.129 53.2525 185.07 53.7859 185.481 54.5286C185.937 55.2449 185.951 56.3196 185.513 57.0472C183.551 60.7555 176.91 62.9413 171.478 62.8519C164.489 63.0675 156.27 59.8886 156.8 55.7422C157.025 50.5009 167.53 51.1134 165.238 56.802C165.057 59.2037 168.472 59.9409 171.172 59.3768C174.737 58.5751 176.838 55.622 173.565 53.2784Z" />
              <path d="M164.878 43.9414L173.138 43.9415L172.986 43.7881C171.266 41.9926 171.507 38.9183 174.04 37.8836C175.527 37.2866 177.688 37.4109 179.402 39.6452C177.159 45.8634 187.623 45.8506 187.84 40.7049C188.341 36.5585 182.83 33.3796 175.722 33.5952C166.233 33.4107 162.371 37.893 162.34 41.0244L162.321 41.2591C162.272 41.9291 162.543 42.6648 163.016 43.1462C163.474 43.6414 164.2 43.9514 164.878 43.9414Z" />
              <path d="M250.843 27.3221C239.096 25.3736 254.335 23.6844 257.371 23.8007C259.632 23.802 264.479 23.8032 263.757 25.9317C255.267 57.8688 253.553 59.5095 256.741 59.5155L259.208 59.7672L259.071 62.576C253.488 62.4613 248.805 62.6398 247.73 60.5648C244.825 62.4346 241.811 63.0698 237.351 62.994C231.751 63.0888 227.224 60.0723 224.361 55.214C224.11 54.8558 224.089 54.2948 224.312 53.9187C224.51 53.5287 224.997 53.2419 225.437 53.2566L234.301 53.2569C234.7 55.2193 235.63 56.5357 236.656 57.08C237.805 57.7832 239.591 57.5433 241.249 56.225C242.908 54.9067 244.439 52.5098 245.24 50.2575C247.244 45.6799 246.432 38.7951 243.784 37.9149C241.642 36.2641 237.242 39.3399 235.527 43.9202L225.965 43.9198C225.523 43.9348 225.034 43.6454 224.838 43.2531C224.615 42.8749 224.64 42.3111 224.895 41.9536C228.307 36.5148 233.388 32.996 240.6 33.2487C242.996 33.2803 246.478 33.8277 248.539 36.0458L250.843 27.3221Z" />
              <path d="M77.8759 46.4572L99.4069 46.4578C99.7795 46.4505 100.183 46.6434 100.409 46.9369C100.647 47.2212 100.745 47.6541 100.654 48.0122L100.262 49.406L100.096 49.883C99.9497 50.3552 99.3902 50.7441 98.8922 50.7196L76.6946 50.719L76.4203 51.7115L74.4029 59.3238C74.2826 59.7445 74.4064 60.2179 74.6798 60.462C75.5579 61.2748 76.114 62.0166 75.3846 62.5663C75.0262 62.8455 74.1807 62.8455 73.3353 62.8455H57L57.9195 60.3014H59.6992C60.6909 60.3639 61.9989 59.506 62.1859 58.571L70.8856 27.2099C61.874 25.2853 72.516 22.6382 76.3924 23.0411C84.7293 23.797 83.2471 27.1957 82.5806 30.1523L79.9026 39.2767L77.8759 46.4572Z" />
            </g>
            <defs>
              <filter id="neon" x="0" y="0" width="1000" height="250" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                <feGaussianBlur id="blur" stdDeviation="0" />
                <feComponentTransfer>
                  <feFuncA id="opacity" type="linear" slope="0" />
                </feComponentTransfer>
                <feColorMatrix id="dark_mode" type="matrix" values="0 0 0 0 0.972549 0 0 0 0 0.360784 0 0 0 0 0.215686 0 0 0 1 0" />
                <feColorMatrix id="light_mode" type="matrix" values="0 0 0 0 0.752941 0 0 0 0 0.160784 0 0 0 0 0.027451 0 0 0 1 0" />
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
                <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
              </filter>
              <animate xlinkHref="#opacity" className="animate_opacity_dark" attributeName="slope" repeatCount="1" begin="indefinite" values="0.6;0.9;0.6;0;0;1.2;1;1.2;1.5;0.6;0.9;2.1" dur="400ms" fill="freeze" />
              <animate xlinkHref="#blur" className="animate_blur_dark" attributeName="stdDeviation" repeatCount="1" begin="indefinite" values="3;6;3;0;3;1;3;12;3;4;6;9;12;2;0;9;9;3;6;9;9;12" dur="400ms" fill="freeze" />
              <animate xlinkHref="#opacity" className="animate_opacity" attributeName="slope" repeatCount="2" begin="indefinite" values="0.2;0.3;0.2;0.1;0.4;0.4;0.5;0.2;0.3;0.7" dur="200ms" fill="freeze" />
              <animate xlinkHref="#blur" className="animate_blur" attributeName="stdDeviation" repeatCount="2" begin="indefinite" values="1;2;1;0;1;2;2;4;1;1;2;3;4;1;1;3;3;1;2;3;3" dur="200ms" fill="freeze" />
            </defs>
          </svg>
        </Link>
      </div>
    </div>
  );

}
