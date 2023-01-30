import React, { useEffect, useState } from 'react';
import useHttp from '../hooks/useHttp';
import { LoadingBtn } from '../LoadingBtn/LoadingBtn';
import { UserMessage } from '../UserMessage/UserMessage';
type FormState = {
  firstName: string;
  lastName: string;
  email: string;
  option: string;
};

const initailFormState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  option: '',
};
const BookTasterFrom: React.FC = () => {
  // destructure values from useHttp
  const {
    loading,
    message,
    //    setMessage,
    setLoading,
    sendRequest,
    showUserMessage,
    setShowUserMessage,
    isErrorMessage,
    //   setIsErrorMessage,
  } = useHttp({
    url: '/api/mailchimpAddProspect',
    method: 'POST',
    withCredentials: false,
  });

  // state to disable submit button
  const [disableBtn, setDisableBtn] = useState(false);
  const [formState, setFormState] = useState<FormState>(initailFormState);
  // regex to check for .ru email addresses
  // Only reset form if no error
  useEffect(() => {
    if (!isErrorMessage) setFormState(initailFormState);
  }, [isErrorMessage]);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setShowUserMessage(false);
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    sendRequest(formState);
  };
  return (
    <form
      className="absolute flex flex-col md:right-20 md:bottom-2 mr-3 bg-black/75 border-2 rounded-md border-lightGold  
	  p-2 pl-5 w-1/3  justify-evenly text-gray-50 "
      onSubmit={handleSubmit}
    >
      <h1 className="pt-1 pb-1">Book Your Free Taster</h1>
      <div className="flex flex-row my-2">
        <label className="w-32" htmlFor="first_name">
          First name:
        </label>
        <input
          className="text-black text-sm w-6/12 pl-1"
          type="text"
          id="first_name"
          name="firstName"
          value={formState.firstName}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-row my-2">
        <label className="w-32" htmlFor="last_name">
          Last name:
        </label>
        <input
          className="text-black text-sm w-6/12 pl-1"
          type="text"
          id="last_name"
          name="lastName"
          value={formState.lastName}
          onChange={handleInputChange}
        />
      </div>

      <div className="flex flex-row my-2">
        <label className="w-32" htmlFor="email">
          Email:
        </label>
        <input
          className="text-black text-sm w-6/12 pl-1"
          type="email"
          id="email"
          name="email"
          value={formState.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="flex flex-row my-2">
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
      <LoadingBtn disableBtn={disableBtn} text={'Book Now'} loading={loading} />
      <UserMessage
        message={message}
        isError={isErrorMessage}
        showMessage={showUserMessage}
      />
    </form>
  );
};

export default BookTasterFrom;
