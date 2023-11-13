import React, { useContext } from 'react';
import { UserContext } from '../context/user';
import { PostsContext } from '../context/posts';
import '../PostLists.css';

function PostsList() {
  const { user } = useContext(UserContext);
  const { posts, featuredPosts } = useContext(PostsContext);

  const postsToRender = user ? posts : featuredPosts;


  console.log(postsToRender);

 
  return (
    <div className="post-container">
      {postsToRender.map(post => (
        <div key={post.id} className="post">
          <h3 className="post-title">{post.title}</h3>
          <div className="post-content" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      ))}
    </div>
  );
}

export default PostsList;
