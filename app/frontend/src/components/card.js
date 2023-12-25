import React from 'react';
import Link from 'next/link';
import ImageWrapper from 'components/image_wrapper';
import { parseTitle, parseDescription } from 'utils/parser';
import { Tags } from 'components/tag';
import styles from 'styles/Card.module.scss';
import dateformat from 'dateformat';


export default function Card({ element, truncate, index }) {
  const bodyClass = [
    'px-5',
    'pt-0',
    'pb-5',
    'font-mono',
    'text-sm',
    'relative',
    'z-10',
  ].join(' ');

  const dateAuthorClass = [
    'flex',
    'text-sm',
    'text-center',
    'font-mono',
    'uppercase',
    'font-bold',
    'text-white',
    'bg-black',
    'py-1',
    'px-3',
    'rounded',
    'text-nowrap',
    'w-fit'
  ].join(' ');

  let descClass = [
    'text-black',
    'dark:text-white',
    'leading-5',
    'pb-5'
  ].join(' ');

  const truncClass = [
    'max-h-none',
    'mb-2',
    'before:hidden'
  ].join(' ');

  const tagsClass = [
    'py-0',
    'px-5',
    'h-0',
    '-top-14',
    'relative',
    'z-20'
  ].join(' ');

  const key = element.id;
  const alt = element.image_alt;
  const src = element.featured_image;
  //const author = element.author;
  const title = parseTitle(element);

  const above_the_fold = 3;

  const tags = element.tags
    ?
    <div className={ tagsClass }>
      <Tags tags={ element.tags } max={ 2 } />
    </div>
    :
    <></>

  const loadingLazy = (index) => {
    if (index > above_the_fold)
      return "lazy";
    return undefined;
  }
  const loading = loadingLazy(index);

  const priorityFold = (index) => {
    if (index < above_the_fold)
      return true;
    return false;
  }
  const priority = priorityFold(index);

  const parseHref = (slug) => {
    const re = new RegExp("^https?://");
    if(re.exec(slug))
      return slug;
    return `/${slug}`;
  }
  const href = parseHref(element.slug);

  const newWindow = (slug) => {
    const re = new RegExp("^https?://");
    if (re.exec(slug))
      return "_blank";
    return "";
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

  if (element.unbound)
    descClass += ` ${truncClass}`;
  if (element.tags?.length)
    descClass = descClass.replace('pb-5', 'pb-12');
  const desc = parseDescription(element, descClass, truncate);

  return (
    <div className={ styles.card }>
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
            <span className={ dateAuthorClass }>{ date }</span>
            {/*<span className={ dateAuthorClass }>{ author }</span>*/}
          </div>
        </div>
        <div className={ bodyClass }>
          { desc }
        </div>
      </Link>
      { tags }
    </div>
  );
}
