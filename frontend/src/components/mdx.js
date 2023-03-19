'use client';

/* MDX / Remark / Rehype */
import { MDXRemote } from 'next-mdx-remote';

/* Next Components */
import Link  from 'next/link';
/* Local Components */
import Pre                       from './pre';
import OneColumn                 from './one_column';
import TwoColumn                 from './two_column';
import ImageWrapper, { Caption } from './image_wrapper';
import ProseWrapper              from './prose_wrapper';
import TableWrapper              from './table_wrapper';
import HorizontalScroller        from './horizontal_scroller';
import Card                      from './card';


export default function Mdx ({ content }) {
  /* Grab components for MDX */
  const components = {
    Link,
    Pre,
    OneColumn,
    TwoColumn,
    ImageWrapper,
    ProseWrapper,
    TableWrapper,
    HorizontalScroller,
    Caption,
    Card,
  }

  return <MDXRemote { ...content } components={ components } />
}
