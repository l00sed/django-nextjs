import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Parse, { parseTitle } from '../utils/parser';
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

  const parseUrl = (slug) => {
    const re = new RegExp("^https?://");
    const found = re.exec(slug);
    if (found) {
      return slug;
    } else {
      return `/${slug}`;
    }
  }

  const newWindow = (slug) => {
    const re = new RegExp("^https?://");
    const found = re.exec(slug);
    if (found) {
      return "_blank";
    } else {
      return "";
    }
  }

  const parseDate = (date) => {
    let d = new Date(date);
    if (Object.prototype.toString.call(d) === "[object Date]") {
      if (isNaN(d) || element.date_override) { // d.getTime() or d.valueOf() will also work
        return date;
      } else {
        return dateformat(d, "mm dd yyyy");
      }
    } else {
      return date;
    }
  }

  const parseDescription = (element) => {
    var classes = styles.card__description;
    if (element.unbound) {
      classes += ` ${styles.card__cropped}`;
    }
    return (
      <div className={ classes }>{ Parse(element.description) }</div>
    )
  }

  return (
    (<Link key={ element.id } href={ parseUrl(element.slug) } target={ newWindow(element.slug) }>
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
          <h2 className={ styles.card__title }>{ parseTitle(element) }</h2>
          <div className={ styles.card__meta }>
            <span className={ styles.card__date }>{ parseDate(element.updated_at) }</span>
            <span className={ styles.card__author }>{ element.author }</span>
          </div>
        </div>
        <div className={ styles.card__body }>
          { parseDescription(element) }
        </div>
      </div>
    </Link>)
  );
}
