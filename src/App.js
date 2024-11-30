import React, { useState } from 'react';
import PostList from './components/PostList';
import AddPostForm from './components/AddPostForm';
import Login from './components/Login';

const App = () => {
    const [user, setUser] = useState(null);

    const handleLogin = (userData) => {
        setUser(userData);
    };

    const handleLogout = () => {
        setUser(null);
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
                    <AddPostForm userId={user.userId} />
                    <PostList userId={user.userId} />
                </>
            )}
        </div>
    );
};

export default App;
