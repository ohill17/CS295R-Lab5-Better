import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import LoginForm from './LoginForm';
import '../NavBar.css';



function NavBar() {
  const { user, resetUser } = useContext(UserContext);
  const [showLogin, setShowLogin] = useState(false);

  const handleClick = () => {
    if (!showLogin && !user) {
      setShowLogin(true);
    } else if (showLogin) {
      setShowLogin(false);
    } else {
      resetUser();
    }
  };

  const handleLoginSubmit = () => {
    setShowLogin(false);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      {user && (
        <span onClick={() => (window.location.href = '/new-post')} className="nav-link">
          New Post
        </span>
      )}

      {user && (
        <span onClick={() => (window.location.href = '/update-profile')} className="nav-link">
          Update Profile
        </span>
      )}

      <button onClick={handleClick} className="btn btn-outline-primary">
        {user ? 'Logout' : 'Login'}
      </button>

      {showLogin && <LoginForm onSubmit={handleLoginSubmit} />}
    </nav>
  );
}

export default NavBar;