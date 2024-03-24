/* Styles */
import page_styles from 'styles/Page.module.scss';
/* Local Components */
import MenuOverlay   from 'components/menu_overlay.jsx';
import MenuToggle    from 'components/menu_toggle.jsx';
import Title         from 'components/title.jsx';
import Donate        from 'components/donate.jsx';
import Article       from 'components/article.jsx';
import Footer        from 'components/footer.jsx';
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
  keywords: [
    'blog',
    'programming',
    'technology',
    'art',
    'design',
    'architecture',
    'code',
    'robotics',
    'fabrication',
    'politics',
    'linux',
    'vim',
    'electronics'
  ],
  authors: [
    { name: 'Daniel Tompkins', url: 'https://dato.work' }
  ],
  description: 'A lifestyle blog by creative technologist Dan Tompkins, focusing on media art, design, and programming.',
  creator: 'Daniel Tompkins',
  publisher: 'Daniel Tompkins',
}

/* Default /[slug] page is a "Blog" page */
export default function BlogPage({ params }) {
  /* Default article */
  let article = (
    <Article
      slug={ params.slug }
      head={ true }
      meta={ true }
      disclaimer={ true }
    />
  )
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
        disclaimer={ false }
        disableLiveButton
      />
  }

  if (['privacy-policy', 'terms-and-conditions'].includes(params.slug)) {
    article =
      <Article
        slug={ params.slug }
        head={ true }
        meta={ true }
        show={ ['toc'] }
        disclaimer={ false }
        disableLiveButton
        disableComments
      />
  }

  return (
    <div className={ page_styles.next_wrapper }>
      <MenuOverlay slug={ params.slug } />
      <SearchOverlay />
      <MenuToggle progress={ true } />
      <div id="main_wrapper" className={ page_styles.main_wrapper }>
        <Title />
        <SearchToggle />
        <Donate />
        { article }
        <Footer />
      </div>
    </div>
  )
}
