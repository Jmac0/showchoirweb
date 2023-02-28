import React, { useState } from 'react';
function NewMemberSignUpForm() {
  const [ageConfirm, setAgeConfirm] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  type NewMemberFormState = {
    firstName: string;
    lastName: string;
    streetAddress: string;
    townOrCity: string;
    county: string;
    email: string;
    ageConfirm: boolean;
    option: string;
  };

  const initialFormState: NewMemberFormState = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    townOrCity: '',
    county: '',
    email: '',
    ageConfirm: ageConfirm,
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
      <form className="flex flex-col w-11/12 p-3 text-gray-50 rounded-md border-2 border-lightGold ">
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="first_name">
            First name : *
          </label>
          <input
            required={true}
            className="w-full pl-1 text-sm text-black"
            type="text"
            id="first_name"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="last_name">
            Last name : *
          </label>
          <input
            required={true}
            className="w-full pl-1 text-sm text-black"
            type="text"
            id="last_name"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="first_name">
            Street address : *
          </label>
          <input
            required={true}
            className="w-full pl-1 text-sm text-black"
            type="text"
            id="street_address"
            name="streetAddress"
            value={formState.streetAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="first_name">
            Town/City : *
          </label>
          <input
            required={true}
            className="w-full pl-1 text-sm text-black"
            type="text"
            id="town_city"
            name="townOrCity"
            value={formState.townOrCity}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="first_name">
            County : *
          </label>
          <input
            required={true}
            className="w-full pl-1 text-sm text-black"
            type="text"
            id="county"
            name="county"
            value={formState.county}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="email">
            Email : *
          </label>
          <input
            required={true}
            className="w-full pl-1 text-sm text-black"
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="option">
            Home Choir : *
          </label>
          <select
            required={true}
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

        <div className="my-2 flex flex-row items-top">
          <label className="w-28 block mt-0" htmlFor="ageConfirm">
            I am over 18 *
          </label>
          <input
            required={true}
            className=" text-sm text-black mt-1.5 "
            type="checkbox"
            id="ageConfirm"
            name="ageConfirm"
            defaultChecked={ageConfirm}
            onChange={() => setAgeConfirm(!ageConfirm)}
          />
        </div>
        <div className="my-2 flex flex-row items-top">
          <label className="mr-4" htmlFor="ageConfirm">
            I agree to the terms and conditions *
          </label>
          <input
            required={true}
            className="mt-1.5 "
            type="checkbox"
            id="ageConfirm"
            name="ageConfirm"
            defaultChecked={termsAndConditions}
            onChange={() => setTermsAndConditions(!termsAndConditions)}
          />
        </div>
      </form>
    </div>
  );
}

export default NewMemberSignUpForm;
