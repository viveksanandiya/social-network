import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Profile from './components/Profile';
import Friends from './components/Friends';
import Messages from './components/Messages';
import Footer from './components/Footer';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    } else {
      // Auto login as demo user
      fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'demo@test.com' })
      })
      .then(res => res.json())
      .then(data => {
        setUser(data);
        localStorage.setItem('user', JSON.stringify(data));
      })
      
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  if (!user) return <div className="flex items-center justify-center h-screen">Loading...</div>;

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100">
        <Navbar onLogout={handleLogout} />
        <div className="container mx-auto px-4 py-6">
          <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route path="/friends" element={<Friends user={user} />} />
            <Route path="/messages" element={<Messages user={user} />} />
          </Routes>
        </div>
        {/* <Footer /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;