import Title from '../components/title'
import Donate from '../components/donate'
import MenuOverlay from '../components/menu_overlay'
import MenuToggle from '../components/menu_toggle'
import Card from '../components/card'
import React, { useEffect, useState, componentDidMount } from 'react'
import styles from '../styles/Home.module.css'
import { useRecoilState } from 'recoil'
import { themeState, themeHandler } from '../state/theme_state'

export default function Home({ data, done }) {
  const [hidden, setHidden] = useState(' hidden');
  const [theme, setTheme] = useRecoilState(themeState);

  useEffect(() => {
    console.log( 'process.env.NEXT_PUBLIC_BASE_URL: ', process.env.NEXT_PUBLIC_BASE_URL );
    console.log( 'data: ', data);
    console.log( 'done: ', done);
  }, [])

  return (
    <>
      <div className={ styles.homepage }>
        <MenuOverlay hidden={ hidden } setHidden={ setHidden } theme={ theme } setTheme={ setTheme } />
        <MenuToggle hidden={ hidden } setHidden={ setHidden } theme={ theme } setTheme={ setTheme } />
        <Title />
        <Donate />
        <div id="homepage__content" className={ styles.homepage__content }>
        {
          data.map( element =>
            <Card key={ element.id } element={ element }/>
          )
        }
        </div>
      </div>
    </>
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
