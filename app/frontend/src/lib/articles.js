//import ResponseError from 'utils/error_handling.js';
import HOST_URL from 'utils/api_server.js';
import notFoundWrapper from 'lib/not_found';

export default async function articles(props) {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8',
    }
  }

  let api_url = `${HOST_URL()}/api/articles`;

  if (props?.hasOwnProperty('search')) { // Return filtered articles by search string
    if (props.search) {
      api_url = `${HOST_URL()}/api/articles/search/${ props.search }`
    }
  } else

  if (props?.hasOwnProperty('tag')) { // Return filtered articles by tag
    if (props.tag) {
      api_url = `${HOST_URL()}/api/articles/tagged/${ props.tag }`
    }
  }

  const articles_promise = await fetch(api_url, options_get);

  let articles_json = {};

  if (articles_promise.ok) {
    articles_json = await articles_promise.json();
  } else {
    notFoundWrapper({
      message: 'Could not retrieve articles data from API',
      level: 'warning'
    });
    //throw new ResponseError('Could not retrieve articles data from the API', res);
  }

  return articles_json;
}
