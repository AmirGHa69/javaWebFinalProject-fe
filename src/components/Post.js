import LikeButton from "./LikeButton";
import AddCommentForm from "./AddCommentForm";

const Post = ({ post, currentUser }) => {
    return (
        <div className="card mb-3">
            <div className="card-body">
                <h5 className="card-title">{post.content || 'No content'}</h5>
                {post.imageUrl && <img src={post.imageUrl} className="card-img-top" alt="Post" />}
                <p className="card-text text-muted">
                    Posted by {post.user?.userName || 'Unknown User'}
                </p>

                {/* Likes Section */}
                <p className="card-text">
                    <strong>Likes:</strong> {post.likes?.length > 0 ? (
                    post.likes.map((like, index) => <span key={index}>{like.userName}, </span>)
                ) : (
                    'No likes yet.'
                )}
                </p>

                {/* Comments Section */}
                <h6>Comments</h6>
                {post.comments?.length > 0 ? (
                    <ul>
                        {post.comments.map((comment, index) => (
                            <li key={index}>
                                <strong>{comment.userName}:</strong> {comment.content}
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No comments yet.</p>
                )}

                <LikeButton postId={post.postId} currentUser={currentUser} />
                <AddCommentForm postId={post.postId} currentUser={currentUser} />
            </div>
        </div>
    );
};
export default Post;
