import React, { useEffect, useState } from 'react'
import sanitize from '../utils/sanitize'
import comment_styles from '../styles/Comment.module.css'
import Comment from './comment'

export default function Comments(props) {

  const [comments, setComments] = useState(props.comments);
  const [meta, setMeta] = useState(props.meta);
  const [pid, setPID] = useState(0);
  const [author, setAuthor] = useState('Anonymous');
  const [upvote_count, setUpvoteCount] = useState(0);
  const [downvote_count, setDownvoteCount] = useState(0);
  const [content, setContent] = useState('');

  useEffect(() => {
  })

  const handleCommentSubmit = async(e, article_id) => {
    e.preventDefault();

    let pid = e.target.pid.value
    let author = e.target.author.value
    let content = sanitize(e.target.content.value)
    let upvotes = 0
    let downvotes = 0

    if ( author == '' ) {
      author = e.target.author.placeholder;
    }

    const object = {
      'pid': pid,
      'author': author,
      'content': content,
      'upvotes': upvotes,
      'downvotes': downvotes,
      'article': article_id,
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
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => console.log( error ))

    getNewComments();
    return results;
  }

  const getNewComments = async() => {
    const options_get = {
      method: "GET",
      supportHeaderParams: true,
      headers: {
        'Accept': 'application/json;encoding=utf-8',
        'Content-Type': 'application/json;encoding=utf-8',
      },
    }

    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${props.meta.slug}`, options_get)
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => console.log( error ));

    setComments(results);
  }

  const process_comments = (comments) => {
    let processed_comments = []
    if (comments.length > 0 && comments != 'Not found') {
      // API setup to returns 'Not found' in python view
      comments.map((comment) => {
        processed_comments.push(<Comment key={ comment.cid } comment={ comment } />);
      })
      return processed_comments;
    }
  }

  return(
    <>
      <h4 className={ comment_styles.comments_header }>Discussion</h4>
      { process_comments(comments) }
      <div className={ comment_styles.comment_form_wrapper }>
        <form className={ comment_styles.comment_form } onSubmit={ (e) => { handleCommentSubmit(e, meta.id) } }>
          <input required hidden type="number" name="pid" value="0" onChange={ (e) => { setPID(e) } } />
          <input type="text" name="author" placeholder="Anonymous" className={ comment_styles.name_input } onChange={ (e) => { setAuthor(e) } } />
          <textarea required type="text" name="content" rows="5" placeholder="Type a reply or comment in this area." className={ comment_styles.comment_input } onChange={ (e) => { setContent(e) } } />
          <div className={ comment_styles.comment_form_button }>
            <input type="submit" value="SUBMIT" className={ comment_styles.comment_submit } />
          </div>
        </form>
      </div>
    </>
  );

}
