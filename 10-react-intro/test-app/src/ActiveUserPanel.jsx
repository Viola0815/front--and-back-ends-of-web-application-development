function ActiveUserPanel({ username, onLogout }) {
    return (
      <div className="user-Info-and-logout-option">
          <span>You are logged in as: {username}</span>
          <button className="logout-button" onClick={onLogout}>Logout</button>
      </div>
    );
}
  
export default ActiveUserPanel;
