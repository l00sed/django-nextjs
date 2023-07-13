/* Styles */
import styles from '../styles/Home.module.scss';
import page_styles from '../styles/Page.module.scss';
/* Components */
import Title from '../components/title';
import Donate from '../components/donate';
import MenuOverlay from '../components/menu_overlay';
import MenuToggle from '../components/menu_toggle';
import Footer from '../components/footer';
import Card from '../components/card';
/* Lib */
import articles from '../lib/articles';

export default async function Home() {
  const data = await articles();

  return (
    <div className={ `${page_styles.next_wrapper} ${styles.homepage}` }>
      <MenuOverlay />
      <MenuToggle />
      <div id="main_wrapper" className={ page_styles.main_wrapper }>
        <Title />
        <Donate />
        <div id="homepage__content" className={ styles.homepage__content }>
          {
            data.map((element, index) => {
              return <Card key={ element.id } element={ element } index={ index } />
            })
          }
        </div>
        <Footer />
      </div>
    </div>
  )
}
