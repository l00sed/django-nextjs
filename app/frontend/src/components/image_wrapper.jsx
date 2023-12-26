import Image from 'next/image';
import Parse from 'utils/parser';
import image_styles from 'styles/ImageWrapper.module.scss';
import card_styles from 'styles/Card.module.scss';
import { getBase64 } from 'lib/get_base64';

const srcRouter = (src) => {
  if (src.includes('backend:8000')) {
    //console.log(src);
    const url_parts = src.split('/')
    src = `/${url_parts.slice(7).join('/')}`;
  }
  //console.log(src);
  return src;
}

const canBlur = (src) => {
  return ['svg'].includes(src.slice(-3)) ? false : true;
}

const base64 = async (src) => {
  if (canBlur(src)) {
    try {
      return await getBase64(src);
    } catch {
      return false;
    }
  }
}

export default async function ImageWrapper({ src, alt, caption, width, height, visible=true, align="center", type }) {
  const srcP = srcRouter(src);
  const cB = canBlur(srcP);
  const b64 = await base64(srcP);

  const classes = type === "card" ? card_styles.image__wrapper : image_styles.image__wrapper;
  return (
    <>
      <figure
        className={ classes }
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
              src={ srcP }
              alt={ alt }
              width={ width }
              height={ height }
              placeholder="blur"
              blurDataURL={ b64 }
            />
          :
            <Image
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
