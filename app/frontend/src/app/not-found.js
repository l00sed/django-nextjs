/* Styles */
import styles from 'styles/Home.module.scss';
import page_styles from 'styles/Page.module.scss';

import Link from 'next/link';
/* Components */
import Title         from 'components/title';
import ImageWrapper  from 'components/image_wrapper';
import Donate        from 'components/donate';
import MenuOverlay   from 'components/menu_overlay';
import MenuToggle    from 'components/menu_toggle';
import SearchOverlay from 'components/search_overlay';
import SearchToggle  from 'components/search_toggle';
import Footer        from 'components/footer';

export default function NotFound() {
  return (
    <div className={ `${page_styles.next_wrapper} ${styles.homepage}` }>
      <MenuOverlay />
      <SearchOverlay />
      <MenuToggle />
      <div id="main_wrapper" className={ page_styles.main_wrapper }>
        <Title />
        <SearchToggle />
        <Donate />
        <div className={ page_styles.not_found }>
          <h1>Page not found</h1>
          <ImageWrapper
            width={ 390 }
            height={ 376 }
            align="left"
            src="/assets/img/page/not-found/jt.gif"
          />
          <p>Go back to the <Link href="/">homepage</Link>?</p>
        </div>
        <Footer />
      </div>
    </div>
  )
}
