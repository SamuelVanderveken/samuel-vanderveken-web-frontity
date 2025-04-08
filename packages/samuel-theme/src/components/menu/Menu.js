import React, { useEffect, useState } from "react";
// import {useLocation} from 'react-router-dom';
import { styled, connect } from "frontity";
import MenuYearBlock from "./MenuYearBlock";
import MenuItem from "./MenuItem";
// import { useSelector } from "react-redux";
// import pdf from '../assets/portfolio.pdf';

const Menu = ({ state, actions, children }) => {
  // const app = useSelector((state) => state.appReducer);
  // const [currentUrl, setCurrentUrl] = useState(null);
  // const [portFolioLink, setPortfolioLink] = useState(null);
  // const [menuItemsByYear, setMenuItemsByYear] = useState([]);

  // const location = useLocation();
  const portFolioLink = state.theme.portfolioLink;
  const menuItemsByYear = state.theme.menu;
  const currentUrl = state.router.link
    ?.split("/")
    .filter((item) => item !== "");

  // useEffect(() => {
  //   const url = state.router.link?.split("/").filter((item) => item !== "");
  //   setCurrentUrl(url);
  // }, [state.router.link]);

  useEffect(() => {
    if (!currentUrl) return;

    let id = "";
    if (currentUrl.length === 0) id = "root";
    else if (currentUrl[0] === "expos") id = currentUrl[1];
    else id = currentUrl[0];

    setTimeout(() => {
      const element = document.getElementById(`${id}`);

      if (element) {
        const y = element.offsetTop + window.scrollY + -10;
        document
          .getElementById("root")
          .scrollTo({ top: y, behavior: "smooth" });
      }
    }, 150);
  }, [currentUrl]);

  // useEffect(() => {
  //   // set portfolio link hackish
  //   const foundPortfolioPage = state.theme.articles.find(
  //     (article) => article.slug === "portfolio-download"
  //   );
  //   if (foundPortfolioPage) {
  //     var regex = /<a.*?href="(.*?)"/;
  //     var src = regex.exec(foundPortfolioPage.content)[1];
  //     if (src) {
  //       setPortfolioLink(src);
  //     }
  //   }
  // }, [state.theme.articles]);

  useEffect(() => {
    // const thisYear = new Date().getFullYear();
    // let sortedByYear = [];
    // for (let i = thisYear; i >= 2008; --i) {
    //   const doesCategoryExcist = state.source.data[
    //     "all-categories/"
    //   ].items.find((item) => item.slug == i.toString());
    //   console.log(i, i - 2008);
    //   if (doesCategoryExcist)
    //     sortedByYear[i - 2008] = {
    //       year: i,
    //       link: `/expos/${i}/`,
    //       items: [],
    //       data: [],
    //     };
    // }
    // sortedByYear = sortedByYear.sort((a, b) => (a.year < b.year ? 1 : -1));
    // setMenuItemsByYear(sortedByYear);
    // setMenuItemsByYear(state.theme.menu);
  }, []);

  const renderExpos = () => {
    if (!menuItemsByYear) return null;

    return menuItemsByYear.map((item, index) => {
      return (
        item.data && (
          <MenuYearBlock
            year={item.year}
            // items={item.data}
            key={item.year}
            isOpen={
              (currentUrl[0] === "expos" &&
                currentUrl[1] === item.year.toString()) ||
              state.theme.options.open_menu_onload_option === "true"
            }
            currentUrl={currentUrl}
          />
        )
      );
    });
  };

  // if (!menuItemsByYear.length > 0 ) {
  // if (currentUrl === null) {
  //   return (
  //     <div className="Flex FlexCenterVertical">
  //       <div className="Bold">Loading ..</div>
  //     </div>
  //   );
  // }

  return (
    <MenuWrap
      open_menu_onload_option={state.theme.options.open_menu_onload_option}
    >
      <div className="WrapList">
        <ul>
          <li>
            <MenuItem
              slug={"news"}
              title={"News"}
              isOpen={currentUrl[0] === "news"}
              children={children}
            />
          </li>
          <li>
            <MenuItem
              slug={"bio"}
              title={"Bio + Artist statement"}
              isOpen={currentUrl[0] === "bio"}
              children={children}
            />
          </li>
          <li>
            <div className="years">{renderExpos()}</div>
          </li>
          {portFolioLink && (
            <li>
              <a
                className="MenuYearButton"
                href={portFolioLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                CV
              </a>
            </li>
          )}
          <li>
            <MenuItem
              slug={"contact"}
              title={"Contact"}
              isOpen={currentUrl[0] === "contact"}
              children={children}
            />
          </li>
        </ul>
      </div>
    </MenuWrap>
  );
};

export default connect(Menu);

const MenuWrap = styled.div`
  /* font-family: 'PT Sans', sans-serif, cursive; */
  font-family: sans-serif;
  /* border: 3px solid black; */
  width: 100%;

  & ul li {
    list-style-type: none;
    text-align: left;
  }

  // & ul li a {
  //   z-index: 11;
  //   position: relative;
  // }

  & ul > li {
    margin: 10px 0;
  }

  & .year {
    width: 100%;

    .title  {
      position: relative;
      z-index: 1;

      -webkit-transition: all 0.1s ease-out;
      -moz-transition: all 0.1s ease-out;
      -o-transition: all 0.1s ease-out;
      transition: all 0.1s ease-out;
      cursor: pointer;

      text-align: left;
      font-size: 21px;
      border-top: 1px solid black;
      font-family: sans-serif;
      font-weight: normal;
      padding: 10px 20px;
      display: block;
      width: 100%;

      & :first-letter {
        text-transform: uppercase;
      }

      &:hover,
      &.current {
        font-style: italic;
        right: -4px;
        color: black;
      }
    }

    // > .title ~ .title {
    //   border: none;
    // }
  }

  & a.MenuYearButton,
  a.MenuYearButton:visited {
    font-family: sans-serif;
    font-weight: bold;
    cursor: pointer;
    font-size: 31px;
    width: 100%;
    padding: 5px 0;
    text-align: left;
    display: block;
    color: ${(props) =>
      props.open_menu_onload_option === "true"
        ? "black"
        : "rgb(191, 191, 191)"};
    position: relative;

    &:hover {
      font-style: italic;
      right: -4px;
      color: black;
    }

    &:focus,
    &:active {
      outline: none !important;
      outline-offset: none !important;
    }

    &.Open {
      color: black;
    }
  }

  @media (hover: none) {
    & a.MenuYearButton:hover {
      font-style: initial;
      right: 0;
      color: rgb(191, 191, 191);
    }
  }
`;
