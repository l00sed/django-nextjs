import dateformat from 'dateformat'
import article_styles from '../styles/Article.module.css'
import comment_styles from '../styles/Comment.module.css'
import Comments from '../components/comments'
import Parse from '../utils/parser.js'


export default function Article( props ) {
  const { meta, comments, children } = props;

  return (
    <>
      <div className={ article_styles.main_wrapper }>
        <main className={ article_styles.main }>
          <div className={ article_styles.article_wrapper }>
            <div className={ article_styles.article__head }>
              <h2 className={ article_styles.article__title }>{ meta.title }</h2>
              <hr/>
              <div className={ article_styles.article__meta }>
                <span className={ article_styles.article__date }>{ dateformat( new Date(meta.updated_at), "h:MMtt | mmmm, dS yyyy") }</span>
                <span className={ article_styles.article__author }>{ meta.author }</span>
              </div>
            </div>
            <div className={ article_styles.article__body }>
              <div className={ article_styles.article__description }>
                { children }
              </div>
            </div>
          </div>
        </main>
        <aside>
          <div className={ comment_styles.comments_section }>
            <Comments comments={ comments } meta={ meta } />
          </div>
        </aside>
      </div>
    </>
  )
}
