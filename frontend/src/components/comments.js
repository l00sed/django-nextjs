import React from 'react'
import sanitize from '../utils/sanitize'
import comment_styles from '../styles/Comment.module.css'
import Comment from './comment'

export default class Comments extends React.Component {
  constructor(props) {
    super(props);

    if (this)
      this.state = {
        comments: this.props.comments,
        pid: 0,
        author: "Anonymous",
        upvote_count: 0,
        downvote_count: 0,
      }
      this.setComments = this.setComments.bind(this)
      this.setPID = this.setPID.bind(this)
      this.setAuthor = this.setAuthor.bind(this)
      this.setContent = this.setContent.bind(this)
  }

  setComments = async (val) => {
    this.setState({
      comments: val ?? '',
    }, () => {
      //console.log(this.state.comments);
    })
  }

  setPID = async (e) => {
    this.setState({
      [e.target.name]: e.target.value ?? 0,
    })
  }

  setAuthor = async (e) => {
    this.setState({
      [e.target.name]: e.target.value ?? 'Anonymous',
    })
  }

  setContent = async (e) => {
    this.setState({
      [e.target.name]: e.target.value ?? '',
    })
  }

  handleCommentSubmit = async (e, article_id) => {
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

    this.getNewComments();
    return results;

  }

  getNewComments = async () => {
    const options_get = {
      method: "GET",
      supportHeaderParams: true,
      headers: {
        'Accept': 'application/json;encoding=utf-8',
        'Content-Type': 'application/json;encoding=utf-8',
      },
    }

    const results = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${this.props.article.slug}`, options_get)
      .then(res => res.json())
      .then(data => {
        return data;
      })
      .catch(error => console.log( error ));

    this.setComments(results);
  }

  render() {
    let comments_exist = false // Set default to 'false'
    let processed_comments = []

    if (this.props.comments.length > 0 && this.props.comments != 'Not found') {
      // API setup to returns 'Not found' in python view
      comments_exist = true
    }

    comments_exist ? (
      this.props.comments.map((comment, index) => {
        let reply = false;
        let marginLeft = 0;
        let replyClass = '';
        let commentHeader  = '';

        if ( comment.pid != 0 ) {
          reply = true;
        }

        // const approved = comment.approved ?? false;
        if ( reply == true ) {
          marginLeft = ' style="margin-left:' + comment.margin + 'px"';
          replyClass = ' commentReply';
          commentHeader = ' id="cid" value="' + comment.cid + '"';
        }

        processed_comments.push(<Comment key={ comment.cid } comment={ comment } reply={ reply } />);
      })
    ) : (
      <div></div>
    );

    return(
      <>
        <>{ processed_comments }</>
        <div className={ comment_styles.comment_form_wrapper }>
          <form className={ comment_styles.comment_form } onSubmit={ (e) => { this.handleCommentSubmit(e, this.props.article.id) } }>
            <input required hidden type="number" name="pid" value="0" onChange={ (e) => { this.setPID(e) } } />
            <input type="text" name="author" placeholder="Anonymous" className={ comment_styles.name_input } onChange={ (e) => { this.setAuthor(e) } } />
            <textarea required type="text" name="content" rows="5" placeholder="Type a reply or comment in this area." className={ comment_styles.comment_input } onChange={ (e) => { this.setContent(e) } } />
            <div className={ comment_styles.comment_form_button }>
              <input type="submit" value="SUBMIT" className={ comment_styles.comment_submit } />
            </div>
          </form>
        </div>
      </>
    )
  }
}
