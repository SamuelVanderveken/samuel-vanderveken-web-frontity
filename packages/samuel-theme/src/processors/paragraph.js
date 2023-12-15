import * as React from "react";

const Break = (props) => {
  return <br />;
};

const paragraph = {
  name: "paragraph",
  test: ({ node }) => node.component === "p",
  processor: ({ node }) => {
    if (node.parent?.component === "noscript") return null;

    // replace empty p tags with breaks
    if (node.children?.length === 0) {
      node.component = Break;
    }

    return node;
  },
};

export default paragraph;
