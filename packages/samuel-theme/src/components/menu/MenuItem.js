import React, { useEffect } from "react";
import { keyframes, styled, connect } from "frontity";
import Link from "@frontity/components/link";
import Contact from "../Contact";
import Expo from "../Expo";

const MenuItem = ({ slug, isOpen, children, title, state, actions }) => {
  const toggleIsOpen = (e) => {
    const currentUrlString = `/${slug}/`;
    if (isOpen && currentUrlString === state.router.link) {
      actions.router.set("/");
    }
    // setTimeout(() => {
    //   const element = document.getElementById(`${slug}`);
    //   //const y = element.getBoundingClientRect().top + window.pageYOffset + -10;
    //   const y = element.offsetTop + window.pageYOffset + -10;
    //   document.getElementById("root").scrollTo({ top: y, behavior: "smooth" });
    // }, 150);
  };

  return (
    <MenuItemContentWrap key={slug}>
      <Link
        onClick={(e) => {
          toggleIsOpen(e);
        }}
        link={`/${slug}`}
        state={{ slug }}
        className={`MenuYearButton ${isOpen ? "Open" : ""}`}
        id={slug}
      >
        {title}
      </Link>
      {isOpen && (
        <div
          // id="single-page-content"
          className={`content ${isOpen ? "border" : ""}`}
        >
          {children}

          {slug === "contact" && <Contact />}
          {slug === "expo" && <Expo />}
        </div>
      )}
    </MenuItemContentWrap>
  );
};

export default connect(MenuItem);

const SkeletonLoading = keyframes`
  0% {
    background-color: hsl(200, 0%, 95%);
  }
  100% {
    background-color: hsl(200, 0%, 85%);
  }
`;

const MenuItemContentWrap = styled.div`
  .skeleton {
    animation: ${SkeletonLoading} 1s linear infinite alternate;
  }

  & .content.border,
  &.border {
    border: 1px solid black;
  }

  &.border {
    border-bottom-color: transparent;

    &:last-of-type {
      border-bottom-color: black;
    }
    & > .title {
      border: none !important;
    }
  }

  & .content {
    padding: 20px;
    font-size: 13px;

    & ul li > ul {
      padding-left: 10px;
    }

    & > ul {
      margin-bottom: 20px;
    }

    & strong {
      display: inline-block;
    }
  }
`;
