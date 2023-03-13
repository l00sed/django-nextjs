import styles from '../styles/HorizontalScroller.module.scss'

export default function HorizontalScroller( props ) {
  return (
    <div className={ styles.horizontal_scroller }>
      <div className={ styles.scroller_container }>
        { props.children }
      </div>
    </div>
  )
}
