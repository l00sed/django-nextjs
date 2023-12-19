import React from 'react';
import Link from 'next/link';
import ImageWrapper from 'components/image_wrapper';
import { parseTitle, parseDescription } from 'utils/parser';
import { Tags } from 'components/tag';
import styles from 'styles/Card.module.scss';
import dateformat from 'dateformat';


export default function Card({ element, truncate, index }) {
  const key = element.id;
  const alt = element.image_alt;
  const src = element.featured_image;
  const author = element.author;
  const title = parseTitle(element);

  const above_the_fold = 3;

  const tags = element.tags ?
    <div className={ styles.card__tags }>
      <Tags tags={ element.tags } max={ 2 } />
    </div>
    :
    <></>

  const loadingLazy = (index) => {
    if (index > above_the_fold) {
      return "lazy";
    } else {
      return undefined;
    }
  }
  const loading = loadingLazy(index);

  const priorityFold = (index) => {
    if (index < above_the_fold) {
      return true;
    }
    return false;
  }
  const priority = priorityFold(index);

  const parseHref = (slug) => {
    const re = new RegExp("^https?://");
    const found = re.exec(slug);
    if (found) {
      return slug;
    } else {
      return `/${slug}`;
    }
  }
  const href = parseHref(element.slug);

  const newWindow = (slug) => {
    const re = new RegExp("^https?://");
    const found = re.exec(slug);
    if (found) {
      return "_blank";
    } else {
      return "";
    }
  }
  const target = newWindow(element.slug);

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
  const date = parseDate(element.updated_at) ;

  let classes = styles.card__description;
  if (element.unbound) {
    classes += ` ${styles.card__cropped}`;
  }
  const desc = parseDescription(element, classes, truncate);

  const cardClasses = element.tags?.length > 0
    ?
    [styles.card, styles.has__tags].join(' ')
    :
    styles.card;

  return (
    <div className={ cardClasses }>
      <Link
        key={ key }
        href={ href }
        target={ target }
      >
        <div className={ styles.card__thumbnail_wrapper }>
          <ImageWrapper
            alt={ alt }
            src={ src }
            width={ 300 }
            height={ 300 }
            type="card"
            objectFit="contain"
            visible={ false }
            className={ styles.card__thumbnail }
            loading={ loading }
            priority={ priority  }
            sizes="(max-width: 576px)  100vw,
                   (max-width: 768px)  50vw,
                   (max-width: 1200px) 33vw,
                   15vw"
          />
        </div>
        <div className={ styles.card__head }>
          <h2 className={ styles.card__title }>{ title }</h2>
          <div className={ styles.card__meta }>
            <span className={ styles.card__date }>{ date }</span>
            <span className={ styles.card__author }>{ author }</span>
          </div>
        </div>
        <div className={ styles.card__body }>
          { desc }
        </div>
      </Link>
      { tags }
    </div>
  );
}
