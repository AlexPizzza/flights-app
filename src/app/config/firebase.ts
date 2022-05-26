// @ts-nocheck

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import firebaseAuth from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID
} from 'react-native-dotenv';

// Your app's Firebase configuration
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = firebaseAuth;
export const db = getFirestore(app);
