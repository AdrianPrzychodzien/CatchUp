import Cookies from "js-cookie";
import React, { useContext, useEffect, useState } from "react";
import { apiSignIn } from "../../api/sign-in";
import { DecodedUserToken, UserContextProps, UserContextProviderProps } from "./types";
// import { useGetUser } from '../../api/use-get-users';

const UserContext = React.createContext<UserContextProps>({
  signIn: (credentials: any) => new Promise(() => {}),
  // currentUser: undefined,
  // refetch: () => null,
  // isFetching: false,
});

const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const tokenRaw = Cookies.get("current_user_session");
  const token: DecodedUserToken | null = tokenRaw ? JSON.parse(tokenRaw) : null;
  const [refetch, setRefetch] = useState(false);

  const userId = token?.id;

  // const { data: currentUser, isFetching } = useGetUser(userId ? { userId } : undefined);

  // useEffect(() => {
  //     if (isFetching) return;

  //     if (currentUser && !currentUser.token) {
  //         Cookies.remove('jwt');
  //         Cookies.remove('current_user_session');
  //     }
  // }, [currentUser, isFetching]);

  const signIn = async ({ email, password }: { email: string; password: string }) => {
    const response = await apiSignIn({ email, password });
    console.log("🚀 ~ response", response);

    const access_token = response.data.access_token;
    console.log("🚀 ~ access_token", access_token);
    const userId = response.data.user.id;

    if (access_token) {
      Cookies.set("jwt", access_token);
      Cookies.set("current_user_session", JSON.stringify({ id: userId }));
      setRefetch(true);
    }
  };

  useEffect(() => {
    if (refetch) setRefetch(false);
  }, [refetch]);

  return (
    <UserContext.Provider
      value={{
        signIn,
        userId,
        // currentUser: isFetching ? (token as any) : currentUser,
        // isFetching,
        // refetch: setRefetch,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUserContext must be used within a UserContextProvider");
  }
  return context;
};

export default UserContextProvider;
