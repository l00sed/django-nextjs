import styles from 'styles/Layouts.module.scss'

export default function ThreeColumn( props ) {
  return (
    <div className={ styles.three_column }>
      { props.children }
    </div>
  )
}
