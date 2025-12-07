import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';

import App from './App';

describe('App', () => {
  const getViteLogo = () => screen.getByAltText('Vite logo');
  const getReactLogo = () => screen.getByAltText('React logo');
  const getTitle = () =>
    screen.getByRole('heading', { name: /vite \+ react/i });
  const getButton = (count: number) =>
    screen.getByRole('button', { name: new RegExp(`count is ${count}`, 'i') });
  const getInstruction = () => screen.getByText(/edit/i);
  const getDocText = () =>
    screen.getByText(/click on the vite and react logos to learn more/i);
  const getViteLink = () => screen.getByRole('link', { name: /vite logo/i });
  const getReactLink = () => screen.getByRole('link', { name: /react logo/i });

  beforeEach(() => {
    render(<App />);
  });

  it('renders Vite and React logos', () => {
    expect(getViteLogo()).toBeInTheDocument();
    expect(getReactLogo()).toBeInTheDocument();
  });

  it('renders the title', () => {
    expect(getTitle()).toBeInTheDocument();
  });

  it('renders initial count as 0', () => {
    expect(getButton(0)).toBeInTheDocument();
  });

  it('increments count when button is clicked', async () => {
    const user = userEvent.setup();

    await user.click(getButton(0));

    expect(getButton(1)).toBeInTheDocument();
  });

  it('increments count multiple times', async () => {
    const user = userEvent.setup();

    await user.click(getButton(0));
    await user.click(getButton(1));
    await user.click(getButton(2));

    expect(getButton(3)).toBeInTheDocument();
  });

  it('renders the HMR instruction text', () => {
    expect(getInstruction()).toBeInTheDocument();
    expect(getInstruction()).toHaveTextContent('src/App.tsx');
  });

  it('renders the documentation link text', () => {
    expect(getDocText()).toBeInTheDocument();
  });

  it('renders links with correct hrefs', () => {
    expect(getViteLink()).toHaveAttribute('href', 'https://vite.dev');
    expect(getReactLink()).toHaveAttribute('href', 'https://react.dev');
  });

  it('opens links in new tab', () => {
    expect(getViteLink()).toHaveAttribute('target', '_blank');
    expect(getReactLink()).toHaveAttribute('target', '_blank');
  });
});
