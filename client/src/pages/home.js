import React from "react";
import logo from "../logo.svg";
import "./home.css";
import { Link } from "react-router";

function Home() {
  const [postText, setPostText] = React.useState("");
  const [textSize, setTextSize] = React.useState(255);
  const maxSize = 255;
  const handleSubmit = (event) => {
    event.preventDefault();
    if (textSize < 0) return;
  }
  return (
    <div className="Home">
      <header className="Home-header">
        <form>
          <text>What do you want to discuss?</text>
          <input type="text" onChange={(e) => {setPostText(e.target.value); setTextSize(255 - e.target.value.length)}}></input>
          <text>{textSize}</text>
          <button type="submit">Post</button>
        </form>
      </header>
    </div>
  );
}

export default Home;