export default async function articles() {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8',
    },
    next: {
      // Re-hydrate every 4 minutes
      revalidate: 480000,
    }
  }

  const articles_promise = await fetch( `${process.env.NEXT_PUBLIC_BASE_URL}/articles`, options_get );

  let articles_json = {};

  if (articles_promise.ok) {
    articles_json = await articles_promise.json();
  } else {
    console.log( 'Could not retrieve articles data from API.' );
  }

  return articles_json;
}
