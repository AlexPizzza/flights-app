import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  PayloadAction,
  SerializedError
} from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from 'firebase/auth';
import { WritableDraft } from 'immer/dist/internal';
import { auth } from '../../../config/firebase';
import { RootState } from '../../store';
import { AuthStatus } from './auth.enums';
import { AuthData, AuthState } from './auth.interfaces';

const initialState: AuthState = {
  token: null,
  status: AuthStatus.idle,
  error: null
};

export const userSignIn = createAsyncThunk(
  'signIn',
  async (data: AuthData): Promise<string | FirebaseError> => {
    const { email, password } = data;
    return signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: UserCredential) =>
        userCredential.user.getIdToken()
      )
      .then((idToken) => {
        AsyncStorage.setItem('token', idToken)
          .then(() => {
            console.log('set token');
          })
          .catch((error: any) => console.error(error));

        return idToken;
      })
      .catch((error: FirebaseError) => error);
  }
);

export const userSignOut = createAsyncThunk(
  'signOut',
  async (): Promise<void> => {
    return signOut(auth)
      .then(() =>
        AsyncStorage.removeItem('token')
          .then(() => {
            console.log('remove token');
          })
          .catch((error: any) => console.error(error))
      )
      .catch((error: any) => console.error(error));
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (
      state: WritableDraft<AuthState>,
      action: PayloadAction<string>
    ) => {
      state.token = action.payload;
    },
    clearToken: (state: WritableDraft<AuthState>) => {
      state.token = '';
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<AuthState>) {
    type FirebaseUnknown = unknown;

    type FirebaseRejected = {
      arg: AuthData;
      requestId: string;
      requestStatus: 'rejected';
      aborted: boolean;
      condition: boolean;
    };

    type RejectedWithValue =
      | {
          rejectedWithValue: true;
        }
      | ({
          rejectedWithValue: false;
        } & {});

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
            console.log('token received', action.payload);

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
            FirebaseRejected & RejectedWithValue,
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
        state.status = AuthStatus.loading;
        state.error = null;
      })
      .addCase(
        userSignOut.fulfilled,
        (
          state: WritableDraft<AuthState>,
          action: PayloadAction<
            void,
            string,
            { arg: void; requestId: string; requestStatus: 'fulfilled' },
            never
          >
        ) => {
          state.token = null;
          state.status = AuthStatus.succeeded;
          state.error = null;
        }
      )
      .addCase(
        userSignOut.rejected,
        (
          state: WritableDraft<AuthState>,
          action: PayloadAction<
            unknown,
            string,
            {
              arg: void;
              requestId: string;
              requestStatus: 'rejected';
              aborted: boolean;
              condition: boolean;
            } & (
              | { rejectedWithValue: true }
              | ({ rejectedWithValue: false } & {})
            ),
            SerializedError
          >
        ) => {
          state.error = action.error.message;
          state.status = AuthStatus.failed;
        }
      );
  }
});

const { actions, reducer } = authSlice;

export const { setToken, clearToken } = actions;

export const selectToken = (state: RootState) => state.auth.token;
export const selectStatus = (state: RootState) => state.auth.status;
export const selectError = (state: RootState) => state.auth.error;

export default reducer;
