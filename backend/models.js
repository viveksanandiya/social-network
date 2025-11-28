const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  bio: String,
});

const postSchema = new mongoose.Schema({
  content: String,
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  likes: String,
});

const User = mongoose.model('User', userSchema);
const Post = mongoose.model('Post', postSchema);
module.exports = { User, Post  };
