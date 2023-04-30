'use client';

/* Styles */
import comment_styles from '../styles/Comment.module.scss';


export default function CommentForm(props) {
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

  return (
    <form className={ comment_styles.comment_form } onSubmit={ (e) => { handleCommentSubmit(e, meta) } }>
      <input required hidden type="number" name="pid" value="0" onChange={ (e) => { setPID(e) } } />
      <input type="text" name="author" placeholder="Anonymous" className={ comment_styles.name_input } onChange={ (e) => { setAuthor(e) } } />
      <textarea required type="text" name="content" rows="5" placeholder="Type a reply or comment in this area." className={ comment_styles.comment_input } onChange={ (e) => { setContent(e) } } />
      <div className={ comment_styles.comment_form_button }>
        <input type="submit" value="SUBMIT" className={ comment_styles.comment_submit } />
      </div>
    </form>
  )
}