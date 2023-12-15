import React from "react";
import { connect, styled, Head } from "frontity";

const Post = ({ state, libraries }) => {
  const data = state.source.get(state.router.link);
  const post = state.source[data.type][data.id];
  const author = state.source.author[post.author];
  const Html2React = libraries.html2react.Component;

  return (
    <>
      {/* <Head>
        <title>{post.title.rendered}</title>
        <meta name="description" content={post.excerpt.rendered} />
      </Head>
      <div>
        <h2>{post.title.rendered}</h2>
        <PostInfo>
          <p>
            <strong>posted: </strong>
            {post.date}
          </p>
          <p>
            <strong>author: </strong>
            {author.name}
          </p>
        </PostInfo> */}
      {/* <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} /> */}
      <Html2React html={post.content.rendered} />
      {/* </div> */}
    </>
  );
};

export default connect(Post);

const PostInfo = styled.div`
  background-image: linear-gradient(to right, #f4f4f4, #fff);
  margin-bottom: 1em;
  padding: 0.5em;
  border-left: 4px solid lightseagreen;
  font-size: 0.8em;

  & > p {
    margin: 0;
  }
`;
