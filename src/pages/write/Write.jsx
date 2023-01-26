import React, { useMemo, useContext, useEffect, useRef, useState } from 'react';
import Header from '../../components/header/Header.jsx';
import styles from './Write.module.css';
import CircularProgress from '@mui/material/CircularProgress';
import { Context } from '../../context/context.js';
import { useNavigate, useParams } from 'react-router-dom';
import axiosInstance from '../../config.js';

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import hljs from 'highlight.js';
import 'react-quill/dist/quill.core.css';
import 'react-quill/dist/quill.bubble.css';
import 'highlight.js/styles/vs2015.css';

const Write = ({ setEditBtnIndex }) => {
  const [title, setTitle] = useState('');
  const [titleImg, setTitleImg] = useState();
  const [writePageImgURL, setWritePageImgURL] = useState('');
  const [catName, setCatName] = useState('HTML / Git');
  const { id, editable } = useContext(Context);
  const [editorText, setEditorText] = useState('');
  const editorRef = useRef();

  const [postForEdit, setPostForEdit] = useState({});
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [firstSubmit, setFirstSubmit] = useState(true);
  const paramId = useParams().id;

  useEffect(async () => {
    if (paramId) {
      const response = await axiosInstance.get(`/posts/${paramId}`);
      setTitleImg(true);
      setPostForEdit(response.data);
      setTitle(response.data.title);
      setWritePageImgURL(response.data.imgUrl);
      setCatName(response.data.catName);
      setEditorText(response.data.text);

      document
        .querySelectorAll('.ql-editor img')
        .forEach((img) => img.setAttribute('crossorigin', 'anonymous'));

      document
        .querySelectorAll('.ql-editor a img')
        .forEach((img) => img.setAttribute('style', 'max-width: 500px;'));
    }

    return () => setTitleImg();
  }, [paramId]);

  const videoHandler = () => {
    console.log('video handler on!!');
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'video/*');
    input.click();
    console.log(input);

    input.addEventListener('change', async () => {
      console.log('File OnChange!');
      const file = input.files[0];
      console.log(file);

      const formData = new FormData();
      const filename = `${Date.now()}${file.name}`;
      formData.append('name', filename);
      formData.append('file', file);
      try {
        setIsFetching(true);
        const result = await axiosInstance.post('/video/upload', formData);
        const updatedVidURL = result.data;

        console.log('The URL data upon success', updatedVidURL);
        const vid_URL = updatedVidURL;
        const editor = editorRef.current.getEditor();
        const imgUrl = vid_URL.slice(0, -3).concat('png');
        editor.root.innerHTML =
          editor.root.innerHTML +
          `<p>
          <a href="${vid_URL}" style="text-decoration: none;cusor:pointer;display:flex;flex-direction:column;">
            <img class="videoImgs" style="width: 500px;" src="${imgUrl}" crossOrigin></img>
            <span>
              ✅Click to play above Video🎦
            </span>
          </a>
        </p>`;

        document
          .querySelectorAll('.videoImg')
          .forEach((video) => video.setAttribute('width', '500px'));

        document
          .querySelectorAll('.videoImg')
          .forEach((video) => video.setAttribute('crossOrigin', 'anonymous'));
        setIsFetching(false);
      } catch (error) {
        console.log('실패!!!');
        setIsFetching(false);
      }
    });
  };

  const imageHandler = (e) => {
    console.log('Img handler starts');
    const input = document.createElement('input');

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();
    console.log(input);

    input.addEventListener('change', async () => {
      console.log('File OnChange!');
      const file = input.files[0];
      console.log(file);

      const formData = new FormData();
      const filename = `${Date.now()}${file.name}`;
      formData.append('name', filename);
      formData.append('file', file);

      try {
        setIsFetching(true);
        const result = await axiosInstance.post('/pic/upload', formData);
        const updatedPicURL = result.data;

        console.log('The URL data upon success', updatedPicURL);
        const IMG_URL = updatedPicURL;
        const editor = editorRef.current.getEditor();
        const range = editor.getSelection();

        editor.insertEmbed(range.index, 'image', IMG_URL);

        document
          .querySelectorAll('img')
          .forEach((img) => img.setAttribute('crossOrigin', 'anonymous'));

        editor.setSelection(range.index + 1);
        setIsFetching(false);
      } catch (error) {
        console.log('Fail!!');
        setIsFetching(false);
      }
    });
  };

  hljs.configure({
    languages: ['javascript', 'html', 'css', 'react', 'sass', 'typescript'],
  });

  const modules = useMemo(() => {
    return {
      syntax: {
        highlight: (text) => hljs.highlightAuto(text).value,
      },
      toolbar: {
        container: [
          [{ header: [1, 2, 3, false] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          ['image', 'video', 'link', 'code-block', 'blockquote'],
          [
            {
              size: ['small', false, 'large', 'huge'],
            },
          ],
          [{ list: 'ordered' }, { list: 'bullet' }],
          [{ script: 'sub' }, { script: 'super' }],
          [{ indent: '-1' }, { indent: '+1' }],
          [{ direction: 'rtl' }],
          [{ color: [] }, { background: [] }],
          [
            {
              font: [],
            },
          ],
          [{ align: [] }],
          ['clean'],
        ],
        handlers: {
          image: imageHandler,
          video: videoHandler,
        },
      },
    };
  }, []);

  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'align',
    'strike',
    'script',
    'blockquote',
    'background',
    'list',
    'bullet',
    'indent',
    'link',
    'image',
    'color',
    'code-block',
  ];

  const selectImg = async (e) => {
    setTitleImg(e.target.files[0]);
    if (e.target.files[0]) {
      const data = new FormData();
      const filename = `${Date.now()}${e.target.files[0].name}`;
      data.append('name', filename);
      data.append('file', e.target.files[0]);
      try {
        setIsFetching(true);
        const result = await axiosInstance.post('/pic/upload', data);
        const updatedPicURL = result.data;

        setWritePageImgURL(updatedPicURL);
        setIsFetching(false);
      } catch (err) {
        window.alert(err);
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (firstSubmit) {
      setFirstSubmit(false);

      if (id !== 'lse126' || !editable) {
        window.alert('This is private Blog. Onle The Admin can edit!!');
        return;
      }

      try {
        const res = await axiosInstance.post(
          `/posts`,
          {
            imgUrl: writePageImgURL,
            title: title,
            text: editorText,
            catName: catName,
            author: id,
          },
          {
            headers: {
              Idempotency_Key: `${Date.now()}${Math.random()}`,
            },
          }
        );
        navigate(`/post/${res.data?.savedNewPost?._id}`);
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEdit = async (event) => {
    event.preventDefault();
    if (firstSubmit) {
      setFirstSubmit(false);

      try {
        const res = await axiosInstance.put(
          `/posts/${paramId}`,
          {
            imgUrl: writePageImgURL,
            title: title,
            text: editorText,
            catName: catName,
            author: id,
          },
          {
            headers: {
              Idempotency_Key: `${Date.now()}${Math.random()}`,
            },
          }
        );

        res.status === 401 &&
          window.alert(
            `${res.statusText} This is private Blog. Onle The Admin can edit!!`
          );

        res.status === 201 &&
          setEditBtnIndex(false) &&
          navigate(`/post/${paramId}`);
      } catch (err) {
        window.alert(err);
      }
    }
  };

  useEffect(() => {
    setFirstSubmit(true);
    return () => {
      setFirstSubmit(true);
    };
  }, []);

  return (
    <section className={styles.write}>
      <Header />
      {titleImg ? (
        <div className={styles.titleImgBox}>
          <img
            src={paramId ? postForEdit.imgUrl : writePageImgURL}
            alt=''
            crossOrigin='anonymous'
          />
        </div>
      ) : (
        <img src='../images/postdefaultimg.png' style={{ width: '100%' }} />
      )}
      <form
        onSubmit={paramId === undefined ? handleSubmit : handleEdit}
        className={styles.titleImgAddBox}
      >
        <div className={styles.titleInputBox}>
          <label className={styles.imgFileLabel} htmlFor='imgFileInput'>
            <i class='fas fa-plus'></i>
          </label>
          <input
            onChange={selectImg}
            id='imgFileInput'
            type='file'
            style={{ display: 'none' }}
          />
          <input
            className={styles.titleInput}
            type='text'
            autoFocus={true}
            placeholder='Title'
            onChange={(e) => setTitle(e.target.value)}
            defaultValue={paramId ? postForEdit.title : ''}
          />
          <select
            onChange={(e) => setCatName(e.target.value)}
            name='Category'
            className={styles.selectCategory}
            value={paramId && postForEdit.catName}
          >
            <option value='HTML / Git'>HTML / Git</option>
            <option value='CSS'>CSS</option>
            <option value='JavaScript'>JavaScript</option>
            <option value='Front-End'>Front-End</option>
            <option value='Back-End'>Back-End</option>
            <option value='TypeScript'>TypeScript</option>
            <option value='Game'>Game</option>
            <option value='Book / Learn'>Book / Learn</option>
          </select>
          <button
            type='submit'
            disabled={!firstSubmit}
            className={styles.uploadBtn}
          >
            Upload
          </button>
        </div>
        <ReactQuill
          style={{ width: '100%', height: '90vh' }}
          className={styles.editor}
          height='90vh'
          ref={editorRef}
          modules={modules}
          formats={formats}
          value={editorText}
          defaultValue={paramId ? postForEdit.text : ''}
          onChange={setEditorText}
          theme={'snow'}
        />
        {!isFetching ? (
          ''
        ) : (
          <div className={styles.loader}>
            {' '}
            <CircularProgress />
          </div>
        )}
      </form>
    </section>
  );
};

export default Write;
