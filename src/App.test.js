import { render, screen } from '@testing-library/react';
import App from './App';
import React from "react";
import '@testing-library/jest-dom/extend-expect';
import {fireEvent} from '@testing-library/react'

test('like test', () => {
  render(<App />);
  const linkElement = screen.getByText('Log in');
  expect(linkElement).toBeInTheDocument();
  linkElement.click();

  const usernameInput = screen.getByTestId('formGroupFirstName');
  fireEvent.change(usernameInput, {target: {value: 'TestCompany'}});

  const passwordInput = screen.getByTestId('formGroupTelephone');
  fireEvent.change(passwordInput, {target: {value: 'TestCompany'}});

  const button = screen.getByText('Login');
  fireEvent.click(button);

  const viewDetails = screen.getByText('View Details');
  expect(viewDetails).toBeInTheDocument();

  fireEvent.click(viewDetails);

  const likes = screen.getByText('0 people liked this project');
  fireEvent.click(likes);

  const likes2 = screen.getByText('1 people liked this project');
  expect(likes2).toBeInTheDocument();
});
