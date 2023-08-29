'use client';

import page_styles from '../styles/Page.module.scss';
import overlay_styles from '../styles/MessageOverlay.module.scss';

export function toggleOverlay(id='message-overlay') {
  if (document.getElementById(id)) {
    document.getElementById(id).classList.toggle(overlay_styles.closed);
  }
}

export default function MessageOverlay(props) {
  let overlayId= 'message-overlay'
  if (props.overlayId) {
    overlayId = props.overlayId;
  }
  return(
    <div
      id={ props.overlayId ?? 'message-overlay' }
      onClick={ () => { toggleOverlay(overlayId) } }
      className={ `${ overlay_styles.message_overlay } ${ overlay_styles.closed } ${ page_styles.full__width }` }
    >
      <div className={ overlay_styles.inner_content }>
        { props.children }
      </div>
    </div>
  )
}
