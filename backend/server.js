const express = require('express');
const mongoose = require('mongoose');
const { User, Post} = require('./models');//, Message 

const app = express();
app.use(express.json());

mongoose.connect('mongodb+srv://viveksanandiya787:UaAy8DMmV2JTdhrz@cluster0.7f2f6.mongodb.net/social-network');

app.post('/api/register', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.json(user);
  } else {
    res.json({ error: 'User not found' });
  }
});

app.get('/api/posts', async (req, res) => {
  const posts = await Post.find().populate('author');
  res.json(posts);
});

app.post('/api/posts', async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  const populated = await Post.findById(post._id).populate('author');
  res.json(populated);
});

app.post('/api/posts/:id/like', async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post.likes.includes(req.body.userId)) {
    post.likes.push(req.body.userId);
  }
  await post.save();
  res.json(post);
});

app.listen(5000, () => {
  console.log('Server running on port 5000');
});