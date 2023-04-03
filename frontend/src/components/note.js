import React from 'react';
import styles from '../styles/Note.module.scss';

export default function Note(props) {
  let title = <></>;
  let note__type = styles.note__default;
  if (props.title) {
    title = <h4>{ props.title }</h4>
  }
  if (props.type) {
    switch (props.type) {
      case 'error':
        note__type = styles.note__error;
        break;
      case 'success':
        note__type = styles.note__success;
        break;
      default:
        break;
    }
  }
  return (
    <div className={ styles.note__wrapper }>
      <div className={ `${note__type} ${styles.note__base}` }>
        { title }
        { props.children }
      </div>
    </div>
  )
}
