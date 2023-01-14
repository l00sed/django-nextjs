export async function articles() {
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

  const articles = await fetch( `${process.env.NEXT_PUBLIC_BASE_URL}/articles`, options_get )
    .then(response => response.json())
    .then(data => data)
    .catch(error => console.warn(error));

  return articles;
}
