import { createContext } from "react";

type FormData = {
  isLoading: boolean;
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  formError: string;
};

export type FormContextType = {
  formData: FormData;
  setFormData: (formData: FormData) => void;
};

export const FormContext = createContext<FormContextType>(null);
