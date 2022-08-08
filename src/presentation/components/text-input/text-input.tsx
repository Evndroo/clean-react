import React, { useContext } from "react";
import Styles from "./text-input-styles.scss";
import { FormContext } from "@/presentation/context";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const TextInput: React.FC<Props> = (props) => {
  const { errorData } = useContext(FormContext);
  const error = errorData[props.name];

  const getStatus = (): string => {
    return "🔴";
  };
  const getTitle = (): string => {
    return error;
  };

  return (
    <div className={Styles.inputWrapper}>
      <input {...props} />
      <span
        data-testid={`${props.name}-status`}
        title={getTitle()}
        className={Styles.status}
      >
        {getStatus()}
      </span>
    </div>
  );
};

export default TextInput;
