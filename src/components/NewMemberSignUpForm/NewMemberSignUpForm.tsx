import React, { useState } from 'react';
function NewMemberSignUpForm() {
  type NewMemberFormState = {
    firstName: string;
    lastName: string;
    email: string;
    option: string;
  };

  const initialFormState: NewMemberFormState = {
    firstName: '',
    lastName: '',
    email: '',
    option: '',
  };
  const [formState, setFormState] =
    useState<NewMemberFormState>(initialFormState);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col items-center w-full py-1 h-full ">
      <h2>Join The Fun!</h2>
      <form className="relative flex flex-col w-11/12 text-gray-50">
        <div className="my-2 flex flex-row">
          <label className="w-32" htmlFor="first_name">
            First name:
          </label>
          <input
            className="w-6/12 pl-1 text-sm text-black"
            type="text"
            id="first_name"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-row">
          <label className="w-32" htmlFor="last_name">
            Last name:
          </label>
          <input
            className="w-6/12 pl-1 text-sm text-black"
            type="text"
            id="last_name"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-row">
          <label className="w-32" htmlFor="email">
            Email:
          </label>
          <input
            className="w-6/12 pl-1 text-sm text-black"
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-2 flex flex-row">
          <label className="w-32" htmlFor="option">
            Home Choir:
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
      </form>
    </div>
  );
}

export default NewMemberSignUpForm;
