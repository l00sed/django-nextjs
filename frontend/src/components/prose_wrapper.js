import styles from '../styles/ProseWrapper.module.scss';

export default function ProseWrapper(props) {
  return (
    <div className={ styles.prose__wrapper }>
      { props.children }
    </div>
  )
}
