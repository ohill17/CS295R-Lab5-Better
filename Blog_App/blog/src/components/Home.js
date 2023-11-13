import React, { useContext } from 'react';
import { UserContext } from '../context/user';
import Header from './header';
import PostsList from './PostsList';

function Home() {
  const { user } = useContext(UserContext);

  return (
    <div>
      <Header />
      <h1>{user ? 'My Posts' : 'Featured Posts'}</h1>
      <PostsList />
    </div>
  );
}

export default Home;