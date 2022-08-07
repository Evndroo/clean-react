import React, { useContext } from "react";
import Styles from "./form-status-styles.scss";
import { FormContext } from "@/presentation/context";
import { Spinner } from "@/presentation/components";

const FormStatus: React.FC = () => {
  const { isLoading, errorMessage } = useContext(FormContext);

  return (
    <div data-testid="errorWrapper" className={Styles.formStatus}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {errorMessage && <span className={Styles.error}>{errorMessage}</span>}
    </div>
  );
};

export default FormStatus;
