import getCookie from './get_cookie';

export default function csrfToken() {
  const csrftoken = getCookie('csrftoken');
  return csrftoken;
}
