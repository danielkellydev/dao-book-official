import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";

import SectionHeading from "./SectionHeading";

describe("Section Heading", () => {
  it("shows the section text", () => {
    render(<SectionHeading sectionText={"Test String"}></SectionHeading>);
    expect(screen.getByText("Test String")).toBeInTheDocument();
  });

  it("shows the right tag", () => {
    render(
      <>
        <SectionHeading
          sectionText={"Test H1"}
          isH1={true}
        ></SectionHeading>
        <SectionHeading
          sectionText={"Test Paragraph"}
          isH1={false}
        ></SectionHeading>
      </>
    );
    const h1 = screen.getByText("Test H1");
    const paragraph = screen.getByText("Test Paragraph");
    expect(h1.tagName).toBe("H1");
    expect(paragraph.tagName).toBe("P");
  });
});
