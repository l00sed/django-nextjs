/* Styles */
import page_styles from 'styles/Page.module.scss';

import Link from 'next/link';
/* Components */
import Title         from 'components/title.jsx';
import ImageWrapper  from 'components/image_wrapper.jsx';
import Donate        from 'components/donate.jsx';
import MenuOverlay   from 'components/menu_overlay.jsx';
import MenuToggle    from 'components/menu_toggle.jsx';
import SearchOverlay from 'components/search_overlay.jsx';
import SearchToggle  from 'components/search_toggle.jsx';
import Footer        from 'components/footer.jsx';

export default function NotFound() {
  return (
    <div className={ `${page_styles.next_wrapper} w-full min-h-screen flex flex-col` }>
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
