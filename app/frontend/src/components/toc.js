import toc_styles     from '../styles/Toc.module.scss';

export default function Toc (props) {
  if (props?.headings) {
    return (
      <>
        <input id="toc" type="checkbox" className={ toc_styles.toc__hidden } />
        <div className={ toc_styles.toc__wrapper }>
          <div className={ toc_styles.toc__inner }>
            <label for="toc" className={ toc_styles.toc__header }>
              <h4 className={ toc_styles.toc__label }>Table of Contents</h4>
              <svg
                className={ toc_styles.toc__caret }
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 4L13 10L7 16"
                  strokeWidth="3"
                  strokeLinecap="round"
                />
              </svg>
            </label>
            <nav className={ toc_styles.toc__block }>
              <ol className="toc-level toc-level-1">
                {
                  props.headings.map((heading, index) => {
                    let styles = toc_styles.toc__h2;
                    if (heading.rank === 3) {
                      styles = toc_styles.toc__h3;
                    }
                    return (
                      <li
                        key={ index }
                        className={ styles }
                      >
                        <a
                          href={ `#${heading.id}` }
                          className={ toc_styles.toc__sub_heading }
                        >{ heading.title }</a>
                      </li>
                    )
                  })
                }
              </ol>
            </nav>
          </div>
        </div>
      </>
    )
  } else {
    return <></>
  }
}
