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

  const parsed_url = (slug) => {
    const re = new RegExp("^https?://");
    const found = re.exec(slug);
    if (found) {
      return slug;
    } else {
      return `/${slug}`;
    }
  }

  const new_window = (slug) => {
    const re = new RegExp("^https?://");
    const found = re.exec(slug);
    if (found) {
      return "_blank";
    } else {
      return "";
    }
  }

  const parsed_date = (date) => {
    let d = new Date(date);
    if (Object.prototype.toString.call(d) === "[object Date]") {
      if (isNaN(d)) { // d.getTime() or d.valueOf() will also work
        return date;
      } else {
        if (dateformat(d, "h:MMTT") === "12:00AM") {
          return dateformat(d, "mmmm yyyy");
        } else {
          return dateformat(d, "mmmm, dS yyyy | h:MMTT");
        }
      }
    } else {
      return date;
    }
  }

  const parsed_description = (element) => {
    var classes = styles.card__description;
    if (element.unbound) {
      classes += ` ${styles.card__cropped}`;
    }
    return (
      <div className={ classes }>{ Parse(element.description) }</div>
    )
  }

  return (
    (<Link key={ element.id } href={ parsed_url(element.slug) } target={ new_window(element.slug) }>
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
            <span className={ styles.card__date }>{ parsed_date(element.updated_at) }</span>
            <span className={ styles.card__author }>{ element.author }</span>
          </div>
        </div>
        <div className={ styles.card__body }>
          { parsed_description(element) }
        </div>
      </div>
    </Link>)
  );
}
