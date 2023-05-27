'use client';

/* Styles */
import comment_styles from '../styles/Comment.module.scss';
import { useState } from 'react';
import Parse from '../utils/parser';


export default function CommentForm(props) {
  //const [getPID, setPID] = useState(0);
  //const [getAuthor, setAuthor] = useState('Anonymous');
  //const [getContent, setContent] = useState('');

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
    const json = await results.json()

    getNewComments(meta);
    return json;
  }

  async function getNewComments({ meta }) {
    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${meta.slug}/parents`, options_get)
      .catch(error => console.log( error ));
    const json = results.json()
    setComments(renderComments(processComments(json)));
  }

    /*
    <form className={ comment_styles.comment_form } onSubmit={ (e) => { handleCommentSubmit(e, meta) } }>
      <input required hidden type="number" name="pid" value="0" onChange={ (e) => { setPID(e) } } />
      <input type="text" name="author" placeholder="Name" className={ comment_styles.name_input } onChange={ (e) => { setAuthor(e) } } />
      <textarea required type="text" name="content" rows="5" placeholder="Type your comment or reply here" className={ comment_styles.comment_input } onChange={ (e) => { setContent(e) } } />
      <button type="submit" className={ comment_styles.comment_submit }>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4.4 19.425q-.5.2-.95-.088T3 18.5v-3.725q0-.35.2-.625t.55-.35L11 12l-7.25-1.8q-.35-.075-.55-.35T3 9.225V5.5q0-.55.45-.838t.95-.087l15.4 6.5q.625.275.625.925t-.625.925l-15.4 6.5Z"/></svg>
      </button>
    </form>
    */
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
        <span>{ props.comment_count ?? 0 }</span>
      </div>
      { Parse(props.data) }
    </div>
  )
}
