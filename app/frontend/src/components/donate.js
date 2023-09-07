'use client';

import Link from 'next/link';
import MessageOverlay, { toggleOverlay } from './message_overlay';
import { copyToClipboard } from '../utils/copyToClipboard';
import donate_styles from '../styles/Donate.module.scss';


function copyETH() {
  let link = "0xfa9e8496c28317b1774eF53DDC1C96c06F364DaD";
  copyToClipboard(link);
  alert("The ETH donation address for l-o-o-s-e-d.net has been copied to your clipboard. Thank you for your support.");
  toggleOverlay('donate-overlay')
}

function copyBTC() {
  let link = "1FemHzDD6cDoc19gg99cscyx5eDSe1vBdS";
  copyToClipboard(link);
  alert("The BTC donation address for l-o-o-s-e-d.net has been copied to your clipboard. Thank you for your support.");
  toggleOverlay('donate-overlay')
}

export default function Donate() {
  return (
    <>
      <label
        id="donate"
        htmlFor="donate-overlay-input"
        className={ donate_styles.donate }
        title="Click to copy my Ethereum wallet address!"
      >
        DONATE
      </label>
      <MessageOverlay overlayId="donate-overlay">
        <div className={ donate_styles.menu_text }>
          <svg className={ donate_styles.ethereum } width="226" height="328" viewBox="0 0 226 328" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path className={ donate_styles.eth_1 } d="M33 169L113.5 200L193 168.5L113.5 140L33 169Z" fillOpacity="0.25"/>
            <path className={ donate_styles.eth_2 } d="M193 168.5L113.5 27L33 169L113.5 200L193 168.5Z" fillOpacity="0.35"/>
            <path className={ donate_styles.eth_3 } d="M113.5 27V200L193 168.5L113.5 27Z" fillOpacity="0.5"/>
            <path className={ donate_styles.eth_4 } d="M193 177L113.5 208.5V301L193 177Z" fillOpacity="0.75"/>
            <path className={ donate_styles.eth_5 } d="M33 178L113.5 208.5V301L33 178Z" fillOpacity="0.25"/>
          </svg>
          <div className={ donate_styles.row }>
            <p>This website is supported entirely by the generosity of its audience. If you enjoy the ideas and inventions shared here, please consider giving back in the form of a donation. Any amount you gift is sincerely appreciated! Thank you.</p>
            <br/>
            <p>&mdash;l00sed</p>
            <br/>
          </div>
          <div className={ donate_styles.donate_buttons }>
            <Link href="#">
              <div
                className={ `${donate_styles.donate_button} ${donate_styles.eth}` }
                onClick={ copyETH }
                id="ETH"
              >ETH</div>
            </Link>
            <Link href="#">
              <div
                className={ `${donate_styles.donate_button} ${donate_styles.btc}` }
                onClick={ copyBTC }
                id="BTC"
              >BTC</div>
            </Link>
            <Link target="_blank" href="https://venmo.com/dwtompkins" rel="noreferrer">
              <div className={ `${donate_styles.donate_button} ${donate_styles.venmo}` } id="venmo">Venmo</div>
            </Link>
            <Link target="_blank" href="https://paypal.me/danielwtompkins" rel="noreferrer">
              <div className={ `${donate_styles.donate_button} ${donate_styles.paypal}` } id="paypal">Paypal</div>
            </Link>
          </div>
        </div>
      </MessageOverlay>
    </>
  )
}
