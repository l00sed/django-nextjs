import styles from 'styles/Layouts.module.scss'

export default function TwoColumn( props ) {
  return (
    <div className={ styles.two_column }>
      { props.children }
    </div>
  )
}
