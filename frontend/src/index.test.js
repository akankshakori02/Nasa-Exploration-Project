import React from 'react';
import { render } from '@testing-library/react';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

it('renders without crashing', () => {
  const div = document.createElement('div');
  const { container } = render(
    <BrowserRouter>
      <App />
    </BrowserRouter>, 
    div
  );
  expect(container).toBeInTheDocument();
});
