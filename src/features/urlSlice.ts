import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { hydrate } from '../store/store';
//
import type { AppState } from '../store/store';
import type { PageItem } from '../../types';

type initialState = {
  urls: PageItem[];
};

// create a type to fix payload typescript error, in builder
const initialState: initialState = {
  urls: [],
};
// the slice takes care of the reducer, actions and immutable state
const profileSlice = createSlice({
  name: 'url',
  initialState,
  reducers: {
    setUrlData: (state, action: PayloadAction<PageItem[]>) => {
      state.urls = action.payload;
    },
  },

  extraReducers: (builder) => {
    // watch for hydrate action from getStaticProps etc
    builder.addCase(hydrate, (state, action) => {
      // If not data needed in server side action return state as is on client
      if (!action.payload.url.urls.length) {
        return state;
      }
      state.urls = action.payload.url.urls;
    });
  },
});
// export the reducer
export default profileSlice.reducer;
export const { setUrlData } = profileSlice.actions;
// selector function to make shorter work of useSelector throughout app
export const selectUrls = (state: AppState) => state.url.urls;
