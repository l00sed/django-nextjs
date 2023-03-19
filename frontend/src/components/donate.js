'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import donate_styles from '../styles/Donate.module.scss';

export default function Donate() {
  useEffect(() => {
    const toggleOverlay = () => {
      if ( document.getElementById('donate-overlay') ) {
        document.getElementById('donate-overlay').classList.toggle(donate_styles.open);
      }
    }

    const copyETH = () => {
      let dummy = document.createElement('input');
      let link = "0xfa9e8496c28317b1774eF53DDC1C96c06F364DaD";
      document.body.appendChild(dummy);
      dummy.value = link;
      dummy.select();
      dummy.setSelectionRange(0,99999);
      document.execCommand("copy");
      document.body.removeChild(dummy);
      alert("The ETH donation address for l-o-o-s-e-d.net has been copied to your clipboard. Thank you for your support.");
      document.getElementById("donate-overlay").classList.toggle(donate_styles.open);
    }

    const copyBTC = () => {
      let dummy = document.createElement('input');
      let link = "1FemHzDD6cDoc19gg99cscyx5eDSe1vBdS";
      document.body.appendChild(dummy);
      dummy.value = link;
      dummy.select();
      dummy.setSelectionRange(0,99999);
      document.execCommand("copy");
      document.body.removeChild(dummy);
      alert("The BTC donation address for l-o-o-s-e-d.net has been copied to your clipboard. Thank you for your support.");
      document.getElementById("donate-overlay").classList.toggle(donate_styles.open);
    }

    if (typeof window !== 'undefined') {
      document.getElementById('donate').addEventListener('click', toggleOverlay);
      document.getElementById('donate').addEventListener('keydown', toggleOverlay);
      document.getElementById('donate-overlay').addEventListener('click', toggleOverlay);
      document.getElementById('donate-overlay').addEventListener('keydown', toggleOverlay);
      document.getElementById('ETH').addEventListener('click', copyETH);
      document.getElementById('ETH').addEventListener('keydown', copyETH);
      document.getElementById('BTC').addEventListener('click', copyBTC);
      document.getElementById('BTC').addEventListener('keydown', copyBTC);
    }

    return () => {
      if (document.getElementById('donate')) {
        document.getElementById('donate').removeEventListener('click', toggleOverlay);
        document.getElementById('donate').removeEventListener('keydown', toggleOverlay);
      }
      if (document.getElementById('donate-overlay')) {
        document.getElementById('donate-overlay').removeEventListener('click', toggleOverlay);
        document.getElementById('donate-overlay').removeEventListener('keydown', toggleOverlay);
      }
      if (document.getElementById('ETH')) {
        document.getElementById('ETH').removeEventListener('click', copyETH);
        document.getElementById('ETH').removeEventListener('keydown', copyETH);
      }
      if (document.getElementById('BTC')) {
        document.getElementById('BTC').removeEventListener('click', copyBTC);
        document.getElementById('BTC').removeEventListener('keydown', copyBTC);
      }
    }
  }, []);

  return (
    <>
      <p id="donate" className={ donate_styles.donate } title="Click to copy my Ethereum wallet address!">
        <em>DONATE</em>
      </p>
      <div id="donate-overlay" className={ donate_styles.donate_overlay }>
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
            <Link href="#"><div className={ `${donate_styles.donate_button} ${donate_styles.eth}` } id="ETH">ETH</div></Link>
            <Link href="#"><div className={ `${donate_styles.donate_button} ${donate_styles.btc}` } id="BTC">BTC</div></Link>
            <Link target="_blank" href="https://venmo.com/dwtompkins" rel="noreferrer"><div className={ `${donate_styles.donate_button} ${donate_styles.venmo}` } id="venmo">Venmo</div></Link>
            <Link target="_blank" href="https://paypal.me/danielwtompkins" rel="noreferrer"><div className={ `${donate_styles.donate_button} ${donate_styles.paypal}` } id="paypal">Paypal</div></Link>
          </div>
        </div>
      </div>
    </>
  )
}
