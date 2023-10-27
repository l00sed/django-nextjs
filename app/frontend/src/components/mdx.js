'use client';

/* MDX / Remark / Rehype */
import { MDXRemote } from 'next-mdx-remote';

/* Next Components */
import Link  from 'next/link';
/* Local Components */
import Pre                       from './pre';
import OneColumn                 from './one_column';
import TwoColumn                 from './two_column';
import ThreeColumn               from './three_column';
import ImageWrapper, { Caption } from './image_wrapper';
import ProseWrapper              from './prose_wrapper';
import TableWrapper              from './table_wrapper';
import HorizontalScroller        from './horizontal_scroller';
import Card                      from './card';
import Note                      from './note';
import ReadingList               from './reading_list';
import Bookmarks                 from './bookmarks';
import YouTube                   from './youtube';


export default function Mdx ({ content }) {
  /* Grab components for MDX */
  const components = {
    Link,
    Pre,
    OneColumn,
    TwoColumn,
    ThreeColumn,
    ImageWrapper,
    ProseWrapper,
    TableWrapper,
    HorizontalScroller,
    Caption,
    Card,
    Note,
    ReadingList,
    Bookmarks,
    YouTube
  }

  return <MDXRemote { ...content } components={ components } />
}
