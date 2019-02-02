import React from "react";
import { FormattedMessage } from "react-intl";
import ship from "./ship.svg";
import style from "./style.css";

const Ship = props => (
  <div className="ship-wrapper">
    <div className="ship-bg">
      <img className="ship" src={ship} alt="🚢" />
      <h2 className="ship-text">
        <FormattedMessage id="app.patronsKeepUsAfloat" />
      </h2>
    </div>
  </div>
);

export default Ship;
