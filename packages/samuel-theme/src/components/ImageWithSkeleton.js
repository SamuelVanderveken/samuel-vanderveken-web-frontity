import React, { useState } from "react";
import { connect, css, styled } from "frontity";
import Image from "@frontity/components/image";

const ImageWithSkeleton = ({ src, extCss, alt = "" }) => {
  const [showImage, setShowImage] = useState(false);

  return (
    <>
      {!showImage && <Overlay className="skeleton" />}
      <Image
        src={src}
        onLoad={() => {
          setShowImage(true);
        }}
        css={extCss}
        alt={alt}
      />
    </>
  );
};

export default connect(ImageWithSkeleton);

const Overlay = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 10;

  &.none {
    display: none;
  }
`;
