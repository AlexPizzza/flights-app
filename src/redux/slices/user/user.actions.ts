import AsyncStorage from '@react-native-async-storage/async-storage';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const checkIsUserFirstTime = createAsyncThunk(
  'checkIsUserFirstTime',
  async (): Promise<string | null> => {
    return AsyncStorage.getItem('isUserFirstTime')
      .then((isUserFirstTime) => {
        console.log('async storage retrieve isUserFirstTime', isUserFirstTime);
        return isUserFirstTime;
      })
      .catch((error: any) => {
        console.error(error);
        return null;
      });
  }
);

export const setIsUserFirstTimeToFalse = createAsyncThunk(
  'setIsUserFirstTime',
  async (): Promise<void> => {
    return AsyncStorage.setItem('isUserFirstTime', JSON.stringify(false))
      .then(() => console.log('async storage set is user first time to false'))
      .catch((error: any) => console.error(error));
  }
);

export const deleteIsUserFirstTime = createAsyncThunk(
  'deleteIsUserFirstTime',
  async (): Promise<void> => {
    return AsyncStorage.removeItem('isUserFirstTime')
      .then(() => console.log('async storage delete isUserFirstTime'))
      .catch((error: any) => console.error(error));
  }
);
