import Link from 'next/link'
import React, { useState, setState } from 'react'
import Parser from 'html-react-parser'
import sanitize from '../utils/sanitize'
import comment_styles from '../styles/Comment.module.css'
import dateformat from 'dateformat'

String.prototype.replaceArray = function(find, replace) {
  let replaceString = this;
  // Replace found strings (in array)
  // with new strings (in a second array)
  for (let i=0; i < find.length; i++) {
    replaceString = replaceString.replace(find[i], replace[i]);
  }
  return replaceString;
}

export default class Comment extends React.Component {
  constructor(props) {
    super(props);

    if (this)
      this.state = {
        comment: this.props.comment,
        reply: this.props.reply,
        uvc: this.parseUpvotes( this.props.comment.upvotes - this.props.comment.downvotes ),
        message: this.props.comment.content ? Parser( this.autoLinkText( sanitize( this.props.comment.content ) ) ) : '',
      }

    // const approved = comment.approved ?? false;
    if ( this.state.reply == true ) {
      this.state.marginLeft = ' style="margin-left:' + this.props.comment.margin + 'px"';
      this.state.replyClass = ' commentReply';
      this.state.commentHeader = ' id="cid" value="' + this.props.comment.cid + '"';
    }
  }

  parseUpvotes(upvote_count) {
    if ( upvote_count > 999 ) {
      if ( upvote_count > 99999 ) {
        upvote_count = 'max';
      } else {
        upvote_count = upvote_count.slice(0, -3).toString() + 'k';
      }
    } else {
      if ( upvote_count < -99 ) {
        upvote_count = '🪠';
      }
    }
    return upvote_count;
  }

  autoLinkText(post, approved=1) {
    let urls = this.getUrlsFromString( post );
    let blur = '';
    if (approved != 1) {
      blur = ' class="blur"';
    }
    let processed_urls = [];
    if ( urls != false ) {
      const imgExt = ['png','gif','jpg','jpeg','webp'];
      const urlExt = (this_url) => this.getUrlExtension(this_url);
      const abbvUrl = (this_url) => this.abbreviateUrl(this_url);
      urls.forEach(function( url ) {
        let extension = urlExt(url) ?? false;
        if (imgExt.includes(extension)) {
          processed_urls.push('<div'+blur+'><img src="'+url+'" class="lazyload commentImage" /></div>');
        } else {
          const abbreviated_url = abbvUrl( url );
          processed_urls.push(abbreviated_url);
        }
      });
      if ( processed_urls.length == urls.length ) {
        return post.replaceArray(urls, processed_urls);
      }
    } else {
      return post;
    }
  }

  abbreviateUrl( url ) {
    // Remove 'www'
    let abbreviated_url = url.replace(/^https?\:\/\//i, '').replace(/^www./, '');
    // Abbreviate with ellipses if long
    if (abbreviated_url.length > 20) {
      abbreviated_url = abbreviated_url.slice(0, 20) + '&hellip;';
    }
    // Add 'http' to the beginning if not present (uses absolute URL)
    if (!/^https?:\/\//i.test(url)) {
      url = 'http://' + url;
    }
    return `<a href=${url} target="_blank" rel="noreferrer">${ abbreviated_url }</a>`;
  }

  getUrlsFromString( post ) {
    // gruber revised expression - http://rodneyrehm.de/t/url-regex.html
    // matches URLs in a string
    let uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
    return post.match(uri_pattern) ?? false;
  }

  getUrlExtension( url, lowercase=true ) {
    // Get extension
    let extension = url.toString().split(/[#?]/)[0].split('.').pop().trim();
    // If no extension, return false
    if (extension == '') {
      return false;
    } else {
      if (lowercase == true) {
        return extension.toLowerCase();
      }
    }
  }

  render() {
    return (
      <>
        <div className={ `${ comment_styles.main_wrapper } ${ this.state.replyClass }` }>
          <div className={ comment_styles.body_wrapper }>
            <div className={ comment_styles.body_row_1 }>
              <div className={ comment_styles.body_col_1 }>
                <span className={ comment_styles.comment_author }>{ this.state.comment.author }</span>
                <span className={ comment_styles.comment_date }>{ dateformat( new Date(this.state.comment.created_at), "h:MMtt | mmmm, dS yyyy") }</span>
              </div>
              <div className={ comment_styles.body_col_2 }>
                <Link href="/" className={ comment_styles.reply_button_wrapper }>
                  <div className={ comment_styles.reply_button }>⮌</div>
                </Link>
              </div>
            </div>
            <div className={ comment_styles.body_row_2 }>
              <div className={ comment_styles.comment_wrapper }>
                <div className={ comment_styles.comment_content }>{ this.state.message }</div>
              </div>
            </div>
          </div>
          <div className={ comment_styles.vote_wrapper }>
            <div className={ comment_styles.vote_count }>
              <span className={ comment_styles.count_text }>{ this.state.uvc }</span>
            </div>
            <div className={ comment_styles.upvote_button }>
              <Link href="/">
                <span>🔺</span>
              </Link>
            </div>
            <div className={ comment_styles.downvote_button }>
              <Link href="/">
                <span>🔻</span>
              </Link>
            </div>
          </div>
        </div>
        {/* <Comment /> */}
      </>
    )
  }
}

