import tag_styles from '../styles/Tags.module.scss';
import Link from 'next/link';

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
  const tagBgColor = tagBg(props.slug);
  const classes = [
    tag_styles.tag,
    tagBgColor
  ].join(' ');
  const href = `/tags/${props.slug}`;
  const tag = props.tag?.toString();

  return (
    <Link
      key={ props.key }
      href={ href }
      className={ classes }
    >
      <span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M8 4v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4V8h-4V4h-2v4h-4V4H8Zm6 10v-4h-4v4h4Z"
            clipRule="evenodd"
          />
        </svg>
      </span>
      <span>{ tag }</span>
    </Link>
  )
}

export function Tags({ tags }) {
  if (tags) {
    tags = tags.map((t, i) => {
      let key = `${ t.slug }-${ t.id }`;
      return (
        <Tag
          key={ key }
          tag={ t.name }
          slug={ t.slug }
          index={ i }
        />
      )
    })

    return (
      <div id="tags" className={ tag_styles.tags }>
        { tags }
      </div>
    )
  } else {
    return <></>;
  }
}
