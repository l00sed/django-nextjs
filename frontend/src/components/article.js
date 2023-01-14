'use client';

/* Date utils */
import dateformat     from 'dateformat';

/* Styles */
import page_styles    from '../styles/Page.module.css';
import article_styles from '../styles/Article.module.css';
import comment_styles from '../styles/Comment.module.css';

/* MDX / Remark / Rehype */
import { MDXRemote }              from 'next-mdx-remote';
import { serialize }              from 'next-mdx-remote/serialize';
import rehypeToc                  from '@jsdevtools/rehype-toc';
import rehypeSlug                 from 'rehype-slug';
import rehypeAutolinkHeadings     from 'rehype-autolink-headings';
import rehypeExternalLinks        from 'rehype-external-links';
import rehypeInferReadingTimeMeta from 'rehype-infer-reading-time-meta';
import rehypePrism                from 'rehype-prism-plus';
/* Local Utils */
import remarkCodeTitles           from '../utils/code_titles';

/* Next Components */
import Image from 'next/image';
import Link  from 'next/link';

/* Local Components */
import Pre       from '../components/pre';
import OneColumn from '../components/one_column';
import TwoColumn from '../components/two_column';
//import Comments from '../components/comments';


export default async function Article(props) {
  /* Grab components for MDX */
  const components = { Image, Link, Pre, OneColumn, TwoColumn }

  /* Get article content and its meta */
  const data = await getData(props.slug);
  /* Content + Meta */
  const content = data.props.content ?? [];
  const meta    = data.props.meta    ?? [];

  return (
    <>
      <div className={ article_styles.main_wrapper }>
        <main className={ article_styles.main }>
          <div className={ article_styles.article_wrapper }>
            <div className={ article_styles.article__head }>
              <h2 className={ article_styles.article__title }>{ meta.title }</h2>
              <div className={ article_styles.article__meta }>
                <span className={ article_styles.article__date }>{ dateformat( new Date(meta.updated_at), "h:MMtt | mmmm, dS yyyy") }</span>
                <span className={ article_styles.article__author }>{ meta.author }</span>
              </div>
            </div>
            <div className={ article_styles.article__body }>
              <div className={ article_styles.article__description }>
                <MDXRemote { ...content } components={ components }/>
              </div>
            </div>
          </div>
        </main>
        <aside>
          <div className={ comment_styles.comments_section }>
            {/* <Comments meta={ meta } /> */}
          </div>
        </aside>
      </div>
    </>
  )
}

async function getData( slug ) {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8'
    }
  }

  const data_promise = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/${slug}`, options_get);
  let data_json = {};
  if ( data_promise.ok ) {
    data_json = await data_promise.json();
  } else {
    console.error( 'Could not fetch article content.' );
  }

  // Organize meta info into a separate object
  const meta = {
    id: data_json.id,
    slug: data_json.slug,
    title: data_json.title,
    author: data_json.author,
    updated_at: data_json.updated_at,
    likes: data_json.likes
  }

  // Process blog content (parse and add features)
  const content = await serialize(data_json.content, {
    mdxOptions: {
      remarkPlugins: [
        remarkCodeTitles // Give code blocks a title
      ],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, {
          behavior: "wrap"
        }],
        [rehypeExternalLinks, {
          // Set external links to open in a new window
          target: '_blank',
          rel: ['nofollow']
        }],
        [rehypeInferReadingTimeMeta, {
          age: [14, 45], // Meta data to associate appropriate age range
          mainSelector: 'main'
        }],
        [rehypeToc, {
          headings: ["h3"],
          cssClasses: {
            // Automatically generate ToC
            toc: page_styles.article_outline,
            // Build links to h3 headings only
            link: page_styles.article_sub_heading
          }
        }],
        [rehypePrism, {
          showLineNumbers: true // Show line numbers in syntax-highlighted code blocks
        }]
      ],
      format: 'mdx' // MarkdownX
    },
    parseFrontmatter: false
  });

  return {
    props: {
      meta,
      content
    }
  }
}
