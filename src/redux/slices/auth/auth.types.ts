import { AuthData } from './auth.interfaces';

export type FirebaseUnknown = unknown;

export type FirebaseSignInRejected = {
  arg: AuthData;
  requestId: string;
  requestStatus: 'rejected';
  aborted: boolean;
  condition: boolean;
};

export type FirebaseSignOutRejected = {
  arg: void;
  requestId: string;
  requestStatus: 'rejected';
  aborted: boolean;
  condition: boolean;
};

export type RejectedWithValue =
  | {
      rejectedWithValue: true;
    }
  | ({
      rejectedWithValue: false;
    } & {});
