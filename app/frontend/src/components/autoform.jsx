import React from 'react';
import AutoInput from 'components/autoinput.jsx';

import styles from 'styles/CommentForm.module.scss';

function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export default function AutoForm(props) {
  let fields = props.data.fields;

  fields = Object.entries(fields).map(([name, field]) => (
    <AutoInput
      key={ makeid(5) }
      name={ name }
      data={ field }
    />
  ))

  return (
    <form
      className={ styles.form }
      name={ props.data.name }
    >
      { fields ?? <></> }
      { props.submit ?? <></> }
    </form>
  )
}
