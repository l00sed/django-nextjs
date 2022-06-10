import { atom } from 'recoil';

const themeState = atom({
  key: 'themeState',
  default: 'default',
})

const themeHandler = (state) => {
  switch (state) {
    case 'default':
      document.getElementById('__next').removeAttribute('class');
      document.getElementById('__next').classList.add('dark');
      break;
    case 'dark':
      document.getElementById('__next').removeAttribute('class');
      break;
  }
}

export { themeState, themeHandler }
