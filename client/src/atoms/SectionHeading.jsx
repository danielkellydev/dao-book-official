import React from "react";

function SectionHeading({ isH1, sectionText }) {
  let tagType;
  if (isH1) {
    tagType = "h1";
  } else {
    tagType = "p";
  }
  const sectionHeadingElement = React.createElement(tagType, null, sectionText);
  return sectionHeadingElement;
}

export default SectionHeading;
