// import "dotenv/config";
// require("dotenv").config();

import link from "@frontity/html2react/processors/link";
import image from "@frontity/html2react/processors/image";
import iframe from "@frontity/html2react/processors/iframe";
import paragraph from "./processors/paragraph";

import { Global, css } from "frontity";

import Root from "./components/Root";
import Page from "./screens/Page";
import Footer from "./components/Footer";
import HtmlHead from "./components/HtmlHead";

import MenuHandler from "./handlers/menu-handler";
import ExpoHandler from "./handlers/expo-handler";
import OptionsHandler from "./handlers/options-handler";
import allCategoriesHandler from "./handlers/category-handler";

const Theme = () => {
  return (
    <>
      {/* <HtmlHead /> */}
      <Global
        styles={css`
          * {
            padding: 0px;
            margin: 0px;

            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            -o-box-sizing: border-box;
            box-sizing: border-box;

            font-smooth: always;
            -webkit-font-smoothing: subpixel-antialiased;
            text-shadow: 0 0 1px rgba(0, 0, 0, 0.2);
          }

          body,
          html {
            /* font-family: 'News Cycle', sans-serif, cursive; */
            font-family: sans-serif, cursive;
            background: "#fff";
            color: #333;
            font-size: 13px;
            touch-action: pan-x pan-y;
            text-size-adjust: none;
            -webkit-font-smoothing: antialiased;
            -webkit-text-size-adjust: 100%;
          }
          html,
          body {
            height: 100% !important;
            margin: 0;
            overflow: hidden;
          }
          body {
            // overscroll-behavior-y: none;
          }
          #root,
          .scroll {
            overflow-y: auto;
            height: 100% !important;
          }

          .DisableScroll {
            height: 100%;
            overflow-y: hidden;
          }

          ul li {
            list-style-type: none;
          }

          h1 {
            font-size: 48px;
          }

          h2,
          .entry-title {
            font-size: 14px;
            font-weight: bold;
          }

          a {
            text-decoration: none;
            font-weight: bold;
            color: black;
          }

          button {
            background: none;
            border: none;
            background-color: transparent;
            background-repeat: no-repeat;
            cursor: pointer;
            overflow: hidden;
            outline: none;
          }

          button:active,
          button:focus,
          a:active,
          a:focus {
            background: none;
            background-color: transparent;
            outline: none !important;
            outline-offset: none !important;
            box-shadow: none;
          }

          /* fix for removing highlight after on click */
          input,
          textarea,
          button,
          select,
          a {
            -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
          }

          hr {
            border: none;
            border-top: 1px solid black;
          }

          img {
            border: none;
            outline: none;
          }

          .fade-enter {
            opacity: 0;
          }
          .fade-enter-active {
            opacity: 1;
            /* background-color: red; */
            transition: opacity 250ms;
          }
          .fade-exit {
            opacity: 0;
          }
          .fade-exit-active {
            opacity: 0;
            transition: opacity 10ms;
          }

          ::selection {
            background-color: black;
            color: white;
          }
          .Flex {
            display: flex;
          }
          .FlexCenterVertical {
            align-items: center;
          }
          .FlexCenterHorizontal {
            justify-content: center;
          }
          .Flex1 {
            flex: 1;
          }
          .Bold {
            font-weight: bold;
          }

          @media (hover: none) {
            a:hover {
              color: inherit;
            }
          }

          @media screen and (min-width: 720px) {
            body {
              font-size: 13px;
            }
          }

          ::placeholder {
            /* Firefox */
            font-weight: normal;
            /* color: v.$primary; */
          }

          :-ms-input-placeholder {
            /* Internet Explorer 10-11 */
            /* color: v.$primary; */
            font-weight: normal;
          }

          ::-ms-input-placeholder {
            /* Microsoft Edge */
            /* color: v.$primary; */
            font-weight: normal;
          }

          input[disabled] {
            /* background-color: v.$primaryDark2; */
            /* cursor: default; */
            cursor: not-allowed;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
          }
          input[disabled]:hover {
            /* background-color: v.$primaryDark2; */
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.45);
            transform: scale(1);
          }

          input:focus {
            outline-width: 0;
          }

          input:focus,
          select:focus,
          textarea:focus,
          button:focus {
            outline: none;
          }
          [contenteditable="true"]:focus {
            outline: none;
          }
        `}
      />
      <Page>
        <Root title={"samuel samuel"} />
      </Page>

      {/* <Footer /> */}
    </>
  );
};

export default {
  name: "samuel-theme",
  roots: {
    theme: Theme,
  },
  state: {
    theme: {
      isUrlVisible: false,
      red: false,
      articles: [], // array of articles
      images: [], // array of ids
      menu: [], // array of menu items per year
      options: [],
    },
  },
  actions: {
    theme: {
      toggleUrl: ({ state }) => {
        state.theme.isUrlVisible = !state.theme.isUrlVisible;
      },
      addProduct: ({ state }) => {
        state.theme.cartItems = [
          ...state.theme.cartItems,
          state.theme.selectedProductId,
        ];
      },
      beforeSSR: async ({ actions, state }) => {
        await Promise.all([
          actions.source.fetch("/getoptions/"),
          actions.source.fetch("/getimages/"),
          actions.source.fetch("all-categories"),
        ]);

        // const thisYear = new Date().getFullYear();

        // const getExposByYear = async (i) => {
        //   await actions.source.fetch(`/expos/${i}/`);

        //   const categoryData = state.source.get(`/expos/${i}/`);
        //   const category = state.source.category[categoryData.id];
        //   const posts = categoryData.items?.map(
        //     ({ type, id }) => state.source[type][id]
        //   );

        //   return {
        //     year: i,
        //     link: category?.link,
        //     items: categoryData?.items,
        //     data: posts,
        //   };
        // };

        // const fn = async () => {
        //   let sortedByYear = [];
        //   for (let i = thisYear; i >= 2008; --i) {
        //     let yearExpos = await getExposByYear(i);
        //     sortedByYear[i - 2008] = JSON.parse(JSON.stringify(yearExpos));
        //   }
        //   // sort
        //   sortedByYear.sort((a, b) => a.year < b.year);
        //   // remove empty slots
        //   sortedByYear = sortedByYear.filter((item) => {
        //     return item.items && item.items.length > 0;
        //   });
        //   state.theme.menu = sortedByYear;
        //   console.log(sortedByYear);
        // };
        // fn();
      },
      // beforeCSR: async ({ actions }) => {
      //   console.log("BEFORE CSR");
      //   // await actions.source.fetch("/expos/test/");
      // },
    },
  },
  libraries: {
    html2react: {
      processors: [image, iframe, link, paragraph],
    },
    source: {
      handlers: [
        MenuHandler,
        ExpoHandler,
        allCategoriesHandler,
        OptionsHandler,
      ],
    },
  },
};
