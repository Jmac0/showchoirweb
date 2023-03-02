import {
	createAsyncThunk,
	createSlice, AsyncThunk,
} from '@reduxjs/toolkit';
import axios from 'axios';


type NewMemberFormState = {
	phoneNumber: number;
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

type InitialState = {
	loading: boolean,
	error: string,
}

const initialState: InitialState = {
  loading: false,
  error: '',
};

// generates pending, fulfilled, and rejected action types
export const newMemberSignUp: any = createAsyncThunk(
  'add/newMemberSignUp',
  async (data: NewMemberFormState, {dispatch, getState, rejectWithValue, fulfillWithValue}) => {

    return axios
      .post(`${process.env.NEXT_PUBLIC_BASE_URL}/api/members/addNewSignUpToDb`, data)
      .then((response) => { response.data
	  console.log(response.data)
	  } )

  },
);
// This must add the response to the action payload ? I guess
const newMemberSignUpSlice = createSlice({
  reducers: {},
  name: 'newMemberState',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(newMemberSignUp.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(newMemberSignUp.fulfilled, (state) => {
	state.loading = false
	state.error = '';


    });

    builder.addCase(newMemberSignUp.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error;
    });
  },
});

export default newMemberSignUpSlice.reducer;
