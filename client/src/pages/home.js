import React from "react";
import logo from "../logo.svg";
import "./home.css";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  return (
    <div className="Home">
      <header className="Home-header">
        <img src={logo} className="Home-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <Link to="/profile">Profile</Link>
      </header>
    </div>
  );
}

export default Home;