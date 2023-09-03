/* Styles */
import article_styles from '../styles/Article.module.scss';

/* MDX / Remark / Rehype */
import { serialize }              from 'next-mdx-remote/serialize';
import rehypeSlug                 from 'rehype-slug';
import rehypeAutolinkHeadings     from 'rehype-autolink-headings';
import rehypeExternalLinks        from 'rehype-external-links';
import rehypePrism                from 'rehype-prism-plus';
import remarkGfm                  from 'remark-gfm';

/* Used for ToC */
import { hasProperty } from "hast-util-has-property"
import { headingRank } from "hast-util-heading-rank"
import { toString } from "hast-util-to-string"
import { visit } from "unist-util-visit"

/* Local Utils */
import remarkCodeTitles           from '../utils/code_titles';
import ResponseError              from '../utils/error_handling';
import HOST_URL                   from '../utils/api_server';

import Mdx from './mdx';
import Comments from './comments';
import Button from './button';
import ArticleHead from './article_head';
import ArticleMeta from './article_meta';
import Link from 'next/link';

const getData = async (slug) => {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8'
    }
  }

  const data_promise = await fetch(`${ HOST_URL() }/api/articles/${ slug }`, options_get);

  let data_json = {};

  if (data_promise.ok) {
    data_json = await data_promise.json();
  } else {
    throw new ResponseError('Could not fetch article content from the API.', data_promise);
  }

  // Organize meta info into a separate object
  const meta = {
    id: data_json.id,
    slug: data_json.slug,
    title: data_json.title,
    author: data_json.author,
    updated_at: data_json.updated_at,
    likes: data_json.likes,
    tags: data_json.tags
  }

  const headings = []
  function rehypeExtractHeadings () {
    return (tree) => {
      visit(tree, "element", node => {
        if (
          headingRank(node) === 2 || headingRank(node) === 3 &&
          node.properties &&
          hasProperty(node, "id")
        ) {
          headings.push({
            id: node.properties.id.toString(),
            title: toString(node),
            rank: headingRank(node)
          })
        }
      })
    }
  }

  // Process blog content (parse and add features)
  const content = await serialize(data_json.content, {
    mdxOptions: {
      remarkPlugins: [
        remarkCodeTitles, // Give code blocks a title
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
        [rehypePrism, {
          /* Show line numbers in
           * syntax-highlighted code blocks
           * with "showLineNumbers" */
          showLineNumbers: false,
          ignoreMissing: true,
          // ```bash:filename.txt {1,4-5} showLineNumbers
          // ```
        }]
      ],
      format: 'mdx', // MarkdownX
      development: process.env.NODE_ENV !== 'production'
    },
    parseFrontmatter: false
  });

  /* Generate ToC data */
  await serialize(data_json.content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeExtractHeadings, {
          headings
        }]
      ],
      development: process.env.NODE_ENV !== 'production'
    },
    parseFrontmatter: false
  });

  return {
    meta,
    headings,
    content
  }
}

export default async function Article (props) {
  /* Get article meta, toc headings, and content */
  const {
    meta,
    headings,
    content
  } = await getData(props.slug);

  /* Add article_head */
  let article_head = <ArticleHead meta={ meta } />;
  if (props.head === false) {
    article_head = <></>;
  }

  /* Add article_meta */
  let article_meta = <ArticleMeta meta={ meta } headings={ headings } />;
  let live_meta = <></>;
  if (props.slug === 'live') {
    live_meta = article_meta;
  }
  if (props.head === false) {
    article_meta = <></>;
  }

  /* Add "LIVE" button */
  let live_button = (
    <Link href="/live">
      <Button type={ 'live' }>
        live
      </Button>
    </Link>
  );
  if (props.slug === 'live') {
    live_button = <></>;
  }

  return (
    <div className={ article_styles.main_wrapper }>
      <main className={ article_styles.main }>
        <article className={ article_styles.article_wrapper }>
          { article_head }
          { article_meta }
          <Mdx content={ content } />
          { live_meta }
        </article>
      </main>
      <aside className={ article_styles.aside }>
        <div className={ article_styles.sticky }>
          <div className={ article_styles.scroll__y }>
            { live_button }
            <Comments slug={ props.slug } />
          </div>
        </div>
      </aside>
    </div>
  )
}

