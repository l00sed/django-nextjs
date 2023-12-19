import styles from 'styles/Featured.module.scss';
import Button from 'components/button.js';
import ImageWrapper from 'components/image_wrapper.js';
import Parse, { parseTitle, parseDescription } from 'utils/parser';
import Link from 'next/link';


export default function Featured ({ element }) {
  let title = parseTitle(element);
  let desc = parseDescription(element);
  const alt = element.image_alt;
  const src = element.featured_image;
  return (
    <div className={ styles.featured }>
      <div className={ styles.title_description }>
        <h2>{ title }</h2>
        { desc }
        <Button type='standard'>Read { title }</Button>
      </div>
      <div className={ styles.image }>
        <ImageWrapper
          alt={ alt }
          src={ src }
          width={ 1000 }
          height={ 1000 }
          visible={ false }
          sizes="(max-width: 576px)  100vw,
                 (max-width: 768px)  50vw,
                 (max-width: 1200px) 33vw,
                 15vw"
        />
      </div>
    </div>
  )
}
