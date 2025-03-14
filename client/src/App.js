import React from "react";
import "./App.css";
import Profile from "./pages/profile.js"
import Home from "./pages/home.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/profile" element={<Profile/>}/>
        </Routes>
      </Router>
  );
}

export default App;