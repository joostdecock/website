import React from "react";
import { FormattedMessage } from "react-intl";
import Tiers from "./Tiers";

const BecomeAPatron = props => (
  <div>
    <h2 className="light txt-center">
      <FormattedMessage id="app.supportFreesewing" />
    </h2>
    <p className="txt-center">
      <FormattedMessage id="app.txt-tiers" />
    </p>
    <Tiers />
  </div>
);

export default BecomeAPatron;
