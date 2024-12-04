import React, { useEffect, useState } from 'react';
import Post from './Post';

const PostList = ({ userId, refreshKey, refreshPosts }) => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/posts');
                const data = await response.json();
                setPosts(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching posts:', error);
                setLoading(false);
            }
        };

        fetchPosts();
    }, [refreshKey]);

    if (loading) {
        return <p>Loading posts...</p>;
    }

    return (
        <div>
            <h2>All Posts</h2>
            {posts.map((post) => (
                <Post key={post.postId} post={post} userId={userId} refreshPosts={refreshPosts} />
            ))}
        </div>
    );
};

export default PostList;
