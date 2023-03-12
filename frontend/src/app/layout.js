import React from 'react';
/* Local Styles */
import '../styles/globals.scss';
/* Head Component */
import Head from './head';
/* Theme */
import { theme } from '../lib/theme';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body>
        <div id="theme-root" className={ theme() }>
          { children }
        </div>
      </body>
    </html>
  )
}
