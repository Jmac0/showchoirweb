import React, { useState } from 'react';
import useHttp from './hooks/useHttp';
import { LoadingBtn } from './LoadingBtn/LoadingBtn';
type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  option: string;
};
const BookTasterFrom: React.FC = () => {
  const initailFormState: FormState = {
    firstName: '',
    lastName: '',
    email: '',
    option: '',
  };
  const [formState, setFormState] = useState<FormState>(initailFormState);

  const { loading, setLoading, sendRequest } = useHttp({
    url: '/api/mailchimpAddProspect',
    method: 'POST',
    withCredentials: false,
  });
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
	console.log(formState)
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendRequest(formState);
    setFormState(initailFormState);
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
          type="text"
          id="first_name"
          name="firstName"
          value={formState.firstName}
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
          name="lastName"
          value={formState.lastName}
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
	<LoadingBtn text={"Book Now"} loading={loading} />
    </form>
  );
};

export default BookTasterFrom;
