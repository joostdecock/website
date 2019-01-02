import React from "react";
import { locLang } from "../../utils";
import { FormattedMessage } from "react-intl";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import patronsImage from "./patrons.jpg";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
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
