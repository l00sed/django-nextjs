"use client";

/* Local Utilities */
//import { renderComments, processComments } from '../utils/comment_helpers'
import sanitize from '../utils/sanitize';
import Comment from './comment';
import CommentForm from './comment_form';

/* Styles */
import comment_styles from '../styles/Comment.module.scss';
import { useEffect, useState, createContext } from 'react';


export const CommentsContext = createContext('comment_data');

export default function Comments(props) {
  const [commentsData, setCommentsData] = useState([]);
  const [commentsLoading, setLoadingComments] = useState(false);
  const [commentFormData, setCommentFormData] = useState("");
  const [commentFormLoading, setLoadingCommentForm] = useState(false);

  useEffect(() => {
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

    setLoadingCommentForm(true);
    /** FETCH: comment_form */
    /** Setup promise for HTML Django form
      * 1 Setup the request headers
      * 2 Fetch the endpoint */
    try {
      const header_comment_form = {
        method: "GET",
        supportHeaderParams: true,
        headers: {
          'Accept': 'text/html;encoding=utf-8',
          'Content-Type': 'text/html;encoding=utf-8',
        }
      }
      fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/${props.slug}/form`,  // Endpoint URL
        header_comment_form)  // Header Options
        .then(res => {
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
  }, []);

  if (commentsLoading || commentFormLoading) {
    return <></>;
  }

  if (!commentsData || !commentFormData) {
    return (
      <div className={ comment_styles.comments_section }>
        <p>Comments unavailable.</p>
      </div>
    )
  }

  return (
    <div className={ comment_styles.comments_section }>
      <CommentsContext.Provider
        value={
          {
            commentsData,
            setCommentsData,
            commentsLoading,
            setLoadingComments,
            commentFormData,
            setCommentFormData,
            commentFormLoading,
            setLoadingCommentForm
          }
        }
      >
        <CommentForm slug={ props.slug } />
        <div>
          {
            commentsData.map((comment, index) => {
                return <Comment key={ comment.cid } comment={ comment } index={ index } />
              })
            }
          </div>
        </CommentsContext.Provider>
      </div>
    )
  }
