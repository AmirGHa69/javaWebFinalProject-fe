import React, { useState } from 'react';

const AddPostForm = ({ userId }) => {
    const [content, setContent] = useState('');
    const [imageUrl, setImageUrl] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userId, content, imageUrl }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Post created:', data);
                alert('Post added successfully!');
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 mb-3">
            <h3>Add Post</h3>
            <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>
            <div className="mb-3">
                <label className="form-label">Image URL</label>
                <input
                    type="text"
                    className="form-control"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                />
            </div>
            <button type="submit" className="btn btn-primary">Add Post</button>
        </form>
    );
};

export default AddPostForm;
