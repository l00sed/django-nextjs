import article_styles from '../../styles/Article.module.css';
//import article_loading_styles from '../styles/loading/Article.module.css';
import comment_styles from '../../styles/Comment.module.css';
//import comment_loading_styles from '../styles/loading/Comment.module.css';

import LoadingComments from './comments';


export default function LoadingArticle() {
  return (
    <>
      <div className={ article_styles.main_wrapper }>
        <main className={ article_styles.main }>
          <div className={ article_styles.article_wrapper }>
            <div className={ article_styles.article__head }>
              <h2 className={ article_styles.article__title }>Title</h2>
              <div className={ article_styles.article__meta }>
                <span className={ article_styles.article__date }>Date</span>
                <span className={ article_styles.article__author }>Author</span>
              </div>
            </div>
            <div className={ article_styles.article__body }>
              <div className={ article_styles.article__description }>
                <p>Lorem ipsum</p>
              </div>
            </div>
          </div>
        </main>
        <aside>
          <div className={ comment_styles.comments_section }>
            <LoadingComments />
          </div>
        </aside>
      </div>
    </>
  )
}

