import React, { useEffect, useState } from 'react';
import Post from './Post';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/posts') // Ensure the correct backend URL
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setPosts(data))
            .catch((error) => console.error('Error fetching posts:', error));
    }, []);

    return (
        <div>
            <h2>All Posts</h2>
            {posts.length > 0 ? (
                posts.map((post) => <Post key={post.postId} post={post} />)
            ) : (
                <p>No posts available.</p>
            )}
        </div>
    );
};

export default PostList;
