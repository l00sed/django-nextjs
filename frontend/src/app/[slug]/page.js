/* React */
import React from 'react'

/* Styles */
import page_styles from '../../styles/Page.module.css'

/* Local Components */
import MenuOverlay from '../../components/menu_overlay'
import MenuToggle from '../../components/menu_toggle'
import Title from '../../components/title'
import Donate from '../../components/donate'
import Article from '../../components/article'
import Footer from '../../components/footer'

/* lib */
import { theme } from '../../lib/theme';

/* Default /[slug] page is a "Blog" page */
export default async function BlogPage({ params }) {
  return (
    <>
      <div className={ `${page_styles.next_wrapper} ${theme}` }>
        <MenuOverlay />
        <MenuToggle />
        <div className={ page_styles.main_wrapper }>
          <Title />
          <Donate />
          <Article slug={ `${params.slug}` } />
        </div>
        <Footer />
      </div>
    </>
  )
}