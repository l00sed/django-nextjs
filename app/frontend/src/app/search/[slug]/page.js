/* Styles */
import styles from 'styles/TagsPage.module.scss';
import page_styles from 'styles/Page.module.scss';

/* Components */
import Title from 'components/title';
import Donate from 'components/donate';
import HorizontalScroller from 'components/horizontal_scroller';
import MenuOverlay from 'components/menu_overlay';
import MenuToggle from 'components/menu_toggle';
import SearchOverlay from 'components/search_overlay';
import SearchToggle from 'components/search_toggle';
import Footer from 'components/footer';
import Card from 'components/card';
/* Lib */
import articles from 'lib/articles';

export default async function SearchPage({ params }) {
  const data = await articles({ search: params.slug });

  return (
    <div className={ `${page_styles.next_wrapper}` }>
      <MenuOverlay />
      <SearchOverlay />
      <MenuToggle />
      <div id="main_wrapper" className={ page_styles.main_wrapper }>
        <Title />
        <SearchToggle />
        <Donate />
        <div className={ styles.results }>
          <HorizontalScroller className={ styles.scroller }>
            <div className={ styles.title }>
              <h1>{ params.slug }</h1>
              {
                data?.length
                ?
                  data?.length === 1
                  ?
                  <p>Search &quot;{ params.slug }&quot; matches { data?.length } page</p>
                  :
                  <p>Search &quot;{ params.slug }&quot; matches { data?.length } pages</p>
                :
                <p>No pages matching &quot;{ params.slug }&quot;</p>
              }
            </div>
            {
              data?.map((element, index) => {
                return <Card key={ element.id } element={ element } truncate={ true } index={ index } />
              })
            }
          </HorizontalScroller>
        </div>
        <Footer />
      </div>
    </div>
  )
}
