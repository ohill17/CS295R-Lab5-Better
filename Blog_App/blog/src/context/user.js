import React, { createContext, useState } from 'react';
import axios from 'axios';

const UserContext = createContext();

function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  const serverURL = process.env.REACT_APP_SERVER_URL;

  const fetchUser = async (userid, password) => {
    try {
      const response = await axios.get(`${serverURL}/users?userid=${userid}&password=${password}`);

      if (response.data.length === 1) {
        setUser(response.data[0]);
        return response.data[0];
      } else {
        setUser(null);
        return null;
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      setUser(null);
      return null;
    }
  };

  const editUserById = async (userId, updatedUser) => {
    try {
      const response = await axios.put(`${serverURL}/users/${userId}`, updatedUser);
      setUser((prevUser) => (prevUser.id === userId ? response.data : prevUser));
    } catch (error) {
      console.error('Error editing user:', error);
    }
  };

  const createUser = async (newUser) => {
    try {
      const response = await axios.post(`${serverURL}/users`, newUser);
      setUser((prevUser) => [...prevUser, response.data]);
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  const resetUser = () => {
    setUser(null);
  };

  const valueToShare = {
    user,
    fetchUser,
    editUserById,
    createUser,
    resetUser,
  };

  return (
    <UserContext.Provider value={valueToShare}>
      {children}
    </UserContext.Provider>
  );
}

export { UserContext, UserProvider };
export default UserContext;