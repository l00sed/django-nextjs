'use client';

/* React */
import React, { useState } from 'react'
/* Local Utilities */
import { renderComments, processComments } from '../utils/comment_helpers'
import sanitize from '../utils/sanitize'
/* Styles */
import comment_styles from '../styles/Comment.module.css'

export default async function Comments({ meta }) {
  const [pid, setPID] = useState(0);
  const [author, setAuthor] = useState('Anonymous');
  const [upvote_count, setUpvoteCount] = useState(0);
  const [downvote_count, setDownvoteCount] = useState(0);
  const [content, setContent] = useState('');

  const parentComments        = await getParentComments(meta.slug);
  const commentsAndRepliesRaw = await processComments(parentComments);
  const comments              = await renderComments(commentsAndRepliesRaw);

  async function handleCommentSubmit(e, meta) {
    e.preventDefault();

    let pid = e.target.pid.value
    let author = e.target.author.value
    let content = sanitize(e.target.content.value)
    let upvotes = 0
    let downvotes = 0

    if ( author === '' ) {
      author = e.target.author.placeholder;
    }

    const object = {
      'pid': pid,
      'author': author,
      'content': content,
      'upvotes': upvotes,
      'downvotes': downvotes,
      'article': meta.id,
    }

    const options_post = {
      method: "POST",
      supportHeaderParams: true,
      headers: {
        'Accept': 'application/json;encoding=utf-8',
        'Content-Type': 'application/json;encoding=utf-8',
      },
      body: JSON.stringify(object),
    }

    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/submit`, options_post)
      .catch(error => console.log( error ))
    const json = results.json()

    getNewComments(meta);
    return json;
  }

  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8',
    }
  }

  async function getNewComments({ meta }) {
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${meta.slug}/parents`, options_get)
      .catch(error => console.log( error ));
    const json = await results.json()
    //setComments(processComments(json));
  }

  return(
    <>
      <h4 className={ comment_styles.comments_header }>Discussion</h4>
      <div className={ comment_styles.comment_form_wrapper }>
        <form className={ comment_styles.comment_form } onSubmit={ (e) => { handleCommentSubmit(e, meta) } }>
          <input required hidden type="number" name="pid" value="0" onChange={ (e) => { setPID(e) } } />
          <input type="text" name="author" placeholder="Anonymous" className={ comment_styles.name_input } onChange={ (e) => { setAuthor(e) } } />
          <textarea required type="text" name="content" rows="5" placeholder="Type a reply or comment in this area." className={ comment_styles.comment_input } onChange={ (e) => { setContent(e) } } />
          <div className={ comment_styles.comment_form_button }>
            <input type="submit" value="SUBMIT" className={ comment_styles.comment_submit } />
          </div>
        </form>
      </div>
      { comments }
    </>
  );
}

async function getParentComments( slug ) {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8',
    }
  }
  const parent_comments_promise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${slug}/parents`, options_get);

  if (parent_comments_promise.ok) {
    const parentComments = await parent_comments_promise.json();
    console.log('Parent comments');
    console.log(parentComments);
    return parentComments;
  } else {
    console.error( 'Could not fetch parent comments.' );
  }
}
