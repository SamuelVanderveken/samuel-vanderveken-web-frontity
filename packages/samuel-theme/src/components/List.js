import React from "react";
import { connect, styled, css } from "frontity";
import Link from "@frontity/components/link";

const List = ({ state, actions }) => {
  const data = state.source.get(state.router.link);

  return (
    <Items>
      {data.items.map((item) => {
        const post = state.source[item.type][item.id];
        return (
          <ReleaseLink key={item.id}>
            <Link link={item.link}>
              {post.title.rendered} - {post.artist_name}
            </Link>
          </ReleaseLink>
        );
      })}
      <PrevNextNav>
        {data.previous && (
          <button
            onClick={() => {
              actions.router.set(data.previous);
            }}
          >
            &#171; Prev
          </button>
        )}
        {data.next && (
          <button
            onClick={() => {
              actions.router.set(data.next);
            }}
          >
            Next &#187;
          </button>
        )}
      </PrevNextNav>
    </Items>
  );
};

export default connect(List);

const ReleaseLink = styled.div`
  display: block;
  margin-bottom: 35px;
  position: relative;
  left: 0px;

  & h1 {
  }
  &:after {
    width: 0px;
    content: "";
    height: 1px;
    position: absolute;
    bottom: -7px;
    left: 0px;
    display: inline-block;
    background-color: @black;
  }
  &:hover {
    left: 1px;
    &:after {
      background-color: @streep;
    }
  }
`;
const Items = styled.div`
  & > a {
    display: block;
    margin: 6px 0;
    font-size: 1.2em;
    color: steelblue;
    text-decoration: none;
  }
`;

const PrevNextNav = styled.div`
  padding-top: 1.5em;

  & > button {
    background: #eee;
    text-decoration: none;
    padding: 0.5em 1em;
    color: #888;
    border: 1px solid #aaa;
    font-size: 0.8em;
    margin-right: 2em;
  }
  & > button:hover {
    cursor: pointer;
  }
`;
