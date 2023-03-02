import React, { useState } from 'react';
function NewMemberSignUpForm() {
  const [ageConfirm, setAgeConfirm] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  type NewMemberFormState = {
    postCode: any;
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
    postCode: '',
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
    <div className="flex flex-col items-center w-full md:w-2/3 py-1 h-full ">
      <h2>Join The Fun!</h2>
      <form className="flex flex-col w-11/12 h-full space-y-6 p-3 text-gray-50 rounded-md border-2 border-lightGold ">
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="first_name">
            First name
          </label>
          <input
            required={true}
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="text"
            id="first_name"
            name="firstName"
            value={formState.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="last_name">
            Last name
          </label>
          <input
            required={true}
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="text"
            id="last_name"
            name="lastName"
            value={formState.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="first_name">
            Street address
          </label>
          <input
            required={true}
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="text"
            id="street_address"
            name="streetAddress"
            value={formState.streetAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="first_name">
            Town/City
          </label>
          <input
            required={true}
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="text"
            id="town_city"
            name="townOrCity"
            value={formState.townOrCity}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32 " htmlFor="first_name">
            County
          </label>
          <input
            required={true}
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="text"
            id="county"
            name="county"
            value={formState.county}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32 " htmlFor="first_name">
            Post Code
          </label>
          <input
            required={true}
            className="w-32 pl-1 text-sm text-black md:w-32"
            type="text"
            id="post_code"
            name="postCode"
            value={formState.postCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="email">
            Email : *
          </label>
          <input
            required={true}
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="email"
            id="email"
            name="email"
            value={formState.email}
            onChange={handleInputChange}
          />
        </div>
        <p className="text-xs md:w-1/2">
          At Show Choir you can attend any choir any time, but we ask you to
          choose a home choir so we can update you about any venue changes &
          deliver any product to your home choir for you to pick up.
        </p>
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
        <div className="my-2 flex flex-col items-top">
          <p className="text-xs md:w-1/2">
            Please tick the box below to indicate your consent to Show Choir
            holding your data for the reasons given above. This information is
            collected by Show Choir to enable us to provide services to you. It
            will be added to our customer records and will be retained where we
            are legally obliged to do so, we never share your infomation with
            third parties.
          </p>
          <div className="flex flex-row mt-3">
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
        </div>
      </form>
    </div>
  );
}

export default NewMemberSignUpForm;
