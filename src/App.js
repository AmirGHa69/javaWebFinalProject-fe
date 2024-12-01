import React, { useState } from 'react';
import PostList from './components/PostList';
import AddPostForm from './components/AddPostForm';
import Login from './components/Login';

const App = () => {
    const [user, setUser] = useState(null); // Logged-in user
    const [refreshKey, setRefreshKey] = useState(0); // Key to trigger refresh

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
    };

    const refreshPosts = () => {
        setRefreshKey((prevKey) => prevKey + 1); // Increment key to trigger re-render
    };

    return (
        <div className="container">
            <h1>Welcome to Likeaholic</h1>
            {!user ? (
                <Login onLogin={handleLogin} />
            ) : (
                <>
                    <p>
                        Logged in as <strong>{user.userName}</strong>
                        <button onClick={handleLogout} className="btn btn-link">
                            Logout
                        </button>
                    </p>
                    <AddPostForm userId={user.userId} onPostAdded={refreshPosts} />
                    <PostList userId={user.userId} refreshKey={refreshKey} refreshPosts={refreshPosts} />
                </>
            )}
        </div>
    );
};

export default App;
