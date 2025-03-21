import React from "react";
import "./App.css";
import Profile from "./pages/profile.js"
import Home from "./pages/home.js"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  //const [data, setData] = React.useState(null);
  const [isClickedLeft, setIsClickedLeft] = React.useState(true);
  const [isClickedRight, setIsClickedRight] = React.useState(false);
  const[userFirstName, setUserFirstName] = React.useState("");
  const[userLasttName, setUserLastName] = React.useState("");
  const[userEmail, setUserEmail] = React.useState("");
  const[userPassword, setuserPassword] = React.useState("");
  /*React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);*/

  function GetFirstName(){
    return(
    <label>
      <input type = "text" 
      className = "App-FirstName-TextField" />
    </label>
    );
  }
  function GetLastName(){
    const handleInput = (event) => {
      setUserLastName(event.target.value);
    };
    return(
    <label>
      <input type = "text" 
      className = "App-LastName-TextField" />
    </label>
    );
  }
  function GetEmail(){
    const handleInput = (event) => {
      setUserEmail(event.target.value);
    };
    return(
    <label>
      <input type = "text" 
      className = "App-GetAddress-TextField" />
    </label>
    );
  }
  function GetPassword(){
    const handleInput = (event) => {
      setuserPassword(event.target.value);
    }
    return(
      <label>
      <input type = "text" 
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
            <div className = "App-SignUp-Button-Container">
              SIGN UP
            </div>
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
            <div className = "App-LogIn-Button-Container">
              LOG IN
            </div>
          </div>
        </div>
    );
  }
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route element={<App/>}/>
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/home" element={<Home/>}/>
      </Routes>
    </Router>
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

