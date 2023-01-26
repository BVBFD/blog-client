import React from 'react';
import styles from './HomePost.module.css';

const HomePost = ({ post }) => {
  const inputText = () => {
    return { __html: `${post?.text}` };
  };

  return (
    <div className={styles.homePost}>
      <div className={styles.imgBox}>
        {post?.imgUrl === '' ? (
          <img src='../images/postdefaultimg.png' />
        ) : (
          <img crossOrigin='anonymous' src={post?.imgUrl} alt='' />
        )}
      </div>
      <div className={styles.explains}>
        <span className={styles.title}>{post?.title}</span>
        <span className={styles.date}>
          {new Date(post?.updatedAt).toDateString()}
        </span>
        <div dangerouslySetInnerHTML={inputText()}></div>
      </div>
    </div>
  );
};

export default HomePost;
