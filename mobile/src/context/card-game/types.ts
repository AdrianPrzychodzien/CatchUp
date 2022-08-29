import { ReactNode } from "react";

export interface CardGameContextProviderProps {
  children: ReactNode;
  withoutSave?: boolean;
}

export interface CardGameContextProps {
  withoutSave?: boolean;
}
