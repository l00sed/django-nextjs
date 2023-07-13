import React from 'react';
import styles from '../styles/Note.module.scss';

export default function Note(props) {
  let title = <></>;
  let note__type = styles.note__default;
  let svg = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M12 17q.425 0 .713-.288T13 16v-4q0-.425-.288-.713T12 11q-.425 0-.713.288T11 12v4q0 .425.288.713T12 17Zm0-8q.425 0 .713-.288T13 8q0-.425-.288-.713T12 7q-.425 0-.713.288T11 8q0 .425.288.713T12 9Zm0 13q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"/></svg>;
  if (props.title) {
    title = <h4>{ props.title }</h4>
  }
  if (props.type) {
    switch (props.type) {
      case 'error':
        note__type = styles.note__error;
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M8 13h8q.425 0 .713-.288T17 12q0-.425-.288-.713T16 11H8q-.425 0-.713.288T7 12q0 .425.288.713T8 13Zm4 9q-2.075 0-3.9-.788t-3.175-2.137q-1.35-1.35-2.137-3.175T2 12q0-2.075.788-3.9t2.137-3.175q1.35-1.35 3.175-2.137T12 2q2.075 0 3.9.788t3.175 2.137q1.35 1.35 2.138 3.175T22 12q0 2.075-.788 3.9t-2.137 3.175q-1.35 1.35-3.175 2.138T12 22Zm0-2q3.35 0 5.675-2.325T20 12q0-3.35-2.325-5.675T12 4Q8.65 4 6.325 6.325T4 12q0 3.35 2.325 5.675T12 20Zm0-8Z"/></svg>;
        break;
      case 'success':
        note__type = styles.note__success;
        svg = <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 48 48"><mask id="ipTSuccess0"><g fill="none" stroke="#fff" stroke-linecap="round" stroke-linejoin="round" stroke-width="4"><path fill="#555" d="m24 4l5.253 3.832l6.503-.012l1.997 6.188l5.268 3.812L41 24l2.021 6.18l-5.268 3.812l-1.997 6.188l-6.503-.012L24 44l-5.253-3.832l-6.503.012l-1.997-6.188l-5.268-3.812L7 24l-2.021-6.18l5.268-3.812l1.997-6.188l6.503.012L24 4Z"/><path d="m17 24l5 5l10-10"/></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipTSuccess0)"/></svg>;
        break;
      default:
        break;
    }
  }
  return (
    <div className={ styles.note__wrapper }>
      <div className={ `${note__type} ${styles.note__base}` }>
        <div className={ styles.note__row }>
          { title }
          { svg }
        </div>
        { props.children }
      </div>
    </div>
  )
}
