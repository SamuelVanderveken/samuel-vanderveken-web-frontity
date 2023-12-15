import React, { useState, useCallback, useEffect } from "react";
import { styled, connect, keyframes, css } from "frontity";
import Link from "@frontity/components/link";

import ImageViewer from "./ImageViewer";
import VideoViewer from "./VideoViewer";
import ImageWithSkeleton from "./ImageWithSkeleton";

const Expo = ({ item, isOpen, libraries, state, actions }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [images, setImages] = useState([]);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [isVideoViewerOpen, setIsVideoViewerOpen] = useState(false);

  useEffect(() => {
    // document.body.classList.remove("smooth-scroll");
    const slug = item.slug;
    setImages(
      state.theme.articles.filter((article) =>
        article.categories.find((category) => slug === category.slug)
      )
    );
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const element = document.getElementById(`${item.slug}`);
      if (element && isOpen) {
        const y = element.offsetTop + window.scrollY + -10;
        document
          .getElementById("root")
          .scrollTo({ top: y, behavior: "smooth" });
      }
    }, 150);
  }, []);

  const toggleIsOpen = (e) => {
    const currentUrlString = `/${item.slug}/`;
    const categoryYear = state.source.category[item.categories[0]];

    if (isOpen && currentUrlString === state.router.link) {
      actions.router.set(`/expos/${categoryYear.slug}`);
    }
  };

  const openImageViewer = useCallback((index) => {
    document.getElementById("root").classList.add("DisableScroll");
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    document.getElementById("root").classList.remove("DisableScroll");
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const openVideoViewer = useCallback(() => {
    setIsVideoViewerOpen(true);
  }, []);

  const closeVideoViewer = () => {
    setIsVideoViewerOpen(false);
  };

  if (!item) {
    return <div className="skeleton" />;
  }

  const Html2React = libraries.html2react.Component;

  return (
    <ExpoWrap>
      <div
        className={`Expo ${isOpen ? "border" : ""}`}
        key={item.slug}
        id={`${item.slug}`}
      >
        <Link
          link={`/${item.slug}`}
          className="title"
          onClick={(e) => {
            toggleIsOpen(e);
          }}
        >
          <Html2React html={item.title.rendered} />
        </Link>
        {isOpen && (
          <>
            <div className="content">
              <Html2React html={item.content.rendered} />
            </div>
            {item.acf.video_select &&
              item.acf.video_select.selecteer_video !== "nvt" && (
                <VideoPreviewWrap
                  onClick={() => {
                    openVideoViewer();
                  }}
                >
                  <ImageWithSkeleton
                    extCss={VideoPreview}
                    src={item.acf.video_select.preview}
                    alt={`${item.title.rendered}-video`}
                  />
                </VideoPreviewWrap>
              )}

            <ExpoImages>
              {images?.map((image, index) => {
                var strippedImage = image.content.match(/<img([\w\W]+?)>/g)[0];
                var rex = /<img[^>]+src="?([^"\s]+)"?[^>]*\/>/g;
                var src = rex.exec(strippedImage)[1];
                if (!src) return null;

                return (
                  <ExpoImage
                    key={image.slug}
                    id={image.slug}
                    // key={index}
                    onClick={() => openImageViewer(index)}
                  >
                    <ImageWithSkeleton src={src} />
                  </ExpoImage>
                );
              })}
            </ExpoImages>
          </>
        )}
      </div>
      {isVideoViewerOpen && item.acf.video_select.selecteer_video !== "nvt" && (
        <VideoViewer
          title={item.title.rendered}
          content={item.acf.video_select}
          onClose={closeVideoViewer}
        />
      )}
      {isViewerOpen && (
        <ImageViewer
          index={currentImage}
          images={images}
          onClose={closeImageViewer}
          title={item.title.rendered}
        />
      )}
    </ExpoWrap>
  );
};

export default connect(Expo);

const SkeletonLoading = keyframes`
  0% {
    background-color: hsl(200, 0%, 97%);
  }
  100% {
    background-color: hsl(200, 0%, 85%);
  }
`;

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const ExpoWrap = styled.div`
  .skeleton {
    animation: ${SkeletonLoading} 1s linear infinite alternate;
  }

  & .Expo .content.border,
  & .Expo.border {
    border: 1px solid black;
  }

  & .Expo {
    &.border {
      border-bottom-color: transparent;

      & > .title {
        border: none !important;
      }
    }
  }

  &:last-of-type {
    & .Expo.border {
      border-bottom-color: black;
    }
  }

  & .content {
    padding: 20px;
    font-size: 13px;

    & ul li > ul {
      padding-left: 10px;
    }

    & > ul {
      margin-bottom: 20px;
    }

    & strong {
      display: inline-block;
    }

    & p {
      display: block;
    }
  }
`;

const ExpoImages = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 20px;
  justify-content: center;
  padding: 0 20px;

  @media screen and (min-width: 720px) {
    justify-content: flex-start;
    // justify-content: space-evenly;
  }
}`;

const ExpoImage = styled.div`
  width: 100px;
  // width: 9.5%;
  height: 150px;
  // margin: 15px;
  // margin: 1.5%;
  margin: 11px;
  position: relative;
  background-color: rgb(191, 191, 191);
  color: rgb(191, 191, 191);

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(255, 255, 255, 0.7);
    z-index: 1;
    opacity: 0;
  }

  &:hover {
    cursor: pointer;
    
    & img {
      border: 5px solid black;
    }
  }

  & span {
    display: block;
    width: 100%;
    height: 100%; 
  }

  img {
    width: 100%;
    height: 150px;
    display: block;
    object-fit: cover;
    color: rgb(191, 191, 191);
  }

}`;

const VideoPreviewWrap = styled.div`
  position: relative;
  max-width: 700px;
  margin: 0 15px;

  &::before {
    content: "";
    border: 5px solid black;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: none;
  }

  &:hover::before {
    cursor: pointer;
    display: block;
  }
`;

const VideoPreview = css`
  width: 100%;
  height: auto;
  display: inline-block;
`;
