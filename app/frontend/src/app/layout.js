import React from 'react';
/* Local Styles */
import '../styles/globals.scss';
import Head from './head';

import { JetBrains_Mono } from 'next/font/google';

const jbm = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap'
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={ jbm.className }>
      <Head />
      <body>
        <div id="theme-root" className="default">
          { children }
        </div>
      </body>
    </html>
  )
}
