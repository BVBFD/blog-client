const ServerPosts = async () => {
  try {
    const res = await axiosInstance.get(`/posts`);
    // prettier-ignore
    return res.data;
  } catch (err) {
    return console.error(err);
  }
};

module.exports = { ServerPosts };
