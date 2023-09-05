import Image from 'next/image';
import Parse from '../utils/parser';
import image_styles from '../styles/ImageWrapper.module.scss';

export default function ImageWrapper({ src, alt, caption, width, height, visible=true }) {
  return (
    <>
      <figure className={ image_styles.image__wrapper }>
        <Image
          src={ src }
          alt={ alt }
          width={ width }
          height={ height }
        />
        <Caption text={ caption ? caption : alt } width={ width } visible={ visible } type='figure' />
      </figure>
    </>
  )
}

export function Caption({ text, width="100%", visible=true, type=false }) {
  if (visible && text !== undefined) {
    if (/^\d+$/.test(width)) { // Width contains only numbers
      width += 'px';
    }

    let styles = {
      width: width,
      maxWidth: `min(${width}, 100%)`,
    }

    switch (type) {
      case 'figure':
        return (<figcaption className={ image_styles.caption } style={ styles }>{ Parse(text) }</figcaption>)
      default:
        return (<span className={ image_styles.caption } style={ styles }>{ Parse(text) }</span>)
    }
  } else {
    return ( <></> )
  }
}
