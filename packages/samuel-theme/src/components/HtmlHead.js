import { connect, Head } from "frontity";

const HtmlHead = ({ state }) => {
  // const data = state.source.get(state.router.link);

  const metatags = state.headTags.get(state.router.link);
  const CreateMetaTags = () => {
    if (!(metatags?.length > 0)) return null;
    const t = metatags.map((link, index) => {
      if (link.tag == "title") return <title key={index}>{link.content}</title>;
      else if (link.tag == "meta")
        return (
          <meta
            key={index}
            name={link.attributes.name}
            content={link.attributes.content}
          />
        );
      else if (link.tag == "link")
        return (
          <link
            key={index}
            rel={link.attributes.rel}
            href={link.attributes.url}
            type={link.attributes.type}
          />
        );
    });
    return t;
  };
  return (
    <Head>
      <title>{state.frontity.title}</title>
      <meta name="description" content={state.frontity.description} />
      <html lang="en" />
      <link rel="canonical" href={state.router.link} />

      {/* {CreateMetaTags()} */}
      {metatags?.map((link, index) => {
        if (link.tag == "title") {
          return <title key={index}>{link.content}</title>;
        } else if (link.tag == "meta") {
          return (
            <meta
              key={index}
              name={link.attributes.name}
              content={link.attributes.content}
            />
          );
        } else if (link.tag == "link")
          return (
            <link
              key={index}
              rel={link.attributes.rel}
              href={link.attributes.url}
              type={link.attributes.type}
            />
          );
      })}
    </Head>
  );
};

export default connect(HtmlHead);
