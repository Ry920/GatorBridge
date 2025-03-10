import React from "react";
import logo from "./logo.svg";
import "./App.css";


function App() {

  const [data, setData] = React.useState(null);
  const [isClickedLeft, setIsClickedLeft] = React.useState(true);
  const [isClickedRight, setIsClickedRight] = React.useState(false);
  const[userFirstName, setUserFirstName] = React.useState("");
  const[userLasttName, setUserLastName] = React.useState("");
  const[userEmail, setUserEmail] = React.useState("");

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  function GetFirstName(){
    const handleInput = (event) => {
      setUserFirstName(event.target.value);
    };
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
            <div className = "App-SignUp-Button-Container">
              SIGN UP
            </div>
          </div>
        </div>
    );
  }
  function displayLogin(){
    return(
        <p> Hello </p>
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
                backgroundColor: isClickedLeft ? 'black' : 'lightgray',
                color: isClickedLeft ? 'white' : 'black',}}>
                Sign up
              </button>
              <button className="App-Split-Button right"
                onClick={handleRightClick}
                style={{backgroundColor: isClickedRight ? 'black' : 'lightgray',
                color: isClickedRight ? 'white' : 'black',}}>
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

