import React from "react";
import { styled, keyframes } from "frontity";

const Loading = ({ type = "spinner2" }) => {
  switch (type) {
    default:
    case "spinner1":
      return <Spinner />;
    case "spinner2":
      return <Spinner2 />;
    case "spinner3":
      return <Spinner3 />;
  }
};

export default Loading;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Spinner = styled.div`
  border: 12px solid #eee;
  border-top: 12px solid grey;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 2s linear infinite;
`;

const scaleUp = keyframes`
  0% { transform: translate(-50%, -50%) scale(0) }
  60% , 100% { transform: translate(-50%, -50%)  scale(1)}
`;

const pulse = keyframes`
  0% , 60% , 100%{ transform:  scale(1) }
  80% { transform:  scale(1.2)}
`;

const Spinner2 = styled.div`
  width: 35px;
  height: 35px;
  border: 5px solid black;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  position: relative;
  animation: ${pulse} 1s linear infinite;

  &:after {
    content: "";
    position: absolute;
    width: 35px;
    height: 35px;
    border: 5px solid black;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    animation: ${scaleUp} 1s linear infinite;
  }
`;

const animloader = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

const Spinner3 = styled.div`
  width: 35px;
  height: 35px;
  display: inline-block;
  position: relative;

  &::after,
  &::before {
    content: "";
    box-sizing: border-box;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 2px solid black;
    position: absolute;
    left: 0;
    top: 0;
    animation: ${animloader} 2s linear infinite;
  }
  &::after {
    animation-delay: 1s;
  }
`;
