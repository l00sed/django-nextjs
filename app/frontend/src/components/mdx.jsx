'use client';

/* MDX / Remark / Rehype */
import { MDXRemote } from 'next-mdx-remote';

/* Next Components */
import Link  from 'next/link';
/* Local Components */
import Pre                       from 'components/pre.jsx';
import OneColumn                 from 'components/one_column.jsx';
import TwoColumn                 from 'components/two_column.jsx';
import ThreeColumn               from 'components/three_column.jsx';
import ImageWrapper, { Caption } from 'components/image_wrapper.jsx';
import ProseWrapper              from 'components/prose_wrapper.jsx';
import TableWrapper              from 'components/table_wrapper.jsx';
import HorizontalScroller        from 'components/horizontal_scroller.jsx';
import Card                      from 'components/card.jsx';
import Note                      from 'components/note.jsx';
import ReadingList               from 'components/reading_list.jsx';
import Bookmarks                 from 'components/bookmarks.jsx';
import YouTube                   from 'components/youtube.jsx';


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
