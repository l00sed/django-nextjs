import footer_styles from '../styles/Footer.module.css'

export default function Footer() {

  const scrollToTop = () => {
    // Scroll to top button
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  }

  return (
    <div className={ footer_styles.footer }>
      <div className={ footer_styles.row }>
        <div id="scrollTop" title="Click to jump to the top of the page." className={ footer_styles.scrollTop } onClick={ scrollToTop }>
          <svg width="54" height="83" viewBox="0 0 54 83" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M49.5355 27.4645L42.4645 34.5355L32 24.0711V79H22V24.0711L11.5355 34.5355L4.46447 27.4645L27 4.92893L49.5355 27.4645Z" />
          </svg>
          <p className={ footer_styles.scroll_top_label }>TOP</p>
        </div>
      </div>
      <div className={ footer_styles.link_row }>
        <div className={ footer_styles.link }>
          <a href="https://github.com/l00sed" target="_blank" rel="noreferrer"><p>GitHub</p></a>
        </div>
        <div className={ footer_styles.link }>
          <a href="https://linkedin.com/in/dwtompkins" target="_blank" rel="noreferrer"><p>LinkedIn</p></a>
        </div>
        <div className={ footer_styles.link }>
          <a href="/rss/rss.xml" target="_blank"><p>RSS</p></a>
        </div>
        <div className={ footer_styles.link }>
          <a href="https://keybase.io/l00sed" target="_blank" rel="noreferrer"><p>Keybase</p></a>
        </div>
        <div className={ footer_styles.link }>
          <a href="/kb" target="_blank"><p>Knowledge Base</p></a>
        </div>
        <div className={ footer_styles.link }>
          <a href="/about" target="_blank"><p>About</p></a>
        </div>
      </div>
      <div className={ footer_styles.hr }></div>
      <div id="webrings" className={ footer_styles.webrings_row }>
        <div className={ footer_styles.webring }>
          <div id="geekring" className={ footer_styles.geekring }>
            <div className={ footer_styles.geekring_row }>
              <p className="p-3">This site is a proud member of the <a href="https://geekring.net/"><b>geekring</b></a>. Check out some other geeky websites here:</p>
            </div>
            <div className={ footer_styles.geekring_row }>
              <a target="_blank" href="https://geekring.net/site/10/previous" rel="noreferrer">Prev</a>  &mdash;  <a target="_blank" href="https://geekring.net/site/10/random" rel="noreferrer">Random</a>  &mdash;  <a target="_blank" href="https://geekring.net/site/10/next" rel="noreferrer">Next</a>
            </div>
          </div>
        </div>
        <div className={ footer_styles.webring }>
          <div className={ footer_styles.webring_icon }>
            <a href="https://webring.xxiivv.com/#loosed" target="_blank" rel="noreferrer">
              <svg
                fill="none"
                width="100%"
                height="90px"
                strokeLinecap="square"
                viewBox="0 0 300 300"
                strokeWidth="28"
                xmlns="http://www.w3.org/2000/svg"
                className={ footer_styles.icon }
                alt="XXIIVV webring"
              >
                <path d="M201.962 210a60 60 0 10-103.924-60l-50 86.603"/>
                <path d="M98.038 210a60 60 0 10103.924-60l-50-86.603"/>
                <path d="M150 120a60 60 0 100 120h100"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  )

}
