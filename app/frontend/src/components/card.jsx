import Link from 'next/link';

import ImageWrapper from 'components/image_wrapper.jsx';
import { Tags } from 'components/tag.jsx';
import { parseTitle, parseDescription } from 'utils/parser';
import styles from 'styles/Card.module.scss';
import dateformat from 'dateformat';


export default function Card({ element, featured, stretch, truncate, index }) {
  const width = 300;
  const widthClass = featured ? 'w-full' : `w-[300px] max-w-full`;

  const featuredClass = [
    'flex',
    'flex-row',
    'mx-auto',
    'rounded-lg',
    'max-w-4xl',
    'h-fit',
    'relative',
    'gradient-shadow',
  ].join(' ');

  const cardWrapperClass = [
    'flex',
    'flex-col',
    (stretch || featured) ? 'sm:flex-row-reverse' : '',
    widthClass
  ].join(' ');

  const cardClass = [
    'mx-auto',
    widthClass,
    featured ? [
      'backdrop-brightness-200 dark:backdrop-brightness-25',
      'backdrop-blur-4xl',
      'backdrop-saturate-50',
    ].join(' ') : ''
  ].join(' ');

  const cardBodyClass = [
    'p-5',
    'flex',
    'flex-col',
    'gap-2',
    'font-mono',
    'text-sm',
    'relative',
    'h-fit',
    'my-auto',
    'z-10',
    (stretch || featured) ? 'sm:p-8 sm:w-fit' : '',
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
    'pb-0'
  ].join(' ');

  const truncClass = [
    'max-h-none',
    'mb-2',
    'before:hidden'
  ].join(' ');

  const tagsClass = [
    'p-0',
    'h-0',
    'bottom-12',
    'left-4',
    (stretch || featured) ? 'sm:left-8 sm:bottom-16': '',
    'absolute',
    'z-20'
  ].join(' ');

  const cardTitleClass = [
    'm-0',
    'uppercase',
    'text-3xl',
    featured ? 'sm:text-4xl md:text-5xl' : '',
    'text-black',
    'dark:text-white',
    'font-sans',
    'leading-none',
    'hyphens-auto',
    'after:hidden',
  ].join(' ');

  const cardMetaClass = [
    'text-sm',
    'flex',
    'flex-wrap',
    'items-center',
    'gap-3',
    'leading-5',
    'max-w-fit',
  ].join(' ');

  const thumbWrapperClass = [
    '-top-[1px]',
    '-left-[1px]',
    'rounded-t-lg',
    (stretch || featured) ? 'sm:left-0 sm:top-0 sm:rounded-l-none sm:rounded-r-lg sm:max-h-full sm:min-w-[300px]' : 'max-h-[300px]',
  ].join(' ');

  const thumbClass = [
    'h-full',
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
    descClass = descClass.replace('pb-0', 'pb-10');
  const desc = parseDescription(element, descClass, truncate);

  const card = (
    <div className={ featured ? `${styles.card} ${cardClass} ${styles.featured}` : `${styles.card} ${cardClass}` }>
      <Link
        key={ key }
        href={ href }
        target={ target }
      >
        <div className={ cardWrapperClass }>
          <div className={ `${styles.card__thumbnail_wrapper} ${thumbWrapperClass}` }>
            <ImageWrapper
              alt={ alt }
              src={ src }
              width={ width }
              height={ width }
              type="card"
              objectFit="contain"
              visible={ false }
              className={ `${styles.card__thumbnail} ${thumbClass}` }
              loading={ loading }
              priority={ priority  }
              sizes="(max-width: 640px)  100vw,
                     (max-width: 768px)  50vw,
                     (max-width: 1200px) 33vw,
                     15vw"
            />
          </div>
          <div className={ cardBodyClass }>
            <span className={ cardTitleClass }>{ title }</span>
            <div className={ cardMetaClass }>
              <span className={ dateAuthorClass }>{ date }</span>
              {/*<span className={ dateAuthorClass }>{ author }</span>*/}
            </div>
            { desc }
          </div>
        </div>
      </Link>
      { tags }
    </div>
  );

  if (featured) {
    return (
      <div className={ featuredClass }>
        { card }
        <h3 className="absolute -bottom-10 right-2 pt-0.5 px-2 rounded-sm bg-loosed-400 text-neutral-100 dark:text-neutral-900">FEATURED</h3>
      </div>
    )
  } else {
    return card;
  }
}
