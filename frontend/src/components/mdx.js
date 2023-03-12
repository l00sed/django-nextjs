'use client';

/* MDX / Remark / Rehype */
import { MDXRemote } from 'next-mdx-remote';

/* Next Components */
import Link  from 'next/link';

/* Local Components */
import Pre          from './pre';
import OneColumn    from './one_column';
import TwoColumn    from './two_column';
import ImageWrapper from './image_wrapper';
import Card         from './card';


export default function Mdx ({ content }) {
  /* Grab components for MDX */
  const components = { Card, ImageWrapper, Link, Pre, OneColumn, TwoColumn }

  return <MDXRemote { ...content } components={ components } />
}
