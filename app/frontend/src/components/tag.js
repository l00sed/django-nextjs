import tag_styles     from '../styles/Tags.module.scss';

export function Tag(props) {
  const tagBg = (tag => {
    switch (tag.toLowerCase()) {
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
  });

  return (
    <span
      key={ props.key }
      className={ `${ tag_styles.tag } ${ tagBg(props.tag.toLowerCase()) }` }
    >#{ props.tag }</span>
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
                key={ `${ t.toLowerCase() }-${ i }` }
                tag={ t }
                index={ i }
              />
            )
          })
        }
      </div>
    )
  }
}
