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
    state.theme.articles = data.articles;
    state.theme.images = data.images;

    //append to state
    // const expos = state.source.data[link];
    // Object.assign(expos, {
    //   items: data.items,
    //   isExpo: true,
    // });

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
    //   // setMenuItemsByYear(sortedByYear);

    //   state.theme.menu = sortedByYear;
    // };
    // fn();
  },
};

export default MenuHandler;
