const ExpoHandler = {
  name: "expo",
  priority: 10,
  pattern: "/expos/:year/:slug/",
  func: async ({ link, params, libraries, state }) => {
    const { slug, year } = params;

    // const res = await libraries.source.api.get({
    //   endpoint: "/samuel/v1/get",
    // });
    // const data = await res.json();
    // state.theme.articles = data.articles;

    // console.log("HANDLER res", data);

    //append to state
    // const expos = state.source.data[link];
    // Object.assign(expos, {
    //   items: data.items,
    //   isExpo: true,
    // });

    // console.log("HANDLER DATA AFTER", params, data);
  },
};

export default ExpoHandler;
