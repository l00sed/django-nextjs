/* Styles */
import styles from 'styles/Home.module.scss';
import page_styles from 'styles/Page.module.scss';
/* Components */
import Title from 'components/title';
import Donate from 'components/donate';
import MenuOverlay from 'components/menu_overlay';
import MenuToggle from 'components/menu_toggle';
import SearchOverlay from 'components/search_overlay';
import SearchToggle from 'components/search_toggle';
import HorizontalScroller from 'components/horizontal_scroller';
import Footer from 'components/footer';
import Intro from 'components/intro.jsx';
import Featured from 'components/featured';
import Card from 'components/card';
/* Lib */
import articles from 'lib/articles';

export default async function HomePage() {
  const data = await articles();

  let archiveClass = [
    'flex',
    'flex-col',
    'flex-wrap',
    'w-16',
    'after:hidden',
    'leading-none',
    'uppercase',
    'text-center',
    'px-1'
  ].join(' ');

  return (
    <div className={ `${page_styles.next_wrapper} ${styles.homepage}` }>
      <MenuOverlay />
      <SearchOverlay />
      <MenuToggle />
      <div id="main_wrapper" className={ page_styles.main_wrapper }>
        <Title />
        <SearchToggle />
        <Donate />
        <Intro />
        <div className={ styles.featured_post }>
          { data ? <Featured element={ data[0] } /> : <></> }
        </div>
        <div className={ styles.previous_posts }>
          <HorizontalScroller className={ styles.scroller }>
            <h2 className={ archiveClass }>
              <span className="-rotate-90">e</span>
              <span className="-rotate-90">v</span>
              <span className="-rotate-90">i</span>
              <span className="-rotate-90">h</span>
              <span className="-rotate-90">c</span>
              <span className="-rotate-90">r</span>
              <span className="-rotate-90">A</span>
            </h2>
            {
              data?.map((element, index) => {
                if (index > 0) {
                  return <Card key={ element.id } element={ element } truncate={ true } index={ index } />
                }
              })
            }
          </HorizontalScroller>
        </div>
        <Footer />
      </div>
    </div>
  )
}
