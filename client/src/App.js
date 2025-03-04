import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = React.useState(null);
  const [count, setCount] = React.useState(0);
  const [username, setUsername] = React.useState(null);
  const [password, setPassword] = React.useState(null);

  React.useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => setData(data.message));
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    };
    fetch("/login", requestOptions)
      .then(res => console.log("Submitted!"))
      .catch(error => console.error("Error", error));
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{!data ? "Loading..." : data}</p>
        <form action = "/login" method = "post" onSubmit = {handleSubmit}>
          <input type = "text" name = "username" value = {username} placeholder = "Username" onChange = {(e) => setUsername(e.target.value)}></input>
          <input type = "password" name = "password" value = {password} placeholder = "Password" onChange = {(e) => setPassword(e.target.value)}></input>
          <button type = "submit">Login</button>
        </form>
        <button onClick = {() => setCount(count + 1)}>Count!</button>
        <p>Count: {count}</p>
      </header>
    </div>
  );
}

export default App;