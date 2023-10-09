'use client';

import { useEffect } from 'react';
import page_styles from '../styles/Page.module.scss';
import overlay_styles from '../styles/MessageOverlay.module.scss';
import { waitForElem, waitForElems } from '../lib/wait_for_elem';

export const hideOverlay = (id='message-overlay-input:checked') => {
  waitForElem(`#${id}:checked`).then(elem => {
    elem.checked = false;
  });
}

export default function MessageOverlay(props) {
  /* Use "Escape" key to hide any overlay */
  useEffect(() => {
    const hideOverlays = (e) => {
      if (e.key === 'Escape') {
        waitForElems('[id$="-overlay-input"]').then(overlays =>{
          overlays.forEach(overlay => {
            hideOverlay(overlay.id);
          });
        });
      }
    }

    document?.addEventListener('keydown', hideOverlays);

    return () => {
      document.removeEventListener('keydown', hideOverlays);
    }
  }, []);

  /* Set an id for toggling the overlay */
  let overlayId= 'message-overlay'
  if (props.overlayId) {
    overlayId = props.overlayId;
  }

  let classes = [
    overlay_styles.message_overlay,
    page_styles.full__width
  ].join(' ');

  return(
    <>
      <input
        type="checkbox"
        id={ `${ overlayId }-input` }
        className={ overlay_styles.checkbox }
        onChange={ props.onChangeCallback ? props.onChangeCallback : () => { return } }
        hidden
      />
      <div
        id={ overlayId }
        className={ classes }
      >
        <div className={ overlay_styles.inner_content }>
          { props.children }
        </div>
        <label
          htmlFor={ `${ overlayId }-input` }
          className={ overlay_styles.close__area }
        />
      </div>
    </>
  )
}
