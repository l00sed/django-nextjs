'use client'

import React from 'react'
/* MDX / Remark / Rehype */
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkCodeTitles from '../../utils/code_titles'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypeInferReadingTimeMeta from 'rehype-infer-reading-time-meta'
import rehypePrism from 'rehype-prism-plus'
/* Page-level styles */
import page_styles from '../../styles/Page.module.scss'
import { processComments } from '../../utils/comment_helpers'
/* Next Components */
import Image from 'next/image'
import Link from 'next/link'
/* My Components */
import MenuOverlay from '../../components/menu_overlay'
import MenuToggle from '../../components/menu_toggle'
import Pre from '../../components/pre'
import Title from '../../components/title'
import Donate from '../../components/donate'
import Article from '../../components/article'
import Footer from '../../components/footer'
import OneColumn from '../../components/one_column'
import TwoColumn from '../../components/two_column'
/* lib */
import { theme } from '../../lib/theme';
import { menuVisibility, toggleMenuVisibility } from '../../lib/menu_visibility';

/* Default top-level page is an "Article" page */
export default async function ArticlePage({ params }) {
 /* TODO:
  * ----------------------------------------------
  * params has not loaded from the Next/Link component
  * that got us to this page. Need to figure out how
  * to make sure param is available, to get a page slug
  * string for api data.
  */
  const staticData = await getStatic({ params });
  /* Separate out static data */
  const meta = staticData.props.meta;
  const content = staticData.props.content;
  /* Get Comments */
  const comments = await hydrateComments({ params });
  /* Setup components to pass to MDXRemote */
  const components = { Image, Link, Pre, OneColumn, TwoColumn }

  return (
    <>
      <div className={ `${page_styles.next_wrapper} ${theme}` }>
        <MenuOverlay menuVisibility={ menuVisibility } toggleMenuVisibility={ toggleMenuVisibility } />
        <MenuToggle menuVisibility={ menuVisibility } toggleMenuVisibility={ toggleMenuVisibility } />
        <div className={ page_styles.main_wrapper }>
          <Title />
          <Donate />
          <Article meta={ meta } comments={ comments }>
            <MDXRemote { ...content } components={ components }/>
          </Article>
        </div>
        <Footer />
      </div>
    </>
  )
}

/* getStatic
 * Setup content for static site generation (SSG) */
export async function getStatic({ params }) {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8',
    },
    cache: 'force-cache'
  }

  const article = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/${params.slug}`, options_get);
  let json = {}
  if (article.ok) {
    json = await article.json();
  } else {
    console.error('Failed to load article data from the backend API.');
  }

  // Organize meta info into a separate object
  const meta = {
    id: json.id,
    slug: json.slug,
    title: json.title,
    author: json.author,
    updated_at: json.updated_at,
    likes: json.likes,
  }

  // Process blog content (parse and add features)
  const content = await serialize(json.content, {
    mdxOptions: {
      remarkPlugins: [
        remarkCodeTitles, // Give code blocks a title
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
          mainSelector: 'main',
        }],
        [rehypeToc, {
          headings: ["h3"],
          cssClasses: {
            // Automatically generate ToC
            toc: page_styles.article_outline,
            // Build links to h3 headings only
            link: page_styles.article_sub_heading,
          }
        }],
        [rehypePrism, {
          showLineNumbers: true // Show line numbers in syntax-highlighted code blocks
        }],
      ],
      format: 'mdx' // MarkdownX
    },
    parseFrontmatter: false,
  });

  return {
    props: {
      meta,
      content
    }
  }
}


export async function hydrateComments({ params }) {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8',
    },
    next: {
      revalidate: 2
    }
  }

  const parent_comments = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${params.slug}/parents`, options_get);
  let json = {}
  if (parent_comments.ok) {
    json = await parent_comments.json();
    console.log('Parent Comments (json)');
    console.log(json);
  } else {
    console.error('Unable to hydrate comments, could not receive parent comment data.');
  }

  const comments = await processComments(json);

  console.log('comments (processComments)');
  console.log(comments);

  return {
    props: {
      comments
    }
  }
}
