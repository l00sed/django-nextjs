import Link from 'next/link';
import ScrollTop from './scroll_top';
import footer_styles from '../styles/Footer.module.scss';
import page_styles from '../styles/Page.module.scss';

export default function Footer() {
  return (
    <footer className={ `${footer_styles.footer} ${page_styles.full__width}` }>
      <ScrollTop />
      <section className={ footer_styles.link_section }>
        <div className={ footer_styles.link_row }>
          <div className={ footer_styles.link_col }>
            <h4>LEARN</h4>
            <div className={ footer_styles.link }>
              <Link href="/kb" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                  <path d="m243.4 2.6l-224 96c-14 6-21.8 21-18.7 35.8S16.8 160 32 160v8c0 13.3 10.7 24 24 24h400c13.3 0 24-10.7 24-24v-8c15.2 0 28.3-10.7 31.3-25.6s-4.8-29.9-18.7-35.8l-224-96c-8.1-3.4-17.2-3.4-25.2 0zM128 224H64v196.3c-.6.3-1.2.7-1.8 1.1l-48 32c-11.7 7.8-17 22.4-12.9 35.9S17.9 512 32 512h448c14.1 0 26.5-9.2 30.6-22.7s-1.1-28.1-12.9-35.9l-48-32c-.6-.4-1.2-.7-1.8-1.1V224H384v192h-40V224h-64v192h-48V224h-64v192h-40V224zM256 64a32 32 0 1 1 0 64a32 32 0 1 1 0-64z"/>
                </svg>
                <p>Knowledge Base</p>
              </Link>
            </div>
          </div>
          <div className={ footer_styles.link_col }>
            <h4>META</h4>
            <div className={ footer_styles.link }>
              <Link href="/rss/rss.xml" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-12.832 20c-1.197 0-2.168-.969-2.168-2.165s.971-2.165 2.168-2.165 2.167.969 2.167 2.165-.97 2.165-2.167 2.165zm5.18 0c-.041-4.029-3.314-7.298-7.348-7.339v-3.207c5.814.041 10.518 4.739 10.561 10.546h-3.213zm5.441 0c-.021-7.063-5.736-12.761-12.789-12.792v-3.208c8.83.031 15.98 7.179 16 16h-3.211z"/>
                </svg>
                <p>RSS</p>
              </Link>
            </div>
            <div className={ footer_styles.link }>
              <Link href="/sitemap.xml" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 576 512">
                  <path d="M208 80c0-26.5 21.5-48 48-48h64c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-8v40h152c30.9 0 56 25.1 56 56v32h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-64c-26.5 0-48-21.5-48-48v-64c0-26.5 21.5-48 48-48h8v-32c0-4.4-3.6-8-8-8H312v40h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48h-64c-26.5 0-48-21.5-48-48v-64c0-26.5 21.5-48 48-48h8v-40H112c-4.4 0-8 3.6-8 8v32h8c26.5 0 48 21.5 48 48v64c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48v-64c0-26.5 21.5-48 48-48h8v-32c0-30.9 25.1-56 56-56h152v-40h-8c-26.5 0-48-21.5-48-48V80z"/>
                </svg>
                <p>Sitemap</p>
              </Link>
            </div>
          </div>
          <div className={ footer_styles.link_col }>
            <h4>SOCIAL</h4>
            <div className={ footer_styles.link }>
              <Link href="https://github.com/l00sed" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <p>GitHub</p>
              </Link>
            </div>
            <div className={ footer_styles.link }>
              <Link href="https://linkedin.com/in/dwtompkins" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
                <p>LinkedIn</p>
              </Link>
            </div>
            <div className={ footer_styles.link }>
              <Link href="https://twitter.com/l00sed" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                  <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645c0 138.72-105.583 298.558-298.558 298.558c-59.452 0-114.68-17.219-161.137-47.106c8.447.974 16.568 1.299 25.34 1.299c49.055 0 94.213-16.568 130.274-44.832c-46.132-.975-84.792-31.188-98.112-72.772c6.498.974 12.995 1.624 19.818 1.624c9.421 0 18.843-1.3 27.614-3.573c-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319c-28.264-18.843-46.781-51.005-46.781-87.391c0-19.492 5.197-37.36 14.294-52.954c51.655 63.675 129.3 105.258 216.365 109.807c-1.624-7.797-2.599-15.918-2.599-24.04c0-57.828 46.782-104.934 104.934-104.934c30.213 0 57.502 12.67 76.67 33.137c23.715-4.548 46.456-13.32 66.599-25.34c-7.798 24.366-24.366 44.833-46.132 57.827c21.117-2.273 41.584-8.122 60.426-16.243c-14.292 20.791-32.161 39.308-52.628 54.253z"/>
                </svg>
                <p>Twitter</p>
              </Link>
            </div>
          </div>
          <div className={ footer_styles.link_col }>
            <h4>WHOAMI</h4>
            <div className={ footer_styles.link }>
              <Link href="/about" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M11.052 17.823c-.94.53-2.439 1.295-5.143 2.088-.294.086-.593-.057-.717-.286-.214-.365-.027-.836.382-.957 2.956-.871 4.379-1.695 5.228-2.188 1.22-.707 1.511-.687 2.376-.001.256.203.612.485 1.127.818.298.193.378.591.179.883l-.013.02c-.195.285-.583.363-.874.175-.245-.159-.458-.308-.642-.442-.883-.646-.97-.637-1.903-.11zm-7.239-5.951c2.7-.766 4.714-2.265 5.515-4.156.444-1.05 1.322-1.495 2.183-1.495 1.428 0 2.81 1.225 2.085 2.936-.44 1.042-1.052 1.975-1.795 2.802-.23.256-.223.645.016.893.25.258.655.299 1.028-.124.822-.933 1.476-1.967 1.945-3.073.47-1.112.389-2.232-.229-3.155-.646-.964-1.815-1.564-3.051-1.564-.699 0-1.371.192-1.944.556-.627.397-1.122.994-1.432 1.726-.647 1.529-2.344 2.757-4.654 3.413-.288.082-.485.346-.48.643.007.416.41.712.813.598zm7.035 2.685c.307-.229.34-.672.078-.943l-.017-.018c-.223-.23-.583-.258-.839-.066-1.614 1.203-3.562 2.067-5.63 2.589-.179.045-.33.163-.418.323-.087.161-.104.351-.044.524.107.31.435.485.755.405 1.984-.499 3.819-1.281 5.372-2.295.255-.167.503-.34.743-.519zm1.35-5.968c.139-.327-.016-.704-.346-.841-.33-.137-.709.017-.848.344-1.058 2.499-3.731 4.427-7.253 5.276-.335.081-.551.404-.495.742.061.362.417.599.78.512 3.469-.835 6.784-2.778 8.162-6.033zm.219-6.138c-2.242-.24-4.376.688-5.633 2.139-.26.3-.193.757.133.975.266.176.623.128.829-.114.952-1.115 2.662-1.922 4.533-1.723 1.533.164 2.935.973 3.715 2.307.154.264.474.386.767.292.389-.125.564-.576.359-.927-.983-1.682-2.737-2.739-4.703-2.949zm-8.26 2.541c.275.188.626.115.809-.159l.388-.573c1.256-1.799 3.293-2.854 5.639-2.978.347-.018.62-.303.62-.648 0-.363-.307-.652-.672-.633-2.274.12-4.446 1.003-6.016 2.733-.427.478-.69.823-.945 1.409-.168.382-.103.658.177.849zm-.166 4.113c1.276-.417 1.957-1.01 2.439-1.653.221-.293.147-.71-.157-.912-.289-.192-.677-.127-.887.147-.372.484-.867.894-1.791 1.197-.224.073-.399.262-.436.54-.06.46.385.827.832.681zm16.118 5.644c-1.246-.382-2.04-.86-2.408-1.445-.457-.726-.285-1.692-.086-2.812.13-.735.275-1.555.251-2.421-.006-.204-.108-.394-.276-.512-.168-.118-.383-.15-.579-.087-.269.087-.447.339-.438.62.023.735-.105 1.462-.232 2.178-.224 1.264-.456 2.571.264 3.714.543.864 1.571 1.518 3.177 2.007.339.104.698-.097.785-.44.084-.345-.115-.697-.458-.802zm-.718 2.344c-2.316-.749-3.832-1.78-4.601-3.124-.177-.309-.572-.417-.883-.241-.311.175-.419.567-.243.876.928 1.62 2.667 2.839 5.285 3.695.332.108.692-.054.827-.374.141-.334-.035-.719-.385-.832zm-1.119 2.103c-.721-.263-1.346-.522-1.89-.772-.283-.13-.619-.038-.793.218-.25.366-.091.792.246.946.581.267 1.248.543 2.014.822.296.108.612-.024.748-.249.228-.349.07-.82-.325-.965zm-9.23 1.7c-.148-.29-.494-.42-.798-.302-.291.113-.608.23-.957.351-.214.074-.375.252-.425.472-.108.476.343.916.79.763.39-.134.743-.264 1.065-.389.327-.127.519-.515.325-.895zm11.533-8.426c-.195-.08-.334-.173-.416-.279-.228-.296-.115-.933.027-1.74.233-1.319.553-3.125-.255-5.361-.934-2.582-3.531-4.322-6.359-4.894-.407-.082-.786.228-.786.637 0 .301.213.56.511.619 2.601.516 4.69 2.07 5.415 4.072.693 1.915.419 3.461.199 4.704-.189 1.073-.354 2 .221 2.744.232.302.565.535 1.021.71.381.146.797-.105.843-.505.035-.302-.137-.591-.421-.707zm-6.531 10.329c-2.496-1.096-1.827-1.097-4.201.004-.228.105-.37.337-.358.586.018.388.369.611.694.611.092 0 .182-.018.261-.055 1.7-.793 1.109-.84 3.026.005.076.034.161.05.25.05.32 0 .677-.212.698-.603.014-.256-.133-.494-.37-.598zm2.567-1.607c-1.579-.635-2.711-1.245-3.431-1.632-1.133-.61-1.265-.718-2.642-.01l-.126.065c-.311.159-.434.537-.275.846.184.36.576.445.869.295.573-.293.876-.434 1.557-.067.752.404 1.938 1.042 3.592 1.706.468.188.945-.226.856-.714-.038-.22-.19-.404-.4-.489z"/>
                </svg>
                <p>About</p>
              </Link>
            </div>
            <div className={ footer_styles.link }>
              <Link href="mailto:dan@l-o-o-s-e-d.net" target="_blank" rel="noreferrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 512 512">
                  <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4l217.6 163.2c11.4 8.5 27 8.5 38.4 0l217.6-163.2c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176v208c0 35.3 28.7 64 64 64h384c35.3 0 64-28.7 64-64V176L294.4 339.2a63.9 63.9 0 0 1-76.8 0L0 176z"/>
                </svg>
                <p>Email</p>
              </Link>
            </div>
            <div className={ footer_styles.link }>
              <Link href="/equipment" target="_blank" rel="noreferrer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 576 512">
                <path d="M64 0C28.7 0 0 28.7 0 64v288c0 35.3 28.7 64 64 64h176l-10.7 32H160c-17.7 0-32 14.3-32 32s14.3 32 32 32h256c17.7 0 32-14.3 32-32s-14.3-32-32-32h-69.3L336 416h176c35.3 0 64-28.7 64-64V64c0-35.3-28.7-64-64-64H64zm448 64v224H64V64h448z"/>
              </svg>
                <p>Equipment</p>
              </Link>
            </div>
            <div className={ footer_styles.link }>
              <Link href="https://keybase.io/l00sed" target="_blank" rel="noreferrer">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_1_2)">
                    <path d="M6.81833 5.81119C6.25966 5.77387 5.83153 5.24772 5.86406 4.63817L5.93985 3.30334C5.9731 2.71941 6.41985 2.26182 6.95674 2.26182C6.9768 2.26182 6.997 2.26244 7.0172 2.26385L8.24113 2.34646C8.51194 2.36442 8.76082 2.4967 8.94107 2.7191C9.12161 2.94149 9.21159 3.2276 9.19425 3.52433L9.11917 4.854C9.11473 4.93084 9.10055 4.99175 9.09181 5.02501L9.04825 5.25724L8.24285 5.90724L6.81833 5.81119Z" fill="var(--loosed-white)"/>
                    <path d="M12 8.0558C6.88246 8.0558 2.71907 12.5938 2.71907 18.1717C2.71907 20.0895 3.21139 21.8846 4.06536 23.4143H5.54792C4.54422 21.9506 3.9493 20.1354 3.9493 18.1717C3.9493 13.3331 7.56077 9.39656 12 9.39656C14.1085 9.39656 16.1281 10.3587 17.6866 12.1059C19.1891 13.7899 20.0508 16.0009 20.0508 18.1717C20.0508 19.658 19.8256 21.6778 18.8465 23.4143H20.2505C20.9281 21.9277 21.2809 20.1503 21.2809 18.1717C21.2809 15.6548 20.2924 13.1032 18.5687 11.171C16.7765 9.16214 14.4437 8.0558 12 8.0558Z"/>
                    <path d="M10.2504 20.9136C10.2504 21.4144 9.87798 21.8203 9.41847 21.8203C8.95896 21.8203 8.58656 21.4144 8.58656 20.9136C8.58656 20.4127 8.95896 20.0068 9.41847 20.0068C9.87798 20.0068 10.2504 20.4127 10.2504 20.9136Z"/>
                    <path d="M15.4134 20.9136C15.4134 21.4144 15.041 21.8203 14.5815 21.8203C14.122 21.8203 13.7496 21.4144 13.7496 20.9136C13.7496 20.4127 14.122 20.0068 14.5815 20.0068C15.041 20.0068 15.4134 20.4127 15.4134 20.9136Z"/>
                    <path fillRule="evenodd" clipRule="evenodd" d="M1.92996 20.5539V22.2421L5.75477 17.8205L4.89436 20.7605L6.41316 19.5559C9.09543 17.4284 12.2984 16.9394 15.9326 18.1026C17.5085 18.6067 19.0405 18.1371 19.8364 16.9056C20.6505 15.6463 20.5115 13.8977 19.4737 12.3425C18.4774 10.8497 17.1037 9.62792 15.6059 8.90264C15.326 8.76708 15.0435 8.64574 14.7591 8.53872C14.7685 8.51377 14.7776 8.48867 14.7865 8.46342C15.1443 7.44688 15.1067 6.34647 14.6806 5.36507C14.2543 4.38289 13.4987 3.65371 12.5528 3.31153C11.9811 3.10476 11.4788 3.00746 11.0597 3.02136C11.0323 2.91922 10.9726 2.47163 11.4935 1.26268L10.438 0.585667C10.3615 0.701206 10.2858 0.81535 10.2108 0.92844L10.1861 0.965637L10.1859 0.965899C9.89927 1.3978 9.62171 1.81601 9.36181 2.22721C9.07696 1.89979 8.69399 1.7048 8.27756 1.6772L7.05707 1.59474H7.05535L7.05349 1.59458C7.02139 1.59255 6.98887 1.59146 6.95677 1.59146C6.09564 1.59146 5.37936 2.32517 5.32606 3.2619L5.25026 4.59438L5.25012 4.59688L5.24998 4.59922C5.19782 5.57672 5.88472 6.42053 6.78111 6.48034L7.65225 6.53907C7.59458 7.33394 7.71489 8.07913 8.00433 8.72904C6.83296 9.26569 5.75129 10.0658 4.81655 11.0949C1.92996 14.2733 1.92996 17.7557 1.92996 20.5539ZM7.89835 5.21229L6.85633 5.14209C6.63481 5.12725 6.46516 4.91876 6.47806 4.67715L6.55386 3.34483C6.56704 3.11229 6.74399 2.93222 6.95677 2.93222C6.96479 2.93222 6.97296 2.93253 6.98113 2.933L8.20305 3.01562C8.31008 3.02264 8.40881 3.07496 8.48002 3.16289C8.55166 3.25113 8.58734 3.36435 8.58046 3.48164L8.57511 3.57638C8.29432 4.11566 8.06194 4.65566 7.89835 5.21229ZM7.91562 3.707L7.87063 4.49958L7.14318 4.4507L7.18832 3.65796L7.91562 3.707Z"/>
                    <path d="M12.6579 14.1612C12.4425 14.1612 12.2408 14.0569 12.1047 13.8751L11.6909 13.3227C11.451 13.0026 11.4854 12.5342 11.7627 12.259C11.6731 12.2112 11.593 12.1424 11.528 12.0555L11.4335 11.9295C11.1851 11.5979 11.2305 11.108 11.5345 10.8374L11.594 10.7844L10.9879 9.97358C10.7184 9.61375 10.7678 9.08135 11.0982 8.78712C11.2368 8.66406 11.4105 8.59674 11.5878 8.59674C11.8208 8.59674 12.0393 8.7095 12.1871 8.90628L14.7723 12.3744C15.0414 12.7338 14.992 13.2662 14.6616 13.5604C14.5704 13.6416 14.4613 13.7001 14.3463 13.7289C14.2893 13.7433 14.2306 13.7505 14.172 13.7505C13.9705 13.7505 13.7801 13.6663 13.6367 13.5166L13.1092 13.9859C12.9821 14.0989 12.8218 14.1612 12.6579 14.1612Z" fill="var(--loosed-white)"/>
                    <path d="M12.5764 8.55877C12.3327 8.23424 11.9723 8.04824 11.5879 8.04824C11.295 8.04824 11.0085 8.15943 10.7811 8.36121C10.2346 8.84785 10.1532 9.72633 10.5984 10.3207L10.9351 10.7713C10.6878 11.2348 10.7146 11.837 11.0437 12.2763L11.107 12.361C10.9582 12.7891 11.0168 13.2902 11.301 13.6696L11.7149 14.2221C11.9468 14.532 12.2906 14.7097 12.6578 14.7097C12.9375 14.7097 13.2109 14.6037 13.4275 14.4108L13.6754 14.1903C13.8304 14.2613 13.9988 14.2991 14.172 14.2991C14.2686 14.2991 14.3653 14.2871 14.4594 14.2634C14.6492 14.2157 14.8291 14.1195 14.98 13.9852C15.5252 13.4997 15.6066 12.6212 15.1615 12.0268L12.5789 8.56205L12.5764 8.55877ZM11.5879 9.14521C11.6663 9.14521 11.7441 9.18238 11.7977 9.2539L14.3818 12.7204C14.4764 12.8467 14.459 13.0325 14.3432 13.1356C14.3099 13.1653 14.2722 13.1847 14.2331 13.1945C14.213 13.1997 14.1925 13.2021 14.172 13.2021C14.0935 13.2021 14.0157 13.1651 13.9621 13.0936L13.7048 12.748L12.7911 13.5609C12.7519 13.5959 12.7048 13.6127 12.6578 13.6127C12.5968 13.6127 12.5362 13.5838 12.4945 13.5282L12.0807 12.9759C12.0079 12.8787 12.0212 12.7357 12.1103 12.6563L13.0285 11.8394L12.6534 11.3352L12.1991 11.7397C12.1619 11.7727 12.1172 11.7888 12.0728 11.7888C12.0149 11.7888 11.9574 11.7614 11.9179 11.7088L11.8233 11.5825C11.7504 11.4852 11.7636 11.3418 11.8528 11.2623L12.3017 10.8628L11.378 9.627C11.2834 9.50082 11.3008 9.31497 11.4165 9.21189C11.4671 9.16707 11.5277 9.14521 11.5879 9.14521Z"/>
                  </g>
                <defs>
                  <clipPath id="clip0_1_2">
                    <rect width="24" height="24" fill="white"/>
                  </clipPath>
                </defs>
                </svg>
                <p>Keybase</p>
              </Link>
            </div>
            <div className={ footer_styles.link }>
              <Link href="https://dato.work/" target="_blank" rel="referrer">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d="M4 20q-.825 0-1.413-.588T2 18V6q0-.825.588-1.413T4 4h5.175q.4 0 .763.15t.637.425L12 6h8q.825 0 1.413.588T22 8H6q-.825 0-1.413.588T4 10v8l1.975-6.575q.2-.65.738-1.038T7.9 10h12.9q1.025 0 1.613.813t.312 1.762l-1.8 6q-.2.65-.738 1.038T19 20H4Z"/>
                </svg>
                <p>Portfolio</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <div id="webrings" className={ footer_styles.webrings_row }>
        <div className={ footer_styles.webring }>
          <div id="geekring" className={ footer_styles.geekring }>
            <div className={ footer_styles.geekring_row }>
              <p className="p-3">This site is a proud member of the <Link target="_blank" rel="noreferrer" href="https://geekring.net/"><b>geekring</b></Link>. Check out some other geeky websites here:</p>
            </div>
            <div className={ footer_styles.geekring_row }>
              <Link target="_blank" href="https://geekring.net/site/10/previous" rel="noreferrer">Prev</Link>  &mdash;  <Link target="_blank" href="https://geekring.net/site/10/random" rel="noreferrer">Random</Link>  &mdash;  <Link target="_blank" href="https://geekring.net/site/10/next" rel="noreferrer">Next</Link>
            </div>
          </div>
        </div>
        <div className={ footer_styles.webring }>
          <div className={ footer_styles.webring_icon }>
            <Link href="https://webring.xxiivv.com/#loosed" target="_blank" rel="noreferrer">
              <svg
                fill="none"
                width="100%"
                height="90px"
                strokeLinecap="square"
                viewBox="0 0 300 300"
                strokeWidth="28"
                xmlns="http://www.w3.org/2000/svg"
                className={ footer_styles.icon }
                alt="XXIIVV webring"
              >
                <path d="M201.962 210a60 60 0 10-103.924-60l-50 86.603"/>
                <path d="M98.038 210a60 60 0 10103.924-60l-50-86.603"/>
                <path d="M150 120a60 60 0 100 120h100"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
