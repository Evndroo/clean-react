import * as React from "react";
import Login from "./login";
import { render, screen } from "@testing-library/react";

describe("Login Component", () => {
  it("should not render spinner and error on first render ", () => {
    render(<Login />);

    const errorWrapper = screen.getByTestId("errorWrapper");

    expect(errorWrapper.childElementCount).toBe(0);
  });
});
