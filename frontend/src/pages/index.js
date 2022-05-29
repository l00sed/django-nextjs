import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Title from '../components/title'
import Parser from 'html-react-parser'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'
import dateformat from 'dateformat'

export default function Home({ data, done }) {
  console.log( 'data: ', data);
  console.log( 'done: ', done);

  const router = useRouter();

  useEffect(() => {
    console.log( 'process.env.NEXT_PUBLIC_BASE_URL: ', process.env.NEXT_PUBLIC_BASE_URL );
  }, [])

  const handleNavigation = ({ slug }) => {
    console.log(slug);
    router.push("/" + slug);
  }

  return (
    <main className={ styles.homepage }>
      <Title/>
      <div className={ styles.homepage__content }>
      {
        data.map( element =>
          <a key={ element.id } href={ "/" + element.slug } onClick={ () => handleNavigation(element.slug) }>
            <div className={ styles.card }>
              <div className={ styles.card__head }>
                <h2 className={ styles.card__title }>{ element.title }</h2>
                <hr/>
                <div className={ styles.card__meta }>
                  <span className={ styles.card__author }>{ element.author }</span>
                  <span className={ styles.card__date }>{ dateformat( new Date(element.updated_at), "h:MMTT | mmmm, dS yyyy") }</span>
                </div>
              </div>
              <div className={ styles.card__body }>
                <div className={ styles.card__description }>{ Parser(element.description) }</div>
              </div>
            </div>
          </a>
        )
      }
      </div>
    </main>
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
