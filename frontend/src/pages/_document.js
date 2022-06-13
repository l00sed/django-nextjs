import { Html, Head, Main, NextScript } from 'next/document'
import React, { useEffect } from 'react'
//import checkForCodeAndStyle from '../components/code'

export default function Document() {

  useEffect(() => {
    const hljs = require('highlight.js');
    window.hljs = hljs;
    require('highlightjs-line-numbers.js');

    const checkForCodeAndStyle = () => {      // Code syntax highlighting
      /*
      // Add syntax highlighting theme/styles in CSS
      var loadCodeStyles = document.createElement( "link" );
      loadCodeStyles.rel = "stylesheet";
      loadCodeStyles.href = '/assets/css/tomorrow-night-eighties.css'
      // Append new css link to head
      document.getElementsByTagName( 'head' )[0].append( loadCodeStyles );
      */

      // Initialize
      document.querySelectorAll( 'pre code' ).forEach( ( block ) => {
        hljs.highlightBlock( block );
      } );

    // Line-number script
    // --------------------------------------

      /*
      // Construct script link
      var loadHighlightLineNumbers = document.createElement( "script" );
      loadHighlightLineNumbers.id = "hljs_numbers";
      loadHighlightLineNumbers.async = false;
      loadHighlightLineNumbers.type = "text/javascript";
      loadHighlightLineNumbers.src = "/assets/js/highlightjs-line-numbers.min.js";
      // Add to the html doc
      document.body.appendChild( loadHighlightLineNumbers );
      */

      // Add line numbers
      document.querySelectorAll( 'code.hljs' ).forEach(( block ) => {
        //console.log( i );
        hljs.lineNumbersBlock( block );
      });
    }

    checkForCodeAndStyle();
  });

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
