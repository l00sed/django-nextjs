import menu_overlay_styles from '../styles/MenuOverlay.module.css'
import DarkModeToggle from './dark_mode_toggle'
import Link from 'next/link'

export default function MenuOverlay({ theme, setTheme, hidden, setHidden }) {
  const handleMenuToggle = () => {
    if (hidden == ' hidden') {
      setHidden('');
    } else {
      setHidden(' hidden');
    }
  }

  return (
    <div className={ `${menu_overlay_styles.menu_overlay}${hidden}` } onClick={ handleMenuToggle }>
      <div className={ menu_overlay_styles.menu_text }>
        <Link href="/"><p>Home</p></Link>
        <Link href="/about"><p>About</p></Link>
        <Link href="https://dato.work" target="_blank"><p>Portfolio</p></Link>
        <Link href="mailto:dan@l-o-o-s-e-d.net" target="_blank"><p>Contact</p></Link>
      </div>
      <DarkModeToggle theme={ theme } setTheme={ setTheme } />
    </div>
  )
}
