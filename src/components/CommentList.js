import React from 'react';

const CommentList = ({ comments }) => (
    <div>
        <h4>Comments</h4>
        <ul>
            {comments.map((comment) => (
                <li key={comment.id}>
                    <strong>{comment.user.userName}:</strong> {comment.content}
                </li>
            ))}
        </ul>
    </div>
);

export default CommentList;
