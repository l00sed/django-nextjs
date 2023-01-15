'use client';

/* MDX / Remark / Rehype */
import { MDXRemote } from 'next-mdx-remote';

/* Next Components */
import Image from 'next/image';
import Link  from 'next/link';

/* Local Components */
import Pre       from './pre';
import OneColumn from './one_column';
import TwoColumn from './two_column';


export default function Mdx ({ content }) {
  /* Grab components for MDX */
  const components = { Image, Link, Pre, OneColumn, TwoColumn }

  console.log('mdx content');
  console.log(content);

  return <MDXRemote { ...content } components={ components } />
}
