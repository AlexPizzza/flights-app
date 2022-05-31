import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { FirebaseError } from 'firebase/app';
import {
  signInWithEmailAndPassword,
  signOut,
  UserCredential
} from 'firebase/auth';
import { auth } from '../../../config/firebase';
import { AuthData } from './auth.interfaces';

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
