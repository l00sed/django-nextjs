import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import comment_styles from '../styles/Comment.module.css'
import dateformat from 'dateformat'

export default function Comments({ comments }) {
  const { query: { slug } } = useRouter()
  console.log( comments );

  useEffect(() => {
    console.log( comments );
  }, [])

  return(
    <>
      {
        comments.map( comment =>
          <div key={ comment.cid } className={ comment_styles.main_wrapper }>
            <div className={ comment_styles.body_wrapper }>
              <div className={ comment_styles.body_row_1 }>
                <div className={ comment_styles.body_col_1 }>
                  <span className={ comment_styles.comment_author }>{ comment.author }</span>
                  <span className={ comment_styles.comment_date }>{ dateformat( new Date(comment.updated_at), "h:MMtt | mmmm, dS yyyy") }</span>
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
    </>
  )
}

export async function getStaticProps({ params }) {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${params.slug}`
  const response = await fetch(url)
  const comments = await response.json()

  return {
    props: {
      comments,
    }
  }
}

