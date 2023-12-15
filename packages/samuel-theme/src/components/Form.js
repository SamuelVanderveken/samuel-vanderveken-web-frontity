import React, { useState, useEffect } from "react";

import InputField from "./common/InputField";
import { styled } from "frontity";

// import './Form.css';

export default ({ status, message, onValidated }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (status === "success") clearFields();
  }, [status]);

  const clearFields = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    email &&
      // firstName &&
      // lastName &&
      email.indexOf("@") > -1 &&
      onValidated({
        EMAIL: email,
        MERGE1: firstName,
        MERGE2: lastName,
      });
  };

  return (
    <McForm onSubmit={(e) => handleSubmit(e)}>
      <h2 className="mc__title">Join our email list for future updates.</h2>
      <p className="mc__form_required">* indicates required</p>

      {status === "sending" && (
        <div className="Sending Message">Sending...</div>
      )}
      {status === "error" && (
        <div
          className="Error Message"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}
      {status === "success" && (
        <div
          className="Success Message"
          dangerouslySetInnerHTML={{ __html: message }}
        />
      )}

      <div className="mc__field-container">
        <InputField
          label="First Name"
          onChangeHandler={setFirstName}
          type="text"
          value={firstName}
          placeholder=""
          // isRequired
        />

        <InputField
          label="Last Name"
          onChangeHandler={setLastName}
          type="text"
          value={lastName}
          placeholder=""
          //isRequired
        />

        <InputField
          label="Email *"
          onChangeHandler={setEmail}
          type="email"
          value={email}
          placeholder=""
          isRequired
        />
      </div>

      <InputField
        label="Subscribe"
        type="submit"
        //formValues={[email, firstName, lastName]}
        formValues={[email]}
      />
    </McForm>
  );
};

const McForm = styled.form`
  margin: 40px 0;

  .mc__title {
    margin: 10px 0;
  }

  .mc__form_required {
    font-style: italic;
    margin: 20px 0;
    color: white;
    background-color: black;
    display: inline-block;
    padding: 10px;
    transform: rotate(-7deg);
    border-radius: 10px;
    /* animation-name: loop; 
    animation-duration: 11s;
    animation-iteration-count: infinite;*/
  }

  .mc__form .Message {
    padding: 20px 0;
  }

  .mc__form .Success {
    color: rgb(76, 204, 76);
  }

  .mc__form .Error {
    color: rgb(249, 126, 109);
  }

  .mc__field-container {
    display: flex;
    flex-direction: column;
    justify-content: spread-around;

    @media screen and (min-width: 720px) {
      flex-direction: row;
    }
  }
`;
