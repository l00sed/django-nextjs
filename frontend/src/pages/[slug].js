import React, { useState } from 'react'
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

  let articles_exist = false // Set default to 'false'
  if (comments.length > 0 && comments != 'Not found') {
    // API setup to returns 'Not found' in python view
    articles_exist = true
  }

  const [pid, setPID] = useState('0')
  const [author, setAuthor] = useState('Anonymous')
  const [content, setContent] = useState('')
  const upvotes = 0
  const downvotes = 0

  //console.log(pid)
  //console.log(author)
  //console.log(content)

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const object = {
      'pid': pid,
      'author': author,
      'content': content,
      'upvotes': upvotes,
      'downvotes': downvotes,
      'article': article.id,
    }
    const options = {
      method: "POST",
      supportHeaderParams: true,
      header: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(object),
    }
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/submit`, options)
      .then(res => res.json())
      .then(response => console.log( `response`, response ))
      .catch(error => console.log( error ))
  }

  return(
    <>
      <div className={ page_styles.main_wrapper }>
        <Title/>
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
              {
                articles_exist ? (
                comments.map( comment =>
                  <div key={ comment.cid } className={ comment_styles.main_wrapper }>
                    <div className={ comment_styles.body_wrapper }>
                      <div className={ comment_styles.body_row_1 }>
                        <div className={ comment_styles.body_col_1 }>
                          <span className={ comment_styles.comment_author }>{ comment.author }</span>
                          <span className={ comment_styles.comment_date }>{ dateformat( new Date(comment.created_at), "h:MMtt | mmmm, dS yyyy") }</span>
                        </div>
                        <div className={ comment_styles.body_col_2 }>
                          <Link href="/" className={ comment_styles.reply_button }>
                            <span></span>
                          </Link>
                        </div>
                      </div>
                      <div className={ comment_styles.body_row_2 }>
                        <div className={ comment_styles.comment_wrapper }>
                          <p className={ comment_styles.comment_content }>{ comment.content }</p>
                        </div>
                      </div>
                    </div>
                    <div className={ comment_styles.vote_wrapper }>
                      <div className={ comment_styles.vote_count }>
                        <span className={ comment_styles.count_text }>{ comment.upvotes - comment.downvotes }</span>
                      </div>
                      <div className={ comment_styles.upvote_button }>
                        <Link href="/">
                          <span>🔺</span>
                        </Link>
                      </div>
                      <div className={ comment_styles.downvote_button }>
                        <Link href="/">
                          <span>🔻</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
                ) : (
                  <div></div>
                )
              }

              <div className={ comment_styles.comment_form_wrapper }>
                <form className={ comment_styles.comment_form } onSubmit={ handleCommentSubmit }>
                  <input required hidden type="text" name="pid" value="0" onChange={ (e) => { setPID(e.target.value) } } />
                  <input type="text" name="author" placeholder="Anonymous" className={ comment_styles.name_input } onChange={ (e) => { setAuthor(e.target.value) } } />
                  <textarea required type="text" name="content" rows="5" placeholder="Type a reply or comment in this area." className={ comment_styles.comment_input } onChange={ (e) => { setContent(e.target.value) } } />
                  <div className={ comment_styles.comment_form_button }>
                    <input type="submit" value="SUBMIT" className={ comment_styles.comment_submit } />
                  </div>
                </form>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </>
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
