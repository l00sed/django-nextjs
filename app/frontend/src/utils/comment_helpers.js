import Comment from '../components/comment'

let index = 0;
let reply_level = 0;

const options_get = {
  method: "GET",
  supportHeaderParams: true,
  headers: {
    'Accept': 'application/json;encoding=utf-8',
    'Content-Type': 'application/json;encoding=utf-8',
  }
}

export function renderComments(comments) {
  console.log( 'renderedComments input:' );
  console.log( comments );

  let rendered_comments = [];
  if (comments && comments !== 'Not found') {
    comments.forEach((processed_comment) => {
      //console.log( 'currentComment: ' );
      //console.log(processed_comment);
      const ready_comment = <Comment key={ processed_comment.cid } comment={ processed_comment } reply_level={ processed_comment.reply_level } />;
      rendered_comments.push(ready_comment);
    })
  }
  console.log( 'rendered_comments' );
  console.log( rendered_comments );
  return rendered_comments;
}

export function processComments( parent_comments ) { // Accepts array of comment objects
  let processed_comments = [];
  // API is set up to returns 'Not found' in python view
  if (parent_comments.length && parent_comments !== 'Not found') {
    console.log('Process Comments');
    console.log(parent_comments);
    for (let comment of parent_comments) {
      // Append rendered comment component to processed parent_comments array
      reply_level = 0;
      comment.reply_level = reply_level;
      const replies = getReplies(comment);
      console.log('Replies');
      console.log(replies);
      if (replies) {
        processed_comments.push(comment);
        processed_comments.push(replies);
      } else {
        processed_comments.push(comment);
      }
    }

    console.log('processed_comments: ');
    console.log(processed_comments);
    return processed_comments;
  }
}

export function getReplies(comment) {
  console.log('Current comment being processed for replies:');
  console.log(comment);
  if (comment.pid !== 0) {
    const comments = fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/pid/${comment.cid}`, options_get);
    let json = {}
    if (comments.ok) {
      json = comments.json();
      console.log('Replies for the currently processed comment:');
      console.log(json);
      if (json !== 'Not found') {
        index++;
        processReplies(json)
      }
    } else {
      console.error('Could not get comments for parent id.');
    }
  } else {
    console.log('This comment has no parent.');
    index++;
    return;
  }
}

export function processReplies(data) {
  reply_level++;
  for (const reply of data) {
    // Append rendered reply component to processed comments
    reply.reply_level = reply_level;
    processed_comments.push(reply);
    if (reply_level < 6) { // Continue looping deeper until depth = 6
      getReplies( reply );
    }
  }
}
