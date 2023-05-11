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
      <input type="text" name="author" placeholder="Name / Anonymous / I was never given a name." className={ comment_styles.name_input } onChange={ (e) => { setAuthor(e) } } />
      <textarea required type="text" name="content" rows="5" placeholder="Type a reply or comment in this area." className={ comment_styles.comment_input } onChange={ (e) => { setContent(e) } } />
      <button type="submit" className={ comment_styles.comment_submit }>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="M4.4 19.425q-.5.2-.95-.088T3 18.5v-3.725q0-.35.2-.625t.55-.35L11 12l-7.25-1.8q-.35-.075-.55-.35T3 9.225V5.5q0-.55.45-.838t.95-.087l15.4 6.5q.625.275.625.925t-.625.925l-15.4 6.5Z"/></svg>
      </button>
    </form>
  )
}
