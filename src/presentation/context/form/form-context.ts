import { createContext } from "react";

export type FormContextType = {
  formData: {
    isLoading: boolean;
  };
  errorData: {
    email: string;
    password: string;
    form: string;
  };
};

export const FormContext = createContext<FormContextType>(null);
