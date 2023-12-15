import React from "react";
import { styled, connect } from "frontity";
import MailchimpSubscribe from "react-mailchimp-subscribe";
import Form from "./Form";
// import './Contact.css';

const Contact = ({ state }) => {
  const action = `https://samuelvanderveken.us9.list-manage.com/subscribe/post?u=${state.theme.options.mailchimp_u_option}&id=${state.theme.options.mailchimp_id_option}`;

  return (
    <ContactWrap>
      <MailchimpSubscribe
        url={action}
        render={({ subscribe, status, message }) => (
          <Form
            status={status}
            message={message}
            onValidated={(formData) => subscribe(formData)}
          />
        )}
      />
    </ContactWrap>
  );
};

export default connect(Contact);

const ContactWrap = styled.div`
  & .gegevens {
    padding-right: 20px;
  }

  & .italictitle {
    margin-bottom: 20px;
  }
`;
