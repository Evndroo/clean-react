import React from "react";
import Styles from "./form-status-styles.scss";
import { Spinner } from "@/presentation/components";

type Props = {
  errorMessage: string;
};

const FormStatus: React.FC<Props> = (props) => {
  const { errorMessage } = props;
  return (
    <div className={Styles.formStatus}>
      <Spinner className={Styles.spinner} />
      <span className={Styles.error}>{errorMessage}</span>
    </div>
  );
};

export default FormStatus;
