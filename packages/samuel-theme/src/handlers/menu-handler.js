const MenuHandler = {
  name: "expos",
  priority: 10,
  // pattern: "/abc/:slug/",
  pattern: "/getimages/",
  func: async ({ link, params, libraries, state }) => {
    const { slug } = params;

    const res = await libraries.source.api.get({
      endpoint: "/samuel/v1/get",
    });
    const data = await res.json();
    // state.theme.articles = data.articles;

    const thisYear = new Date().getFullYear();
    let sortedByYear = new Array();

    for (let i = thisYear; i >= 2008; --i) {
      const doesCategoryExcist = state.source.data[
        "all-categories/"
      ].items?.find((item) => item.slug == i.toString());

      if (doesCategoryExcist)
        sortedByYear[i - 2008] = {
          year: i,
          link: `/expos/${i}/`,
          items: [],
          data: [],
        };
    }

    sortedByYear = sortedByYear.sort((a, b) => (a.year < b.year ? 1 : -1));
    state.theme.menu = sortedByYear;

    const years = sortedByYear.map((year) => year.year);

    state.theme.images = data.articles.filter((article) =>
      article.categories?.find((category) => {
        return !years?.find((year) => year === parseInt(category.slug));
      })
    );

    const foundPortfolioPage = data.articles?.find(
      (article) => article.slug === "portfolio-download"
    );

    if (foundPortfolioPage) {
      var regex = /<a.*?href="(.*?)"/;
      var src = regex.exec(foundPortfolioPage.content)[1];
      if (src) {
        state.theme.portfolioLink = src;
      }
    }

    // console.log("articles", data.articles);
  },
};

export default MenuHandler;
