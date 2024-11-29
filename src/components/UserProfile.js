import React, { useEffect, useState } from 'react';

const UserProfile = ({ userId }) => {
    const [user, setUser] = useState(null); // Store user data
    const [loading, setLoading] = useState(true); // Track loading state
    const [error, setError] = useState(null); // Track any errors

    useEffect(() => {
        console.log('Fetching user data for ID:', userId); // Debug log

        fetch(`http://localhost:8080/api/users/${userId}`) // Adjust the URL as needed
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log('Fetched user data:', data); // Debug log
                setUser(data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error fetching user data:', err); // Debug log
                setError(err.message);
                setLoading(false);
            });
    }, [userId]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="card">
            <div className="card-body">
                <h3 className="card-title text-center">{user.userName}</h3>
                <p className="text-muted text-center">{user.userEmail}</p>
                <h5 className="mt-4">User Posts:</h5>
                <ul>
                    {user.posts && user.posts.length > 0 ? (
                        user.posts.map((post) => <li key={post.id}>{post.content}</li>)
                    ) : (
                        <li>No posts available.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default UserProfile;
