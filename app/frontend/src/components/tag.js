import tag_styles     from '../styles/Tags.module.scss';

export function Tag (props) {
  const tagBg = tagSlug => {
    switch (tagSlug) {
      default:
        return "tag-bg-1"
      case 'diy':
        return "tag-bg-2"
      case 'linux':
        return "tag-bg-3"
      case 'windows':
        return "tag-bg-4"
      case 'blogging':
        return "tag-bg-5"
      case 'business':
        return "tag-bg-6"
      case 'code':
        return "tag-bg-7"
      case 'culture':
        return "tag-bg-8"
      case 'design':
        return "tag-bg-9"
      case 'electronics':
        return "tag-bg-10"
      case 'fabrication':
        return "tag-bg-11"
    }
  }

  return (
    <a
      key={ props.key }
      className={ `${ tag_styles.tag } ${ tagBg(props.slug) }` }
      href={ `/tags/${ props.slug }` }
    >
      <span className={ tag_styles.pound }>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fill-rule="evenodd"
            d="M8 4v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4V8h-4V4h-2v4h-4V4H8Zm6 10v-4h-4v4h4Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
      <span>{ props.tag }</span>
    </a>
  )
}

export function Tags({ tags }) {
  if (tags) {
    return (
      <div className={ tag_styles.tags }>
        {
          tags.map((t, i) => {
            return (
              <Tag
                key={ `${ t.slug }-${ t.id }` }
                tag={ t.name }
                slug={ t.slug }
                index={ i }
              />
            )
          })
        }
      </div>
    )
  }
}
