import React, { useContext, useEffect } from 'react';
import NavBar from './components/NavBar';
import Home from './components/Home';
import { PostsContext } from './context/posts';

function App() {
  const { fetchFeaturedPosts, fetchCategories } = useContext(PostsContext);

  useEffect(() => {
    fetchFeaturedPosts();
    fetchCategories();
  }, []);

  return (
    <div>
      <NavBar/>
      <Home />
    </div>
  );
}

export default App;