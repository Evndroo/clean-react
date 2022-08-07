import { createContext } from "react";

export type FormContextType = {
  isLoading: boolean;
  errorMessage?: string;
};

export const FormContext = createContext<FormContextType>(null);
