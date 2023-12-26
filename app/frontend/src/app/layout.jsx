import React from 'react';
/* Local Styles */
import 'styles/globals.scss';
import Head from './head.jsx';

import localFont from 'next/font/local'
import { JetBrains_Mono } from 'next/font/google';

const jbm = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--jetbrains-mono'
})

const ms = localFont({
  src: [{ path: '../../src/fonts/Mona_Sans/MonaSansExpanded-Black.woff2' }],
  variable: '--mona-sans'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ `${ jbm.variable } ${ ms.variable }` }>
      <Head />
      <body>
        <div id="theme-root" className="default">
          { children }
        </div>
      </body>
    </html>
  )
}
