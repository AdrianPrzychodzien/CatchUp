import { createContext, useContext } from "react";
import { CardGameContextProps, CardGameContextProviderProps } from "./types";

export const CardGameContext = createContext<CardGameContextProps>({
  withoutSave: false,
});

export const CardGameContextProvider = ({
  children,
  withoutSave,
}: CardGameContextProviderProps) => {
  return <CardGameContext.Provider value={{ withoutSave }}>{children}</CardGameContext.Provider>;
};

export const useCardGameContext = () => useContext(CardGameContext);
