/* Date utils */
import dateformat     from 'dateformat';
import { parseTitle } from '../utils/parser.js';
import article_styles from '../styles/ArticleHead.module.scss';
import { Tags }       from '../components/tag.js';

export default function ArticleHead(props) {
  const datePublished = (meta) => {
    let date = "";
    if (meta.updated_at) {
      date = dateformat(new Date(meta.updated_at), "h:MMtt | mmmm, dS yyyy").toString();
    }
    return date
  }

  return (
    <>
      <header className={ article_styles.article__head }>
        <h1 className={ article_styles.article__title }>{ parseTitle(props.meta) }</h1>
        <div className={ article_styles.tags__wrapper }>
          <div className={ article_styles.article__meta }>
            <span className={ article_styles.article__date }>{ datePublished(props.meta) }</span>
            <span className={ article_styles.article__author }>{ props.meta.author }</span>
          </div>
          <Tags tags={ props.meta.tags } />
        </div>
      </header>
    </>
  )
}
