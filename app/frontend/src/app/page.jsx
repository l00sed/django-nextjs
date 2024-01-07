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
import Featured           from 'components/featured.jsx';
import Card               from 'components/card.jsx';
/* Lib */
import articles from 'lib/articles';

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
    'px-1'
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
        <div className="mt-8 px-4 sm:px-8">
          { data ? <Featured element={ data[0] } /> : <></> }
        </div>
        <HorizontalScroller className="max-w-full mx-auto">
          <h2 className={ archiveClass }>
            <span className={ letterClass }>e</span>
            <span className={ letterClass }>v</span>
            <span className={ letterClass }>i</span>
            <span className={ letterClass }>h</span>
            <span className={ letterClass }>c</span>
            <span className={ letterClass }>r</span>
            <span className={ letterClass }>A</span>
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
