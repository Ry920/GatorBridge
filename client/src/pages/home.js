import "./home.css";
import React, { useState } from "react"
import { Link } from "react-router";
import Popup from "./editPopupHome.js"
import { Routes, Route, useNavigate } from "react-router";

function Home() {
  const [toEdit, settoEdit] = React.useState(false);
  const [searchText, setSearchText] = React.useState("");
  const [posts, setPosts] = React.useState([]);
  const [voteCount, setVoteCount] = useState(0);
  const navigate = useNavigate();
  const email = localStorage.getItem('email');
  const selfProfileLink = `/profile/${email}`
  const [searched, setSearched] = useState(false);
  const handleSearch = async (event) => {
    event.preventDefault();
    if (searchText.length === 0) {
      setSearched(false);
      return;
    };
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${localStorage.getItem('token')}` },
      body: JSON.stringify({ searchText })
    };
    const response = await fetch("/search", requestOptions);
    if (response.ok) {
      const searchResults = await response.json();
      setPosts(searchResults);
      setSearched(true);
    }
    else {
      alert("Error searching");
    }
  }

  const handleUpVote = () => {
    {/* This is a pseudo code for how the vote count would work for each post
      but for actual version, we would probably have to store the vote count into a database for each individual post*/}
    setVoteCount(voteCount + 1);
  }

  const handleDownVote = () => {
    setVoteCount(voteCount - 1);
  }

  const listSearch = () =>{
    return(
    <header className = "Home-display-messages-container">
      {posts.map((post) => {
        return (
          <header className = "Home-message-layout">
            <header className = "Home-message-row-container">
              <div className = "Home-message-title">
                {post.PostTitle}
              </div>
              <Link to={`/profile/${post.email}`}>
                <div className = "Home-message-author">
                  {post.username}
                </div>
              </Link>
            </header>
            <div className = "Home-message-content">
                {post.PostText}
            </div>
          </header>
        );
      })}
      </header>
    );
  }
  const defaultList = () => {
    return (
      <header className = "Home-message-layout">
        <header className = "Home-message-row-container">
          <div className = "Home-message-title">
            {/* post.title */}
            title
          </div>
          <div className = "Home-message-author">
            {/* post.author */}
            author
          </div>
        </header>
        <div className = "Home-message-content">
            {/* post.content */}
            message content
        </div>
        <div className = "Home-message-vote-counter">
          <button onClick = {handleUpVote} className = "Home-message-upvote" >
          </button>
          <button onClick = {handleDownVote} className = "Home-message-downvote">
          </button>
          <div className = "Home-message-display-counter">
            {voteCount}
          </div>
        </div>
      </header>
      


    );
  }
  const handleCreatePostClick = () => {
    settoEdit(true);
    console.log('clicked ?', toEdit);
};
  return (
    <div className="Home">
      <header className="Home-header"
      style={{filter: toEdit ? 'blur(5px)':''}}>

        {/* !!! onclick = {Logout Functionality} !!!*/}
        <button type="submit"
           onClick = {(e) => {localStorage.removeItem("token"); localStorage.removeItem('email'); navigate("/*")}}
           className = "Home-logout-button" >Log Out</button>
        {/* {insert dynamic value after /profile for email to go to} */}
        <Link to = {selfProfileLink}>
        <button type="submit"
           className = "Home-profile-button">Profile</button>
        </Link>

        <header className = "Home-grey-box-overlay">

          <form onSubmit={handleSearch}>
            <input type="text" onChange={(e) => setSearchText(e.target.value)} 
            className = "Home-search-post-box"
            placeholder = "Search posts - [Make sure to click search post button]">
            </input>
          </form>

          <button type="submit"
           className = "Home-search-post-button"
           onMouseDown={(e) => handleSearch(e)}
           >
            Search Post
          </button>

          <button type="submit"
           className = "Home-create-post-button"
           onMouseDown={() => handleCreatePostClick()}
           >
            Create New Post
          </button>

          

          <header className = "Home-display-messages-container">
            {searched ? listSearch() : defaultList()}
          </header>

          </header>
      </header>
      <Popup trigger={toEdit} setTrigger={settoEdit}></Popup>
    </div>
  );
}

export default Home;