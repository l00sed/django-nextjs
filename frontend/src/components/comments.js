/* Local Utilities */
//import { renderComments, processComments } from '../utils/comment_helpers'
import sanitize from '../utils/sanitize';
import Comment from './comment';
import CommentForm from './comment_form';

/* Styles */
import comment_styles from '../styles/Comment.module.scss';


const getData = async (slug) => {
  /** FETCH: comments */
  /** Setup promise for comments fetch.
    * 1 Configure request header
    * 2 Fetch endpoint */
  const header_comments = {
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
  const comments_promise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${slug}`, header_comments);
  /* Empty array to receive JSON response */
  let comments_array = [];
  if (comments_promise.ok) {
    comments_array = await comments_promise.json();
  } else {
    /* Provide error log if endpoint is having issues. */
    console.error( 'Could not fetch parent comments.' );
  }

  let comments = [];
  /* Wrangle/clean-up some of the comment data. */
  if (comments_array instanceof Array && comments_array.length > 0) {
    comments_array.forEach(comment_json => {
      let comment = {
        cid: comment_json.cid,
        parent: comment_json.parent,
        author: comment_json.author,
        created_at: comment_json.created_at,
        content: comment_json.content,
        upvotes: comment_json.upvotes,
        downvotes: comment_json.downvotes,
        article: comment_json.article,
        reply_level: comment_json.reply_level,
      }
      comments.push(comment);
    });
  } else {
    /* Additional error logging for easier debugging. */
    console.error('Value is not an array, or is empty.');
  }

  /** FETCH: comment_form */
  /** Setup promise for HTML Django form
    * 1 Setup the request headers
    * 2 Fetch the endpoint */
  const header_comment_form = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'text/html;encoding=utf-8',
      'Content-Type': 'text/html;encoding=utf-8',
    }
  }
  const comment_form_promise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/${slug}/form`, header_comment_form);

  /* Empty array to receive JSON response */
  let comment_form_html_text = null;
  if (comment_form_promise.ok) {
    comment_form_html_text = await comment_form_promise.text();
  } else {
    /* Provide error log if endpoint is having issues. */
    console.error( 'Could not fetch comment form HTML.' );
  }

  let comment_form = "";
  /* Wrangle/clean-up some of the comment data. */
  if (typeof comment_form_html_text === 'string' && comment_form_html_text.length > 0) {
    comment_form = comment_form_html_text;
  } else {
    /* Additional error logging for easier debugging. */
    console.error('Value is not an array, or is empty.');
  }

  return {
    comments,
    comment_form
  }
}

export default async function Comments (props) {
  const { comments, comment_form } = await getData(props.slug);

  return(
    <div className={ comment_styles.comments_section }>
      <CommentForm data={ comment_form } comment_count={ comments.length } />
      <div>
        {
          comments.map((comment, index) => {
            return <Comment key={ comment.cid } comment={ comment } index={ index } />
          })
        }
      </div>
    </div>
  )
}
