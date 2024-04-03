import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import CodePanel from './CodePanel';

test('renders code panel with title and copy button', () => {
  render(<CodePanel code="console.log('Hello, world!');" title="Example Code" />);
  const titleElement = screen.getByText('Example Code');
  const copyButton = screen.getByRole('button', { name: /copy/i });

  expect(titleElement).toBeInTheDocument();
  expect(copyButton).toBeInTheDocument();
});

test('copies code to clipboard on button click', async () => {
  render(<CodePanel code="console.log('Hello, world!');" title="Example Code" />);
  const copyButton = screen.getByRole('button', { name: /copy/i });
  const copiedMessage = screen.queryByText('Copied!');

  fireEvent.click(copyButton);
  expect(copiedMessage).toBeInTheDocument();

  // Simulate clipboard content
  jest.spyOn(navigator.clipboard, 'writeText').mockImplementation(() => Promise.resolve());

  fireEvent.click(copyButton);
  await screen.findByText('Copied!');
});
