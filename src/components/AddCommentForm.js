import React, { useState } from 'react';

const AddCommentForm = ({ postId }) => {
    const [content, setContent] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch('http://localhost:8080/api/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ postId, content }),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log('Comment added:', data);
                alert('Comment added successfully!');
            })
            .catch((error) => console.error('Error:', error));
    };

    return (
        <form onSubmit={handleSubmit} className="card p-3 mb-3">
            <h3>Add Comment</h3>
            <div className="mb-3">
                <label className="form-label">Content</label>
                <textarea
                    className="form-control"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Add Comment</button>
        </form>
    );
};

export default AddCommentForm;
