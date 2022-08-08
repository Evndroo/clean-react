import React, { useContext } from "react";
import Styles from "./form-status-styles.scss";
import { FormContext } from "@/presentation/context";
import { Spinner } from "@/presentation/components";

const FormStatus: React.FC = () => {
  const { formData, errorData } = useContext(FormContext);

  return (
    <div data-testid="errorWrapper" className={Styles.formStatus}>
      {formData.isLoading && <Spinner className={Styles.spinner} />}
      {errorData.form && <span className={Styles.error}>{errorData.form}</span>}
    </div>
  );
};

export default FormStatus;
