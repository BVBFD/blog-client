import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header.jsx';
import HomePost from '../../components/homePost/HomePost.jsx';
import SidebarAboutMe from '../../components/sidebarAboutMe/SidebarAboutMe.jsx';
import axiosInstance from '../../config.js';
import styles from './Home.module.css';
import ReactPaginate from 'react-paginate';
import { useRef } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Home = (props) => {
  const [totalPosts, setTotalPosts] = useState([]);

  const [sideBarAccessIndex, setSideBarAccessIndex] = useState('');

  const [booleanSidebarIndex, setBooleanSidebarIndex] = useState(false);
  const [searchingTitle, setSearchingTitle] = useState('');
  const [searchingTitleArray, setSearchingTitleArray] = useState([]);
  const [searchingTitleShownArray, setSearchingTitleShownArray] = useState([]);

  const [sideBarSelectedPost, setSideBarSelectedPost] = useState([]);
  const [sideBarSelectedChosenPost, setSideBarSelectedChosenPost] = useState(
    []
  );
  const [sideBarPageCount, setSideBarPageCount] = useState();
  const [pageCount, setpageCount] = useState();
  const [selectedArray, setSelectedArray] = useState([]);

  const searchInputRef = useRef();
  const navigate = useNavigate();

  const handlePageClick = (event) => {
    const newArray = [
      totalPosts[event.selected * 4],
      totalPosts[event.selected * 4 + 1],
      totalPosts[event.selected * 4 + 2],
      totalPosts[event.selected * 4 + 3],
    ];
    setSelectedArray(newArray);
  };

  const sideBarHandleClick = (event) => {
    const newArray = [
      sideBarSelectedPost[event.selected * 4],
      sideBarSelectedPost[event.selected * 4 + 1],
      sideBarSelectedPost[event.selected * 4 + 2],
      sideBarSelectedPost[event.selected * 4 + 3],
    ];
    setSideBarSelectedChosenPost(newArray);
  };

  useEffect(async () => {
    try {
      const res = await axiosInstance.get(`/posts`);
      // prettier-ignore
      setpageCount(Math.ceil(res.data.reverse().length / 4));
      setSelectedArray([res.data[0], res.data[1], res.data[2], res.data[3]]);
      setTotalPosts(res.data);
      setBooleanSidebarIndex(false);

      document.querySelectorAll(
        'meta'
      )[3].content = `Blog Project with React and NodeJS`;
      document.querySelector('title').innerText = `Blog Project`;
    } catch (err) {
      window.alert(err);
    }
  }, []);

  useEffect(() => {
    const lis = document.querySelectorAll(`.pagination .page-item`);
    const liDis = document.querySelector('.pagination .page-item.disabled');
    const liAct = document.querySelector('.pagination .page-item.active');

    liDis?.classList?.remove('disabled');
    liAct?.classList?.remove('active');
    lis[1].querySelector('a').click();

    const selectedPostsArray = totalPosts.filter(
      (post) => post.catName === sideBarAccessIndex
    );

    if (sideBarAccessIndex === undefined) {
      setSideBarPageCount(Math.ceil(totalPosts?.length / 4));

      const newArray = [
        totalPosts[0],
        totalPosts[1],
        totalPosts[2],
        totalPosts[3],
      ];

      setSideBarSelectedChosenPost(newArray);
      setSideBarSelectedPost(totalPosts);
      setBooleanSidebarIndex(true);
    } else {
      setSideBarPageCount(Math.ceil(selectedPostsArray?.length / 4));

      const newArray = [
        selectedPostsArray[0],
        selectedPostsArray[1],
        selectedPostsArray[2],
        selectedPostsArray[3],
      ];

      setSideBarSelectedChosenPost(newArray);
      setSideBarSelectedPost(selectedPostsArray);
      setBooleanSidebarIndex(true);
    }
  }, [sideBarAccessIndex]);

  const showTotalPosts = () => {
    booleanSidebarIndex && navigate(0);

    setSearchingTitle('');
    searchInputRef.current.value = '';
  };

  const handleSearchInputChange = (e) => {
    const searchTitle = e.target.value.replace(/(\s*)/g, '').toLowerCase();
    setSearchingTitle(searchTitle);
  };

  useEffect(() => {
    let filtered = [];
    let postTitle = '';
    if (booleanSidebarIndex) {
      filtered = sideBarSelectedPost.filter((post) => {
        postTitle = post.title.replace(/(\s*)/g, '').toLowerCase();
        return postTitle.includes(searchingTitle);
      });
      setSearchingTitleArray(filtered);
    }

    if (!booleanSidebarIndex) {
      filtered = totalPosts.filter((post) => {
        postTitle = post.title.replace(/(\s*)/g, '').toLowerCase();
        return postTitle.includes(searchingTitle);
      });
      setSearchingTitleArray(filtered);
    }

    if (searchingTitle === '') {
      setSearchingTitleArray([]);
    }

    setSearchingTitleShownArray([
      filtered[0],
      filtered[1],
      filtered[2],
      filtered[3],
    ]);

    // prettier-ignore
    setpageCount(Math.ceil(filtered.reverse().length / 4));
  }, [searchingTitle]);

  return (
    <section className={styles.home}>
      <Header />
      <div className={styles.homeBgImg}>
        <img src='../images/cathay.jpg' alt='' />
      </div>
      <div className={styles.title}>
        <span>IT & Game</span>
        <span>Blog</span>
      </div>
      <div className={styles.totalSearchBox}>
        <button className={styles.openTotalPosts} onClick={showTotalPosts}>
          Total Posts
        </button>
        {!booleanSidebarIndex ? (
          <input
            ref={searchInputRef}
            className={styles.searchInput}
            type='text'
            placeholder='Searching Posts...'
            onChange={handleSearchInputChange}
          />
        ) : (
          ''
        )}
      </div>
      <div className={styles.homeContentsPart}>
        <div className={styles.postsPart}>
          {!booleanSidebarIndex && searchingTitleArray?.length === 0 ? (
            selectedArray?.map((post) => {
              return post === undefined ? (
                ''
              ) : (
                <Link className='link' to={`/post/${post?._id}`}>
                  <HomePost post={post} />
                </Link>
              );
            })
          ) : sideBarAccessIndex || searchingTitleArray?.length !== 0 ? (
            sideBarSelectedChosenPost?.map((post) => {
              return post === undefined ? (
                ''
              ) : (
                <Link className='link' to={`/post/${post?._id}`}>
                  <HomePost post={post} />
                </Link>
              );
            })
          ) : (
            <div className={styles.loader}>
              <CircularProgress />
            </div>
          )}
          {searchingTitleArray?.length !== 0 &&
            searchingTitleShownArray?.map((post) => {
              return post === undefined ? (
                ''
              ) : (
                <Link className='link' to={`/post/${post?._id}`}>
                  <HomePost post={post} />
                </Link>
              );
            })}
        </div>

        <SidebarAboutMe setSideBarAccessIndex={setSideBarAccessIndex} />
      </div>
      {searchingTitleArray?.length === 0 ? (
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={''}
          pageCount={!booleanSidebarIndex ? pageCount : sideBarPageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={4}
          onPageChange={
            !booleanSidebarIndex ? handlePageClick : sideBarHandleClick
          }
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      ) : (
        <ReactPaginate
          previousLabel={'prev'}
          nextLabel={'next'}
          breakLabel={''}
          pageCount={!booleanSidebarIndex ? pageCount : sideBarPageCount}
          marginPagesDisplayed={0}
          pageRangeDisplayed={4}
          onPageChange={(event) => {
            let newArray = [
              searchingTitleArray.reverse()[event.selected * 4],
              searchingTitleArray.reverse()[event.selected * 4 + 1],
              searchingTitleArray.reverse()[event.selected * 4 + 2],
              searchingTitleArray.reverse()[event.selected * 4 + 3],
            ];
            setSearchingTitleShownArray(newArray);
          }}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousClassName={'page-item'}
          previousLinkClassName={'page-link'}
          nextClassName={'page-item'}
          nextLinkClassName={'page-link'}
          breakClassName={'page-item'}
          breakLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      )}
    </section>
  );
};

export default Home;
