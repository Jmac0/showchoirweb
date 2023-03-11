import { configureStore, ThunkAction, createAction } from '@reduxjs/toolkit';
import urlSlice from '../features/urlSlice';
import newMemberSignUpSlice from "../features/newMemberSignUpSlice";
import { HYDRATE } from 'next-redux-wrapper';
import { createWrapper } from 'next-redux-wrapper';
import { Action } from 'redux';

const makeStore = () =>
  configureStore({
    reducer: {
      url: urlSlice,
		newMemberState: newMemberSignUpSlice
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof makeStore>;
export type AppState = ReturnType<AppStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action
>;
export const wrapper = createWrapper<AppStore>(makeStore, { debug: false });

export const hydrate = createAction<AppState>(HYDRATE);
