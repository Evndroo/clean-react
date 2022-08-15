import React, { useContext } from "react";
import Styles from "./form-status-styles.scss";
import { FormContext } from "@/presentation/context";
import { Spinner } from "@/presentation/components";

const FormStatus: React.FC = () => {
  const { formData } = useContext(FormContext);

  const { isLoading, formError } = formData;

  return (
    <div data-testid="errorWrapper" className={Styles.formStatus}>
      {isLoading && <Spinner className={Styles.spinner} />}
      {formError && <span className={Styles.error}>{formError}</span>}
    </div>
  );
};

export default FormStatus;
