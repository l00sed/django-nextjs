import styles from 'styles/HorizontalScroller.module.scss'
import { Caption } from 'components/image_wrapper.jsx';

export default function HorizontalScroller( props ) {
  let caption = (<></>);
  if (props.caption) {
    caption = <Caption text={ props.caption } />;
  }


  return (
    <div className={ `${styles.wrapper} ${props.className}` }>
      <div className={ `${styles.horizontal_scroller} ${props.scrollerClass}` }>
        <div className={ `${styles.scroller_container} ${props.containerClass}` }>
          { props.children }
        </div>
      </div>
      { caption }
    </div>
  )
}
