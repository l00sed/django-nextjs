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
      <h4 className={ comment_styles.comments_header }>Discussion</h4>
      <div className={ comment_styles.comment_form_wrapper }>
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
