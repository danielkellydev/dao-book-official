import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import DashboardButton from "./DashboardButton";

describe("Dashboard Button", () => {
  it("shows the button text", () => {
    render(<DashboardButton buttonText="Test String"></DashboardButton>);
    expect(screen.getByText("Test String")).toBeInTheDocument();
  });

  it("calls the callback it's given", () => {
    const clickHandler = vi.fn();

    render(
      <DashboardButton
        buttonText="Test String"
        onClick={clickHandler}
      ></DashboardButton>
    );

    fireEvent.click(screen.getByText("Test String"));

    expect(clickHandler).toHaveBeenCalledTimes(1);
  });
});
