import React from "react";
import { connect, css, styled } from "frontity";

import Socials from "./Socials";

const Footer = ({ state, actions }) => {
  const data = state.source.get(state.router.link);

  return (
    <>
      <FooterWrap isPostType={data.isPostType} isPage={data.isPage}>
        <FooterContent>
          {/* <h1 className={state.theme.red ? "red" : ""}>footer</h1> */}
          <Socials />
        </FooterContent>
      </FooterWrap>
    </>
  );
};

export default connect(Footer);

const FooterWrap = styled.footer`
  background-color: black;
  color: white;
  min-height: 350px;

  h1 {
    color: white;
  }
`;

const FooterContent = styled.div`
  // max-width: 800px;
  padding: 30px;
  margin: auto;
`;
