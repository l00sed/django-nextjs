import styles from '../styles/Layouts.module.scss'

export default function OneColumn( props ) {
  return (
    <div className={ styles.one_column }>
      { props.children }
    </div>
  )
}
