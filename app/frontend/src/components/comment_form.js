'use client';

/* Styles */
import comment_styles from '../styles/Comment.module.scss';
import { renderComments, processComments } from '../utils/comment_helpers'
import { CommentsContext } from './comments';
import { useEffect, useState, useContext } from 'react';
import { waitForElem } from '../lib/wait_for_elem';
import sanitize from '../utils/sanitize';
import Parse from '../utils/parser';


export default function CommentForm(props) {
  const {
    commentsData,
    setCommentsData,
    commentsLoading,
    setLoadingComments,
    commentFormData,
    setCommentFormData,
    commentFormLoading,
    setLoadingCommentForm
  } = useContext(CommentsContext)

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
    setCommentsData(renderComments(processComments(json)));
  }

  async function handleCommentSubmit(e) {
    e.preventDefault();

    let author = sanitize(document.getElementById("id_author").value) || "Anonymous";
    let content = sanitize(document.getElementById("id_content").value);
    let upvotes = 0  // No upvotes initially
    let downvotes = 0  // No downvotes initially
    let reply_level = sanitize(document.getElementById('id_reply_level').value) || 0;
    let approved = true;
    let parent = sanitize(document.getElementById("id_parent").value) || null;
    let article = sanitize(document.getElementById("id_article").value);
    let subscribe = document.getElementById("id_subscribe").checked;

    const object = {
      'author': author,  // str
      'content': content,  // str
      'upvotes': upvotes,  // int
      'downvotes': downvotes,  // int
      'reply_level': reply_level,
      'approved': approved,  // bool
      'parent': parent,  // int, id
      'article': article,  // int, id
      'subscribe': subscribe   // bool
    }
    console.log(object);

    setLoadingCommentForm(true);
    /** FETCH: comment_form */
    /** Setup promise for HTML Django form
      * 1 Setup the request headers
      * 2 Fetch the endpoint */
    try {
      const header_comment_form = {
        method: "POST",
        supportHeaderParams: true,
        headers: {
          'Accept': 'application/json;encoding=utf-8',
          'Content-Type': 'application/json;encoding=utf-8',
        },
        body: JSON.stringify(object),
      }
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/${props.slug}/form`,  // Endpoint URL
        header_comment_form)  // Header Options
        .then(res => {
          console.log(res);
          if (res.ok) {
            return res.text();
          }
        })
        .then(data => {
          console.log(data);
          let comment_form = "";
          /* Wrangle/clean-up some of the comment data. */
          if (typeof data === 'string' && data.length > 0) {
            comment_form = data;
            setCommentFormData(comment_form);
            setLoadingCommentForm(false);
          } else {
            /* Additional error logging for easier debugging. */
            console.error('Value is not an array, or is empty.');
            setLoadingCommentForm(false);
          }
        });
    } catch (Error) {
      /* Provide error log if endpoint is having issues. */
      console.error( 'Could not fetch comment form HTML.' );
    }

    setLoadingComments(true);
    /** FETCH: comments */
    /** Setup promise for comments fetch.
      * 1 Configure request header
      * 2 Fetch endpoint */
    try {
      const header_comments = {
        method: "GET",
        supportHeaderParams: true,
        headers: {
          'Accept': 'application/json;encoding=utf-8',
          'Content-Type': 'application/json;encoding=utf-8',
        }
      }
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${props.slug}`,  // Endpoint URL
        header_comments)  // Header Options
        .then(res => {
          console.log(res);
          if (res.ok) {
            return res.json();
          }
        })
        .then(data => {
          console.log(data);
          let comments = [];
          /* Wrangle/clean-up some of the comment data. */
          if (data instanceof Array && data.length > 0) {
            data.forEach(comment_json => {
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
            setCommentsData(comments);
            setLoadingComments(false);
            console.log(commentsData);
          } else {
            /* Additional error logging for easier debugging. */
            console.error('Value is not an array, or is empty.');
            setLoadingComments(false);
          }
        });
    } catch (Error) {
      /* Provide error log if endpoint is having issues. */
      console.error( 'Could not fetch comments.' );
    }
  }

  useEffect(() => {
    waitForElem('form[name="comment-form"]').then(cF => {
      let submit = cF?.querySelector('button[type="submit"]');
      console.log(submit);
      if (submit) {
        console.log(submit);
        submit.addEventListener('click', handleCommentSubmit, 'once');
      }
    });

    return () => {
      waitForElem('form[name="comment-form"]').then(cF => {
        let submit = cF?.querySelector('button[type="submit"]');
        if (submit.length) {
          submit.removeEventListener('click', handleCommentSubmit, 'once');
        }
      });
    }
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
        <span>{ commentsData?.length ?? 0 }</span>
      </div>
      { Parse(commentFormData ?? "") }
    </div>
  )
}
