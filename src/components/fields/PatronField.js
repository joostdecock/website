import React from "react";
import { FormattedMessage } from "react-intl";
import BecomeAPatron from "../patrons/BecomeAPatron";

const PatronField = props => {
  if (props.config.value > 10)
    return (
      <blockquote>
        <h5>
          <FormattedMessage id="app.youAreAPatron" />
          {"; "}
          <FormattedMessage id="app.andThatIsAwesome" />
        </h5>
        <FormattedMessage id="app.patronHelp" />
        <br />
        <br />
        <a href="mailto:joost@decock.org?subject=Freesewing%20patron%20status">
          <FormattedMessage id="app.sendAnEmail" />
        </a>
      </blockquote>
    );
  else return <BecomeAPatron />;
};

export default PatronField;
