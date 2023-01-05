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
      className="absolute flex flex-col right-20 bottom-0 mb-3 mr-3 bg-black/75 border-2 rounded-md border-lightGold  
	  p-2 pl-5 w-1/3 h-72 justify-evenly text-gray-50  "
      onSubmit={handleSubmit}
    >
      <h1 className="pt-1 pb-2">Book Your Free Taster</h1>
      <div className="flex flex-row">
        <label className="w-32" htmlFor="Fname">
          First name:
        </label>
        <input
          className="text-black"
          type="email"
          id="Fname"
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
          className="text-black"
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
          className="text-black"
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-row">
        <label className="w-32" htmlFor="option">
          Location:
        </label>
        <select
          className="w-48 text-black"
          id="option"
          name="option"
          value={formState.option}
          onChange={handleInputChange}
        >
          <option value="">Choose a choir</option>
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
          <option value="option4">Option 4</option>
          <option value="option5">Option 5</option>
        </select>
      </div>
      <button
        className="w-1/3 h-10 ml-32 rounded-md border-lightGoldmd bg-transparent border-2 border-lightGold 
		hover:bg-lightGold hover:text-black transition-colors duration-500"
        type="submit"
      >
        BOOK NOW
      </button>
    </form>
  );
};

export default BookTasterFrom;
