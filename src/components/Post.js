import React, { useState } from 'react';
import CommentList from './CommentList';
import LikeButton from './LikeButton';

const Post = ({ post, userId, refreshPosts }) => {
    const [commentContent, setCommentContent] = useState('');

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:8080/api/comments`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    postId: post.postId,
                    userId: userId,
                    content: commentContent,
                }),
            });

            if (response.ok) {
                alert('Comment added successfully!');
                setCommentContent('');
                refreshPosts(); // Refresh posts after adding a comment
            } else {
                alert('Failed to add comment.');
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h3>{post.content}</h3>
                {post.imageUrl && <img src={post.imageUrl} alt="Post visual" />}
                <p>Posted by: {post.user.userName}</p>
                <p>
                    <strong>Likes:</strong>{' '}
                    {post.likes.map((like, index) => (
                        <span key={like.id}>
                            {like.user.userName}
                            {index < post.likes.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </p>
                <CommentList comments={post.comments} />
                <form onSubmit={handleAddComment} className="mt-3">
                    <div className="mb-3">
                        <label>Add a Comment</label>
                        <input
                            type="text"
                            className="form-control"
                            value={commentContent}
                            onChange={(e) => setCommentContent(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Add Comment
                    </button>
                </form>
                <LikeButton postId={post.postId} userId={userId} refreshPosts={refreshPosts} />
            </div>
        </div>
    );
};

export default Post;
