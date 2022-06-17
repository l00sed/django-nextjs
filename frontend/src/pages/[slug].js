import React, { useState } from 'react'
import { MDXRemote } from 'next-mdx-remote'
import { serialize } from 'next-mdx-remote/serialize'
import { useRecoilState } from 'recoil'
import rehypeSlug from 'rehype-slug'
import rehypeAutolinkHeadings from 'rehype-autolink-headings'
import rehypePrism from 'rehype-prism-plus'
import page_styles from '../styles/Page.module.css'
import { themeState } from '../state/theme_state'
import MenuOverlay from '../components/menu_overlay'
import MenuToggle from '../components/menu_toggle'
import Image from 'next/image'
import Link from 'next/link'
import Title from '../components/title'
import Donate from '../components/donate'
import Article from '../components/article'
import Footer from '../components/footer'


export default function ArticlePage({ meta, content, comments }) {
  const [theme, setTheme] = useRecoilState(themeState);
  const [hidden, setHidden] = useState(' hidden');
  const components = { Image, Link }

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

export async function getStaticProps({ params }) {
  const article_endpoint_url = `${process.env.NEXT_PUBLIC_BASE_URL}/articles/${params.slug}`
  const article_response = await fetch(article_endpoint_url)

  const comments_endpoint_url = `${process.env.NEXT_PUBLIC_BASE_URL}/comments/${params.slug}`
  const comments_response = await fetch(comments_endpoint_url)

  const [article, comments] = await Promise.all([
    article_response.json(),
    comments_response.json(),
  ])

  const meta = {
    id: article.id,
    slug: article.slug,
    title: article.title,
    author: article.author,
    updated_at: article.updated_at,
  }

  const content = await serialize(article.content, {
    mdxOptions: {
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [rehypePrism, { showLineNumbers: true }],
      ],
      format: 'mdx'
    },
    parseFrontmatter: false,
  });

  console.log( 'Content' );
  console.log( content );

  return {
    props: {
      meta,
      content,
      comments,
    }
  }
}
