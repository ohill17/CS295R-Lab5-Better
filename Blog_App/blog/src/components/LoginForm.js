import React, { useState, useContext } from 'react';
import { UserContext } from '../context/user';
import { PostsContext } from '../context/posts';
import '../LoginForm.css'; 

const LoginForm = ({ show, onHide }) => {
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const { fetchUser } = useContext(UserContext);
  const { fetchPosts } = useContext(PostsContext);

  const handleSubmit = async () => {
    try {
      const user = await fetchUser(userid, password);

      if (user === null) {
        setError(true);
      } else {
        await fetchPosts(user.id);
        setUserid('');
        setPassword('');
        setError(false);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(true);
    }
  };

  return (
    <div className={`login-form-overlay ${show ? 'visible' : ''}`}>
      <div className="login-form card">
        <div className="card-header">
        </div>
        <div className="card-body">
        {error && <div className="error-message">Invalid userid or password</div>}
          <div className="mb-3">
            <label htmlFor="userid" className="form-label">User ID:</label>
            <input
              id="userid"
              type="text"
              className="form-control"
              value={userid}
              onChange={(event) => setUserid(event.target.value)}
              placeholder="User ID"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password:</label>
            <input
              id="password"
              type="password"
              className="form-control"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Password"
            />
          </div>
        </div>
        <div className="card-footer">
          <button className="btn btn-primary" onClick={handleSubmit}>Submit</button>
          <button className="btn btn-secondary" onClick={onHide}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;