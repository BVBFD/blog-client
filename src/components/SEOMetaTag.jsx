import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOMetaTag = ({ post }) => (
  <Helmet>
    <title>{post.title}</title>
    <meta name='description' content={post.title} />
    <meta property='og:title' content={post.title} />
    <meta
      property='og:url'
      content={`https://www.lsevina126.asia/post/${post._id}`}
    />
    <meta property='og:type' content='website' />
    <meta property='og:site_name' content='Blog Project for lsevina126' />
    <meta property='og:image' content={post.imgUrl} />
    <meta property='og:description' content={post.title} />
    <link
      rel='canonical'
      href={`https://www.lsevina126.asia/post/${post._id}`}
    />
  </Helmet>
);

export default SEOMetaTag;
