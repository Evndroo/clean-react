import React, { useState } from "react";
import Styles from "./login-styles.scss";
import { FormContext, FormContextType } from "@/presentation/context";

import {
  LoginHeader,
  Footer,
  FormStatus,
  TextInput,
} from "@/presentation/components";

const Login: React.FC = () => {
  const [formData] = useState({
    isLoading: false,
  });
  const [errorData] = useState({
    email: "Campo obrigatório",
    password: "Campo obrigatório",
    form: "",
  });

  return (
    <div className={Styles.login}>
      <LoginHeader></LoginHeader>
      <FormContext.Provider value={{ errorData, formData }}>
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
