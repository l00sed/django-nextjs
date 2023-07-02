/* Date utils */
import dateformat     from 'dateformat';
import article_styles from '../styles/ArticleHead.module.scss';

export default function ArticleHead(props) {
  const datePublished = (meta) => {
    let date = "";
    if (meta.updated_at) {
      date = dateformat(new Date(meta.updated_at), "h:MMtt | mmmm, dS yyyy").toString();
    }
    return date
  }

  return (
    <header className={ article_styles.article__head }>
      <h1 className={ article_styles.article__title }>{ props.meta.title }</h1>
      <div className={ article_styles.article__meta }>
        <span className={ article_styles.article__date }>{ datePublished(props.meta) }</span>
        <span className={ article_styles.article__author }>{ props.meta.author }</span>
      </div>
    </header>
  )
}
