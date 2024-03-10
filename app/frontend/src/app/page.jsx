/* Styles */
import page_styles from 'styles/Page.module.scss';
/* Components */
import Title              from 'components/title.jsx';
import Donate             from 'components/donate.jsx';
import MenuOverlay        from 'components/menu_overlay.jsx';
import MenuToggle         from 'components/menu_toggle.jsx';
import SearchOverlay      from 'components/search_overlay.jsx';
import SearchToggle       from 'components/search_toggle.jsx';
import HorizontalScroller from 'components/horizontal_scroller.jsx';
import Footer             from 'components/footer.jsx';
import Intro              from 'components/intro.jsx';
import Card               from 'components/card.jsx';
/* Lib */
import articles from 'lib/articles';

function Star(props) {
  return (
    <svg
      width={ props.size }
      height={ props.size }
      className={ props.extraClass }
      viewBox="0 0 150 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M75.5 13C75.5 55 95 75.4999 138 75.4999C95 75.4999 75.5 95 75.5 138C75.5 95 55 75.5001 13 75.5001C55 75.5001 75.5 55 75.5 13ZM79.2463 71.5312C82.8052 75 89.7451 75 103.278 75C75.5 75 75.5 75.0001 75.5 105C75.5 75.0001 75.5 75 47.7222 75C75.5 75 75.5 75 75.5 45C75.5 60.3847 75.5 67.8798 79.2463 71.5312Z"
        fill="currentColor"
      />
    </svg>
  )
}

function WideStar(props) {
  return (
    <svg
      className={ props.extraClass }
      width="450"
      height="100"
      viewBox="0 0 500 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M475 75C300 75 250 40 250 10C250 40 200 75 25 75C200 75 250 110 250 140C250 110 300 75 475 75ZM302 75C261.556 75 250 66.9231 250 60C250 66.9231 238.444 75 198 75C238.444 75 250 83.0769 250 90C250 83.0769 261.556 75 302 75Z"
        fill="currentColor"
      />
    </svg>
  )
}

export default async function HomePage() {
  const data = await articles();

  let archiveClass = [
    'flex',
    'flex-col',
    'flex-wrap',
    'w-16',
    'relative',
    '-top-1.5',
    'after:hidden',
    'leading-none',
    'uppercase',
    'text-center',
    'px-1',
  ].join(' ');

  let letterClass = [
    '-rotate-90',
    'text-center',
  ].join(' ');

  return (
    <div className={ `${page_styles.next_wrapper} w-full min-h-screen flex flex-col` }>
      <MenuOverlay />
      <SearchOverlay />
      <MenuToggle />
      <div id="main_wrapper" className={ page_styles.main_wrapper }>
        <Title />
        <SearchToggle />
        <Donate />
        <Intro />
        <div className="px-8 sm:px-16 max-w-full overflow-x-hidden">
          <WideStar extraClass="my-8 lg:my-14 mx-auto max-w-44 lg:max-w-full" />
          { data ? <Card key={ data[0].id } element={ data[0] } featured={ true } index={ 0 } /> : <></> }
          <WideStar extraClass="mt-4 mb-8 lg:mt-8 lg:mb-14 mx-auto max-w-44 lg:max-w-full" />
        </div>
        <HorizontalScroller className="max-w-full mx-auto !my-0">
          <h2 className={ archiveClass }>
            <span className={ letterClass }>e</span>
            <span className={ letterClass }>v</span>
            <span className={ `${letterClass} -my-3` }>i</span>
            <span className={ letterClass }>h</span>
            <span className={ letterClass }>c</span>
            <span className={ letterClass }>r</span>
            <span className={ letterClass }>A</span>
            <Star size={ 60 } extraClass="mx-auto my-1 text-loosed-400 dark:text-loosed-600" />
            <Star size={ 60 } extraClass="mx-auto my-1 text-loosed-400 dark:text-loosed-600" />
            <Star size={ 60 } extraClass="mx-auto my-1 text-loosed-400 dark:text-loosed-600" />
          </h2>
          {
            data?.map((element, index) => {
              if (index > 0) {
                return <Card key={ element.id } element={ element } truncate={ true } index={ index } />
              }
            })
          }
        </HorizontalScroller>
        <Footer />
      </div>
    </div>
  )
}
