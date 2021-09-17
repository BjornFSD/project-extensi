import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

test("renders app", () => {
  render(<App />);

  expect(screen.getByTestId("test_app")).toBeInTheDocument();
  expect(screen.getByRole("button")).toBeInTheDocument();
});
