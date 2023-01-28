import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOMetaTag = ({ post }) =>
  !post ? (
    <Helmet>
      <title>Blog Project</title>
      <meta name='description' content='Blog Project with React and NodeJS' />
      <meta property='og:title' content='Blog Project with React and NodeJS' />
      <meta property='og:url' content='https://www.lsevina126.asia' />
      <meta property='og:type' content='website' />
      <meta property='og:site_name' content='Blog Project for lsevina126' />
      <meta property='og:image' content='%PUBLIC_URL%/Logo-big.png' />
      <meta
        property='og:description'
        content='Blog Project for lsevina126 with React and NodeJS'
      />
      <link rel='canonical' href='https://www.lsevina126.asia' />
    </Helmet>
  ) : (
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
