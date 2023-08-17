import styles from '../styles/HorizontalScroller.module.scss'
import { Caption } from './image_wrapper';

export default function HorizontalScroller( props ) {
  let caption = (<></>);
  if (props.caption) {
    caption = <Caption text={ props.caption } />;
  }


  return (
    <div className={ `${styles.wrapper} ${props.className}` }>
      <div className={ styles.horizontal_scroller }>
        <div className={ styles.scroller_container }>
          { props.children }
        </div>
      </div>
      { caption }
    </div>
  )
}
