import React from "react";
import logo from "../logo.svg";
import "./home.css";
import { Link } from "react-router";

function Home() {
  const [postText, setPostText] = React.useState("");
  const [textSize, setTextSize] = React.useState(255);
  const maxSize = 255;
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
        <form onSubmit={handleSubmit}>
          <p>What do you want to discuss?</p>
          <input type="text" onChange={(e) => {setPostText(e.target.value); setTextSize(255 - e.target.value.length)}}></input>
          <div>{textSize}</div>
          <button type="submit">Post</button>
        </form>
        <Link to="/profile">Profile</Link>
      </header>
    </div>
  );
}

export default Home;