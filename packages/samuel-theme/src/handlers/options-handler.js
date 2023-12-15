const OptionsHandler = {
  name: "options",
  priority: 10,
  pattern: "/getoptions/",
  func: async ({ libraries, state }) => {
    const res = await libraries.source.api.get({
      endpoint: "/samuel/v1/get_options",
    });
    const data = await res.json();

    state.theme.options = data.options;
  },
};

export default OptionsHandler;
