/* MDX / Remark / Rehype */
import { MDXRemote } from 'next-mdx-remote/rsc';

/* MDX / Remark / Rehype */
import remarkGfm                  from 'remark-gfm';
import rehypeSlug                 from 'rehype-slug';
import rehypeAutolinkHeadings     from 'rehype-autolink-headings';
import rehypeExternalLinks        from 'rehype-external-links';
import rehypePrettyCode           from 'rehype-pretty-code';

/* Next Components */
import Link  from 'next/link';
/* Local Components */
import Pre                       from 'components/pre.jsx';
import OneColumn                 from 'components/one_column.jsx';
import TwoColumn                 from 'components/two_column.jsx';
import ThreeColumn               from 'components/three_column.jsx';
import ImageWrapper, { Caption } from 'components/image_wrapper.jsx';
import ProseWrapper              from 'components/prose_wrapper.jsx';
import TableWrapper              from 'components/table_wrapper.jsx';
import HorizontalScroller        from 'components/horizontal_scroller.jsx';
import Card                      from 'components/card.jsx';
import Note                      from 'components/note.jsx';
import ReadingList               from 'components/reading_list.jsx';
import Bookmarks                 from 'components/bookmarks.jsx';
import YouTube                   from 'components/youtube.jsx';


export default function Mdx(props) {
  /* Grab components for MDX */
  const components = {
    Link,
    Pre,
    OneColumn,
    TwoColumn,
    ThreeColumn,
    ImageWrapper,
    ProseWrapper,
    TableWrapper,
    HorizontalScroller,
    Caption,
    Card,
    Note,
    ReadingList,
    Bookmarks,
    YouTube
  }

  // Process blog content (parse and add features)
  const options = {
    mdxOptions: {
      remarkPlugins: [
        remarkGfm
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: "wrap"
        }],
        [rehypeExternalLinks, {
          // Set external links to open in a new window
          target: '_blank',
          rel: ['noopener', 'nofollow', 'noreferrer']
        }],
        [rehypePrettyCode, {
          /* Show line numbers in
           * syntax-highlighted code blocks
           * with "showLineNumbers" */
          keepBackground: false,
          theme: {
            dark: "vitesse-dark",
            light: "github-light",
          },
          // ```bash title="filename.txt" {1,4-5} showLineNumbers
          // ```
        }]
      ],
      format: 'mdx', // MarkdownX
      development: process.env.NODE_ENV !== 'production'
    },
    parseFrontmatter: false
  }

  return (
    <MDXRemote
      source={ props.mdx }
      components={ components }
      options={ options }
    />
  )
}
