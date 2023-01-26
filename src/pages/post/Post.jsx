import React, { useContext, useEffect, useRef, useState } from 'react';
import Header from '../../components/header/Header';
import styles from './Post.module.css';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Write from '../write/Write';
import { Context } from '../../context/context';
import axiosInstance from '../../config';
import { CircularProgress } from '@mui/material';

import 'react-quill/dist/quill.snow.css';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import 'highlight.js/styles/vs2015.css';

const Post = () => {
  const [post, setPost] = useState({});
  const location = useLocation();
  const [editBtnIndex, setEditBtnIndex] = useState(false);
  const { id } = useContext(Context);
  const postTextBoxRef = useRef();
  const navigate = useNavigate();
  const _id = useParams().id;

  const inputText = () => {
    return {
      __html: `${post.text}`,
    };
  };

  useEffect(async () => {
    try {
      const res = await axiosInstance.get(`/posts/${_id}`);
      setPost(res.data);
    } catch (err) {
      window.alert(err);
    }

    document
      .querySelectorAll('.videoImgs')
      .forEach((img) => img.setAttribute('style', ''));
  }, [location, _id, editBtnIndex]);

  const deletePost = async () => {
    try {
      const res = await fetch(`https://api.lsevina126.asia/posts/${_id}`, {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          author: id,
        }),
      });
      res.status === 401 &&
        window.alert(
          `${res.statusText} This is private Blog. Onle The Admin can edit!!`
        );
      res.status === 204 && navigate('/');
    } catch (err) {
      window.alert(err);
    }
  };

  useEffect(() => {
    document
      .querySelectorAll('img')
      .forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));
  }, []);

  useEffect(() => {
    document.querySelectorAll('meta')[3].content = `${post.title}`;
    document.querySelectorAll('meta')[4].content = `${post.title}`;
    document.querySelectorAll(
      'meta'
    )[5].content = `https://www.lsevina126.asia/post/${post._id}`;
    document.querySelectorAll('meta')[7].content = `${post.title}`;
    document.querySelectorAll('meta')[8].content = `${post.imgUrl}`;
    document.querySelectorAll('meta')[9].content = `${post.title}`;
    document.querySelector(
      'title'
    ).innerText = `Blog Project - ${post.title} - ${post.catName}`;
    document.querySelectorAll(
      'link'
    )[1].href = `https://www.lsevina126.asia/post/${post._id}`;
  }, [post]);

  return (
    <section className={styles.postPage}>
      {!editBtnIndex ? (
        <>
          <Header />
          <div className={styles.postBox}>
            <div className={styles.postImgTextBox}>
              <div className={styles.postTitleImgBox}>
                {post.imgUrl === '' ? (
                  <img src='../images/postdefaultimg.png' />
                ) : (
                  <img crossOrigin='anonymous' src={post.imgUrl} alt='' />
                )}
              </div>
              <div className={styles.postTextBox}>
                <header className={styles.postHeader}>
                  <p>
                    Category: <span>{post.catName}</span>
                  </p>
                  <span>{post.title}</span>
                  <div>
                    <i
                      onClick={() => {
                        if (!editBtnIndex) {
                          setEditBtnIndex(true);
                        } else {
                          setEditBtnIndex(false);
                        }
                      }}
                      class='fa-solid fa-pen-to-square'
                    ></i>
                    <i onClick={deletePost} class='fa-solid fa-trash'></i>
                  </div>
                </header>
                {post.text === undefined ? (
                  <></>
                ) : (
                  <div className={styles.authorAndDate}>
                    <p>
                      Author: <span>{post.author}</span>
                    </p>
                    <span>{new Date(post.createdAt).toDateString()}</span>
                  </div>
                )}
                <div className='ql-snow'>
                  {post.text === undefined ? (
                    <div className={styles.circularBox}>
                      <CircularProgress size={60} />
                    </div>
                  ) : (
                    <div
                      class='ql-editor'
                      ref={postTextBoxRef}
                      className={styles.postContentText}
                      dangerouslySetInnerHTML={inputText()}
                    ></div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Write setEditBtnIndex={setEditBtnIndex} />
      )}
    </section>
  );
};

export default Post;
