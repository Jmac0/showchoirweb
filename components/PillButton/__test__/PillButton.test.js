import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'
import { PillButton } from '../PillButton';

describe('PillButton', () => {
  it('Should render text passed in as prop', () => {
    render(<PillButton text={'Submit'} />);
    // findBy works with async await
    const btn = screen.getByRole('button');
    // logs to console
    //screen.debug()

    expect(btn).toHaveTextContent('Submit');
  });
});
