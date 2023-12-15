import React, { useEffect } from "react";
import { connect, Global, css, styled, Head } from "frontity";
import Switch from "@frontity/components/switch";

import List from "./List";
import Page from "./Page";
import Post from "./Post";
import Loading from "./Loading";
import Error from "./Error";

const Root = ({ state, actions, libraries }) => {
  const data = state.source.get(state.router.link);

  const articles = state.theme.articles;

  return (
    <>
      <Switch>
        <Error when={data.isError} />
        <Loading when={data.isFetching} />
        <div when={data.isArchive}>
          <List />
        </div>
        <div when={data.isPage}>
          <Page />
        </div>
        <div when={data.isPost}>
          <Post />
        </div>
        <div when={data.isContact} />
      </Switch>
    </>
  );
};

export default connect(Root);
