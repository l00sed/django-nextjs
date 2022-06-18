import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Parse from '../utils/parser'
import styles from '../styles/Card.module.css'
import dateformat from 'dateformat'

export default function Card({ element }) {
  return (
    <Link key={ element.id } href={ '/' + element.slug }>
      <a>
        <div className={ styles.card }>
          <div className={ styles.card__thumbnail_wrapper }>
            <Image
              alt={ element.image_alt }
              src={ element.featured_image }
              className={ styles.card__thumbnail }
              objectFit={'cover'}
              layout={'fill'}
            />
          </div>
          <div className={ styles.card__head }>
            <h2 className={ styles.card__title }>{ element.title }</h2>
            <hr/>
            <div className={ styles.card__meta }>
              <span className={ styles.card__date }>{ dateformat( new Date(element.updated_at), "h:MMTT | mmmm, dS yyyy") }</span>
              <span className={ styles.card__author }>{ element.author }</span>
            </div>
          </div>
          <div className={ styles.card__body }>
            <div className={ styles.card__description }>{ Parse(element.description) }</div>
          </div>
        </div>
      </a>
    </Link>
  )
}
