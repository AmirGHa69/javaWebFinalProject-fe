import React, { useState } from 'react';
import PostList from '../components/PostList';
import AddPostForm from '../components/AddPostForm';

const HomePage = () => {
    const [currentUser, setCurrentUser] = useState(null);
    const [posts, setPosts] = useState([]);

    const handleLogin = (e) => {
        e.preventDefault();
        const username = e.target.username.value;
        const password = e.target.password.value;

        if (username && password) {
            setCurrentUser({ username });
            alert(`Logged in as ${username}`);
        } else {
            alert('Please provide a username and password.');
        }
    };

    const handlePostAdded = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div className="container">
            <h1>Welcome to Likeaholic</h1>
            {!currentUser ? (
                <form onSubmit={handleLogin} className="card p-3 mb-3">
                    <h3>Login</h3>
                    <div className="mb-3">
                        <label className="form-label">Username</label>
                        <input type="text" className="form-control" name="username" />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" name="password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            ) : (
                <>
                    <p>Logged in as <strong>{currentUser.username}</strong></p>
                    <AddPostForm userId={currentUser.username} onPostAdded={handlePostAdded} />
                </>
            )}
            <PostList posts={posts} setPosts={setPosts} />
        </div>
    );
};

export default HomePage;
