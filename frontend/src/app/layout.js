import React from 'react';
/* Local Styles */
import '../styles/globals.scss';
/* Head Component */
import Head from './head';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body>
        <div id="theme-root" className="default">
          { children }
        </div>
      </body>
    </html>
  )
}
