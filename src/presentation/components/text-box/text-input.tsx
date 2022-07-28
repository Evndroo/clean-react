import React from "react";
import Styles from "./text-input-styles.scss";

type Props = {
  type: string;
  name: string;
  placeholder: string;
  status: boolean;
};

const TextInput: React.FC<Props> = (props) => {
  const { type, name, placeholder, status } = props;
  return (
    <div className={Styles.inputWrapper}>
      <input type={type} name={name} placeholder={placeholder} />
      <span className={Styles.status}>{status ? "🟢" : "🔴"}</span>
    </div>
  );
};

export default TextInput;
