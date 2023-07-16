import ResponseError from '../utils/error_handling.js';

export default async function articles() {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8',
    }
  }

  const articles_promise = await fetch('http://localhost:8000/api/articles', options_get );

  let articles_json = {};

  if (articles_promise.ok) {
    articles_json = await articles_promise.json();
  } else {
    throw new ResponseError('Could not retrieve articles data from the API', res);
  }

  return articles_json;
}
