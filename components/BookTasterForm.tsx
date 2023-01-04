import React, { useState } from 'react';

const BookTasterFrom: React.FC = () => {
  const [formState, setFormState] = useState({
    Fname: '',
    Lname: '',
    email: '',
    option: '',
  });

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
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
    <form
      className="absolute flex flex-col left-2/4 top-2/3 bg-black/75 border-2 rounded-md border-lightGold  p-10 w-5/12 h-72 justify-evenly text-gray-50 "
      onSubmit={handleSubmit}
    >
      <div className="flex flex-row">
        <label className="w-32" htmlFor="fname">
          First name:
        </label>
        <input
          type="text"
          id="first_name"
          name="Fname"
          value={formState.Fname}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-row">
        <label className="w-32" htmlFor="last_name">
          Last name:
        </label>
        <input
          type="text"
          id="last_name"
          name="Lname"
          value={formState.Lname}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-row">
        <label className="w-32" htmlFor="email">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
      </div>
      <label htmlFor="option">Option:</label>
      <select
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
