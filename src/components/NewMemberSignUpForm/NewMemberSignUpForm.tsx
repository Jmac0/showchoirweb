import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Simulate } from 'react-dom/test-utils';
import submit = Simulate.submit;

function NewMemberSignUpForm() {
  const [ageConfirm, setAgeConfirm] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const { register, handleSubmit } = useForm();

  type NewMemberFormState = {
    phoneNumber: any;
    postCode: any;
    firstName: string;
    lastName: string;
    streetAddress: string;
    townOrCity: string;
    county: string;
    email: string;
    ageConfirm: boolean;
    homeChoir: any;
    consent: boolean;
  };

  const initialFormState: NewMemberFormState = {
    firstName: '',
    lastName: '',
    streetAddress: '',
    townOrCity: '',
    county: '',
    postCode: '',
    phoneNumber: '',
    email: '',
    ageConfirm: ageConfirm,
    homeChoir: '',
    consent: false,
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

  const submitForm = (data: any) => {
    console.log(data);
  };

  return (
    <div className="flex flex-col items-center py-1 lg:w-3/4 ">
      <h2>Join The Fun!</h2>
      <form
        onSubmit={handleSubmit(submitForm)}
        className="flex flex-col w-11/12 h-full space-y-6 p-3 text-gray-50 rounded-md border-2 border-lightGold "
      >
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="first_name">
            First name
          </label>
          <input
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="text"
            id="first_name"
            {...register('firstName')}
            value={formState.firstName}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="last_name">
            Last name
          </label>
          <input
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="text"
            id="last_name"
            {...register('lastName')}
            value={formState.lastName}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="street_address">
            Street address
          </label>
          <input
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="text"
            id="street_address"
            {...register('streetAddress')}
            value={formState.streetAddress}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="town_city">
            Town/City
          </label>
          <input
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="text"
            id="town_city"
            {...register('townOrCity')}
            value={formState.townOrCity}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32 " htmlFor="county">
            County
          </label>
          <input
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="text"
            id="county"
            {...register('county')}
            value={formState.county}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32 " htmlFor="post_code">
            Post Code
          </label>
          <input
            className="w-9/12 pl-1 text-sm text-black "
            type="text"
            id="post_code"
            {...register('postCode')}
            value={formState.postCode}
            onChange={handleInputChange}
          />
        </div>

        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32 " htmlFor="phone_number">
            Phone Number
          </label>
          <input
            className="w-9/12 pl-1 text-sm text-black"
            type="number"
            id="phone_number"
            {...register('phoneNumber')}
            value={formState.phoneNumber}
            onChange={handleInputChange}
          />
        </div>
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="email">
            Email : *
          </label>
          <input
            className="w-full md:w-9/12 pl-1 text-sm text-black"
            type="email"
            id="email"
            {...register('email')}
            value={formState.email}
            onChange={handleInputChange}
          />
        </div>
        <p className="text-xs md:w-1/2">
          At Show Choir you can attend any choir any time, but we ask you to
          choose a home choir, so we can update you about any venue changes &
          deliver any products to your home choir for you to pick up.
        </p>
        <div className="my-2 flex flex-col md:flex-row">
          <label className="w-32" htmlFor="home_choir">
            Home Choir : *
          </label>
          <select
            className="w-48 text-black"
            id="home_choir"
            {...register('homeChoir')}
            value={formState.homeChoir}
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
            className=" text-sm text-black mt-1.5 "
            type="checkbox"
            id="ageConfirm"
            {...register('ageConfirm')}
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
            are legally obliged to do so, we never share your information with
            third parties.
          </p>
          <div className="flex flex-row mt-3">
            <label className="mr-4" htmlFor="ageConfirm">
              I agree:*
            </label>
            <input
              className="mt-1.5 "
              type="checkbox"
              id="consent"
              {...register('consent')}
              defaultChecked={termsAndConditions}
              onChange={() => setTermsAndConditions(!termsAndConditions)}
            />
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default NewMemberSignUpForm;
