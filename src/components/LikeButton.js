import React from 'react';

const LikeButton = ({ postId }) => {
    const handleLike = () => {
        fetch('http://localhost:8080/api/likes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Liked:', data);
                alert('Post liked successfully!');
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <button className="btn btn-outline-primary" onClick={handleLike}>
            Like Post
        </button>
    );
};

export default LikeButton;
