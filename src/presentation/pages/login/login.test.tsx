import Login from "./login";
import React from "react";
import { faker } from "@faker-js/faker";
import { ValidationStub } from "@/presentation/test";
import {
  render,
  fireEvent,
  cleanup,
  screen,
} from "@testing-library/react";

type SutParams = {
  validationError: string;
};

const makeSut = (params?: SutParams) => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;
  render(<Login validation={validationStub} />);
};

describe("Login Component", () => {
  afterEach(cleanup);

  it("should render correctly with initial behavior", () => {
    const validationError = faker.random.word();
    makeSut({
      validationError,
    });

    const errorWrapper = screen.getByTestId("errorWrapper");
    expect(errorWrapper.childElementCount).toBe(0);

    const submitButton = screen.getByText("Entrar") as HTMLButtonElement;
    expect(submitButton.disabled).toBeTruthy();

    const emailStatus = screen.getByTestId("email-status");
    expect(emailStatus.textContent).toBe("🔴");
    expect(emailStatus.title).toBe(validationError);

    const passwordStatus = screen.getByTestId("password-status");
    expect(passwordStatus.textContent).toBe("🔴");
    expect(passwordStatus.title).toBe(validationError);
  });

  it("should show Login fields errors if Validation fails", () => {
    const validationError = faker.random.word();
    makeSut({
      validationError,
    });

    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = screen.getByTestId("email-status");

    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = screen.getByTestId("password-status");

    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe("🔴");

    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe("🔴");
  });

  it("should show Login fields success if Validation succeed", () => {
    makeSut();

    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });
    const emailStatus = screen.getByTestId("email-status");

    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });
    const passwordStatus = screen.getByTestId("password-status");

    expect(emailStatus.title).toBe("Tudo certo!");
    expect(emailStatus.textContent).toBe("🟢");

    expect(passwordStatus.title).toBe("Tudo certo!");
    expect(passwordStatus.textContent).toBe("🟢");
  });

  it("should enable submit button when form is valid", () => {
    makeSut();

    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    fireEvent.input(emailInput, { target: { value: faker.internet.email() } });

    const passwordInput = screen.getByPlaceholderText("Digite sua senha");
    fireEvent.input(passwordInput, {
      target: { value: faker.internet.password() },
    });

    const submitButton = screen.getByText("Entrar") as HTMLButtonElement;

    expect(submitButton.disabled).toBeFalsy();
  });
});
