"use client";
/* React */
import React from 'react';
/* Local utils */
import Parse from 'utils/parser';
import sanitize from 'utils/sanitize';
import csrfToken from 'utils/csrf_token';
import ResponseError from 'utils/error_handling';
import HOST_URL from 'utils/api_server';
/* Styles */
import comment_styles from 'styles/Comment.module.scss'
import { waitForElem } from 'lib/wait_for_elem';

String.prototype.replaceArray = function(find, replace) {
  let replaceString = this;
  // Replace found strings (in array)
  // with new strings (in a second array)
  for (let i = 0; i < find?.length; i++) {
    replaceString = replaceString.replace(find[i], replace[i]);
  }
  return replaceString;
}

export default function Comment(props) {
  const parseVotes = upvote_count => {
    if (upvote_count > 999) {
      if (upvote_count > 99999) {
        upvote_count = '🔥';
      } else {
        upvote_count = `${upvote_count.toString().slice(0, -3)}k`;
      }
    } else {
      if (upvote_count < -99) {
        upvote_count = '💩';
      }
    }
    return upvote_count;
  }

  const autoLinkText = (post, approved=1) => {
    let urls = getUrlsFromString(post);
    let blur = '';
    if (approved !== 1) {
      blur = ' className="blur"';
    }
    let processed_urls = [];
    if (urls !== false) {
      const imgExt = ['png','gif','jpg','jpeg','webp'];
      const urlExt = (this_url) => getUrlExtension(this_url);
      const abbvUrl = (this_url) => abbreviateUrl(this_url);
      urls.forEach(url => {
        let extension = urlExt(url) ?? false;
        if (imgExt.includes(extension)) {
          processed_urls.push(`<div${blur}><img src="${url}" className="lazyload commentImage" /></div>`);
        } else {
          const abbreviated_url = abbvUrl(url);
          processed_urls.push(abbreviated_url);
        }
      });
      if (processed_urls.length === urls.length) {
        return post.replaceArray(urls, processed_urls);
      }
    } else {
      return post;
    }
  }

  const abbreviateUrl = url => {
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
    return `<span><a href=${ url } target="_blank" rel="noopener nofollow noreferrer">${ abbreviated_url }</a></span>`;
  }

  const getUrlsFromString = post => {
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

  const indent = () => {
    let indentBlocks = [];
    let reply_level = props.comment.reply_level || 0;
    for (let i = 0; i < reply_level; i++) {
      indentBlocks.push(<div key={ i } className={ `${comment_styles.indent_block} indent-${ i+1 }` } />);
    }
    return indentBlocks;
  }

  const timeSince = date => {
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

  // Reply button event handler
  const handleReply = e => {
    e.preventDefault();
    // Get the comment root node when clicking the reply button
    let this_comment_row = e.target.closest('[data-type="row"]');
    let this_comment = e.target.closest('[data-type="main"]');
    // Get the reply level
    let this_reply_level = this_comment_row?.querySelectorAll(`.${comment_styles.indent_block}`)?.length + 1;
    // Set the comment form's parent ID
    document.getElementById('id_parent').value = this_comment.id;
    // Set the reply level
    document.getElementById('id_reply_level').value = this_reply_level;
    // Finally, focus the "author" field
    document.getElementById('id_author').focus();
  }

  // Upvote button event handler
  const handleUpvote = async e => {
    e.preventDefault();
    let id = e.target.closest('[data-type="main"]')?.id;
    const header_upvote = {
      method: "PUT",
      supportHeaderParams: true,
      headers: {
        'Accept': 'application/json;encoding=utf-8',
        'Content-Type': 'application/json;encoding=utf-8',
        'X-CSRFToken': csrfToken()
      },
      body: JSON.stringify({ upvotes: 1 })
    }
    const upvote_promise = await fetch(`${HOST_URL()}/api/comment/upvote/${id}`, header_upvote);
    /* Empty array to receive JSON response */
    let upvote_response = [];
    if (upvote_promise.ok) {
      upvote_response = await upvote_promise.json();
      if (upvote_response.indexOf('ERROR') < 0) {
        waitForElem(`[id="${ id.toString() }"]`).then(elem => {
          let vote = parseInt(elem.querySelector(`.${comment_styles.count_text}`).dataset.voteCount)
          elem.querySelector(`.${comment_styles.count_text}`).dataset.voteCount = vote + 1;
          elem.querySelector(`.${comment_styles.count_text}`).innerText = parseVotes(vote + 1);
        });
      }
    } else {
      /* Provide error log if endpoint is having issues. */
      throw new ResponseError( 'Could not upvote comment.', upvote_promise);
    }
  }

  // Downvote button event handler
  const handleDownvote = async e => {
    e.preventDefault();
    let id = e.target.closest('[data-type="main"]')?.id;
    const header_downvote = {
      method: "PUT",
      supportHeaderParams: true,
      headers: {
        'Accept': 'application/json;encoding=utf-8',
        'Content-Type': 'application/json;encoding=utf-8',
        'X-CSRFToken': csrfToken()
      },
      body: JSON.stringify({ downvotes: 1 })
    }
    const downvote_promise = await fetch(`${HOST_URL()}/api/comment/downvote/${id}`, header_downvote);
    /* Empty array to receive JSON response */
    let downvote_response = [];
    if (downvote_promise.ok) {
      downvote_response = await downvote_promise.json();
      if (downvote_response.indexOf('ERROR') < 0) {
        /* Using numeric ids requires special handling. See:
         * https://stackoverflow.com/questions/20306204/using-queryselector-with-ids-that-are-numbers  */
        waitForElem(`[id="${ id.toString() }"]`).then(elem => {
          let vote = parseInt(elem.querySelector(`.${comment_styles.count_text}`).dataset.voteCount)
          elem.querySelector(`.${comment_styles.count_text}`).dataset.voteCount = vote - 1;
          elem.querySelector(`.${comment_styles.count_text}`).innerText = parseVotes(vote - 1);
        });
      }
    } else {
      /* Provide error log if endpoint is having issues. */
      throw new ResponseError('Could not downvote comment through the API.', downvote_promise);
    }
  }

  return <>
    <div data-type="row" className="flex flex-row">
      { indent() }
      <div id={ props.comment.cid } data-type="main" className="outer-sheen w-full my-2">
        <div className="inner-sheen items-stretch flex flex-row w-full relative font-mono text-sm">
          <div className="w-full rounded-l">
            <div className="px-4 py-2 backdrop-brightness-125 rounded-tl flex flex-row justify-between">
              <div>
                <span className={ comment_styles.comment_author }>{ props.comment.author }</span>
                <span className={ comment_styles.comment_date }>{ timeSince(new Date(props.comment.created_at)) }</span>
              </div>
              <div className="w-10 flex flex-col justify-center">
                <button
                  name="reply"
                  className={ comment_styles.reply_button }
                  onClick={ (e) => { handleReply(e) } }
                  onKeyDown={ (e) => { handleReply(e) } }
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M20 19q-.425 0-.713-.288T19 18v-3q0-1.25-.875-2.125T16 12H6.8l2.925 2.925Q10 15.2 10 15.6t-.3.7q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T3.426 11q0-.2.063-.375T3.7 10.3l4.625-4.625Q8.6 5.4 9 5.4t.7.3q.275.275.275.7t-.275.7L6.8 10H16q2.075 0 3.538 1.463T21 15v3q0 .425-.288.713T20 19Z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className={ comment_styles.body_row_2 }>
              <div className={ comment_styles.comment_wrapper }>
                <div
                  className={ comment_styles.comment_content }
                >{ props.comment.content ? Parse(autoLinkText(sanitize(props.comment.content))) : '' }</div>
              </div>
            </div>
          </div>
          <div className="py-3 relative rounded-r border-l border-l-solid border-l-neutral-800 brightness-75 flex flex-col w-12">
            <div className={ comment_styles.vote_count }>
              <span
                className={ comment_styles.count_text }
                data-vote-count={ props.comment.upvotes - props.comment.downvotes }
              >{ parseVotes(props.comment.upvotes - props.comment.downvotes) }</span>
            </div>
            <div
              className={ comment_styles.upvote_button }
              onClick={ (e) => { handleUpvote(e) } }
              onKeyDown={ (e) => { handleUpvote(e) } }
            >
              <span>
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12">
                  <path
                    fill="currentColor"
                    d="M6.786 1.459a.903.903 0 0 0-1.572 0L1.122 8.628C.774 9.238 1.211 10 1.91 10h8.18c.698 0 1.135-.762.787-1.372l-4.092-7.17Z"
                  />
                </svg>
              </span>
            </div>
            <div
              className={ comment_styles.downvote_button }
              onClick={ (e) => { handleDownvote(e) } }
              onKeyDown={ (e) => { handleDownvote(e) } }
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="12"
                  viewBox="0 0 12 12"
                >
                  <path
                    fill="currentColor"
                    d="M5.214 10.541a.903.903 0 0 0 1.572 0l4.092-7.169C11.226 2.762 10.789 2 10.09 2H1.91c-.698 0-1.135.762-.787 1.372l4.092 7.17Z"
                  />
                </svg>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>;
}
