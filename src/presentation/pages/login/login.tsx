import React, { useEffect, useState } from "react";
import Styles from "./login-styles.scss";
import { FormContext } from "@/presentation/context";
import { Validation } from "@/presentation/protocols/validation";

import {
  LoginHeader,
  Footer,
  FormStatus,
  TextInput,
} from "@/presentation/components";

type LoginProps = {
  validation?: Validation;
};

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const { validation } = props;

  const [formData, setFormData] = useState({
    isLoading: false,
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
    formError: "",
  });

  useEffect(() => {
    setFormData({
      ...formData,
      emailError: validation.validate("email", formData.email),
      passwordError: validation.validate("password", formData.password),
    });
  }, [formData.email, formData.password]);

  const handleClick = () => {
    setFormData({
      ...formData,
      isLoading: true,
    });
  };

  return (
    <div className={Styles.login}>
      <LoginHeader />
      <FormContext.Provider value={{ formData, setFormData }}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <TextInput
            placeholder="Digite seu e-mail"
            name="email"
            type="email"
          />
          <TextInput
            placeholder="Digite sua senha"
            type="password"
            name="password"
          />
          <button
            className={Styles.submit}
            disabled={!!formData.emailError || !!formData.passwordError}
            onClick={handleClick}
            type="submit"
          >
            Entrar
          </button>
          <span className={Styles.link}>Cadastre-se</span>
          <FormStatus />
        </form>
      </FormContext.Provider>
      <Footer />
    </div>
  );
};

export default Login;
