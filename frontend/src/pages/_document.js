import { Html, Head, Main, NextScript } from 'next/document'
import React, { useEffect } from 'react'

export default function Document() {

  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Shrikhand&display=swap" crossOrigin="allow" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="allow" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,400;0,700;1,400;1,700&family=Shrikhand&display=swap" rel="stylesheet" crossOrigin="allow" />
      </Head>
      <body>
        <Main/>
        <NextScript/>
      </body>
    </Html>
  )

}
