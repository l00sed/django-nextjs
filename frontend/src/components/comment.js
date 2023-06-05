"use client";

/* React */
import React, { useEffect, useState } from 'react';
/* Next */
import Link from 'next/link';
/* Local utils */
import useConstructor from '../utils/constructor';
import { waitForElems } from '../lib/wait_for_elem';
import Parse from '../utils/parser.js';
import sanitize from '../utils/sanitize';
/* Styles */
import comment_styles from '../styles/Comment.module.scss'

String.prototype.replaceArray = function(find, replace) {
  let replaceString = this;
  // Replace found strings (in array)
  // with new strings (in a second array)
  for (let i = 0; i < find.length; i++) {
    replaceString = replaceString.replace(find[i], replace[i]);
  }
  return replaceString;
}

export default function Comment(props) {
  const [comment, setComment] = useState(props.comment);
  const [uvc, setUVC] = useState(0);
  const [message, setMessage] = useState('');

  const parseUpvotes = (upvote_count) => {
    if ( upvote_count > 999 ) {
      if ( upvote_count > 99999 ) {
        upvote_count = 'max';
      } else {
        upvote_count = `${upvote_count.slice(0, -3).toString()}k`;
      }
    } else {
      if ( upvote_count < -99 ) {
        upvote_count = '🪠';
      }
    }
    return upvote_count;
  }

  const autoLinkText = (post, approved=1) => {
    let urls = getUrlsFromString( post );
    let blur = '';
    if (approved !== 1) {
      blur = ' className="blur"';
    }
    let processed_urls = [];
    if ( urls !== false ) {
      const imgExt = ['png','gif','jpg','jpeg','webp'];
      const urlExt = (this_url) => getUrlExtension(this_url);
      const abbvUrl = (this_url) => abbreviateUrl(this_url);
      urls.forEach(function( url ) {
        let extension = urlExt(url) ?? false;
        if (imgExt.includes(extension)) {
          processed_urls.push(`<div${blur}><img src="${url}" className="lazyload commentImage" /></div>`);
        } else {
          const abbreviated_url = abbvUrl( url );
          processed_urls.push(abbreviated_url);
        }
      });
      if ( processed_urls.length === urls.length ) {
        return post.replaceArray(urls, processed_urls);
      }
    } else {
      return post;
    }
  }

  const abbreviateUrl = ( url ) => {
    // Remove 'www'
    let abbreviated_url = url.replace(/^https?\:\/\//i, '').replace(/^www./, '');
    // Abbreviate with ellipses if long
    if (abbreviated_url.length > 20) {
      abbreviated_url = `${abbreviated_url.slice(0, 20)}&hellip;`;
    }
    // Add 'http' to the beginning if not present (uses absolute URL)
    if (!/^https?:\/\//i.test(url)) {
      url = `http://${url}`;
    }
    return `<p><a href=${url} target="_blank" rel="noreferrer">${ abbreviated_url }</a></p>`;
  }

  const getUrlsFromString = ( post ) => {
    // gruber revised expression - http://rodneyrehm.de/t/url-regex.html
    // matches URLs in a string
    let uri_pattern = /\b((?:[a-z][\w-]+:(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/ig;
    return post.match(uri_pattern) ?? false;
  }

  const getUrlExtension = (url, lowercase=true) => {
    // Get extension
    let extension = url.toString().split(/[#?]/)[0].split('.').pop().trim();
    // If no extension, return false
    if (extension === '') {
      return false;
    } else {
      if (lowercase === true) {
        return extension.toLowerCase();
      }
    }
  }

  useConstructor(() => {
    setUVC(parseUpvotes(props.comment.upvotes - props.comment.downvotes));
    setMessage(props.comment.content ? Parse(autoLinkText(sanitize(props.comment.content))) : '');
  });

  useEffect(() => {
    // Reply button event handler
    const handleReply = (e) => {
      // Get the comment root node when clicking the reply button
      let this_comment_row = e.target.closest(comment_styles.row_wrapper);
      let this_comment = e.target.closest(comment_styles.main_wrapper);
      // Get the reply level
      let this_reply_level = this_comment_row?.querySelectorAll(comment_styles.indent_block)?.length + 1;
      // Set the comment form's parent ID
      document.getElementById('id_parent').value = this_comment.id;
      // Set the reply level
      document.getElementById('id_reply_level').value = this_reply_level;
      // Finally, focus the "author" field
      document.getElementById('id_author').focus();
    }
    // Upvote button event handler
    const handleUpvote = async(e) => {
      let comment_id = e.target.closest(comment_styles.main_wrapper)?.id;
      const header_upvote = {
        method: "PUT",
        supportHeaderParams: true,
        headers: {
          'Accept': 'application/json;encoding=utf-8',
          'Content-Type': 'application/json;encoding=utf-8',
        }
      }
      const upvote_promise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/upvote/${comment_id}`, header_upvote);
      /* Empty array to receive JSON response */
      let upvote_response = [];
      if (upvote_promise.ok) {
        upvote_response = await upvote_promise.json();
      } else {
        /* Provide error log if endpoint is having issues. */
        console.error( 'Could not upvote comment.' );
      }
    }
    // Downvote button event handler
    const handleDownvote = async(e) => {
      let comment_id = e.target.closest(comment_styles.main_wrapper)?.id;
      const header_downvote = {
        method: "PUT",
        supportHeaderParams: true,
        headers: {
          'Accept': 'application/json;encoding=utf-8',
          'Content-Type': 'application/json;encoding=utf-8',
        }
      }
      const downvote_promise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comment/downvote/${comment_id}`, header_downvote);
      /* Empty array to receive JSON response */
      let downvote_response = [];
      if (downvote_promise.ok) {
        downvote_response = await downvote_promise.json();
      } else {
        /* Provide error log if endpoint is having issues. */
        console.error( 'Could not downvote comment.' );
      }
    }

    // Button event listeners
    waitForElems(comment_styles.reply_button_wrapper).then(replyButtons => {
      if (replyButtons.length) {
        replyButtons.forEach(rB => {
          rB.addEventListener('click', handleReply);
        });
      }
    });
    // Upvote event listeners
    waitForElems(comment_styles.upvote_button).then(upvoteButtons => {
      if (upvoteButtons.length) {
        upvoteButtons.forEach(uB => {
          uB.addEventListener('click', handleUpvote);
        });
      }
    });
    // Downvote event listeners
    waitForElems(comment_styles.downvote_button).then(downvoteButtons => {
      if (downvoteButtons.length) {
        downvoteButtons.forEach(dB => {
          dB.addEventListener('click', handleDownvote);
        });
      }
    });

    // Clean up
    return () => {
      let replyButtons = document.querySelectorAll(comment_styles.reply_button_wrapper);
      if (replyButtons.length) {
        replyButtons.forEach(rB => {
          rB.removeEventListener('click', handleReply);
        });
      }
      let upvoteButtons = document.querySelectorAll(comment_styles.upvote_button);
      if (upvoteButtons.length) {
        upvoteButtons.forEach(uB => {
          uB.removeEventListener('click', handleUpvote);
        });
      }
      let downvoteButtons = document.querySelectorAll(comment_styles.downvote_button);
      if (downvoteButtons.length) {
        downvoteButtons.forEach(dB => {
          dB.removeEventListener('click', handleDownvote);
        });
      }
    }
  }, []);

  const indent = () => {
    let indentBlocks = [];
    let reply_level = props.comment.reply_level || 0;
    for (let i = 0; i < reply_level; i++) {
      indentBlocks.push(<div key={ i } className={ `${comment_styles.indent_block} indent-${ i+1 }` } />);
    }
    return indentBlocks;
  }

  const timeSince = (date) => {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) {
      return `${Math.floor(interval).toString()} years ago`;
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return `${Math.floor(interval).toString()} months ago`;
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return `${Math.floor(interval).toString()} days ago`;
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return `${Math.floor(interval).toString()} hours ago`;
    }
    interval = seconds / 60;
    if (interval > 1) {
      return `${Math.floor(interval).toString()} minutes ago`;
    }
    return `${Math.floor(seconds).toString()} seconds ago`;
  }

  return <>
    <div className={ comment_styles.row_wrapper }>
      { indent() }
      <div id={ comment.cid } className={ comment_styles.main_wrapper }>
        <div className={ comment_styles.body_wrapper }>
          <div className={ comment_styles.body_row_1 }>
            <div className={ comment_styles.body_col_1 }>
              <span className={ comment_styles.comment_author }>{ comment.author }</span>
              <span className={ comment_styles.comment_date }>{ timeSince(new Date(comment.created_at)) }</span>
            </div>
            <div className={ comment_styles.body_col_2 }>
              <button name="reply" className={ comment_styles.reply_button_wrapper }>
                <div className={ comment_styles.reply_button }>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M20 19q-.425 0-.713-.288T19 18v-3q0-1.25-.875-2.125T16 12H6.8l2.925 2.925Q10 15.2 10 15.6t-.3.7q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T3.426 11q0-.2.063-.375T3.7 10.3l4.625-4.625Q8.6 5.4 9 5.4t.7.3q.275.275.275.7t-.275.7L6.8 10H16q2.075 0 3.538 1.463T21 15v3q0 .425-.288.713T20 19Z" />
                  </svg>
                </div>
              </button>
            </div>
          </div>
          <div className={ comment_styles.body_row_2 }>
            <div className={ comment_styles.comment_wrapper }>
              <div className={ comment_styles.comment_content }>{ message }</div>
            </div>
          </div>
        </div>
        <div className={ comment_styles.vote_wrapper }>
          <div className={ comment_styles.vote_count }>
            <span className={ comment_styles.count_text }>{ uvc }</span>
          </div>
          <div className={ comment_styles.upvote_button }>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="currentColor" d="M6.786 1.459a.903.903 0 0 0-1.572 0L1.122 8.628C.774 9.238 1.211 10 1.91 10h8.18c.698 0 1.135-.762.787-1.372l-4.092-7.17Z"/></svg>
            </span>
          </div>
          <div className={ comment_styles.downvote_button }>
            <span>
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12"><path fill="currentColor" d="M5.214 10.541a.903.903 0 0 0 1.572 0l4.092-7.169C11.226 2.762 10.789 2 10.09 2H1.91c-.698 0-1.135.762-.787 1.372l4.092 7.17Z"/></svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  </>;
}
