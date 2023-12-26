import { useState } from 'react';
import { Caption } from 'components/image_wrapper.jsx';
import styles from 'styles/YouTube.module.scss';

export default function YouTube (props) {
  const { videoId, width, height, imgSize } = props
  const [showVideo, setShowVideo] = useState(false)
  return (
    <div className={ `${styles.youtubeWrapper} ${props.caption ? styles.caption : ''}` }>
      {
        showVideo ?
          (
            <iframe
              width={ width || '100%' }
              height={ height || '300px' }
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&showinfo=0`}
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
            />
          )
        :
          (
            <figure
              className={ styles.image }
              style={{
                backgroundImage: `url("https://img.youtube.com/vi/${videoId}/${ imgSize || 'mqdefault' }.jpg")`,
                width,
                height
              }}
              onClick={() => setShowVideo(true)}
            >
              <div className={ styles.playButton } />
            </figure>
          )
      }
      {
        props.caption ?
          <Caption text={ props.caption ? props.caption : '' } width={ props.width ?? '530px' } visible={ props.visible } type='figure' />
        :
          <></>
      }
    </div>
  )
}
