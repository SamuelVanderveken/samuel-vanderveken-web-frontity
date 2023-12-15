import React from "react";

import { styled, connect } from "frontity";

// import './Socials.css';

const Socials = () => {
  return (
    <SocialsWrapper>
      {/* <li>
        <a
          className="smoelboek"
          target="blank"
          href="https://www.facebook.com/samuelvanderveken">
          <image src="" />
        </a>
      </li> */}
      <li>
        <a
          className="flapper"
          target="blank"
          href="http://droomerland.tumblr.com"
        >
          <image src="" />
        </a>
      </li>
      <li>
        <a
          className="koffie"
          target="blank"
          href="https://instagram.com/svanderveken/"
        >
          <image src="" />
        </a>
      </li>
      <li>
        <a
          className="probleem"
          target="blank"
          href="https://issuu.com/samuelvanderveken"
        >
          <image src="" />
        </a>
      </li>
    </SocialsWrapper>
  );
};

export default connect(Socials);

import smoelboek from "../assets/smoelboek.png";
import flapper from "../assets/flapper.png";
import koffie from "../assets/koffie.png";
import probleem from "../assets/probleem.png";
import filter from "../assets/filters.svg";

const SocialsWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  // justify-content: flex-end;
  justify-content: flex-start;

  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    opacity: 0.5;
    width: 30px;
    height: 30px;
    display: inline-block;
    padding: 2px;
    margin-left: 7px;
    background-size: 100% 100%;
    filter: url(${filter});
    filter: black;
    -webkit-filter: grayscale(1);
    -moz-transition: all 0.2s ease-out;
    -o-transition: all 0.2s ease-out;
    transition: all 0.2s ease-out;

    &:hover {
      filter: grayscale(0%);
      -webkit-filter: grayscale(0%);
      filter: none;
      opacity: 1;
    }
  }

  .smoelboek {
    background-image: url(${smoelboek});
  }

  .flapper {
    background-image: url(${flapper});
  }

  .koffie {
    background-image: url(${koffie});
  }

  .probleem {
    background-image: url(${probleem});
  }
`;
