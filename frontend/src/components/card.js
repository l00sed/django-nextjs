import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Parse from '../utils/parser';
import styles from '../styles/Card.module.scss';
import dateformat from 'dateformat';

export default function Card({ element, index }) {
  const above_the_fold = 3;

  const loading = (index) => {
    if (index > above_the_fold) {
      return "lazy";
    } else {
      return undefined;
    }
  }

  const priority = (index) => {
    if (index < above_the_fold) {
      return true;
    }
    return false;
  }

  return (
    (<Link key={ element.id } href={ `/${element.slug}` }>
      <div className={ styles.card }>
        <div className={ styles.card__thumbnail_wrapper }>
          <Image
            alt={ element.image_alt }
            src={ element.featured_image }
            className={ styles.card__thumbnail }
            loading={ loading(index) }
            priority={ priority(index) }
            fill
            sizes="(max-width: 576px)  100vw,
                   (max-width: 768px)  50vw,
                   (max-width: 1200px) 33vw,
                   15vw"
          />
        </div>
        <div className={ styles.card__head }>
          <h2 className={ styles.card__title }>{ element.title }</h2>
          <div className={ styles.card__meta }>
            <span className={ styles.card__date }>{ dateformat( new Date(element.updated_at), "h:MMTT | mmmm, dS yyyy") }</span>
            <span className={ styles.card__author }>{ element.author }</span>
          </div>
        </div>
        <div className={ styles.card__body }>
          <div className={ styles.card__description }>{ Parse(element.description) }</div>
        </div>
      </div>
    </Link>)
  );
}
