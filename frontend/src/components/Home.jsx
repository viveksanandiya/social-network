import { useState, useEffect } from 'react';

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/posts')
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const createPost = () => {
    if (!newPost.trim()) return;
    
    fetch('http://localhost:5000/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content: newPost, author: user._id })
    })
    .then(res => res.json())
    .then(data => {
      setPosts([data, ...posts]);
      setNewPost('');
    });
  };

  const likePost = (postId) => {
    fetch(`http://localhost:5000/api/posts/${postId}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: user._id })
    })
    .then(res => res.json())
    .then(updatedPost => {
      setPosts(posts.map(p => p._id === postId ? updatedPost : p));
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded shadow mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="What's on your mind?"
          className="w-full border p-2 rounded mb-2"
          rows="3"
        />
        <button 
          onClick={createPost}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Post
        </button>
      </div>

      {posts.map(post => (
        <div key={post._id} className="bg-white p-4 rounded shadow mb-4">
          <div className="font-bold mb-2">{post.author?.username}</div>
          <p className="mb-3">{post.content}</p>
          <div className="flex gap-4 text-sm text-gray-600">
            <button 
              onClick={() => likePost(post._id)}
              className="hover:text-blue-600"
            >
              Like ({post.likes?.length || 0})
            </button>
            <button className="hover:text-blue-600">Share</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;