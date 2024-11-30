import React, { useState } from 'react';

const AddPostForm = ({ userId }) => {
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/api/posts', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content, imageUrl, userId }),
            });

            if (response.ok) {
                alert('Post added successfully!');
                setContent('');
                setImageUrl('');
            } else {
                alert('Failed to create post.');
            }
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 mb-3">
            <h3>Add a New Post</h3>
            <div className="mb-3">
                <label>Content</label>
                <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </div>
            <div className="mb-3">
                <label>Image URL</label>
                <input
                    type="text"
                    className="form-control"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">
                Add Post
            </button>
        </form>
    );
};

export default AddPostForm;
