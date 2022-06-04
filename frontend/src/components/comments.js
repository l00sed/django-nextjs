import Link from 'next/link'
import Parser from 'html-react-parser';
import comment_styles from '../styles/Comment.module.css'
import dateformat from 'dateformat'

export default function Comment({ comment }, reply) {
  let marginLeft = null;
  let replyClass = null;
  let commentHeader  = null;

  // const approved = comment.approved ?? false;
  if ( reply == true ) {
    marginLeft = ' style="margin-left:' + comment.margin + 'px"';
    replyClass = ' commentReply';
    commentHeader = ' id="cid" value="' + comment.cid + '"';
  }

  const uvc = parseUpvotes( comment.upvotes - comment.downvotes );
  const message = comment.content ? Parser( autoLinkText( sanitize( comment.content ) ) ) : '';

  return (
    <>
      <div className={ `${ comment_styles.main_wrapper } ${ replyClass }` }>
        <div className={ comment_styles.body_wrapper }>
          <div className={ comment_styles.body_row_1 }>
            <div className={ comment_styles.body_col_1 }>
              <span className={ comment_styles.comment_author }>{ comment.author }</span>
              <span className={ comment_styles.comment_date }>{ dateformat( new Date(comment.created_at), "h:MMtt | mmmm, dS yyyy") }</span>
            </div>
            <div className={ comment_styles.body_col_2 }>
              <Link href="/" className={ comment_styles.reply_button_wrapper }>
                <div className={ comment_styles.reply_button }>⮌</div>
              </Link>
            </div>
          </div>
          <div className={ comment_styles.body_row_2 }>
            <div className={ comment_styles.comment_wrapper }>
              <div className={ comment_styles.comment_content }>{ message }</div>
            </div>
          </div>
        </div>
        <div className={ comment_styles.vote_wrapper }>
          <div className={ comment_styles.vote_count }>
            <span className={ comment_styles.count_text }>{ uvc }</span>
          </div>
          <div className={ comment_styles.upvote_button }>
            <Link href="/">
              <span>🔺</span>
            </Link>
          </div>
          <div className={ comment_styles.downvote_button }>
            <Link href="/">
              <span>🔻</span>
            </Link>
          </div>
        </div>
      </div>
      {/* <Comment /> */}
      </>
  )
}

function parseUpvotes(upvote_count) {
  if ( upvote_count > 999 ) {
    if ( upvote_count > 99999 ) {
      upvote_count = 'max';
    } else {
      upvote_count = upvote_count.slice(0, -3).toString() + 'k';
    }
  } else {
    if ( upvote_count < -99 ) {
      upvote_count = '🪠';
    }
  }
  return upvote_count;
}

function autoLinkText(post, approved=1) {
  let urls = getUrlsFromString( post );
  let blur = '';
  if (approved != 1) {
    blur = ' class="blur"';
  }
  let processed_urls = [];
  if ( urls != false ) {
    const imgExt = ['png','gif','jpg','jpeg','webp'];
    urls.forEach(function( url ) {
      let extension = getUrlExtension(url) ?? false;
      if (imgExt.includes(extension)) {
        processed_urls.push('<div'+blur+'><img src="'+url+'" class="lazyload commentImage" /></div>');
      } else {
        const abbreviated_url = abbreviateUrl( url );
        processed_urls.push(abbreviated_url);
      }
    });
    if ( processed_urls.length == urls.length ) {
      console.log( post );
      console.log( processed_urls );
      return post.replaceArray(urls, processed_urls);
      console.log( post );
    }
  } else {
    return post;
  }
}

String.prototype.replaceArray = function(find, replace) {
  let replaceString = this;
  for (let i=0; i < find.length; i++) {
    replaceString = replaceString.replace(find[i], replace[i]);
  }
  return replaceString;
}

export function sanitize(string) {
  var tagBody = '(?:[^"\'>]|"[^"]*"|\'[^\']*\')*';
  var tagOrComment = new RegExp(
      '<(?:'
      // Comment body.
      + '!--(?:(?:-*[^->])*--+|-?)'
      // Special "raw text" elements whose content should be elided.
      + '|script\\b' + tagBody + '>[\\s\\S]*?</script\\s*'
      + '|style\\b' + tagBody + '>[\\s\\S]*?</style\\s*'
      // Regular name
      + '|/?[a-z]'
      + tagBody
      + ')>',
    'gi'
  );
  var oldHtml;
  do {
    oldHtml = string;
    string = string.replace(tagOrComment, '');
  } while (string !== oldHtml);
  return string.replace(/</g, '&lt;');
}

function abbreviateUrl( url ) {
  let abbreviated_url = url.replace(/^https?\:\/\//i, '').replace(/^www./, '');
  let last = abbreviated_url.lastIndexOf('/');
  if (last > 24) {
    abbreviated_url = abbreviated_url.slice(0, 24);
  }
  if (!/^https?:\/\//i.test(url)) {
    url = 'http://' + url;
  }
  return `<a href=${url} target="_blank" rel="noreferrer">${ abbreviated_url }</a>`;
}

function getUrlsFromString( post ) {
  // gruber revised expression - http://rodneyrehm.de/t/url-regex.html
  let uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
  return post.match(uri_pattern) ?? false;
}

function getUrlExtension( url, lowercase=true ) {
  let extension = url.toString().split(/[#?]/)[0].split('.').pop().trim();
  // If no extension, return false
  if (extension == '') {
    return false;
  } else {
    if (lowercase == true) {
      return extension.toLowerCase();
    }
  }
}

