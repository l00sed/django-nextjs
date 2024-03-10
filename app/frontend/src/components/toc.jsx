import toc_styles from 'styles/Toc.module.scss';

export default function Toc (props) {
  let tocCaretClasses = [
    'inline-flex',
    'relative',
    'rotate-0',
    'stroke-black',
    'h-full',
    'w-[18px]',
    'm-auto',
    'dark:stroke-white',
    'sm:w-5',
    'right-[5px]'
  ].join(' ')

  let tocLabelClasses = [
    'relative',
    'flex',
    'cursor-pointer',
    'max-w-full',
    'justify-between',
    'rounded-xl',
    'pt-0.5',
    'pr-2',
    'pb-1',
    'pl-4'
  ].join(' ')

  let tocLabelHeadingClasses = [
    'w-full',
    'content-["Table_of_Contents"]',
    'font-mono',
    'leading-8',
    'inline-flex',
    'select-none',
    'mt-0',
    'pt-[1px]',
    'text-left',
    'font-bold',
    'mb-0'
  ].join(' ')

  if (props?.headings) {
    return (
      <>
        <input id="toc" type="checkbox" className={ toc_styles.toc__hidden } />
        <div className={ `outer-sheen ${toc_styles.toc__wrapper}` }>
          <div className={ `inner-sheen ${toc_styles.toc__inner}` }>
            <label
              htmlFor="toc"
              className={ tocLabelClasses }
            >
              <p className={ tocLabelHeadingClasses }>Table of Contents</p>
              <svg
                className={ `${toc_styles.toc__caret} ${tocCaretClasses}` }
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
            <nav className={ `outer-sheen !pt-0 ${toc_styles.toc__block}` }>
              <ol className="toc-level toc-level-1 inner-sheen">
                {
                  props.headings.map((heading, index) => {
                    let styles = toc_styles.toc__h2;
                    if (heading.rank === 3) {
                      styles = toc_styles.toc__h3;
                    }
                    return (
                      <a
                        key={ index }
                        href={ `#${heading.id}` }
                        className={ toc_styles.toc__sub_heading }
                      >
                        <li
                          className={ styles }
                        >{ heading.title }</li>
                      </a>
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
