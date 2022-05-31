import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import { WritableDraft } from 'immer/dist/internal';
import { RootState } from '../../store';
import { userSignIn, userSignOut } from './auth.actions';
import { AuthStatus } from './auth.enums';
import { AuthState } from './auth.interfaces';
import {
  FirebaseSignInRejected,
  FirebaseUnknown,
  RejectedWithValue
} from './auth.types';

const initialState: AuthState = {
  token: null,
  status: AuthStatus.idle,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<AuthState>) {
    builder
      .addCase(userSignIn.pending, (state: WritableDraft<AuthState>) => {
        state.token = null;
        state.status = AuthStatus.loading;
        state.error = null;
      })
      .addCase(
        userSignIn.fulfilled,
        (
          state: WritableDraft<AuthState>,
          action: PayloadAction<string | FirebaseError>
        ) => {
          if (typeof action.payload === 'object') {
            state.status = AuthStatus.failed;
            state.error = action.payload.code;
          } else {
            state.token = action.payload;
            state.status = AuthStatus.succeeded;
            state.error = null;
          }
        }
      )
      .addCase(
        userSignIn.rejected,
        (
          state: WritableDraft<AuthState>,
          action: PayloadAction<
            FirebaseUnknown,
            string,
            FirebaseSignInRejected & RejectedWithValue,
            SerializedError
          >
        ) => {
          state.error = action.error.message;
          state.status = AuthStatus.failed;
        }
      );

    builder
      .addCase(userSignOut.pending, (state: WritableDraft<AuthState>) => {
        state.token = null;
      })
      .addCase(userSignOut.fulfilled, (state: WritableDraft<AuthState>) => {
        state.token = null;
        state.status = AuthStatus.idle;
        state.error = null;
      });
    // .addCase(
    //   userSignOut.rejected,
    //   (
    //     state: WritableDraft<AuthState>,
    //     action: PayloadAction<
    //       FirebaseUnknown,
    //       string,
    //       FirebaseSignOutRejected & RejectedWithValue,
    //       SerializedError
    //     >
    //   ) => {
    //     state.error = action.error.message;
    //     state.status = AuthStatus.failed;
    //   }
    // );
  }
});

const { reducer } = authSlice;

export const selectToken = (state: RootState) => state.auth.token;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectError = (state: RootState) => state.auth.error;

export default reducer;
