import React, { useState } from 'react';
import CommentList from './CommentList';
import LikeButton from './LikeButton';

const Post = ({ post, userId, refreshPosts }) => {
    const [commentContent, setCommentContent] = useState('');

    const handleDeletePost = async () => {
        if (window.confirm('Are you sure you want to delete this post?')) {
            try {
                const response = await fetch(`http://localhost:8080/api/posts/${post.postId}`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    alert('Post deleted successfully!');
                    refreshPosts(); // Refresh posts after deletion
                } else if (response.status === 403) {
                    alert('You are not authorized to delete this post.');
                } else {
                    alert('Failed to delete post.');
                }
            } catch (error) {
                console.error('Error deleting post:', error);
            }
        }
    };

    const handleAddComment = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/comments', {
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

    const handleRemoveLike = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/likes/${post.postId}`, {
                method: 'DELETE',
            });
            if (response.ok) {
                alert('Like removed successfully!');
                refreshPosts(); // Refresh posts after removing the like
            } else {
                alert('Failed to remove like.');
            }
        } catch (error) {
            console.error('Error removing like:', error);
        }
    };

    const userHasLiked = post.likes.some((like) => like.user.userId === userId);

    return (
        <div className="card mb-3">
            <div className="card-body">
                <h3>{post.content}</h3>
                {post.imageUrl && <img src={post.imageUrl} alt="Post visual" className="img-fluid" />}
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
                {userHasLiked ? (
                    <button
                        onClick={handleRemoveLike}
                        className="btn btn-secondary mt-3"
                    >
                        Remove Like
                    </button>
                ) : (
                    <LikeButton postId={post.postId} userId={userId} refreshPosts={refreshPosts} />
                )}
                {userId === post.user.userId && ( // Only show the delete button for the logged-in user's posts
                    <button
                        onClick={handleDeletePost}
                        className="btn btn-danger mt-3"
                    >
                        Delete Post
                    </button>
                )}
            </div>
        </div>
    );
};

export default Post;
