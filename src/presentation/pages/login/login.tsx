import React from "react";
import Styles from "./login-styles.scss";
import { Spinner, LoginHeader, Footer } from "@/presentation/components";
import TextInput from "@/presentation/components/text-box/text-input";

const Login: React.FC = () => {
  return (
    <div className={Styles.login}>
      <LoginHeader></LoginHeader>
      <form className={Styles.form}>
        <h2>Login</h2>
        <TextInput
          placeholder="Digite seu e-mail"
          name="email"
          type="email"
          status={false}
        />
        <TextInput
          placeholder="Digite sua senha"
          type="password"
          name="password"
          status={false}
        />
        <button className={Styles.submit} type="submit">
          Entrar
        </button>
        <span className={Styles.link}>Cadastre-se</span>
        <div className={Styles.errorWrapper}>
          <Spinner className={Styles.spinner} />
          <span className={Styles.error}>Erro</span>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
