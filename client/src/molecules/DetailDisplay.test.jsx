import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DetailDisplay from "./DetailDisplay";

describe("Detail Display", () => {
  it("shows the props it's given", () => {
    render(
      <DetailDisplay
        labelText={"Test label"}
        valueText={"Test value"}
      />
    );
    expect(screen.getByText("Test label")).toBeInTheDocument();
    expect(screen.getByText("Test value")).toBeInTheDocument();
  });
});
