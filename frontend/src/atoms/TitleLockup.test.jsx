import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import TitleLockup from "./TitleLockup";

describe("Title Lockup", () => {
  it("shows the title text", () => {
    render(<TitleLockup></TitleLockup>);
    expect(screen.getByText("Dao Book")).toBeInTheDocument();
  });

  it("correctly resizes h1", () => {
    render(<TitleLockup isSmall={true}></TitleLockup>);
    expect(screen.getByText("Dao Book")).toHaveClass("text-7xl");
  });

  it("shows the light theme", () => {
    render(
      <TitleLockup
        theme="light"
        isSubtitled={true}
      ></TitleLockup>
    );
    expect(screen.getByText("Dao Book")).toHaveClass("text-white");
  });

  it("shows the dark theme", () => {
    render(
      <TitleLockup
        theme="dark"
        isSubtitled={true}
      ></TitleLockup>
    );
    expect(screen.getByText("Dao Book")).toHaveClass("text-black");
  });

  it("shows the subtitle", () => {
    render(<TitleLockup isSubtitled={true}></TitleLockup>);
    expect(screen.getByText("The way of clinic notes")).toBeInTheDocument();
  });
});
