import React, { useEffect, useState } from "react";
import Styles from "./login-styles.scss";
import { FormContext } from "@/presentation/context";
import { Validation } from "@/protocols/validation";

import {
  LoginHeader,
  Footer,
  FormStatus,
  TextInput,
} from "@/presentation/components";

type LoginProps = {
  validation: Validation;
};

const Login: React.FC<LoginProps> = (props: LoginProps) => {
  const { validation } = props;

  const [formData, setFormData] = useState({
    isLoading: false,
    email: "",
    emailError: "Campo obrigatório",
    password: "",
    passwordError: "Campo obrigatório",
    formError: "",
  });

  useEffect(() => {
    validation.validate({ email: formData.email });
  }, [formData.email]);

  return (
    <div className={Styles.login}>
      <LoginHeader></LoginHeader>
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
          <button className={Styles.submit} disabled type="submit">
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
