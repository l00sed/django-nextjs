import Image from 'next/image'
import dark_mode_toggle_styles from '../styles/DarkModeToggle.module.css'
import { themeHandler } from '../state/theme_state'

export default function DarkModeToggle({ theme, setTheme }) {
  let hidden = false;
  const handleThemeToggle = () => {
    if (theme == 'default') {
      setTheme( 'dark' );
      hidden = true;
    } else {
      setTheme( 'default' );
      hidden = false;
    }
    themeHandler( theme );
  }

  return (
    <div id="dark-mode-toggle" title="Toggle dark/light mode." onClick={ handleThemeToggle }>
      <div className={ dark_mode_toggle_styles.dark_toggle }>
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
