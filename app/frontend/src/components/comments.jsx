"use client";

/* React */
import { useEffect, useState, createContext } from 'react';
/* Local Components */
import Comment from 'components/comment.jsx';
import CommentForm from 'components/comment_form.jsx';
/* Styles */
import comment_styles from 'styles/Comment.module.scss';
import ResponseError from 'utils/error_handling';
import HOST_URL from 'utils/api_server';
import { waitForElem } from 'lib/wait_for_elem';

/* Create data context for comment form an comments */
export const CommentsContext = createContext('comment_data');

export default function Comments(props) {
  /* Comments Data */
  const [commentsData, setCommentsData] = useState([]);
  const [commentsLoading, setLoadingComments] = useState(false);

  /* Comment Form Data */
  const [commentFormData, setCommentFormData] = useState("");
  const [commentFormLoading, setLoadingCommentForm] = useState(false);

  /* Connect to Django's WebSockets server */
  const ws = new WebSocket(`${HOST_URL(true)}/ws/comment/${props.slug}`);

  function commentsFetch() {
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

      fetch(
        `${HOST_URL()}/api/comments/${props.slug}`,  // Endpoint URL
        header_comments  // Header Options
      )
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            throw new ResponseError('Could not retrieve comments data from the API.', res);
          }
        })
        .then(data => {
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
            // Set article comment count button.
            waitForElem('#comment_count').then(elem => {
              elem.innerText = comments.length;
            });
            console.log(commentsData);
          } else {
            /* Additional error logging for easier debugging. */
            console.error('Comments API returned a value that either is not an array, or is empty.');
            setLoadingComments(false);
          }
        });
    } catch (err) {
      // Handle the error, with full access to status and body
      switch (err.response?.status) {
        case 400:
          /* Handle */
          console.error( 'Could not fetch comments. 400' );
          break;
        case 401:
          /* Handle */
          console.error( 'Could not fetch comments. 401' );
          break;
        case 404:
          /* Handle */
          console.error( 'Could not fetch comments. 404' );
          break;
        case 500:
          /* Handle */
          console.error( 'Could not fetch comments. 500' );
          break;
      }
    }
  }

  function commentsFormFetch() {
    /** FETCH: comment_form */
    /** Setup promise for HTML Django form
      * 1 Setup the request headers
      * 2 Fetch the endpoint */
    try {
      console.log('props.slug');
      console.log(props.slug);
      const header_comment_form = {
        method: "GET",
        supportHeaderParams: true,
        headers: {
          'Accept': 'text/html;encoding=utf-8',
          'Content-Type': 'text/html;encoding=utf-8',
        }
      }

      console.log(`${HOST_URL()}`);
      fetch(
        `${HOST_URL()}/api/comment/${props.slug}/form`,  // Endpoint URL
        header_comment_form  // Header Options
      )
        .then(res => {
          if (res.ok) {
            return res.text();
          } else {
            throw new ResponseError('Could not retrieve comment form data from the API.', res);
          }
        })
        .then(data => {
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
    } catch (err) {
      // Handle the error, with full access to status and body
      switch (err.response?.status) {
        case 400:
          /* Handle */
          console.error( 'Could not fetch comment form. 400' );
          break;
        case 401:
          /* Handle */
          console.error( 'Could not fetch comment form. 401' );
          break;
        case 404:
          /* Handle */
          console.error( 'Could not fetch comment form. 404' );
          break;
        case 500:
          /* Handle */
          console.error( 'Could not fetch comment form. 500' );
          break;
      }
    }
  }

  useEffect(() => {
    /* Fetch comments */
    setLoadingComments(true);
    commentsFetch();

    /* Fetch the comment form */
    setLoadingCommentForm(true);
    commentsFormFetch();

    ws.onopen = () => {
      console.log("WebSocket Client Connected");
    }

    ws.onmessage = message => {
      const dataFromServer = JSON.parse(message.data);
      if (dataFromServer) {
        console.log(dataFromServer);
        //setCommentsData([ ...commentsData, dataFromServer ]);
      }
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
        <CommentForm ws={ ws } slug={ props.slug } />
        {
          commentsData?.map((comment, index) => {
            return <Comment key={ comment.cid } comment={ comment } index={ index } />
          })
        }
      </CommentsContext.Provider>
    </div>
  )
}
