import React, { useState } from 'react';

const BookTasterFrom: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    option: '',
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement >) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(formState);
  };

  return (
    <form onSubmit={handleSubmit}
	  className='z-50'

	>
      <label htmlFor="name">Name:</label>
      <input
	  className='z-50'
        type="text"
        id="name"
        name="name"
        value={formState.name}
        onChange={handleInputChange}
      />
      <label htmlFor="email">Email:</label>
      <input
	  className='z-50'
        type="email"
        id="email"
        name="email"
        value={formState.email}
        onChange={handleInputChange}
      />
      <label htmlFor="option">Option:</label>
      <select
	  className='z-50'
        id="option"
        name="option"
        value={formState.option}
        onChange={handleInputChange}
      >
        <option value="">-- Please choose an option --</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
        <option value="option4">Option 4</option>
        <option value="option5">Option 5</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
};

export default BookTasterFrom;

