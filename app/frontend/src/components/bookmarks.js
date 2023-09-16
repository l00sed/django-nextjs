import styles from '../styles/Bookmark.module.scss';

import bookmarks from '../data/bookmarks.json';

/* Convert UNIX timestamp into UTC
 * Unfortunately, we can't use a timezone here
 * due to a hydration error (server > client mismatch)
 */
function convertTime(UNIX) {
  return new Date(UNIX/1000).toUTCString();
}

export default function Bookmarks() {
  let depthHistory = [];
  let bmIndex = 0;       // Loop index, used for key attribute
  let bmLinks = [];      // Only child elements, most-often links
  let bmLayer = [];      // Holds multiple groups in a child layer
  let bmFinal = [];      // Full bookmarks list of nested categories and links
  let bmCats = [];       // Flat list of BM titles (folders only)

  // Show child list on click
  function revealChildren(e) {
    const target = e.currentTarget;
    e.stopPropagation(); // only execute the click event on currentTarget
    if (target.getElementsByTagName('ul')) {
      target.querySelectorAll('ul')[0].classList.toggle(styles.hidden);
    }
  }

  // Loop through the first layer of bookmarks
  bookmarks?.forEach((bookmark, i) => {
    genBookmark(bookmark, 0);
  });

  /* Generate the Bookmark markup in JSX. */
  function genBookmark(data, depth) {
    let classes = [`depth-${depth}`, styles.bookmark];
    classes = classes.join(' ');

    let uri = false;
    if (data.hasOwnProperty('uri')) {
      if (data.uri != undefined) { uri = data.uri }
    }

    let dateAdded = false;
    if (data.hasOwnProperty('dateAdded')) {
      if (data.dateAdded != undefined) {
        dateAdded = convertTime(data.dateAdded);
      }
    }

    if (data.typeCode === 1) { // Link
      let prevDepth = false;
      if (depthHistory.length) {
        prevDepth = depthHistory.at(-1).depth;
      }
      console.log(`Title: ${data.title}, Type: ${data.typeCode}, Depth: ${depth}, prevDepth: ${prevDepth}`);
      depthHistory.push({ type: 1, depth: depth })
      bmLinks.push(
        <li className={ classes } key={ `${bmIndex}-${depth}` }>
          <a href={ uri ?? '' }>
            <span>{ data.title }</span><br/>
            { dateAdded ? <span>{ dateAdded }</span> : <></> }
          </a>
        </li>
      );
    }

    if (data.typeCode === 2) { // Category/Folder
      let prevDepth = false;
      if (depthHistory.length) {
        prevDepth = depthHistory.at(-1).depth;
      }
      console.log(`Title: ${data.title}, Type: ${data.typeCode}, Depth: ${depth}, prevDepth: ${prevDepth}`);

      depthHistory.push({ type: 2, depth: depth });

      let category = false;

      if (typeof prevDepth === "number") { // Not the first iteration
        let children = false;

        if (prevDepth > (depth + 1) && bmLayer.length) {
          children = bmLayer;
          bmLayer = [];
        } else if (prevDepth > depth && bmLinks.length) {
          children = bmLinks;
          bmLinks = [];
        }

        if (children) {
          // 1. Grab the last element of the bmCats list (with .pop())
          // 2. Wrap this category around the bmLinks
          category =
            <li
              onClick={ e => { revealChildren(e) } }
              className={ classes }
              key={ `${bmIndex}-${depth}` }
            >
              <span>{ bmCats.pop() }</span>
              <ul className={ styles.hidden }>
                { children }
              </ul>
            </li>
        }

        if (category) {
          if (depth === 0) {
            bmFinal.push(category);
          } else {
            bmLayer.push(category);
          }
        }
      }

      genChildren(data, depth);

      bmCats.push(data.title); // Just save the category title for now...
    }

    bmIndex++;
  }

  /* If the current category has child elements,
   * generate nested bookmarks for those children */
  function genChildren(data, depth) {
    if (data.hasOwnProperty('children')) {
      if (data.children.length) {
        let iterDepth = depth + 1;
        data.children.forEach(child => {
          genBookmark(child, iterDepth);
        });
      }
    }
  }

  /* Finally, return the compiled JSX */
  if (bmFinal.length) {
    return <ul>{ bmFinal }</ul>;
  }
}
