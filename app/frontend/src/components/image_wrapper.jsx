import Image from 'next/image';
import Parse from 'utils/parser';
import image_styles from 'styles/ImageWrapper.module.scss';
import card_styles from 'styles/Card.module.scss';
import { getBase64 } from 'lib/get_base64';


export default async function ImageWrapper(props) {
  const srcP = props.src.includes('8000') ? `/${props.src.split('/').slice(7).join('/')}` : props.src;
  const cB = ['svg'].includes(props.src.slice(-3)) ? false : true;
  const base64 = async src => {
    if (cB) {
      const b = await getBase64(src);
      return b
    }
  }

  const b64 = await base64(props.src);
  const figureClasses = (type) => {
    switch(type) {
      default:
        return props.className ? `${props.className} ${image_styles.image__wrapper}` : image_styles.image__wrapper;
      case "card":
        return props.className ? `${props.className} ${card_styles.image__wrapper}` : card_styles.image__wrapper;
      case "featured":
        return props.className ? `${props.className} h-full w-auto` : 'h-full w-auto';
    }
  }

  return (
    <>
      <figure
        className={ figureClasses(props.type) }
        style={
          props.align === 'left' ?
          {
            width: "fit-content",
            margin: "0 auto 0 0"
          } :
          props.align === 'right' ?
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
              className={ props.imgClass ? props.imgClass : '' }
              src={ srcP }
              alt={ props.alt }
              width={ props.width }
              height={ props.height }
              placeholder="blur"
              blurDataURL={ b64 }
            />
          :
            <Image
              className={ props.imgClass ? props.imgClass : '' }
              src={ srcP }
              alt={ props.alt }
              width={ props.width }
              height={ props.height }
            />
        }
        <Caption
          text={ props.caption ? props.caption : props.alt }
          width={ props.width }
          visible={ props.visible }
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
