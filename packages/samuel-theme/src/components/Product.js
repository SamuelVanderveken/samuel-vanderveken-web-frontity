import React from "react";
import { connect } from "frontity";

const Product = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const page = state.source[data.type][data.id];
  const Html2React = libraries.html2react.Component;

  return <div>product</div>;
};

export default connect(Product);
