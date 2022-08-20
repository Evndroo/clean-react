import React, { ChangeEvent, useContext } from "react";
import Styles from "./text-input-styles.scss";
import { FormContext } from "@/presentation/context";

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

/**
 *
 * When using this component, make sure that the name attribute is equal
 * to the property on errorData object inside the FormContext.
 *
 */
const TextInput: React.FC<Props> = (props) => {
  const { formData, setFormData } = useContext(FormContext);
  const error = formData[`${props.name}Error`];

  const getStatus = (): string => {
    return error ? "🔴" : "🟢";
  };

  const getTitle = (): string => {
    return error ? error : "Tudo certo!";
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [props.name]: event.target.value,
    });
  };

  return (
    <div className={Styles.inputWrapper}>
      <input {...props} onChange={handleInputChange} />
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
