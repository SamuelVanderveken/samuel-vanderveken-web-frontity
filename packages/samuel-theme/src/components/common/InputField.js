import React from "react";

import { css, styled } from "frontity";

// import "./InputField.css";

const InputField = (props) => {
  //Checks if all the fields are filled and if an @ sign is used in the email field
  const validateInput = (values) => {
    if (values.some((f) => f === "") || values[0].indexOf("@") === -1) {
      return true;
    } else {
      return false;
    }
  };
  if (props.type === "submit") {
    return (
      <Submit
        // className="inputField__submit"
        type="submit"
        value={props.label}
        disabled={validateInput(props.formValues)}
      />
    );
  } else if (props.type === "textarea") {
    return (
      <Label>
        {props.label}
        <textarea
          css={Field}
          onChange={(e) => props.onChangeHandler(e.target.value)}
          placeholder={props.placeholder}
          value={props.value}
          required={props.isRequired}
          // className="inputField__field"
          rows={7}
          name={props.name}
        />
      </Label>
    );
  } else {
    return (
      <Label>
        {props.label}
        <input
          css={Field}
          onChange={(e) => props.onChangeHandler(e.target.value)}
          type={props.type}
          placeholder={props.placeholder}
          value={props.value}
          required={props.isRequired}
          // className="inputField__field"
          name={props.name}
        />
      </Label>
    );
  }
};

export default React.memo(InputField);

const Label = styled.label`
  display: inline-block;
  margin: 0 auto;
  width: 100%;
  max-width: 400px;

  @media screen and (min-width: 720px) {
    width: 33%;
  }
`;

const Field = css`
  border: 1px solid black;
  font-size: 16px;
  margin: 0 auto;
  width: 100%;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 10px;
`;

const Submit = styled.input`
  border: none;
  background: none;
  outline: none;
  background-color: black;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  padding: 30px;

  &:hover {
    cursor: pointer;
  }

  &[disabled=""] {
    background-color: whitesmoke;
    border: 1px solid grey;
    color: grey;
    cursor: not-allowed;
  }
`;
