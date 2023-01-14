/* Styles */
import styles from '../styles/Home.module.css';
import page_styles from '../styles/Page.module.css';
/* Components */
import Title from '../components/title';
import Donate from '../components/donate';
import MenuOverlay from '../components/menu_overlay';
import MenuToggle from '../components/menu_toggle';
import Footer from '../components/footer';
import Card from '../components/card';
/* Lib */
import { articles } from '../lib/articles';
import { theme } from '../lib/theme';

export default async function Home() {
  const data = await articles();
  const currentTheme = theme();

  return (
    <div id='theme-root' className={ `${page_styles.next_wrapper} ${styles.homepage} ${currentTheme}` }>
      <MenuOverlay />
      <MenuToggle />
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
  )
}

