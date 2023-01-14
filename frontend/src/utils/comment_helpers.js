import Comment from '../components/comment'

let index = 0;
let reply_level = 0;
let processed_comments = [];

const options_get = {
  method: "GET",
  supportHeaderParams: true,
  headers: {
    'Accept': 'application/json;encoding=utf-8',
    'Content-Type': 'application/json;encoding=utf-8',
  },
}

export function renderComments(comments) {
  //console.log( 'renderedComments input:' );
  //console.log( comments );
  let rendered_comments = [];
  if (comments && comments !== 'Not found') {
    comments.forEach((processed_comment) => {
      //console.log( 'currentComment: ' );
      //console.log(processed_comment);
      const ready_comment = <Comment key={ processed_comment.cid } comment={ processed_comment } reply_level={ processed_comment.reply_level } />;
      rendered_comments.push(ready_comment);
    })
  }
  //console.log( 'rendered_comments' );
  //console.log( rendered_comments );
  return rendered_comments;
}

export async function processComments(comments) { // Accepts array of comment objects
  // API is set up to returns 'Not found' in python view
  if (comments && comments !== 'Not found') {
    console.log('Comments');
    console.log(comments);
    for (const comment of comments) {
      // Append rendered comment component to processed comments array
      reply_level = 0;
      comment.reply_level = reply_level;
      console.log('processed_comments');
      console.log(processed_comments);
      let already_processed = false;
      processed_comments.forEach((c) => {
        if (comment.cid === c.cid) {
          already_processed = true;
        }
      });
      if (! already_processed) {
        processed_comments.push(comment);
        // Get replies to the current comment
        await getReplies(comment);
      }
    }
    //console.log('processed_comments: ');
    //console.log(processed_comments);
    return processed_comments;
  }
}

export async function getReplies(comment) {
  console.log('Current comment');
  console.log(comment);
  if (comment.pid !== 0) {
    const comments = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/pid/${comment.cid}`, options_get);
    let json = {}
    if (comments.ok) {
      json = comments.json();
      console.log('getReplies:');
      console.log(json);
      if (json !== 'Not found') {
        index++;
        await processReplies(json)
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

export async function processReplies(data) {
  reply_level++;
  for (const reply of data) {
    // Append rendered reply component to processed comments
    reply.reply_level = reply_level;
    processed_comments.push(reply);
    if (reply_level < 6) { // Continue looping deeper until depth = 6
      await getReplies( reply );
    }
  }
}
