import { Link } from 'react-router-dom';

function Navbar({ onLogout }) {
  return (
    <nav className="bg-green-300 text-white p-4 100vh">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold">Social Networking</Link>
        <div className="flex gap-6 items-center">
          <Link to="/" >Home</Link>
          <Link to="/profile" >Profile</Link>
          <Link to="/friends" >Friends</Link>
          <Link to="/messages" >Messages</Link>
          
          <input type="text" placeholder="Search" className="px-3 py-1 rounded text-black"/>
          
          <button onClick={onLogout} className="bg-red-500 px-4 py-1 rounded">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;