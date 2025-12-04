const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { User, Post } = require('./models');

const app = express();
app.use(cors()); 
app.use(express.json());

mongoose.connect(process.env.MONGOURL);

mongoose.connection.once('open', async () => {
  console.log('Connected to MongoDB');
  
  const demoUser = await User.findOne({ email: 'demo@test.com' });
  if (!demoUser) {
    const newUser = new User({
      username: 'Demo User',
      email: 'demo@test.com',
      password: 'demo123',
      bio: 'This is a demo user account'
    });
    await newUser.save();
    console.log('Demo user created');
  }
});

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