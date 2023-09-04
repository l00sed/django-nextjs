import article_styles from '../styles/ArticleMeta.module.scss';
import Toc from './toc';
import Likes from './likes';
import Share from './share';
import CommentsCount from './comments_count';

export default function ArticleMeta({
  meta,
  headings,
  show=['likes', 'comments', 'share', 'toc']
}) {
  let likes = <Likes meta={ meta } />;
  if (show.indexOf('likes') < 0 ) {
    likes = <></>;
  }

  let comment_count = <CommentsCount />;
  if (show.indexOf('comments') < 0) {
    comment_count = <></>;
  }

  let share = <Share />;
  if (show.indexOf('share') < 0) {
    share = <></>;
  }

  let toc = <Toc headings={ headings } />;
  if (show.indexOf('toc') < 0) {
    toc = <></>;
  }

  return (
    <div className={ article_styles.meta__row }>
      { likes }
      { comment_count }
      { share }
      { toc }
    </div>
  )
}
