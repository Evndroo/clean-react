import * as React from "react";
import Login from "./login";
import { render, RenderResult, screen } from "@testing-library/react";

type SutType = {
  sut: RenderResult;
};

const makeSut = (): SutType => {
  const sut = render(<Login />);
  return {
    sut,
  };
};

describe("Login Component", () => {
  it("should render correctly with initial behavior", () => {
    makeSut();
    const errorWrapper = screen.getByTestId("errorWrapper");
    expect(errorWrapper.childElementCount).toBe(0);

    const submitButton = screen.getByText("Entrar") as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus.textContent).toBe("🔴");
    expect(emailStatus.title).toBe("Campo obrigatório");

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus.textContent).toBe("🔴");
    expect(passwordStatus.title).toBe("Campo obrigatório");
  });
});
