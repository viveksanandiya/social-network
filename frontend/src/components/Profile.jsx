

function Profile({ user }) {

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white p-6 rounded shadow mb-6">
        <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
        <p className="text-gray-600 mb-4">{user.email}</p>
        <p className="mb-4">{user.bio}</p>
        
      </div>

      <h2 className="text-xl font-bold mb-4">My Posts</h2>
      <div>
        <p>post Content 1</p>
        <div>102 likes</div>
      </div>

      <div>
        <p>post Content 2</p>
        <div>82 likes</div>
      </div>

      <div>
        <p>post Content 3</p>
        <div>93 likes</div>
      </div>
    </div>
  );
}

export default Profile;