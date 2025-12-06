import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('renders Vite and React logos', () => {
    render(<App />);

    const viteLogo = screen.getByAltText('Vite logo');
    const reactLogo = screen.getByAltText('React logo');

    expect(viteLogo).toBeInTheDocument();
    expect(reactLogo).toBeInTheDocument();
  });

  it('renders the title', () => {
    render(<App />);

    const title = screen.getByRole('heading', { name: /vite \+ react/i });

    expect(title).toBeInTheDocument();
  });

  it('renders initial count as 0', () => {
    render(<App />);

    const button = screen.getByRole('button', { name: /count is 0/i });

    expect(button).toBeInTheDocument();
  });

  it('increments count when button is clicked', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole('button', { name: /count is 0/i });

    await user.click(button);

    expect(
      screen.getByRole('button', { name: /count is 1/i })
    ).toBeInTheDocument();
  });

  it('increments count multiple times', async () => {
    const user = userEvent.setup();
    render(<App />);

    const button = screen.getByRole('button', { name: /count is 0/i });

    await user.click(button);
    await user.click(screen.getByRole('button', { name: /count is 1/i }));
    await user.click(screen.getByRole('button', { name: /count is 2/i }));

    expect(
      screen.getByRole('button', { name: /count is 3/i })
    ).toBeInTheDocument();
  });

  it('renders the HMR instruction text', () => {
    render(<App />);

    const instruction = screen.getByText(/edit/i);

    expect(instruction).toBeInTheDocument();
    expect(instruction).toHaveTextContent('src/App.tsx');
  });

  it('renders the documentation link text', () => {
    render(<App />);

    const docText = screen.getByText(
      /click on the vite and react logos to learn more/i
    );

    expect(docText).toBeInTheDocument();
  });

  it('renders links with correct hrefs', () => {
    render(<App />);

    const viteLink = screen.getByRole('link', { name: /vite logo/i });
    const reactLink = screen.getByRole('link', { name: /react logo/i });

    expect(viteLink).toHaveAttribute('href', 'https://vite.dev');
    expect(reactLink).toHaveAttribute('href', 'https://react.dev');
  });

  it('opens links in new tab', () => {
    render(<App />);

    const viteLink = screen.getByRole('link', { name: /vite logo/i });
    const reactLink = screen.getByRole('link', { name: /react logo/i });

    expect(viteLink).toHaveAttribute('target', '_blank');
    expect(reactLink).toHaveAttribute('target', '_blank');
  });
});
