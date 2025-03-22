import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './pages/home';
import Profile from './pages/profile';
import { BrowserRouter as Router } from "react-router";
import React from "react";
import userEvent from "@testing-library/user-event"

test('renders Log in and Sign up', () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Log in/i)[0];
  const linkElement2 = screen.getAllByText(/Sign up/i)[0];
  expect(linkElement).toBeInTheDocument()
  expect(linkElement2).toBeInTheDocument();
});

test('renders Profile link', async () => {
  render(<Router>
    <Home />
  </Router>);
  const linkElement = screen.getByText(/Profile/i);
  expect(linkElement).toBeInTheDocument();
  userEvent.click(linkElement);
  expect(screen.getAllByText(/Profile/i)[0]).toBeInTheDocument();
});

test('renders Edit Profile', () => {
  render(<Profile />);
  const linkElement = screen.getByText(/Edit Profile/i);
  expect(linkElement).toBeInTheDocument();
});