import Image from 'next/image';
import Parse from 'utils/parser';
import image_styles from 'styles/ImageWrapper.module.scss';
import card_styles from 'styles/Card.module.scss';
import { getBase64 } from 'lib/get_base64';


export default async function ImageWrapper({ src, alt, caption, width, height, visible=true, align="center", type, imgClass }) {
  const srcP = src.includes('8000') ? `/${src.split('/').slice(7).join('/')}` : src;
  const cB = ['svg'].includes(src.slice(-3)) ? false : true;
  const base64 = async src => {
    if (cB) {
      const b = await getBase64(src);
      return b
    }
  }

  const b64 = await base64(src);
  const figureClasses = (type) => {
    switch(type) {
      default:
          return image_styles.image__wrapper;
      case "card":
        return card_styles.image__wrapper;
    }
  }

  return (
    <>
      <figure
        className={ type === 'featured' ? '' : figureClasses(type) }
        style={
          align === 'left' ?
          {
            width: "fit-content",
            margin: "0 auto 0 0"
          } :
          align === 'right' ?
          {
            width: "fit-content",
            margin: "0 0 0 auto"
          } :
          {}
        }
      >
        {
          (cB && b64) ?
            <Image
              className={ imgClass ? imgClass : '' }
              src={ srcP }
              alt={ alt }
              width={ width }
              height={ height }
              placeholder="blur"
              blurDataURL={ b64 }
            />
          :
            <Image
              className={ imgClass ? imgClass : '' }
              src={ srcP }
              alt={ alt }
              width={ width }
              height={ height }
            />
        }
        <Caption
          text={ caption ? caption : alt }
          width={ width }
          visible={ visible }
          type='figure'
        />
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
