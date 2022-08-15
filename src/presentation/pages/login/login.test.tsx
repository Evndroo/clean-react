import * as React from "react";
import Login from "./login";
import { faker } from "@faker-js/faker";
import { Validation } from "@/protocols/validation";
import {
  cleanup,
  fireEvent,
  render,
  RenderResult,
  screen,
} from "@testing-library/react";

type SutType = {
  sut: RenderResult;
  validationSpy: ValidationSpy;
};

class ValidationSpy implements Validation {
  errorMessage: string;
  input: object;

  validate(input: object): string {
    this.input = input;
    return this.errorMessage;
  }
}

const makeSut = (): SutType => {
  const validationSpy = new ValidationSpy();
  const sut = render(<Login validation={validationSpy} />);
  return {
    sut,
    validationSpy,
  };
};

describe("Login Component", () => {
  afterEach(cleanup);

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

  it("should call validation with correct values when email changes", () => {
    const emailStub = faker.internet.email();
    const { validationSpy } = makeSut();
    const emailInput = screen.getByPlaceholderText(
      "Digite seu e-mail"
    ) as HTMLInputElement;

    fireEvent.input(emailInput, { target: { value: emailStub } });

    expect(validationSpy.input).toEqual({ email: emailStub });
  });

  it("should call validation with correct values when password changes", () => {
    const passwordStub = faker.internet.userName();
    const { validationSpy } = makeSut();
    const passwordInput = screen.getByPlaceholderText(
      "Digite sua senha"
    ) as HTMLInputElement;

    fireEvent.input(passwordInput, { target: { value: passwordStub } });

    expect(validationSpy.input).toEqual({ password: passwordStub });
  });
});
