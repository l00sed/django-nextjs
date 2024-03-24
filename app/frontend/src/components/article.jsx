/* Styles */
import article_styles from 'styles/Article.module.scss';
/* Used for ToC */
import { compileMDX }  from 'next-mdx-remote/rsc';
import { hasProperty } from "hast-util-has-property"
import { headingRank } from "hast-util-heading-rank"
import { toString }    from "hast-util-to-string"
import { visit }       from "unist-util-visit"
/* Rehype */
import rehypeSlug      from 'rehype-slug';
/* Local Utils */
import HOST_URL         from 'utils/api_server';
import notFoundWrapper  from 'lib/not_found';
/* Next components */
import Link        from 'next/link';
/* Local components */
import Mdx          from 'components/mdx.jsx';
import PrevNextPost from 'components/prev_next_post';
import Comments     from 'components/comments.jsx';
import Button       from 'components/button.jsx';
import ArticleHead  from 'components/article_head.jsx';
import ArticleMeta  from 'components/article_meta.jsx';

const getArticleDetails = async (slug) => {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8'
    }
  }
  const data_promise = await fetch(`${ HOST_URL() }/api/articles/${ slug }`, options_get);

  let mdx = {};
  let meta = {}; // Organize meta info into a separate object

  if (data_promise.ok) {
    mdx = await data_promise.json();
    meta = {
      id: mdx.id,
      slug: mdx.slug,
      title: mdx.title,
      author: mdx.author,
      description: mdx.description,
      updated_at: mdx.updated_at,
      likes: mdx.likes,
      tags: mdx.tags
    }
    mdx = mdx.content;
  } else {
    notFoundWrapper({
      message: 'Could not retrieve article MDX from API',
      level: 'warning'
    });
  }

  const headings = []
  const rehypeExtractHeadings = () => {
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

  /* Generate ToC data */
  await compileMDX({
    source: mdx,
    options: {
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
    }
  });

  return {
    meta,
    headings,
    mdx
  }
}

export default async function Article(props) {
  /* Get article meta, toc headings, and content */
  const {
    meta,
    headings,
    mdx
  } = await getArticleDetails(props.slug);

  /* Add article_head */
  let article_head = <></>;
  if (props.head) {
    article_head = <ArticleHead meta={ meta } />;
  }

  /* Add article_meta */
  let article_meta = <></>;
  if (props.meta) {
    article_meta = <ArticleMeta meta={ meta } headings={ headings } show={ props.show } />
  }

  let metaPosition = 'before';
  if ('metaPosition' in props) {
    metaPosition = props.metaPosition;
  }

  /* Add "LIVE" button */
  let live_button = (
    <Link href="/live">
      <Button type={ 'live' }>live</Button>
    </Link>
  );
  if (props.disableLiveButton) {
    live_button = <></>;
  }

  let comments = <Comments slug={ props.slug } />;
  if (props.disableComments) {
    comments = <></>;
  }

  return (
    <>
      <div className={ article_styles.main_wrapper }>
        <main className={ article_styles.main } style={ props.style }>
          <article className={ article_styles.article_wrapper }>
            { article_head }
            { metaPosition === 'before' ? article_meta : <></> }
            <Mdx slug={ props.slug } meta={ meta } headings={ headings } mdx={ mdx } />
            { metaPosition === 'after'  ? article_meta : <></> }
          </article>
        </main>
        <aside className={ article_styles.aside }>
          <div className={ article_styles.stick }>
            <div className={ article_styles.scroll__y }>
              { live_button }
              { comments }
            </div>
          </div>
        </aside>
      </div>
      <PrevNextPost slug={ props.slug } />
    </>
  )
}
