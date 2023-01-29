const express = require('express');
const app = express();
const path = require('path');
const { ServerPosts } = require('./serverPosts');
const PORT = process.env.REACT_APP_SERVER_PORT || 5000;
const fs = require('fs');

app.use(express.static(path.resolve(__dirname, './build')));

app.get('/', (req, res) => {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      return console.log(err);
    }

    data = data
      .replace(/__TITLE__/g, 'Blog Project')
      .replace(/__DESCRIPTION__/g, 'Blog Project with React and NodeJS');

    res.send(data);
  });
});

app.get('/post/*', (req, res) => {
  const filePath = path.resolve(__dirname, './build', 'index.html');
  fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
      return console.log(err);
    }

    const postId = req.params.id;
    const posts = await ServerPosts();
    const post = posts.filter((p) => p._id === postId);
    if (!post) return res.status(404).send('Post not found');

    data = data
      .replace(/__TITLE__/g, `${post.title}`)
      .replace(/__DESCRIPTION__/g, `${post.title}`);

    res.send(data);
  });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
