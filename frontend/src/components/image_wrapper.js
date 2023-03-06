import Image from 'next/image';
import image_styles from '../styles/ImageWrapper.module.css';

export default function ImageWrapper({ src, alt, width, height, caption=true }) {
  return (
    <>
      <div className={ image_styles.image__wrapper }>
        <Image
          src={ src }
          alt={ alt }
          width={ width }
          height={ height }
        />
        <Caption alt={ alt } width={ width } caption={ caption } />
      </div>
    </>
  )
}

export function Caption({ alt, width, caption }) {
  if (caption && alt !== undefined) {
    return (
      <>
        <span className={ image_styles.caption } style={{ width: `${width}px`, maxWidth: `min(${width}px, 100%)` }}>{ alt }</span>
      </>
    )
  } else {
    return ( <></> )
  }
}
