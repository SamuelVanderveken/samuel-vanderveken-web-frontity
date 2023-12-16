import React, { useEffect, useState, useCallback } from "react";
import { styled, connect, Global, keyframes } from "frontity";
import { useSwipeable } from "react-swipeable";
import useWindowSize from "../hooks/useWindowSize";

import closeImg from "../assets/close.png";

import {
  Title,
  OverlayButton,
  OverlayViewerWrap,
  Close,
  Controls,
  Counter,
} from "./OverlayViewer";

const NEXT = "nextSlide";
const PREV = "previousSlide";

const ImageViewer = ({
  images,
  index,
  onClose,
  title = "",
  libraries,
  state,
}) => {
  const [currentIndex, setCurrentIndex] = useState(index | 0);
  const [image, setImage] = useState(null);
  const sizes = useWindowSize();
  const maxHeight =
    sizes.width < 720
      ? null
      : `${sizes.height < 820 ? sizes.height * 0.7 : 720}px`;

  const config = {
    delta: 10, // min distance(px) before a swipe starts. *See Notes*
    preventScrollOnSwipe: false, // prevents scroll during swipe (*See Details*)
    trackTouch: true, // track touch input
    trackMouse: false, // track mouse input
    rotationAngle: 0, // set a rotation angle
    swipeDuration: Infinity, // allowable duration of a swipe (ms). *See Notes*
    touchEventOptions: { passive: true }, // options for touch listeners (*See Details*)
    swipeDuration: 500,
  };
  const handlers = useSwipeable({
    onSwiped: (eventData) => {
      // console.log("User Swiped!", eventData);
    },
    onSwipedLeft: () => advance(NEXT),
    onSwipedRight: () => advance(PREV),
    ...config,
  });

  useEffect(() => {
    if (!images.length) {
      return;
    }
    setImage(images[currentIndex]);
  }, [images, currentIndex]);

  const advance = (direction) => {
    let newIndex = 0;
    let index = currentIndex;
    switch (direction) {
      case PREV:
        newIndex = index - 1 < 0 ? images.length - 1 : index - 1;
        break;
      case NEXT:
        newIndex = index + 1 > images.length - 1 ? 0 : index + 1;
        break;
      default:
        break;
    }
    setCurrentIndex(newIndex);
    setImage(images[newIndex]);
  };

  const checkKey = useCallback(
    (e) => {
      e = e || window.event;
      if (e.keyCode === 38) {
        // up arrow
      } else if (e.keyCode === 40) {
        // down arrow
      } else if (e.keyCode === 37) {
        advance(PREV);
      } else if (e.keyCode === 39) {
        advance(NEXT);
      }
    },
    [advance]
  );

  useEffect(() => {
    document.addEventListener("keydown", checkKey);

    return () => {
      document.removeEventListener("keydown", checkKey);
    };
  }, [checkKey]);

  const Html2React = libraries.html2react.Component;

  const renderContent = () => {
    const strippedImage = image.content.match(/<img([\w\W]+?)>/g)[0];
    let content = image.content.slice();
    const img = document.createElement("template");
    img.innerHTML = strippedImage;
    const imgSrc = img.content.childNodes[0].getAttribute("src");

    return (
      <Content>
        <ImageWrap {...handlers}>
          <OverlayButton
            className={"LeftArrow"}
            onClick={() => advance(PREV)}
          />
          <OverlayButton
            className={"RightArrow"}
            onClick={() => advance(NEXT)}
          />
          <img
            className="Responsive"
            alt={image.title}
            src={imgSrc}
            style={{ maxHeight }}
          />
        </ImageWrap>
        <Description>
          <Html2React
            html={content.replace(strippedImage, "").replace("<p></p>", "")}
          />
        </Description>
      </Content>
    );
  };

  const renderCarouselItems = () => {
    return images.map((singleImage, i) => {
      const strippedImage = singleImage.content.match(/<img([\w\W]+?)>/g)[0];
      let content = singleImage.content.slice();
      const img = document.createElement("template");
      img.innerHTML = strippedImage;
      const imgSrc = img.content.childNodes[0].getAttribute("src");

      return (
        <div
          key={i}
          className={`carousel-slot ${currentIndex === i ? "active" : ""}`}
          // style={{ order: getOrder(i) }}
        >
          <Content>
            <OverlayButton className="Close" onClick={onClose} />
            <ImageWrap>
              <OverlayButton
                className={"LeftArrow"}
                onClick={() => advance(PREV)}
              />
              <OverlayButton
                className={"RightArrow"}
                onClick={() => advance(NEXT)}
              />
              <img
                className="Responsive"
                alt={singleImage.title}
                src={imgSrc}
                // style={{ maxHeight }}
              />
            </ImageWrap>
            <Description>
              <Html2React
                html={content.replace(strippedImage, "").replace("<p></p>", "")}
              />
            </Description>
          </Content>
        </div>
      );
    });
  };

  if (!images.length || !image) {
    return null;
  }

  return (
    <OverlayViewerWrap>
      <OverlayButton className="Close" onClick={onClose} />

      <Controls>
        <Counter>
          {currentIndex + 1}/{images.length}
        </Counter>
        <div className="Advance">
          <Title>
            <Html2React html={title} />
          </Title>
        </div>

        <Close onClick={onClose}>
          <img src={closeImg} alt="close" />
        </Close>
      </Controls>
      {/* <div className="Flex FlexCenterVertical FlexCenterHorizontal Flex1">
        {renderContent()}
      </div> */}

      <Carousel
        {...handlers}
        style={{ touchAction: "pan-y" }}
        open_menu_fadeinout_option={
          state.theme.options.open_menu_fadeinout_option === "true"
        }
      >
        <div className={`carousel-container`}>{renderCarouselItems()}</div>
      </Carousel>
    </OverlayViewerWrap>
  );
};

export default connect(ImageViewer);

const ImageWrap = styled.div`
  position: relative;
  flex: 5;
  height: 50%;
  max-height: 720px;
  display: flex;
  justify-content: center;

  & img {
    display: block;
    // margin: 10px auto;
    max-height: 100%;
    max-width: 100%;

    &.Responsive {
      max-width: 100%;
      // max-height: 720px;
      -o-object-fit: contain;
      object-fit: contain;
      margin: auto;
      overflow: auto;

      width: 100%;
      height: auto;
    }
  }
`;

const Description = styled.div`
  text-align: center;
  background-color: white;
  position: relative;
  font-size: 13px;
  padding: 20px 0;
  max-width: 720px;
  flex: 1;

  @media screen and (min-width: 720px) {
    flex: 0;
  }
`;

const Content = styled.div`
  transition: transform 0.3s;
  max-width: 1024px;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  justify-content: center;
  align-items: center;

  @media screen and (min-width: 1024px) {
    // width: auto;
  }
`;

const Carousel = styled.div`
  width: 100%;
  height: 100%;
  overflow: hidden;

  & .carousel-container {
    display: flex;
    position: relative;
    width: 100%;
    height: 100%;
  }

  & .carousel-slot {
    opacity: 0;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    ${(props) =>
      props.open_menu_fadeinout_option &&
      "transition: opacity 0.5s ease-in-out;"}

    &.active {
      opacity: 1;
      order: 0;
    }
  }
`;
