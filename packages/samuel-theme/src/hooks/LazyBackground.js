import useInView from "@frontity/hooks/use-in-view";

export const LazyBackground = ({ children, src, Tag = "div", ...rest }) => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <Tag
      ref={ref}
      style={inView ? { backgroundImage: `url(${src})` } : {}}
      {...rest}
    >
      {children}
    </Tag>
  );
};
