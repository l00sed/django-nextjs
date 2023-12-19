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
import Featured from 'components/featured';
import Card from 'components/card';
/* Lib */
import articles from 'lib/articles';

export default async function HomePage() {
  const data = await articles();

  return (
    <div className={ `${page_styles.next_wrapper} ${styles.homepage}` }>
      <MenuOverlay />
      <SearchOverlay />
      <MenuToggle />
      <div id="main_wrapper" className={ page_styles.main_wrapper }>
        <Title />
        <SearchToggle />
        <Donate />
        <div className={ styles.intro }>
          <span className={ styles.first }>A blog about</span><br/>
          <span className={ `${styles.intro_highlight} ${styles.delay_1}` }>creat&shy;ive</span><br/>
          <span className={ `${styles.intro_highlight} ${styles.delay_2}` }>media</span>
          <span className={ `${styles.amper} ${styles.delay_3}` }>&</span><br/>
          <span className={ `${styles.intro_highlight} ${styles.delay_4}` }>tech&shy;nology</span><br/>
          <span className={ `${styles.last} ${styles.delay_5}` }>built by Dan Tompkins</span>
        </div>
        <div className={ styles.featured_post }>
          { data ? <Featured element={ data[0] } /> : <></> }
        </div>
        <div className={ styles.previous_posts }>
          <HorizontalScroller className={ styles.scroller }>
            <div className={ styles.pp_description }>
              <h2>Past Posts</h2>
              <p>Miss a previous blog post? No worries! Scroll through the last posts here. See a category that interests you? Click on the tag to see posts on that topic. Still not finding what you&apos;re looking for? Use the search to find a page by keyword.</p>
            </div>
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
