import ResponseError from '../utils/error_handling.js';
import HOST_URL from '../utils/api_server.js';

export default async function articles() {
  try {
    const options_get = {
      method: "GET",
      supportHeaderParams: true,
      headers: {
        'Accept': 'application/json;encoding=utf-8',
        'Content-Type': 'application/json;encoding=utf-8',
      }
    }

    await fetch(
      `${HOST_URL()}/api/articles`,
      options_get
    )
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw new ResponseError('Could not retrieve articles data from the API.', res);
        }
      })
      .then(data => {
        /* Wrangle/clean-up some of the comment data. */
        if (data instanceof Object && data !== {}) {
          return data;
        } else {
          /* Additional error logging for easier debugging. */
          console.error('Articles API returned a value that either is not an object, or is empty.');
        }
      });
  } catch (err) {
    // Handle the error, with full access to status and body
    switch (err.response?.status) {
      case 400:
        /* Handle */
        console.error( 'Could not fetch articles. 400' );
        break;
      case 401:
        /* Handle */
        console.error( 'Could not fetch articles. 401' );
        break;
      case 404:
        /* Handle */
        console.error( 'Could not fetch articles. 404' );
        break;
      case 500:
        /* Handle */
        console.error( 'Could not fetch articles. 500' );
        break;
    }
  }
}
