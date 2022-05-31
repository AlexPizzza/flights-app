import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction
} from '@reduxjs/toolkit';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from '../../store';
import {
  checkIsUserFirstTime,
  deleteIsUserFirstTime,
  setIsUserFirstTimeToFalse
} from './user.actions';
import { Currency, UserState } from './user.interfaces';

const initialState: UserState = {
  currencies: null,
  currentCurrency: null,
  isUserFirstTime: true,
  userLocation: null,
  userAppRating: null
};

export const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCurrentCurrency: (
      state: WritableDraft<UserState>,
      action: PayloadAction<Currency>
    ) => {
      state.currentCurrency = action.payload;
    },
    setUserLocation: (
      state: WritableDraft<UserState>,
      action: PayloadAction<string>
    ) => {
      state.userLocation = action.payload;
    },
    setUserRating: (
      state: WritableDraft<UserState>,
      action: PayloadAction<number>
    ) => {
      state.userAppRating = action.payload;
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<UserState>) {
    builder
      .addCase(
        checkIsUserFirstTime.fulfilled,
        (
          state: WritableDraft<UserState>,
          action: PayloadAction<string | null>
        ) => {
          if (action.payload !== null) {
            state.isUserFirstTime = JSON.parse(action.payload);
          }
        }
      )
      .addCase(
        checkIsUserFirstTime.rejected,
        (state: WritableDraft<UserState>) => {
          state.isUserFirstTime = true;
        }
      );

    builder
      .addCase(
        deleteIsUserFirstTime.fulfilled,
        (state: WritableDraft<UserState>) => {
          state.isUserFirstTime = true;
        }
      )
      .addCase(
        deleteIsUserFirstTime.rejected,
        (state: WritableDraft<UserState>) => {
          state.isUserFirstTime = true;
        }
      );

    builder
      .addCase(
        setIsUserFirstTimeToFalse.fulfilled,
        (state: WritableDraft<UserState>) => {
          state.isUserFirstTime = false;
        }
      )
      .addCase(
        setIsUserFirstTimeToFalse.rejected,
        (state: WritableDraft<UserState>) => {
          state.isUserFirstTime = true;
        }
      );
  }
});

const { actions, reducer } = userSlice;

export const { setCurrentCurrency, setUserLocation, setUserRating } = actions;

export const selectIsUserFirstTime = (state: RootState) =>
  state.user.isUserFirstTime;
export const selectCurrentCurrency = (state: RootState) =>
  state.user.currentCurrency;
export const selectUserAppRating = (state: RootState) =>
  state.user.userAppRating;

export default reducer;
