'use client';

/* Styles */
import comment_styles from '../styles/Comment.module.scss';
import { renderComments, processComments } from '../utils/comment_helpers'
import { useEffect, useState } from 'react';
import waitForElem from '../lib/wait_for_elem';
import sanitize from '../utils/sanitize';
import Parse from '../utils/parser';


export default function CommentForm(props) {
  async function handleCommentSubmit(_e) {
    let author = sanitize(document.getElementById("id_author").value) || "Anonymous";
    let content = sanitize(document.getElementById("id_content").value);
    let upvotes = 0  // No upvotes initially
    let downvotes = 0  // No downvotes initially
    let reply_level = sanitize(document.getElementById('id_reply_level').value) || 0;
    let approved = true;
    let parent = sanitize(document.getElementById("id_parent").value) || null;
    let article = sanitize(document.getElementById("id_article").value);

    const object = {
      'author': author,
      'content': content,
      'upvotes': upvotes,
      'downvotes': downvotes,
      'reply_level': reply_level,
      'approved': approved,
      'parent': parent,  // int, id
      'article': article,  // int, id
    }
    console.log(object);

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
    const json = await results.json()

    console.log(json);
    //getNewComments();
    return json;
  }

  async function getNewComments() {
    const options_get = {
      method: "GET",
      supportHeaderParams: true,
      headers: {
        'Accept': 'application/json;encoding=utf-8',
        'Content-Type': 'application/json;encoding=utf-8',
      }
    }
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${props.slug}/parents`, options_get)
      .catch(error => console.log( error ));
    const json = results.json()
    setComments(renderComments(processComments(json)));
  }

  useEffect(() => {
    waitForElem('form[name="comment-form"]').then(cF => {
      let submit = cF?.querySelector('button[type="submit"]');
      submit?.addEventListener('click', function(e) {
        e.preventDefault();
        handleCommentSubmit(e);
      });
    });
  }, [])

  return (
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
        <span>{ props.comments.length ?? 0 }</span>
      </div>
      { Parse(props.comment_form) }
    </div>
  )
}
