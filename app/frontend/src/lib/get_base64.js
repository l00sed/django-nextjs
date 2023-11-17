import ResponseError from '../utils/error_handling.js';
import HOST_URL from '../utils/api_server.js';

export async function getBase64(input) {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8',
    }
  }

  let api_url = `${HOST_URL()}/api/lqip/${input}`;

  const lqip_promise = await fetch(api_url, options_get);

  let lqip_json = {};

  if (lqip_promise.ok) {
    lqip_json = await lqip_promise.json();
  } else {
    throw new ResponseError('Could not retrieve lqip data from the API', lqip_promise);
  }

  const base64 = lqip_json.base64;
  return base64;
}
