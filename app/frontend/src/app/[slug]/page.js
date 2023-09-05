/* React */
import React from 'react';

/* Styles */
import page_styles from '../../styles/Page.module.scss';

/* Local Components */
import MenuOverlay from '../../components/menu_overlay';
import MenuToggle from '../../components/menu_toggle';
import Title from '../../components/title';
import Donate from '../../components/donate';
import Article from '../../components/article';
import Footer from '../../components/footer';
import ShareOverlay from '../../components/share_overlay';


/* Default /[slug] page is a "Blog" page */
export default function BlogPage({ params }) {
  /* Default article */
  let article = <Article slug={ params.slug } head={ true } meta={ true } />
  /* Different page settings for "live" page */
  if (params.slug === 'live') {
    article =
      <Article
        slug={ params.slug }
        head={ false }
        meta={ true }
        show={ ['likes', 'comments', 'share'] }
        style={{ marginBottom: 0, paddingBottom: 0 }}
        metaPosition='after'
        disableLiveButton
      />
  }

  return (
    <div className={ page_styles.next_wrapper }>
      <MenuOverlay slug={ params.slug } />
      <MenuToggle />
      <div id="main_wrapper" className={ page_styles.main_wrapper }>
        <Title />
        <Donate />
        <ShareOverlay />
        { article }
        <Footer />
      </div>
    </div>
  )
}
