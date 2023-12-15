import { styled } from "frontity";

import leftImg from "../assets/arrow-left-50.png";
import rightImg from "../assets/arrow-right-50.png";

const OverlayViewerWrap = styled.div`
  background-color: rgba(255, 255, 255, 1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 20px;

  &.video {
    justify-content: space-between;
  }

  @media screen and (min-width: 1024px) {
    padding: 40px;
  }
`;

const Controls = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 0px 0 20px 0;
  z-index: 10;

  @media screen and (min-width: 1024px) {
    position: relative;
    padding: 0;
    margin-bottom: 30px;
  }
`;

const Counter = styled.div`
  min-width: 50px;
  display: inline-block;
`;

const Close = styled.div`
  cursor: pointer;
  width: 50px;
  height: auto;

  & img {
    width: 100%;
    height: auto;
  }
`;

const OverlayButton = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  z-index: 9;
  width: 50%;
  height: auto;
  cursor: pointer;

  &.LeftArrow {
    left: 0;
    cursor: url("${leftImg}"), auto;
  }
  &.RightArrow {
    right: 0;
    cursor: url("${rightImg}"), auto;
  }

  &.Close {
    right: 0;
    left: 0;
    width: 100%;
    z-index: -1;
  }
`;

const Title = styled.div`
  font-family: sans-serif;
  font-weight: normal;
  font-size: 21px;
  border-bottom: 1px solid black;
  padding: 10px 0;
  display: none;

  @media screen and (min-width: 1024px) {
    display: block;
  }
`;

export { Title, OverlayButton, OverlayViewerWrap, Close, Controls, Counter };
