/* Differentiate between server and client requests */
export default function HOST_URL(ws = false) {
  const isServer = typeof window === 'undefined';
  /* TODO: provide conditional logic for development vs. production */
  const HOST_URL = isServer ? (ws ? 'ws://backend:8000' : 'http://backend:8000') : (ws ? 'wss://loosed.local' : 'https://loosed.local');
  return HOST_URL;
}
