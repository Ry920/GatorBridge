import "./home.css";
import React, { useState } from "react"
import { Link } from "react-router";
import Popup from "./editPopupHome.js"

function Home() {
  const [toEdit, settoEdit] = React.useState(false);
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
      listSearch();
    }
    else {
      alert("Error searching");
    }
  }
  const listSearch = () =>{
    return(
    <header className = "Home-display-messages-container">
      {posts.map((post) => {
        return (
          <header className = "Home-message-layout">
            <header className = "Home-message-row-container">
              <div className = "Home-message-title">
                {/* post.title */}
              </div>
              <div className = "Home-message-author">
                {/* post.author */}
              </div>
            </header>
            <div className = "Home-message-content">
                {/* post.content */}
            </div>
          </header>
        );
      })}
      </header>
    );
  }
  const defaultList = () => {
    
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
           className = "Home-logout-button" >Log Out</button>

        <Link to ="/profile">
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
            {defaultList()}
          </header>

          </header>
      </header>
      <Popup trigger={toEdit} setTrigger={settoEdit}></Popup>
    </div>
  );
}

export default Home;