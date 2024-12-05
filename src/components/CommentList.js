import React, { useState } from 'react';

const CommentList = ({ comments, userId, onEditComment, onDeleteComment }) => {
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    const handleEditClick = (comment) => {
        setEditingCommentId(comment.id);
        setEditedContent(comment.content);
    };

    const handleSaveEdit = (commentId) => {
        onEditComment(commentId, editedContent);
        setEditingCommentId(null); // Exit editing mode
    };

    return (
        <div>
            <h4>Comments</h4>
            <ul>
                {comments.map((comment) => (
                    <li key={comment.id}>
                        {editingCommentId === comment.id ? (
                            <>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={editedContent}
                                    onChange={(e) => setEditedContent(e.target.value)}
                                />
                                <button
                                    className="btn btn-primary btn-sm mt-2"
                                    onClick={() => handleSaveEdit(comment.id)}
                                >
                                    Save
                                </button>
                                <button
                                    className="btn btn-secondary btn-sm mt-2 ms-2"
                                    onClick={() => setEditingCommentId(null)}
                                >
                                    Cancel
                                </button>
                            </>
                        ) : (
                            <>
                                <strong>{comment.user.userName}:</strong> {comment.content}
                                {comment.user.userId === userId && (
                                    <div>
                                        <button
                                            className="btn btn-warning btn-sm mt-2"
                                            onClick={() => handleEditClick(comment)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-danger btn-sm mt-2 ms-2"
                                            onClick={() => onDeleteComment(comment.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CommentList;
