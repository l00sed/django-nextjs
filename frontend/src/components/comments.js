/* Local Utilities */
//import { renderComments, processComments } from '../utils/comment_helpers'
import sanitize from '../utils/sanitize';
import Comment from './comment';
import CommentForm from './comment_form';

/* Styles */
import comment_styles from '../styles/Comment.module.scss';


const getData = async (slug) => {
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

  const comments_promise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${slug}`, options_get);

  let comments_array = [];
  if (comments_promise.ok) {
    comments_array = await comments_promise.json();
  } else {
    console.error( 'Could not fetch parent comments.' );
  }

  let comments = [];

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
    console.error('Value is not an array, or is empty.');
  }

  return {
    comments
  }
}

export default async function Comments (props) {
  const { comments } = await getData(props.slug);

  return(
    <div className={ comment_styles.comments_section }>
      <div className={ comment_styles.comment_form_wrapper }>
        <div className={ comment_styles.title_row }>
          <h3 className={ comment_styles.comments_header }>Discussion</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 256 256">
            <g fill="currentColor">
              <path d="M224 64v128a8 8 0 0 1-8 8H82.5a8 8 0 0 0-5.15 1.88l-32.2 28.23A8 8 0 0 1 32 224V64a8 8 0 0 1 8-8h176a8 8 0 0 1 8 8Z" opacity=".2"/>
              <path d="M216 48H40a16 16 0 0 0-16 16v160a15.85 15.85 0 0 0 9.24 14.5A16.13 16.13 0 0 0 40 240a15.89 15.89 0 0 0 10.25-3.78a.69.69 0 0 0 .13-.11L82.5 208H216a16 16 0 0 0 16-16V64a16 16 0 0 0-16-16ZM40 224Zm176-32H82.5a16 16 0 0 0-10.3 3.75l-.12.11L40 224V64h176ZM88 112a8 8 0 0 1 8-8h64a8 8 0 0 1 0 16H96a8 8 0 0 1-8-8Zm0 32a8 8 0 0 1 8-8h64a8 8 0 1 1 0 16H96a8 8 0 0 1-8-8Z"/>
            </g>
          </svg>
          <span>{ comments.length ?? 0 }</span>
        </div>
        <CommentForm />
      </div>
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
