import React, { useState } from 'react'
/* Recoil */
import { useRecoilState } from 'recoil'
/* MDX / Remark / Rehype */
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import remarkCodeTitles from '../utils/code_titles'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypeExternalLinks from 'rehype-external-links'
import rehypeToc from '@jsdevtools/rehype-toc'
import rehypeInferReadingTimeMeta from 'rehype-infer-reading-time-meta'
import rehypePrism from 'rehype-prism-plus'
/* Page-level styles */
import page_styles from '../styles/Page.module.css'
/* Theme state handler */
import { themeState } from '../state/theme_state'
import { processComments } from '../utils/comment_helpers'
/* Next Components */
import Image from 'next/image'
import Link from 'next/link'
/* My Components */
import MenuOverlay from '../components/menu_overlay'
import MenuToggle from '../components/menu_toggle'
import Pre from '../components/pre'
import Title from '../components/title'
import Donate from '../components/donate'
import Article from '../components/article'
import Footer from '../components/footer'
import OneColumn from '../components/one_column'
import TwoColumn from '../components/two_column'

/* Default top-level page is an "Article" page */
export default function ArticlePage({ meta, content, comments }) {
  const [theme, setTheme] = useRecoilState(themeState);
  const [hidden, setHidden] = useState(' hidden');
  const components = { Image, Link, Pre, OneColumn, TwoColumn }

  return (
    <>
      <div className={ `${page_styles.next_wrapper} ${theme}` }>
        <MenuOverlay hidden={ hidden } setHidden={ setHidden } />
        <MenuToggle hidden={ hidden } setHidden={ setHidden } />
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

/* getStaticPaths
 * Get list of slugs to generate static pages in the top-level */
export async function getStaticPaths() {
  const url = `${process.env.NEXT_PUBLIC_BASE_URL}/articles`
  const response = await fetch(url)
  const article = await response.json()

  const allSlugs = article.map( item => item.slug )
  const paths = allSlugs.map( slug => ( { params: { slug: slug } } ) )

  return {
    paths,
    fallback: false
  }
}

/* getStaticProps
 * Setup content for static site generation (SSG) */
export async function getStaticProps({ params }) {
  const options_get = {
    method: "GET",
    supportHeaderParams: true,
    headers: {
      'Accept': 'application/json;encoding=utf-8',
      'Content-Type': 'application/json;encoding=utf-8',
    },
  }

  const article = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/articles/${params.slug}`, options_get)
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log( error ));

  const parent_comments = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/comments/${params.slug}/parents`, options_get)
    .then(res => res.json())
    .then(data => {
      return data;
    })
    .catch(error => console.log( error ));

  const comments = processComments(parent_comments);

  console.log('Comments initial:');
  console.log(comments);

  // Organize meta info into a separate object
  const meta = {
    id: article.id,
    slug: article.slug,
    title: article.title,
    author: article.author,
    updated_at: article.updated_at,
    likes: article.likes,
  }

  // Process blog content (parse and add features)
  const content = await serialize(article.content, {
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

  //console.log( 'Content' );
  //console.log( content );

  return {
    // Set the timeout for generating to 1 second
    // Timeout could be longer depending on how often data changes
    revalidate: 1,
    props: {
      meta,
      content,
      comments,
    }
  }
}

