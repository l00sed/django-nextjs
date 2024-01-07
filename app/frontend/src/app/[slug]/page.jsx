/* Styles */
import page_styles from 'styles/Page.module.scss';
/* Local Components */
import MenuOverlay   from 'components/menu_overlay.jsx';
import MenuToggle    from 'components/menu_toggle.jsx';
import Title         from 'components/title.jsx';
import Donate        from 'components/donate.jsx';
import Article       from 'components/article.jsx';
import Footer        from 'components/footer.jsx';
import ShareOverlay  from 'components/share_overlay.jsx';
import SearchOverlay from 'components/search_overlay.jsx';
import SearchToggle  from 'components/search_toggle.jsx';


export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_BASE_URL),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    images: '/og-image.png',
  },
  generator: 'Next.js',
  applicationName: 'Loosed Blog',
  referrer: 'origin-when-cross-origin',
  keywords: ['Next.js', 'React', 'JavaScript'],
  authors: [
    { name: 'Dan', url: 'https://dato.work' }
  ],
  colorScheme: 'dark',
  description: 'test',
  themeColor: '#ffffff',
  creator: 'Dan Tompkins',
  publisher: 'Dan Tompkins',
}

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
      <SearchOverlay />
      <MenuToggle />
      <div id="main_wrapper" className={ page_styles.main_wrapper }>
        <Title />
        <SearchToggle />
        <Donate />
        <ShareOverlay slug={ params.slug } />
        { article }
        <Footer />
      </div>
    </div>
  )
}
