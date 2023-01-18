import React from 'react'
/* Local Styles */
import '../styles/globals.css'
/* Head Component */
import Head from './head'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head />
      <body>
        { children }
      </body>
    </html>
  )
}
