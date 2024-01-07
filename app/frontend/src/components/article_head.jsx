/* Date utils */
import dateformat     from 'dateformat';
import { parseTitle } from 'utils/parser';
import article_styles from 'styles/ArticleHead.module.scss';
import { Tags }       from 'components/tag.jsx';

export default function ArticleHead(props) {
  const metaClass = [
    'flex',
    'flex-row',
    'flex-wrap',
    'gap-1',
    'self-center'
  ].join(' ')

  const spanClass = [
    'w-fit',
    'block',
    'text-sm',
    'font-mono'
  ].join(' ');

  const datePublished = (meta) => {
    let date = "";
    if (meta.updated_at) {
      date = dateformat(new Date(meta.updated_at), "mmmm, dS yyyy").toString();
    }
    return date
  }

  const timePublished = (meta) => {
    let time = "";
    if (meta.updated_at) {
      time = dateformat(new Date(meta.updated_at), "h:MMtt").toString();
    }
    return time
  }

  return (
    <>
      <header className="mx-8 mt-0 mb-4 outer-sheen sm:mx-12">
        <div className="p-6 inner-sheen">
          <h1 className="pb-1 hyphens-auto">{ parseTitle(props.meta) }</h1>
          <div className={ article_styles.tags__wrapper }>
            <div className={ metaClass }>
              <span className={ spanClass }>{ timePublished(props.meta) } | { datePublished(props.meta) }</span>
              <span className={ `${spanClass} w-full` }>{ props.meta.author }</span>
            </div>
            <Tags tags={ props.meta.tags } />
          </div>
        </div>
      </header>
    </>
  )
}
