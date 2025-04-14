import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './pages/home';
import Profile from './pages/profile';
import { BrowserRouter as Router } from "react-router";
import React from "react";
import userEvent from "@testing-library/user-event"

test('Renders Log in and Sign up', () => {
  render(
    <Router>
      <App />
    </Router>
  );
  const linkElement = screen.getAllByText(/Log in/i)[0];
  const linkElement2 = screen.getAllByText(/Sign up/i)[0];
  expect(linkElement).toBeInTheDocument()
  expect(linkElement2).toBeInTheDocument();
});

test('Renders Profile link', async () => {
  render(<Router>
    <Home />
  </Router>);
  const linkElement = screen.getByText(/Profile/i);
  expect(linkElement).toBeInTheDocument();
  userEvent.click(linkElement);
  expect(screen.getAllByText(/Profile/i)[0]).toBeInTheDocument();
});

test('Renders Edit Profile', () => {
  render(<Profile />);
  const linkElement = screen.getByText(/Edit Profile/i);
  expect(linkElement).toBeInTheDocument();
});


describe('Sign up and Log in Tests', () => {
  test('Sign up functionality', () => {
    const {container} = render(
    <Router>
      <App />
    </Router>);
    const firstName = container.getElementsByClassName("App-FirstName-TextField")[0];
    const lastName = container.getElementsByClassName("App-LastName-TextField")[0];
    const email = container.getElementsByClassName("App-GetAddress-TextField")[0];
    const password = container.getElementsByClassName("App-GetPassword-TextField")[0];
    const signupButton = container.getElementsByClassName("App-SignUp-Button-Container")[0];
  
    expect(firstName).toBeInTheDocument();
    expect(lastName).toBeInTheDocument();
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
    expect(signupButton).toBeInTheDocument();
  });
  test('Log in functionality', () => {
    const {container} = render(
    <Router>
      <App />
    </Router>);
    const loginSwitch = container.getElementsByClassName("App-Split-Button right")[0];
    userEvent.click(loginSwitch);

    const email = container.getElementsByClassName("App-SignIn-GetAddress-Container");
    const password = container.getElementsByClassName("App-SignIn-GetPassword-Container");
    const loginButton = container.getElementsByClassName("App-LogIn-Button-Container");

    expect(email.length).toBeGreaterThan(0);
    expect(password.length).toBeGreaterThan(0);
    expect(loginButton.length).toBeGreaterThan(0);
  });
});