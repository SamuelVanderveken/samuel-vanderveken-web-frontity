import React from "react";
import { styled, connect } from "frontity";
import Vimeo from "@u-wave/react-vimeo"; // eslint-disable-line import/no-unresolved
import YouTube from "react-youtube";

import {
  Title,
  OverlayButton,
  OverlayViewerWrap,
  Close,
  Controls,
} from "./OverlayViewer";

import closeImg from "../assets/close.png";

// import "./ImageViewer.css";
// import "./VideoViewer.css";

const VideoViewer = ({ content, onClose, title = "", libraries }) => {
  const { selecteer_video, video } = content;

  const Html2React = libraries.html2react.Component;

  const renderContent = () => {
    switch (selecteer_video) {
      case "youtube":
        return (
          <YouTube
            videoId={video}
            id={"youtube"}
            opts={{
              height: "560",
              width: "315",
              playerVars: {
                modestbranding: 1,
                controls: 1,
                rel: 0,
                frameBorder: 0,
                allowfullscreen: true,
                disablepictureinpicture: true,
              },
            }}
          />
        );
      case "vimeo":
        return <Vimeo video={video} autoplay={false} />;

      case "nvt":
      default:
        return null;
    }
  };

  if (!video || content.selecteer_video === "nvt") {
    return null;
  }

  return (
    <OverlayViewerWrap className="video">
      {/* <button className="OverlayButton Close" onClick={onClose} />

      <div className="Controls">
        <div />
        <div className="Advance">
          <div className="Title">{title}</div>
        </div>
        <div className="Link" onClick={onClose}>
          <img src={require("../assets/close.png")} alt="close" />
        </div>
      </div> */}
      <OverlayButton className="Close" onClick={onClose} />

      <Controls>
        <div />
        <div className="Advance">
          <Title>
            <Html2React html={title} />
          </Title>
        </div>
        <Close onClick={onClose}>
          <img src={closeImg} alt="close" />
        </Close>
      </Controls>

      <VideoWrap>
        <div className="Video"> {renderContent()}</div>
      </VideoWrap>

      <div />
    </OverlayViewerWrap>
  );
};

export default connect(VideoViewer);

const VideoWrap = styled.div`
  max-width: 1000px;
  width: 100%;

  .Video {
    margin: 20px 0;
    max-width: 100%;
    height: auto;
  }

  .Video {
    position: relative;
    padding-bottom: 56.25%;
    padding-top: 30px;
    height: 0;
    overflow: hidden;
  }

  .Video iframe,
  .Video object,
  .Video embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;
