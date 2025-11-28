import { useState, useEffect } from 'react';

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/posts');
      const data = await res.json();
      setPosts(data);
    }catch (error){
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async () => {
    if (!newPost.trim()) return;
    
    try {
      const res = await fetch('http://localhost:5000/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost, author: user._id })
      });
      const data = await res.json();
      setPosts([data, ...posts]);
      setNewPost('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const likePost = async (postId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/posts/${postId}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user._id })
      });
      const updatedPost = await res.json();
      setPosts(posts.map(p => p._id === postId ? updatedPost : p));
    } catch (error) {
      console.error('Error liking post:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-4 rounded shadow mb-6">
        <textarea
          value={newPost}
          onChange={(e) => setNewPost(e.target.value)}
          placeholder="new post place"
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