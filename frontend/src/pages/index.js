import Title from '../components/title'
import MenuOverlay from '../components/menu_overlay'
import MenuToggle from '../components/menu_toggle'
import Card from '../components/card'
import { useEffect, useState } from 'react'
import styles from '../styles/Home.module.css'

export default function Home({ data, done }) {
  const [hidden, setHidden] = useState(' hidden');

  useEffect(() => {
    console.log( 'process.env.NEXT_PUBLIC_BASE_URL: ', process.env.NEXT_PUBLIC_BASE_URL );
    console.log( 'data: ', data);
    console.log( 'done: ', done);
  }, [])

  return (
    <div className={ styles.homepage }>
      <MenuOverlay hidden={ hidden } setHidden={ setHidden } />
      <MenuToggle hidden={ hidden } setHidden={ setHidden } />
      <Title/>
      <div className={ styles.homepage__content }>
      {
        data.map( element =>
          <Card key={ element.id } element={ element }/>
        )
      }
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
