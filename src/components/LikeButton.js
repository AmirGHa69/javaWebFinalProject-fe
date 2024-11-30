const LikeButton = ({ postId, userId }) => {
    const handleLike = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/likes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ postId, userId }),
            });
            if (response.ok) {
                alert('Post liked!');
            } else {
                alert('Failed to like the post.');
            }
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    return <button onClick={handleLike}>Like Post</button>;
};

export default LikeButton;
