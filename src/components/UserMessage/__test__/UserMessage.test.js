import { render, screen, fireEvent, getByTestId } from '@testing-library/react';
import '@testing-library/jest-dom';
import { UserMessage } from '../UserMessage';

describe('UserMessage', () => {
  it('Opacity should be set to 0 ', async () => {
    render(<UserMessage message={''} isError={false} showMessage={false} />);
    const divElement = screen.getByTestId('user-message-container');
    expect(divElement).toHaveClass('opacity-0');
  });
  it('Opacity should be set to 1 ', async () => {
    render(<UserMessage message={''} isError={false} showMessage={true} />);
    const divElement = screen.getByTestId('user-message-container');
    expect(divElement).toHaveClass('opacity-1');
  });
  it('Should have red background color', async () => {
    render(<UserMessage message={''} isError={true} showMessage={true} />);
    const divElement = screen.getByTestId('user-message-container');
    expect(divElement).toHaveClass('bg-red-400');
  });
  it('Should have yellow background color', async () => {
    render(<UserMessage message={''} isError={false} showMessage={true} />);
    const divElement = screen.getByTestId('user-message-container');
    expect(divElement).toHaveClass('bg-yellow-200');
  });
  it('Should render text passed in as prop', async () => {
    render(<UserMessage message={'user message'} isError={true} showMessage={true} />);
    const divElement = screen.getByTestId('user-message');
    expect(divElement).toHaveTextContent('user message');
  });
});
