/* Differentiate between server and client requests */
export default function HOST_URL() {
  const isServer = typeof window === 'undefined';
  /* TODO: provide conditional logic for development vs. production */
  const HOST_URL = isServer ? 'http://localhost:8000' : 'https://loosed.local';
  return HOST_URL;
}
