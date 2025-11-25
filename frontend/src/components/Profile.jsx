function Profile() {
  return (
    <div className="max-w-2xl mx-auto 100vh">
      <div className="bg-white p-6 rounded shadow mb-6">
        <h1 className="text-3xl font-bold mb-2">{user.username}</h1>
        <p className="text-gray-600 mb-4">{user.email}</p>
        <p className="mb-4">{user.bio}</p>
      </div>
      <h2 className="text-xl font-bold">Profile</h2>
    </div>
  );
}

export default Profile;