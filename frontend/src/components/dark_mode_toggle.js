'use client';

import React, { useEffect } from 'react';
import dark_mode_toggle_styles from '../styles/DarkModeToggle.module.css'
import { setTheme } from '../lib/theme';


export default function DarkModeToggle() {
  useEffect(() => {
    document.getElementById('dark-mode-toggle').addEventListener('click', setTheme);

    return () => {
      if (document.getElementById('dark-mode-toggle')) {
        document.getElementById('dark-mode-toggle').removeEventListener('click', setTheme);
      }
    }
  }, []);

  return (
    <div id="dark-mode-toggle" title="Toggle dark/light mode.">
      <div className={ dark_mode_toggle_styles.dark_toggle }>
        <svg
          className={ dark_mode_toggle_styles.dark_toggle_moon }
          alt="Dark toggle"
          width="120px"
          height="120px"
          viewBox="0 0 120 120"
          overflow="visible"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
					<g filter="url(#filter1_f_2_2)">
						<path d="M32 95.576C38.0182 100.407 46.0648 103.824 54.3904 104.742C62.716 105.661 71.3207 104.081 78.2584 100.678C85.2531 97.3936 91.8485 91.6786 96.3013 84.6273C100.754 77.5759 103.064 69.1881 102.999 61.5C103.064 53.8118 100.754 45.4241 96.3013 38.3727C91.8485 31.3214 85.2531 25.6064 78.2584 22.3215C71.3207 18.9195 62.716 17.3392 54.3904 18.2575C46.0648 19.1759 38.0182 22.5929 32 27.4241C43.3174 20.4509 60.275 20.4509 71.5924 27.4241C83.3276 33.678 91.8064 48.2729 91.3887 61.5C91.8064 74.7271 83.3276 89.322 71.5924 95.576C60.275 102.549 43.3174 102.549 32 95.576Z" fill="#003262"/>
						<path d="M32 95.576C38.0182 100.407 46.0648 103.824 54.3904 104.742C62.716 105.661 71.3207 104.081 78.2584 100.678C85.2531 97.3936 91.8485 91.6786 96.3013 84.6273C100.754 77.5759 103.064 69.1881 102.999 61.5C103.064 53.8118 100.754 45.4241 96.3013 38.3727C91.8485 31.3214 85.2531 25.6064 78.2584 22.3215C71.3207 18.9195 62.716 17.3392 54.3904 18.2575C46.0648 19.1759 38.0182 22.5929 32 27.4241C43.3174 20.4509 60.275 20.4509 71.5924 27.4241C83.3276 33.678 91.8064 48.2729 91.3887 61.5C91.8064 74.7271 83.3276 89.322 71.5924 95.576C60.275 102.549 43.3174 102.549 32 95.576Z" fill="#003262" stroke="#003262" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="1 1"/>
					</g>
					<defs>
						<filter id="filter1_f_2_2" x="29.4999" y="15.5002" width="76.0001" height="91.9996" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="2" result="effect1_foregroundBlur_2_2"/>
						</filter>
					</defs>
				</svg>
      </div>
      <div className={ dark_mode_toggle_styles.light_toggle }>
        <svg
          className={ dark_mode_toggle_styles.light_toggle_sun }
          alt="Light toggle"
          width="120px"
          height="120px"
          viewBox="0 0 120 120"
          overflow="visible"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
					<g filter="url(#filter0_f_2_4)">
						<path d="M61 72C67.0751 72 72 67.0751 72 61C72 54.9249 67.0751 50 61 50C54.9249 50 50 54.9249 50 61C50 67.0751 54.9249 72 61 72Z" fill="#FFB000"/>
						<path d="M61 72C67.0751 72 72 67.0751 72 61C72 54.9249 67.0751 50 61 50C54.9249 50 50 54.9249 50 61C50 67.0751 54.9249 72 61 72Z" fill="#FFB000" stroke="#FFB000" strokeWidth="5" strokeLinecap="round"/>
					</g>
					<g filter="url(#filter1_f_2_4)">
						<path d="M42 72L22 83" stroke="#FFB000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
					</g>
					<g filter="url(#filter2_f_2_4)">
						<path d="M80 50L99 39" stroke="#FFB000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
					</g>
					<g filter="url(#filter3_f_2_4)">
						<path d="M61 83V105" stroke="#FFB000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
					</g>
					<g filter="url(#filter4_f_2_4)">
						<path d="M42 50L22 39" stroke="#FFB000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
					</g>
					<g filter="url(#filter5_f_2_4)">
						<path d="M61 39V16" stroke="#FFB000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
					</g>
					<g filter="url(#filter6_f_2_4)">
						<path d="M80 72L99 83" stroke="#FFB000" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round"/>
					</g>
					<defs>
						<filter id="filter0_f_2_4" x="47" y="47" width="28" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_2_4"/>
						</filter>
						<filter id="filter1_f_2_4" x="18.9995" y="68.9995" width="26.0009" height="17.0009" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_2_4"/>
						</filter>
						<filter id="filter2_f_2_4" x="76.9996" y="35.9996" width="25.0008" height="17.0008" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_2_4"/>
						</filter>
						<filter id="filter3_f_2_4" x="58" y="80" width="6" height="28" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_2_4"/>
						</filter>
						<filter id="filter4_f_2_4" x="18.9995" y="35.9995" width="26.0009" height="17.0009" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_2_4"/>
						</filter>
						<filter id="filter5_f_2_4" x="58" y="13" width="6" height="29" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
						<feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_2_4"/>
						</filter>
							<filter id="filter6_f_2_4" x="76.9996" y="68.9996" width="25.0008" height="17.0008" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
							<feFlood floodOpacity="0" result="BackgroundImageFix"/>
							<feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape"/>
							<feGaussianBlur stdDeviation="0.25" result="effect1_foregroundBlur_2_4"/>
						</filter>
					</defs>
				</svg>
      </div>
    </div>
  )

}
