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
  let depthHistory = []; // Used to detect jumps back up to the top layer
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
      // Hide the child list
      target.querySelectorAll('ul')[0].classList.toggle(styles.hidden);
    }
    if (target.getElementsByTagName('svg')) {
      // Rotate caret
      target.querySelectorAll('svg')[0].classList.toggle(styles.closed);
    }
  }

  if (bookmarks?.length) {
    /* Push a dummy object to the end to iterate through the last
     * actual bookmark object. */
    bookmarks.push({
      title: "dummy",
      typeCode: 2,
    });
    // Loop through the top layer of bookmarks (depth == 0)
    bookmarks.forEach(bookmark => {
      genBookmark(bookmark, 0);
    });
  }

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
      //console.log(`Title: ${data.title}, Type: ${data.typeCode}, Depth: ${depth}, prevDepth: ${prevDepth}`);
      depthHistory.push({ type: 1, depth: depth })
      bmLinks.push(
        <li className={ `${classes} ${styles.bookmarkLink}` } key={ `${bmIndex}-${depth}` }>
          <a
            href={ uri ?? '' }
            target="_blank" rel="noopener nofollow noreferrer"
            className={ styles.bookmarkTitle }
          >
            <span>{ data.title }</span>
          </a>
          { dateAdded ? <span className={ styles.bookmarkDate }>{ dateAdded }</span> : <></> }
        </li>
      );
    }

    if (data.typeCode === 2) { // Category/Folder
      let prevDepth = false;
      if (depthHistory.length) {
        prevDepth = depthHistory.at(-1).depth;
      }
      //console.log(`Title: ${data.title}, Type: ${data.typeCode}, Depth: ${depth}, prevDepth: ${prevDepth}`);
      depthHistory.push({ type: 2, depth: depth });

      let category = false;

      if (typeof prevDepth === "number") { // Not the first iteration
        let children = false;
        const caret =
          <svg
            className={ `${styles.caret} ${styles.closed}` }
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 4L13 10L7 16"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>

        /* If jumping up 2 layers, that means we're wrapping up children
         * (links) as well as child folders (with their own links) */
        if (prevDepth > (depth + 1) && bmLayer.length) {
          children = bmLinks;
          bmLinks = [];
          category =
            <>
              <li
                onClick={ e => { revealChildren(e) } }
                className={ classes }
                key={ `${bmIndex}-${depth}` }
              >
                <a
                  href={ `#${ encodeURIComponent(bmCats[0]) }` }
                  className={ styles.anchor }
                >#</a>
                <span id={ encodeURIComponent(bmCats[0]) }>{ bmCats.shift() }{ caret }</span>
                <ul className={ `${styles.childList} ${styles.hidden}` }>
                  { children }
                </ul>
              </li>
            </>
          bmLayer.push(category);
          children = bmLayer;
          bmLayer = [];
        } else if (prevDepth > depth && bmLinks.length) {
          // Otherwise, it's just a list of links
          children = bmLinks;
          bmLinks = [];
        }

        if (children) {
          // 1. Grab the last element of the bmCats list (with .pop())
          // 2. Wrap this category around the bmLinks
          category =
            <>
              <li
                onClick={ e => { revealChildren(e) } }
                className={ classes }
                key={ `${bmIndex}-${depth}` }
              >
                <a
                  href={ `#${ encodeURIComponent(bmCats.at(-1)) }` }
                  className={ styles.anchor }
                >#</a>
                <span id={ encodeURIComponent(bmCats.at(-1)) }>{ bmCats.pop() }{ caret }</span>
                <ul className={ `${styles.childList} ${styles.hidden}` }>
                  { children }
                </ul>
              </li>
            </>
        }

        if (category) {
          if (depth === 0) {
            // Back at the top-level layer. Push to final JSX.
            bmFinal.push(category);
          } else {
            // Still compiling at this layer.
            bmLayer.push(category);
          }
        }
      }

      // Generate bookmarks for all children
      genChildren(data, depth);
      // Just saving the category title for now...
      bmCats.push(data.title);
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
    bmCats = []; // Remove last dummy object
    return <ul className={ styles.bookmarksList }>{ bmFinal }</ul>;
  }
}
