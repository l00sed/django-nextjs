import styles from '../styles/ProseWrapper.module.scss';

export default function ProseWrapper(props) {
  return (
    <section className={ styles.prose__wrapper }>
      { props.children }
    </section>
  )
}
