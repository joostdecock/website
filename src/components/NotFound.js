import React from "react";
import { FormattedMessage } from "react-intl";
import { Link } from "gatsby";
import { locLang } from "../utils";
import image from "../assets/images/patterns/simon/cover.jpg";

const NotFound = props => (
  <div className="txt-center">
    <h1
      style={{
        fontSize: "12rem",
        fontWeight: 700,
        margin: 0
      }}
    >
      404
    </h1>
    <h5 className="mb1">
      <FormattedMessage id="errors.404" />
    </h5>
    <p>
      <Link to={locLang.set("/", props.language)}>
        <FormattedMessage id="app.home" />
      </Link>
      <span style={{ padding: "0 1rem" }}>|</span>
      <a
        href="https://github.com/freesewing/website/issues/new"
        target="_BLANK"
        rel="noopener noreferrer"
      >
        <FormattedMessage id="app.reportThisOnGithub" />
      </a>
    </p>
    <p>
      <img src={image} alt="404" />
    </p>
  </div>
);

export default NotFound;
