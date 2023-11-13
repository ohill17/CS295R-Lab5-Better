import React, { useContext } from 'react';
import { UserContext } from '../context/user';
import { PostsContext } from '../context/posts';
import parse from 'html-react-parser';

function PostCard({ post }) {
  const { user } = useContext(UserContext);
  const { deletePostById } = useContext(PostsContext);

  const handleDeleteClick = () => {
    if (post.userId === user.id) {
      deletePostById(post.id);
    }
  };

  const date = new Date(post.datetime);

  return (
    <div className="card mb-3">
      {post.image && <img src={`data:image/png;base64,${post.image}`} className="card-img-top" alt="Post Image" />}
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{parse(post.content.substring(0, 100))}</p>
        <p className="card-text">
          <small className="text-muted">
            Posted by {post.userName} on {date.toDateString()}
          </small>
        </p>
        {user && user.id === post.userId && (
          <div>
            <a href="#" onClick={handleDeleteClick} className="card-link">
              Delete
            </a>
            <a href="#" className="card-link">
              Edit
            </a>
          </div>
        )}
        <a href="#" className="card-link">
          View Post
        </a>
      </div>
    </div>
  );
}

export default PostCard;