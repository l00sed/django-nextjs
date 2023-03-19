import Image from 'next/image';
import image_styles from '../styles/ImageWrapper.module.scss';

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
        <Caption text={ alt } width={ width } visible={ caption } />
      </div>
    </>
  )
}

export function Caption({ text, width="100%", visible=true }) {
  if (visible && text !== undefined) {
    if (/^\d+$/.test(width)) { // Width contains only numbers
      width += 'px';
    }
    let styles = {
      width: width,
      maxWidth: `min(${width}, 100%)`,
    }

    return (
      <>
        <span className={ image_styles.caption } style={ styles }>{ text }</span>
      </>
    )
  } else {
    return ( <></> )
  }
}
