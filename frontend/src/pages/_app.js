import '../styles/globals.css'
import { RecoilRoot } from 'recoil'

/* -------------------------------------------------------- *
 * Remove Recoil "duplicate atom key" warning during development
 * https://github.com/facebookexperimental/Recoil/issues/733#issuecomment-925072943
 * -------------------------------------------------------- */
 const memoize = (fn) => {
  let cache = {};
  return (...args) => {
    let n = args[0];
    if (n in cache) {
      return cache[n];
    }
    else {
      let result = fn(n);
      cache[n] = result;
      return result;
    }
  }
}

// ignore in-browser next/js recoil warnings until its fixed.
const mutedConsole = memoize((console) => ({
  ...console,
  warn: (...args) => args[0].includes('Duplicate atom key')
    ? null
    : console.warn(...args)
}))

global.console = mutedConsole(global.console);

function MyApp({ Component, pageProps }) {
  return (
    <RecoilRoot>
      <Component {...pageProps} />
    </RecoilRoot>
  )
}

export default MyApp
