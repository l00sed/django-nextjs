import { atom } from 'recoil';

const themeState = atom({
  key: 'themeState',
  default: 'default',
})

const themeHandler = (state) => {
  switch (state) {
    case 'default':
      document.getElementById('__next').firstChild.removeAttribute('class');
      document.getElementById('__next').firstChild.classList.add('dark');
      break;
    case 'dark':
      document.getElementById('__next').firstChild.removeAttribute('class');
      document.getElementById('__next').firstChild.classList.add('default');
      break;
  }
}

export { themeState, themeHandler }
