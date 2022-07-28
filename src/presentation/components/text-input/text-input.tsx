import React from "react";
import Styles from "./text-input-styles.scss";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const TextInput: React.FC<Props> = (props) => {
  return (
    <div className={Styles.inputWrapper}>
      <input {...props} />
      <span className={Styles.status}>🔴</span>
    </div>
  );
};

export default TextInput;
