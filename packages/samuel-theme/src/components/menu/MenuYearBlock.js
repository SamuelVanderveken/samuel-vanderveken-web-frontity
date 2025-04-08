import React, { useEffect, useState } from "react";
import { styled, connect } from "frontity";
import Link from "@frontity/components/link";
import Expo from "../Expo";
import MenuItem from "./MenuItem";
import Loading from "../Loading";
// import "./Menu.css";

const MenuYearBlock = ({ year, isOpen, currentUrl, actions, state }) => {
  const [items, setItems] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    actions.source.fetch(`/expos/${year}/`);
  }, []);

  const toggleIsOpen = (e) => {
    e.preventDefault();

    const currentUrlString = `/${currentUrl.join("/")}/`;
    if (isOpen && currentUrlString === state.router.link) {
      actions.router.set("/");
    }

    setTimeout(() => {
      const element = document.getElementById(`${year}`);
      const y = element.offsetTop + window.scrollY + -10;
      document.getElementById("root").scrollTo({ top: y, behavior: "smooth" });
    }, 150);
  };

  const fetch = async () => {
    if (state.theme.autoPrefetch === "hover") {
      await actions.source.fetch(`/expos/${year}/`);
    }
  };

  const categoryData = state.source.get(`/expos/${year}/`);
  // const category = state.source.category[categoryData.id];
  // if (!category) return null;

  const posts = categoryData.items?.map(
    ({ type, id }) => state.source[type][id]
  );

  const isExpoOpen = categoryData?.items
    ?.reduce((acc, obj) => {
      if (obj.link) acc.push(obj["link"].replaceAll("/", ""));
      return acc;
    }, []) // capture all slugs from expos/:year
    .find((slug) => slug === currentUrl[0]);

  // console.log("posts", posts);

  return (
    <MenuYear id={year}>
      <Link
        className={`MenuYearButton ${isOpen ? "Open" : ""}`}
        link={`/expos/${year}/`}
        onClick={(e) => {
          toggleIsOpen(e);
        }}
        onMouseEnter={() => {
          fetch();
        }}
      >
        {year}
      </Link>
      {(isOpen || isExpoOpen) && (
        <div className="year">
          {(categoryData?.isFetching || !categoryData?.isReady) && (
            <div style={{ padding: "30px 0" }}>
              <Loading />
            </div>
          )}
          {posts &&
            posts?.length > 0 &&
            JSON.parse(JSON.stringify(posts)).map((item, index) => {
              return (
                <Expo
                  key={`${year}-${index}`}
                  item={item}
                  isOpen={currentUrl[0] === item.slug}
                />
              );
            })}
        </div>
      )}
    </MenuYear>
  );
};

export default connect(MenuYearBlock);

const MenuYear = styled.div`
  // & > a.MenuYearButton {
  //   font-family: sans-serif;
  //   font-weight: bold;
  //   cursor: pointer;
  //   font-size: 31px;
  //   width: 100%;
  //   padding: 5px 0;
  //   text-align: left;
  //   display: block;
  //   color: rgb(191, 191, 191);
  //   position: relative;

  //   &:hover {
  //     font-style: italic;
  //     right: -4px;
  //     color: black;
  //   }

  //   &:focus,
  //   &:active {
  //     outline: none !important;
  //     outline-offset: none !important;
  //   }

  //   &:visited {
  //     color: black;
  //   }

  //   .Open {
  //     color: black;
  //   }
  // }
`;
