import button_styles from '../styles/Button.module.scss';

export default function Button(props) {
  let styles = ''
  switch (props.type) {
    case 'live':
      styles = button_styles.live__link
      break;
  }
  return (
    <div className={ `${styles} ${button_styles.button__main}` }>
      { props.children }
    </div>
  );
}
