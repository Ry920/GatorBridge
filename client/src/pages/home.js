import React from "react";
import logo from "../logo.svg";
import "./home.css";
import { Link } from "react-router";

function Home() {
  const [postText, setPostText] = React.useState("");
  const [textSize, setTextSize] = React.useState(255);
  const [searchText, setSearchText] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchText.length === 0) return;
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ searchText })
    };
    const response = await fetch("/search", requestOptions);
    if (response.ok) {
      const searchResults = await response.json();
      setPosts(searchResults);
    }
    else {
      alert("Error searching");
    }
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (textSize < 0) return;
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ postText })
    };
    const response = await fetch('/userpost', requestOptions);
    if (!response.ok) {
      alert('Error posting');
    }
    else {
      alert('Posted!');
    }
  }
  return (
    <div className="Home">
      <header className="Home-header">
        <form onSubmit={handleSearch}>
          <div>Search for posts</div>
          <input type="text" onChange={(e) => setSearchText(e.target.value)}></input>
          <button type="submit">Search</button>
        </form>
        <form onSubmit={handleSubmit}>
          <p>What do you want to discuss?</p>
          <input type="text" onChange={(e) => {setPostText(e.target.value); setTextSize(255 - e.target.value.length)}}></input>
          <button type="submit">Post</button>
          <div>Character Limit: {textSize}</div>
        </form>
        <Link to="/profile">Profile</Link>
        <div>
          <h1>Posts</h1>
          <div> {posts.map((post) => {
            return <p>
              {post.UserEmail + " " + post.PostText + " " + post.TimePosted}
            </p>;
          })}
          </div>
        </div>
      </header>
    </div>
  );
}

export default Home;