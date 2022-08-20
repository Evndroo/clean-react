import Login from "./login";
import React from "react";
import { faker } from "@faker-js/faker";
import { ValidationMock } from "@/presentation/test";
import {
  render,
  RenderResult,
  fireEvent,
  cleanup,
  screen,
} from "@testing-library/react";

type SutTypes = {
  sut: RenderResult;
  validationStub: ValidationMock;
};

const makeSut = (): SutTypes => {
  const validationStub = new ValidationMock();
  validationStub.errorMessage = faker.random.word();
  const sut = render(<Login validation={validationStub} />);
  return {
    sut,
    validationStub,
  };
};

describe("Login Component", () => {
  afterEach(cleanup);

  it("should render correctly with initial behavior", () => {
    const { validationStub } = makeSut();

    const errorWrapper = screen.getByTestId("errorWrapper");
    expect(errorWrapper.childElementCount).toBe(0);

    const submitButton = screen.getByText("Entrar") as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus.textContent).toBe("🔴");
    expect(emailStatus.title).toBe(validationStub.errorMessage);

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus.textContent).toBe("🔴");
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
  });

  it("Should show email error if Validation fails", () => {
    const { validationStub } = makeSut();
    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus.title).toBe(validationStub.errorMessage);
    expect(emailStatus.textContent).toBe("🔴");
  });

  it("should show password error if Validation fails", () => {
    const { validationStub } = makeSut();
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus.title).toBe(validationStub.errorMessage);
    expect(passwordStatus.textContent).toBe("🔴");
  });
});
