import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dateformat from 'dateformat'
import Parser from 'html-react-parser'
import styles from '../styles/Article.module.css'
import page_styles from '../styles/Page.module.css'
import comment_styles from '../styles/Comment.module.css'
import Title from '../components/title'
import Donate from '../components/donate'
import Comments from '../components/comments'
import MenuOverlay from '../components/menu_overlay'
import MenuToggle from '../components/menu_toggle'
import Footer from '../components/footer'
import { useRecoilState } from 'recoil'
import { themeState, themeHandler } from '../state/theme_state'


export default function Article({ article, comments }) {
  const { query: { slug } } = useRouter()

  const [hidden, setHidden] = useState(' hidden');
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    const hljs = require('highlight.js');
    window.hljs = hljs;
    require('highlightjs-line-numbers.js');

    const checkForCodeAndStyle = () => {      // Code syntax highlighting
      // Initialize
      document.querySelectorAll( 'pre code' ).forEach(( block ) => {
        hljs.highlightBlock( block );
      });
      // Add line numbers
      document.querySelectorAll( 'code.hljs' ).forEach(( block ) => {
        hljs.lineNumbersBlock( block );
      });
    }

    /* Trying to setup dark mode using preferred colorscheme
		const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
		if (isDarkMode) {
      setTheme('dark');
      console.log('dark');
		}
    */
    checkForCodeAndStyle();
  });

  return (
    <div className={ `${page_styles.next_wrapper} ${theme}` }>
      <MenuOverlay hidden={ hidden } setHidden={ setHidden } />
      <MenuToggle hidden={ hidden } setHidden={ setHidden } />
      <div className={ page_styles.main_wrapper }>
        <Title />
        <Donate />
        <div className={ styles.main_wrapper }>
          <main className={ styles.main }>
            <div className={ styles.article_wrapper }>
              <div className={ styles.article__head }>
                <h2 className={ styles.article__title }>{ article.title }</h2>
                <hr/>
                <div className={ styles.article__meta }>
                  <span className={ styles.article__author }>{ article.author }</span>
                  <span className={ styles.article__date }>{ dateformat( new Date(article.updated_at), "h:MMtt | mmmm, dS yyyy") }</span>
                </div>
              </div>
              <div className={ styles.article__body }>
                <div className={ styles.article__description }>{ Parser(article.content) }</div>
              </div>
            </div>
          </main>
          <aside>
            <div className={ comment_styles.comments_section }>
              <Comments comments={ comments } article={ article } />
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export async function getStaticPaths() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/articles`
  const response = await fetch(url)
  const article = await response.json()

  const allSlugs = article.map( item => item.slug )
  const paths = allSlugs.map( slug => ( { params: { slug: slug } } ) )

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const article_endpoint_url = `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${params.slug}`
  const article_response = await fetch(article_endpoint_url)

  const comments_endpoint_url = `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${params.slug}`
  const comments_response = await fetch(comments_endpoint_url)

  const [article, comments] = await Promise.all([
    article_response.json(),
    comments_response.json(),
  ])

  return {
    props: {
      article,
      comments,
    }
  }
}
