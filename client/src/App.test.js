import { render, screen } from '@testing-library/react';
import App from './App';
import Home from './pages/home';

test('renders Log in and Sign up', () => {
  render(<App />);
  const linkElement = screen.getByText(/Log in/i);
  const linkElement2 = screen.getByText(/Sign up/i);
  expect(linkElement).toBeInTheDocument()
  expect(linkElement2).toBeInTheDocument();
});

test('renders Profile link', () => {
  render(<Home />);
  const linkElement = screen.getByText(/Profile/i);
  expect(linkElement).toBeInTheDocument();
});
