import styles from '../styles/Layouts.module.css'

export default function TwoColumn( props ) {
  return (
    <div className={ styles.two_column }>
      { props.children }
    </div>
  )
}
