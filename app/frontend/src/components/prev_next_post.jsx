/* Lib */
import articles from 'lib/articles';
import HorizontalScroller from 'components/horizontal_scroller.jsx';
import Card from 'components/card.jsx';

export default async function PrevNextPost(props) {
  let prev = false;
  let next = false;

  const allArticles = await articles({ simple: true });

  allArticles.forEach((article, i) => {
    if (article.slug === props.slug) {
      if (i !== allArticles.length) {
        prev = allArticles[i+1];
      }
      if (i !== 0) {
        next = allArticles[i-1];
      }
    }
  });

  if (prev) {
    prev = (
      <div className="flex flex-col gap-4">
        <a className="font-mono uppercase flex flex-row flex-nowrap justify-start text-black dark:text-white" href={ prev.slug }>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12l4 4m-4-4l4-4" />
          </svg>
          <span>Previous</span>
        </a>
        <Card element={ prev } truncate />
      </div>
    )
  } else {
    prev = <></>
  }

  if (next) {
    next = (
      <div className="flex flex-col gap-4">
        <a className="font-mono uppercase flex flex-row flex-nowrap justify-end text-black dark:text-white" href={ next.slug }>
          <span>Next</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-4 4l4-4m-4-4l4 4" />
          </svg>
        </a>
        <Card element={ next } truncate />
      </div>
    )
  } else {
    next = <></>
  }

  return (
    <HorizontalScroller
      className="w-full !my-0 py-10 border-t border-solid border-black/5 dark:border-white/5 mx-auto max-w-5xl"
      scrollerClass="!bg-transparent !border-none"
      containerClass="w-full !py-12 xl:w-2/3 sm:!px-12 justify-between"
    >
      { prev }
      { next }
    </HorizontalScroller>
  )
}
