import Toc           from 'components/toc.jsx';
import Likes         from 'components/likes.jsx';
import Share         from 'components/share.jsx';
import CommentsCount from 'components/comments_count.jsx';

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

  let share = <Share meta={ meta } />;
  if (show.indexOf('share') < 0) {
    share = <></>;
  }

  let toc = <Toc headings={ headings } />;
  if (show.indexOf('toc') < 0) {
    toc = <></>;
  }

  let metaClass = [
    'inline-flex',
    'flex-wrap-reverse',
    'top-8',
    'z-20',
    'sticky',
    'justify-end',
    'pl-[4vw]',
    'gap-x-2',
    'gap-y-3',
    'w-[calc(100%-4em)]',
    'mx-8',
    'mb-12',
    'sm:w-[calc(100%-5em)]',
    'sm:mx-10',
    'sm:pl-0',
    'sm:gap-x-2',
    'sm:gap-y-4',
    'sm:flex-wrap',
    '2xl:-mx-6',
    '2xl:w-full',
  ].join(' ')

  return (
    <div className={ metaClass }>
      { likes }
      { comment_count }
      { share }
      { toc }
    </div>
  )
}
