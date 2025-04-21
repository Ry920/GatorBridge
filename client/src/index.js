import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './pages/home'
import Profile from './pages/profile'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route, Outlet, Navigate, useNavigate } from 'react-router';

const LargeRoute = () => {
  const navigate = useNavigate();
  React.useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const requestOptions = {
          method: "POST",
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        };
        const response = await fetch('/verifytoken', requestOptions);
        if (!response.ok) {
          localStorage.removeItem('token');
          localStorage.removeItem('email');
          navigate("*");
        }
      }
    }
    verify();
  }, [navigate]);
  return <Outlet/>
}

const ProtectedRoute = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return <Outlet/>
  }
  return <Navigate to="*" replace />
}

const NoAuthRoute = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Outlet/>
  }
  return <Navigate to="/home" replace />
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <Routes>
      <Route element={<LargeRoute/>}>
        <Route element={<NoAuthRoute/>}>
          <Route path="*" element={<App/>}/>
        </Route>
        <Route element={<ProtectedRoute/>}>
          <Route path="/profile/:email" element={<Profile/>}/>
          <Route path="/home" element={<Home/>}/>
        </Route>
      </Route>
    </Routes>
  </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
