import React, { useEffect, useState } from 'react';
import { checkSession, fetchLogout } from '../services'; 
import './styles/ActiveShopper.css';

function ActiveShopper({ onLogout }) {
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    checkSession()
      .then(data => {
        setUsername(data.username); 
      })
      .catch(err => {
        setError(error);
        onLogout(); 
      });
  }, [onLogout]);

  const handleLogout = () => {
    fetchLogout().then(() => {
      onLogout(); 
    }).catch(err => {
      setError(error);
    });
  };

  return (
    <div className="user-info-and-logout-option">
      <span className="welcome-message">Welcome to our shopping center, {username} </span>
      <button className="logout-button" onClick={handleLogout}>Logout</button>
    </div>
  );
}
export default ActiveShopper;
