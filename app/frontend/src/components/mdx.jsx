/* MDX / Remark / Rehype */
import { MDXRemote } from 'next-mdx-remote/rsc';

/* MDX / Remark / Rehype */
import remarkGfm                  from 'remark-gfm';
import rehypeSlug                 from 'rehype-slug';
import rehypeAutolinkHeadings     from 'rehype-autolink-headings';
import rehypeExternalLinks        from 'rehype-external-links';
import rehypePrettyCode           from 'rehype-pretty-code';
import {fromHtmlIsomorphic}       from 'hast-util-from-html-isomorphic'

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
          behavior: "append",
          content: (fromHtmlIsomorphic(
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" fill-rule="evenodd" d="M8 4v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4V8h-4V4h-2v4h-4V4zm6 10v-4h-4v4z" clip-rule="evenodd" /></svg>',
            {fragment: true}
          ).children)
        }],
        [rehypeExternalLinks, {
          // Set external links to open in a new window
          target: '_blank',
          rel: ['noopener', 'nofollow', 'noreferrer'],
          content: (fromHtmlIsomorphic(
            '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 5H8.2c-1.12 0-1.68 0-2.108.218a1.999 1.999 0 0 0-.874.874C5 6.52 5 7.08 5 8.2v7.6c0 1.12 0 1.68.218 2.108a2 2 0 0 0 .874.874c.427.218.987.218 2.105.218h7.606c1.118 0 1.677 0 2.104-.218c.377-.192.683-.498.875-.874c.218-.428.218-.987.218-2.105V14m1-5V4m0 0h-5m5 0l-7 7" /></svg>',
            {fragment: true}
          ).children),
          contentProperties: {
            className: 'external-link'
          }
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
