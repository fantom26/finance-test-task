import { render, screen } from "@testing-library/react";
import Home from "./pages/home";

describe("Show charts", () => {
  test("Show charts after clicking", () => {
    render(<Home />);
    const MultipleSelectElem = screen.queryByTestId("multiple-select-on-home");
    expect(MultipleSelectElem).toBeInTheDocument();
  });
});
