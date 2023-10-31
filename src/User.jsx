import React, { useState, useEffect } from "react";
import axios from "axios";
import "./User.css";

const UserProfile = () => {
  const [user, setUser] = useState({});//Main object for storing data from the api to display
  const [searchName, setSearchName] = useState("");//Self-Explanatory
  const [error, setError] = useState(null); // State to store error message
  const api_url = "https://api.github.com/users/";

  const handleSearch = () => {
    if (searchName.trim() === "") {//No error thrown in initial load and also for "space" as input
        setError("Please enter a GitHub username.");
        return;
      }
    // Fetching data 
    axios
      .get(`${api_url}${searchName}`)
      .then((response) => {//response is the object returned after successful HTTP request
        setUser(response.data);//fetching this object into the local object
        setError(null); // Clearing previous error(s) if any
      })
      .catch((error) => {
        console.error("Error fetching user data: " + error);
        setError("User not found. Please enter a valid username.");
      });
  };

  function handleEnter(e){
    if(e.key === "Enter"){
        handleSearch();
    }
  }
  useEffect(() => {//Operation done for every render
    // Fetch initial user data
    handleSearch();
  }, []);

  return (
    <div className="profile-card">
      <div className="search-box">  
        <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter GitHub username"
            onKeyDown={handleEnter}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <p>{error}</p>} {/*Conditional jsx:displays error message when error occurs */}
      <img src={user.avatar_url} alt="User Avatar" />
      <h1>{user.login}</h1>
      <p>{user.name}</p>
      <p className="bio">{user.bio}</p>
      <p>{user.location}</p>
      <div className="profile-stats">
        <div className="stat">
          <p>Repositories</p>
          <span>{user.public_repos}</span>
        </div>
        <div className="stat">
          <p>Followers</p>
          <span>{user.followers}</span>
        </div>
        <div className="stat">
          <p>Following</p>
          <span>{user.following}</span>
        </div>
      </div>
      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        Visit GitHub Profile
      </a>
    </div>
  );
};

export default UserProfile;
