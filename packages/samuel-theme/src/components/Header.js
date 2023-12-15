import React from "react";
import { connect, css, styled } from "frontity";
import Link from "@frontity/components/link";

const Header = ({ state, actions }) => {
  const data = state.source.get(state.router.link);

  return (
    <HeaderWrap>
      <Link link="/">
        <h1>{state.frontity.title}</h1>
      </Link>
      {/* <Socials /> */}
    </HeaderWrap>
  );
};

export default connect(Header);

const HeaderWrap = styled.header`
  margin-bottom: 10px;
  font-size: 21px;
  font-family: sans-serif;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 5px solid black;
`;
