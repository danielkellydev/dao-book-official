import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import TextLink from "./TextLink";
import { MemoryRouter } from "react-router-dom";

describe("Text Link", () => {
  it("renders without link text", () => {
    render(<TextLink paragraphText={"Some unlinked text"}></TextLink>);
    expect(screen.getByText("Some unlinked text")).toBeInTheDocument();
  });

  it("renders without nonlink text", () => {
    render(
      <MemoryRouter>
        <TextLink
          linkText={"Some link text"}
          linkDestination={"https://example.com"}
        ></TextLink>
      </MemoryRouter>
    );
    expect(screen.getByText("Some link text")).toBeInTheDocument();
  });

  it("renders with all text fields", () => {
    render(
      <MemoryRouter>
        <TextLink
          paragraphText={"Some unlinked text"}
          linkText={"Some link text"}
          linkDestination={"https://example.com"}
        ></TextLink>
      </MemoryRouter>
    );
    expect(screen.getByText("Some unlinked text")).toBeInTheDocument();
    expect(screen.getByText("Some link text")).toBeInTheDocument();
  });
});
