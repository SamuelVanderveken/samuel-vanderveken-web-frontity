import React, { useEffect } from "react";

import { connect, Global, css, styled, Head } from "frontity";
// import {useDispatch} from 'react-redux';
// import BackToTop from '../components/BackToTop';

import Header from "../components/Header";
import Menu from "../components/menu/Menu";

import PageCss from "./Page.css";

const App = (props) => {
  useEffect(() => {
    const element = document.getElementById("root");
    if (!element.classList.contains("scroll")) {
      element.classList.add("scroll");
    }
  }, []);

  useEffect(() => {
    document.addEventListener("touchmove", preventScale, false);
    return () => {
      document.removeEventListener("touchmove", preventScale, false);
    };
  }, []);

  const preventScale = (event) => {
    if (event.scale !== 1) {
      event.preventDefault();
    }
  };

  // useEffect(() => {
  //   dispatch(setAllArticles());
  // }, [dispatch]);

  return (
    <>
      <Global styles={css(PageCss)} />
      <div className="Wrap">
        <div className="WrapMenuView">
          <Header />
          <Menu children={props.children} />
        </div>
        {/* <BackToTop /> */}
      </div>
    </>
  );
};

export default connect(App);
