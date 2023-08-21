/* Styles */
import toc_styles     from '../styles/Toc.module.scss';
import article_styles from '../styles/Article.module.scss';

/* MDX / Remark / Rehype */
import { serialize }              from 'next-mdx-remote/serialize';
import rehypeToc                  from '@jsdevtools/rehype-toc';
import rehypeSlug                 from 'rehype-slug';
import rehypeAutolinkHeadings     from 'rehype-autolink-headings';
import rehypeExternalLinks        from 'rehype-external-links';
import rehypePrism                from 'rehype-prism-plus';
import remarkGfm                  from 'remark-gfm';

/* Local Utils */
import remarkCodeTitles           from '../utils/code_titles';
import ResponseError              from '../utils/error_handling';
import HOST_URL                   from '../utils/api_server';

import Mdx from './mdx';
import Comments from './comments';
import Button from './button';
import ArticleHead from './article_head';
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

  const data_promise = await fetch(`${HOST_URL()}/api/articles/${slug}`, options_get);

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
        [rehypeToc, {
          headings: ["h2", "h3"],
          cssClasses: {
            // Automatically generate ToC
            toc: toc_styles.toc__block,
            // Build links to h3 headings only
            link: toc_styles.toc__sub_heading
          },
          customizeTOC: (toc) => {
            try {
              const childrenOfChildren = toc?.children[0]?.children;
              if (!childrenOfChildren?.length) return null;
            } catch (e) {}

            return {
              type: "element",
              tagName: "section",
              properties: {
                className: toc_styles.toc__wrapper,
              },
              children: [
                {
                  type: "element",
                  tagName: "div",
                  properties: {
                    className: toc_styles.toc__inner,
                  },
                  children: [
                    {
                      type: "element",
                      tagName: "input",
                      properties: {
                        id: "toc",
                        type: "checkbox",
                        className: toc_styles.toc__hidden,
                      },
                    },
                    {
                      type: "element",
                      tagName: "label",
                      properties: {
                        htmlFor: "toc",
                        className: toc_styles.toc__header,
                      },
                      children: [
                        {
                          type: "element",
                          tagName: "h4",
                          properties: {
                            className: toc_styles.toc__label,
                          },
                          children: [
                            {
                              type: "text",
                              value: "Table of Contents",
                            },
                          ],
                        },
                        {
                          type: "element",
                          tagName: "svg",
                          properties: {
                            className: toc_styles.toc__caret,
                            width: "20",
                            height: "20",
                            viewBox: "0 0 20 20",
                            fill: "none",
                            xmlns: "http://www.w3.org/2000/svg",
                          },
                          children: [
                            {
                              type: "element",
                              tagName: "path",
                              properties: {
                                d: "M7 4L13 10L7 16",
                                strokeWidth: "3",
                                strokeLinecap: "round",
                              },
                            },
                          ],
                        },
                      ],
                    },
                    toc,
                  ],
                },
              ],
            }
          },
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

  return {
    meta,
    content
  }
}

export default async function Article(props) {
  /* Get article content and its meta */
  const { meta, content } = await getData(props.slug);

  let article_head = <ArticleHead meta={ meta } />;
  if (props.head === false) {
    article_head = <></>;
  }

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
          <div className={ article_styles.article__body }>
            <div className={ article_styles.article__description }>
              <Mdx content={ content } />
            </div>
          </div>
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

