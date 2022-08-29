import Comment from '../components/comment'

let index = 0;
let reply_level = 0;
let processed_comments = [];
let finished = false;

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
  if (comments && comments != 'Not found') {
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

export function processComments(comments) { // Accepts array of comment objects
  // API is set up to returns 'Not found' in python view
  if (comments && comments != 'Not found') {
    comments.forEach((comment) => {
      // Append rendered comment component to processed comments array
      reply_level = 0;
      comment.reply_level = reply_level;
      processed_comments.push(comment);
      // Get replies to the current comment
      getReplies(comment);
    })
    //console.log('processed_comments: ');
    //console.log(processed_comments);
    return processed_comments;
  }
}

export function getReplies(comment) {
  fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/pid/${comment.cid}`, options_get)
    .then(res => res.json())
    .then(data => {
      if (data && data != 'Not found') {
        processReplies(data)
      }
    })
    .catch(error => {
      console.log(error)
    });
  index++;
}

export function processReplies(data) {
  reply_level++;
  data.forEach((reply) => {
    // Append rendered reply component to processed comments
    reply.reply_level = reply_level;
    processed_comments.push(reply);
    if (reply_level < 6) { // Continue looping deeper until depth = 6
      getReplies( reply );
    }
  });
}
