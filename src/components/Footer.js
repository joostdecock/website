import React from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import Button from "@material-ui/core/Button";
import TwitterIcon from "./TwitterIcon";
import InstagramIcon from "./InstagramIcon";
import GitterIcon from "./GitterIcon";
import GithubIcon from "./GithubIcon";
import { FormattedHTMLMessage } from "react-intl";

const Footer = props => {
  return (
    <footer>
      <Logo size={96} color={"#fff"} />
      <p>
        <FormattedHTMLMessage id="app.txt-footer" />
      </p>
      <p>
        <Button href="https://twitter.com/freesewing_org">
          <TwitterIcon color={"#ccc"} />
        </Button>
        <Button href="https://gitter.im/freesewing/freesewing">
          <GitterIcon color={"#ccc"} />
        </Button>
        <Button href="https://github.com/freesewing">
          <GithubIcon color={"#ccc"} />
        </Button>
        <Button href="https://instagram.com/freesewing_org">
          <InstagramIcon color={"#ccc"} />
        </Button>
      </p>
    </footer>
  );
};

Footer.propTypes = {
  language: PropTypes.string.isRequired
};

export default Footer;
