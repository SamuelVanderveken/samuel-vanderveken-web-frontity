// export const baseUrl =
//   process.env.NODE_ENV === "production"
//     ? `https://samuelvanderveken.com`
//     : `http://localhost:30004`;

export const baseUrl = `https://samuelvanderveken.com`;

const settings = {
  name: "samuel-website",
  state: {
    frontity: {
      url: "https://samuelvanderveken.com",
      title: "Samuel Vanderveken",
      description: "Portfolio",
    },
  },
  packages: [
    {
      name: "samuel-theme",
      state: {
        theme: {
          menu: [
            // ["Home", "/"],
            // ["Expos", "/expos/products/"],
            // ["Contact", "/contact/"],
          ],
          featured: {
            showOnList: false,
            showOnPost: false,
          },

          // REACT_APP_MAILCHIMP_U: "04f07f9fe85bdc0f8b68ea3c7",
          // REACT_APP_MAILCHIMP_ID: "cccfd3695b",

          autoPrefetch: "hover",
        },
      },
    },
    {
      name: "@frontity/wp-source",
      state: {
        source: {
          // url: "http://localhost:30004",
          url: baseUrl,
          // api: "http://localhost:30003/wp-json/oei/v1",
          params: {
            head_tags: true,
            acf_format: "standard", // wippie !
          },
          postTypes: [
            // {
            //   type: "expos",
            //   endpoint: "expos",
            //   archive: "/expos",
            // },
            // {
            //   type: "expo",
            //   endpoint: "/expos/:year/:slug",
            //   archive: "/expos/:year/:slug",
            // },
          ],
          homepage: "/home",
          postsPage: "/samuel",
          categoryBase: "/expos",
          redirections: "404",
        },
      },
    },

    "@frontity/tiny-router",
    "@frontity/html2react",
    "@frontity/head-tags",
  ],
};

export default settings;
