import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: `${process.env.REACT_APP_API_URL}`,
  mode: 'cors',
  withCredentials: true,
  headers: {
    Origin: `http://localhost:${process.env.REACT_APP_PORT}/`,
    'Content-Securitiy-Policy':
      'img-src *;media-src https://res.cloudinary.com https://www.youtube.com/embed/;child-src https://res.cloudinary.com https://www.youtube.com/embed/;frame-src https://www.youtube.com/embed/;',
  },
});

export default axiosInstance;
