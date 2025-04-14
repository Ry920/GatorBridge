import React from "react";
import "./App.css";
import Profile from "./pages/profile.js"
import Home from "./pages/home.js"
import {Routes, Route, useNavigate } from "react-router";

function App() {

  const navigate = useNavigate();

  const [isClickedLeft, setIsClickedLeft] = React.useState(true);
  const [isClickedRight, setIsClickedRight] = React.useState(false);
  const[firstname, setfirstname] = React.useState("");
  const[lastname, setlastname] = React.useState("");
  const[email, setemail] = React.useState("");
  const[password, setpassword] = React.useState("");

  const handleSignupSubmit = async(event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json'},
      body: JSON.stringify ({firstname, lastname, email, password})
    }
    const response = await fetch("/signup", requestOptions);
    const data = await response.json();
    if (response.status == 201)
    {
      localStorage.setItem('token', data.user.token);
      navigate("/home");
    } else {
      alert("ERROR");
    }
  };

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    };
    const response = await fetch("/login", requestOptions);
    const data = await response.json();
    if (response.status === 201) {
      localStorage.setItem('token', data.user.token);
      navigate("/home");
    }
    else {
      alert("ERROR");
      // TODO: Display specific errors (server vs client)
    }
  };

  function GetFirstName(){
    const handleInput = (event) => {
      setfirstname(event.target.value);
    }
    return(
    <label>
      <input type = "text" onChange={handleInput}
      <input type = "text" onChange={handleInput}
      className = "App-FirstName-TextField" />
    </label>
    );
  }
  function GetLastName(){
    const handleInput = (event) => {
      setlastname(event.target.value);
    };
    return(
    <label>
      <input type = "text" onChange = {handleInput}
      className = "App-LastName-TextField" />
    </label>
    );
  }

  function GetEmail(){
    const handleInput = (event) => {
      setemail(event.target.value);
    };
    return(
    <label>
      <input type = "text" onChange = {handleInput}
      className = "App-GetAddress-TextField" />
    </label>
    );
  }

  function GetPassword(){
    const handleInput = (event) => {
      setpassword(event.target.value);
    }
    return(
      <label>
      <input type = "text" onChange = {handleInput}
      className = "App-GetPassword-TextField" />
    </label>
    );
  }

  const handleLeftClick = () => {
        setIsClickedLeft(true);
        setIsClickedRight(false);
      };

  const handleRightClick = () => {
        setIsClickedRight(true);
        setIsClickedLeft(false);
      };
  
  function displaySignUp(){
    return(
        <div className = "App-Signup-Login-Container2">
          <div className = "App-Signup-Text">
            Sign Up
          </div>
          <div className = "App-SignUp-Info-Container">
            <div className = "App-SignUp-GetName-Container">
              <div className = "App-FirstName-Container">
                <div className = "App-FirstName-Title">
                  First name
                </div>
                {GetFirstName()}
              </div>
              <div className = "App-LastName-Container">
                <div className = "App-LastName-Title">
                  Last name
                </div>
                {GetLastName()}
              </div>
            </div>
            <div className = "App-SignUp-GetAddress-Container">
              <div className = "App-GetAddress-Title">
                Email Address
              </div>
              {GetEmail()}
            </div>
            <div className = "App-SignUp-GetPassword-Container">
              <div className = "App-GetPassword-Title">
                Password
              </div>
              {GetPassword()}
            </div>
            <div className = "App-SignUp-Button-Container" onClick = {handleSignupSubmit}>
              SIGN UP
            </button>
          </div>
        </div>
    );
  }
  function displayLogin(){
    return(
        <div className = "App-Signup-Login-Container2">
          <div className = "App-Signup-Text">
            Log In
          </div>
          <div className = "App-SignUp-Info-Container">
            <div className = "App-SignIn-GetAddress-Container">
              <div className = "App-GetAddress-Title">
              Email Address
              </div>
              {GetEmail()}
            </div>
            <div className = "App-SignIn-GetPassword-Container">
              <div className = "App-GetPassword-Title">
                Password
              </div>
              {GetPassword()}
            </div>
            <div className = "App-LogIn-Button-Container" onClick = {handleLoginSubmit}>
              LOG IN
            </button>
          </div>
        </div>
    );
  }
  return (
    <div className="App">
      <div className="App-background">
        <div className = "App-white-box-overlay">
          <div className = "App-Signup-Login-Container">
            <div className = "App-Split-Button-Container">
              
              <button className= "App-Split-Button left"
                onClick={handleLeftClick}
                style={{
                backgroundColor: isClickedLeft ? 'black' : null,
                color: isClickedLeft ? 'white' : null,}}>
                Sign up
              </button>
              <button className="App-Split-Button right"
                onClick={handleRightClick}
                style={{backgroundColor: isClickedRight ? 'black' : null,
                color: isClickedRight ? 'white' : null,}}>
                Log in
              </button>
            </div>
            {isClickedLeft ? displaySignUp(): null}
            {isClickedRight ? displayLogin() : null}
          </div>
        </div>
      </div>
    </div>
  );
}


export default App;

