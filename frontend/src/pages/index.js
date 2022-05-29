import Head from 'next/head'
import Image from 'next/image'
import Title from '../components/title'
import Card from '../components/card'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home({ data, done }) {
  console.log( 'data: ', data);
  console.log( 'done: ', done);

  useEffect(() => {
    console.log( 'process.env.NEXT_PUBLIC_BASE_URL: ', process.env.NEXT_PUBLIC_BASE_URL );
  }, [])

  return (
    <div className={ styles.homepage }>
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
