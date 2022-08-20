import { ReactNode } from "react";

export interface DecodedUserToken {
  id: string;
  email?: string;
}

interface Credentials {
  email: string;
  password: string;
}

interface RegisterCredentials extends Credentials {
  token: string;
  passwordConfirmation: string;
}

export interface UserContextProps {
  signIn: (credentails: Credentials) => Promise<void>;
  signUp: (credentails: RegisterCredentials) => Promise<void>;
  signOut: () => Promise<void>;
  userId?: string;
  // currentUser?: User;
  // refetch?: Dispatch<SetStateAction<boolean>>;
  // isFetching?: boolean;
}

export interface UserContextProviderProps {
  children: ReactNode;
}
