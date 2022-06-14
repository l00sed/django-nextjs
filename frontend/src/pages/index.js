import Title from '../components/title'
import Donate from '../components/donate'
import page_styles from '../styles/Page.module.css'
import MenuOverlay from '../components/menu_overlay'
import MenuToggle from '../components/menu_toggle'
import Footer from '../components/footer'
import Card from '../components/card'
import React, { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'
import { useRecoilState } from 'recoil'
import { themeState } from '../state/theme_state'

export default function Home({ data, done }) {
  const [hidden, setHidden] = useState(' hidden');
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    console.log( 'process.env.NEXT_PUBLIC_BASE_URL: ', process.env.NEXT_PUBLIC_BASE_URL );
    console.log( 'data: ', data);
    console.log( 'done: ', done);
  }, [])

  return (
    <div className={ `${page_styles.next_wrapper} ${theme}` }>
      <div className={ styles.homepage }>
        <MenuOverlay hidden={ hidden } setHidden={ setHidden } />
        <MenuToggle hidden={ hidden } setHidden={ setHidden } />
        <Title />
        <Donate />
        <div id="homepage__content" className={ styles.homepage__content }>
          {
            data.map( element =>
              <Card key={ element.id } element={ element }/>
            )
          }
        </div>
        <Footer />
      </div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles`)
  const data = await response.json()

  return {
    props: {
      data: data,
      done: true,
    }
  }
}
