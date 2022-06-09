import Image from 'next/image'
import dark_mode_toggle_styles from '../styles/DarkModeToggle.module.css'

export default function DarkModeToggle() {
  return (
    <div id="dark-mode-toggle" title="Toggle dark/light mode.">
      <div className={ `${dark_mode_toggle_styles.dark_toggle} hidden` }>
        <Image
          className={ dark_mode_toggle_styles.dark_toggle_moon }
          layout="fill"
          alt="Dark toggle"
          src="/assets/img/sys/moon.svg"
        />
      </div>
      <div className={ dark_mode_toggle_styles.light_toggle }>
        <Image
          className={ dark_mode_toggle_styles.light_toggle_sun }
          layout="fill"
          alt="Light toggle"
          src="/assets/img/sys/sun.svg"
        />
      </div>
    </div>
  )
}
