import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import dateformat from 'dateformat'
import Parser from 'html-react-parser'
import styles from '../styles/Article.module.css'
import page_styles from '../styles/Page.module.css'
import comment_styles from '../styles/Comment.module.css'
import Title from '../components/title'

export default function Article({ article, comments }) {
  const { query: { slug } } = useRouter()

  console.log( article );

  return(
    <>
      <main className={ page_styles.main }>
        <Title/>
        <div className={ page_styles.main_wrapper }>
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
      {
        comments.map( comment =>
          <div key={ comment.cid } className={ comment_styles.main_wrapper }>
            <div className={ comment_styles.body_wrapper }>
              <div className={ comment_styles.body_row_1 }>
                <div className={ comment_styles.body_col_1 }>
                  <span className={ comment_styles.comment_author }>{ comment.author }</span>
                  <span className={ comment_styles.comment_date }>{ dateformat( new Date(comment.created_at), "h:MMtt | mmmm, dS yyyy") }</span>
                </div>
                <div className={ comment_styles.body_col_2 }>
                  {/*<Link className={ comment_styles.reply_button }></Link>*/}
                </div>
              </div>
              <div className={ comment_styles.body_row_2 }>
                <div className={ comment_styles.comment_wrapper }>
                  <p className={ comment_styles.comment_content }></p>
                </div>
              </div>
            </div>
            <div className={ comment_styles.upvote_wrapper }>
              <span className={ comment_styles.count_text }>{ /*comments.count */}</span>
              {/*<Link className={ comment_styles.upvote_button }></Link>*/}
              {/*<Link className={ comment_styles.downvote_button }></Link>*/}
            </div>
          </div>
        )
      }
      </aside>
    </>
  )
}

                     /*
export function Comments({ comments }) {
  const { query: { slug } } = useRouter()

  console.log( comments );

  return(
    <>
    </>
  )
}
*/


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

  console.log( 'article' );
  console.log( article );
  console.log( 'comments' );
  console.log( comments );

  return {
    props: {
      article,
      comments,
    }
  }
}
