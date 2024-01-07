'use client';

/* React */
import { useEffect, useContext } from 'react';
/* Styles */
import comment_styles from 'styles/Comment.module.scss';
/* Load data context */
import { CommentsContext } from 'components/comments.jsx';
/* Utils */
//import { renderComments, processComments } from '../utils/comment_helpers'
import { waitForElem } from 'lib/wait_for_elem';
import csrfToken from 'utils/csrf_token';
import sanitize from 'utils/sanitize';
import ResponseError from 'utils/error_handling';
import HOST_URL from 'utils/api_server';
import Parse from 'utils/parser';


export default function CommentForm(props) {
  const headerClass = [
    "m-0",
    "text-sm",
    "font-sans",
    "mb-2",
    "text-md",
    "text-left",
    "w-full",
    "uppercase"
  ].join(' ');

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

  async function handleCommentSubmit(e) {
    e.preventDefault();

    let author = sanitize(document.getElementById("id_author").value) || "Anonymous";
    let content = sanitize(document.getElementById("id_content").value);
    let upvotes = 0  // No upvotes initially
    let downvotes = 0  // No downvotes initially
    let reply_level = parseInt(sanitize(document.getElementById('id_reply_level').value)) || 0;
    let approved = true;
    let parent = parseInt(sanitize(document.getElementById("id_parent").value)) || null;
    let article = parseInt(sanitize(document.getElementById("id_article").value));
    let subscribe = document.getElementById("id_subscribe").checked;

    const object = {
      'author': author,           // str
      'content': content,         // str
      'upvotes': upvotes,         // int
      'downvotes': downvotes,     // int
      'reply_level': reply_level, // int
      'approved': approved,       // bool
      'parent': parent,           // int, id
      'article': article,         // int, id
      'subscribe': subscribe      // bool
    }

    console.log(object);

    props.ws.oncomment = comment => {
      const dataFromServer = JSON.parse(comment.data);
      if (dataFromServer) {
        console.log(dataFromServer);
        //setCommentsData([...commentsData, comment.data]);
      }
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
    <div className="outer-sheen text-sm font-mono w-full block mb-2">
      <div className="p-4 inner-sheen">
        <div className={ comment_styles.title_row }>
          <h3 className={ headerClass }>Discussion</h3>
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
    </div>
  )
}
