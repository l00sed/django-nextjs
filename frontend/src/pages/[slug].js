import React from 'react'
import { useRouter } from 'next/router'
import dateformat from 'dateformat'
import Parser from 'html-react-parser'
import page_styles from '../styles/Page.module.css'
import styles from '../styles/Article.module.css'
import Title from '../components/title'

export default function Article({ data }) {
  const { query: { slug } } = useRouter()
  //console.log( 'router: ' + router );

  return(
    <main className={ page_styles.main }>
      <Title/>
      <div className={ page_styles.main_wrapper }>
        <div className={ styles.article__head }>
          <h2 className={ styles.article__title }>{ data.title }</h2>
          <hr/>
          <div className={ styles.article__meta }>
            <span className={ styles.article__author }>{ data.author }</span>
            <span className={ styles.article__date }>{ dateformat( new Date(data.updated_at), "h:MMtt | mmmm, dS yyyy") }</span>
          </div>
        </div>
        <div className={ styles.article__body }>
          <div className={ styles.article__description }>{ Parser(data.content) }</div>
        </div>
      </div>
    </main>
  )
}

export async function getStaticPaths() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/articles`
  const response = await fetch(url)
  const data = await response.json()
  const allSlugs = data.map( item => item.slug )
  const paths = allSlugs.map( slug => ( { params: { slug: slug } } ) )

  return {
    paths,
    fallback: false
  }
}

export async function getStaticProps({ params }) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${params.slug}`
  const response = await fetch(url)
  const data = await response.json()

  return {
    props: {
      data,
    }
  }
}

