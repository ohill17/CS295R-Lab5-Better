import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';


/*
http://localhost:5000/posts?_expand=user&_sort=datetime&_order=desc&_start=0&_end=12
http://localhost:5000/posts?userId=${userId}&_expand=user&_sort=datetime&_order=desc
http://localhost:5000/categories?_sort=name&_order=asc
http://localhost:5000/users?userid=duckdonald&password=password
*/


const PostsContext = createContext();

function PostsProvider({ children }) {
  const [featuredPosts, setFeaturedPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);


  const serverURL = process.env.REACT_APP_SERVER_URL

  const fetchFeaturedPosts = async () => {
    try {
      const response = await axios.get(`${serverURL}/posts?_expand=user&_sort=datetime&_order=desc&_start=0&_end=12`);
      setFeaturedPosts(response.data);
    } catch (error) {
      console.error('Error fetching featured posts:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${serverURL}/categories?_sort=name&_order=asc`);
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchPosts = async (userId) => {
    try {
      const response = await axios.get(`${serverURL}/posts?userId=${userId}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    }
  };


  const deletePostById = async (postId) => {
    try {
      await axios.delete(`${serverURL}/posts/${postId}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };


  const editPostById = async (postId, updatedPost) => {
    try {
      const response = await axios.put(`${serverURL}/posts/${postId}`, updatedPost);
     
      setPosts((prevPosts) => prevPosts.map((post) => (post.id === postId ? response.data : post)));
    } catch (error) {
      console.error('Error editing post:', error);
    }
  };


  const createPost = async (newPost, user) => {
    try {
      const response = await axios.post(`${serverURL}/posts`, { ...newPost, user });
    
      setPosts((prevPosts) => [...prevPosts, response.data]);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

 
  useEffect(() => {
    fetchFeaturedPosts();
    fetchCategories();
  }, []);

  const valueToShare = {
    featuredPosts,
    categories,
    posts,
    fetchPosts,
    fetchFeaturedPosts,
    fetchCategories,
    deletePostById,
    editPostById,
    createPost,
  };

  return (
    <PostsContext.Provider value={valueToShare}>
      {children}
    </PostsContext.Provider>
  );
}
export { PostsContext }
export { PostsProvider };
export default PostsContext;

