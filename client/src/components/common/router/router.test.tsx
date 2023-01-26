import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { Router } from "./index";

describe("Test react-router-dom", () => {
  test("Renders lazy component", async () => {
    render(
      <MemoryRouter>
        <Router />
      </MemoryRouter>
    );

    await waitFor(() =>
      expect(screen.getByTestId("main-page")).toBeInTheDocument()
    );
    const mainLink = screen.getByTestId("main-link");
    // const testLink = screen.getByTestId("test-link");
    screen.debug();
    // userEvent.click(testLink);
    // expect(screen.getByTestId("test-page")).toBeInTheDocument();
    userEvent.click(mainLink);
    expect(screen.getByTestId("main-page")).toBeInTheDocument();
    screen.debug();
  });
});
