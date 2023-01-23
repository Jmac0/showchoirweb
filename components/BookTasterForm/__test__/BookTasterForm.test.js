
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import  BookTasterForm  from '../BookTasterForm';

describe('BookTasterForm', () => {
  it('Button should have Book now text', () => {
    render(<BookTasterForm  />);
    // findBy works with async await
    const btn = screen.getByRole('button');
    // logs to console
    //screen.debug()

    expect(btn).toHaveTextContent('Book Now');
  });
  it('Button should have Loading when clicked', () => {
    render(<BookTasterForm  />);
    // findBy works with async await
    const btn = screen.getByRole('button');
    fireEvent.click(btn)
    //screen.debug()

    expect(btn).toHaveTextContent('Loading');
  });
});
