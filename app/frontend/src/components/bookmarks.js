import styles from '../styles/Bookmark.module.scss';

import bookmarks from '../data/bookmarks.json';

function timeConverter(UNIX_timestamp){
  let time = new Date(UNIX_timestamp/1000).toUTCString();
  return time;
}

export default function Bookmarks() {
  let depth = 0;
  let bookmarksIndex = 0;
  let bookmarksList = [];

  bookmarks?.forEach(bookmark => {
    genBookmark(bookmark, depth);
  });

  function genBookmark(data, depth) {
    let classes = [
      styles.bookmark,
      `depth-${depth}`
    ];

    if (depth > 0) {
      classes.push(styles.hidden);
    }
    classes = classes.join(' ');

    let uri = false;
    if (data.hasOwnProperty('uri')) {
      if (data.uri != undefined) {
        uri = data.uri;
      }
    }

    let dateAdded = false;
    if (data.hasOwnProperty('dateAdded')) {
      if (data.dateAdded != undefined) {
        dateAdded = data.dateAdded
      }
    }

    if (uri) {
      if (dateAdded) {
        dateAdded = timeConverter(dateAdded);
        bookmarksList.push(<li className={ classes } key={ bookmarksIndex }><a href={ data.uri }>{ data.title }<span className={ styles.show }>+</span><p>{ dateAdded }</p></a></li>);
      } else {
        bookmarksList.push(<li className={ classes } key={ bookmarksIndex }><a href={ data.uri }>{ data.title }<span className={ styles.show }>+</span></a></li>);
      }
    } else {
      bookmarksList.push(<li className={ classes } key={ bookmarksIndex }>{ data.title }<span className={ styles.show }>+</span></li>);
    }
    bookmarksIndex++;
    checkForChildren(data, depth);
  }

  function checkForChildren(data, depth) {
    if (data.hasOwnProperty('children')) {
      if (data?.children?.length) {
        genChildBookmarks(data.children, depth);
      }
    }
  }

  function genChildBookmarks(data, depth) {
    depth += 1;
    data.forEach(child => {
      genBookmark(child, depth);
    });
  }

  if (bookmarksList.length) {
    return (
      <ul>{ bookmarksList }</ul>
    )
  }
}
