import React from "react";
import PropTypes from "prop-types";
import Logo from "./Logo";
import TwitterIcon from "./TwitterIcon";
import InstagramIcon from "./InstagramIcon";
import GitterIcon from "./GitterIcon";
import GithubIcon from "./GithubIcon";
import { FormattedHTMLMessage, injectIntl } from "react-intl";
import { slugForLanguage } from "../utils";
import { Link } from "gatsby";

const Footer = props => {
  const { intl } = props;
  return (
    <footer>
      <Link to={slugForLanguage("/", props.language)} title="🏠">
        <Logo size={96} />
      </Link>
      <p className="credits">
        <FormattedHTMLMessage id="app.txt-footer" />
      </p>
      <ul className="social">
        <li>
          <a
            href="https://twitter.com/freesewing_org"
            title={intl.formatMessage({ id: "app.twitter" })}
          >
            <TwitterIcon color={"#ccc"} />
          </a>
        </li>
        <li>
          <a
            href="https://gitter.im/freesewing/freesewing"
            title={intl.formatMessage({ id: "app.chatOnGitter" })}
          >
            <GitterIcon color={"#ccc"} />
          </a>
        </li>
        <li>
          <a
            href="https://github.com/freesewing"
            title={intl.formatMessage({ id: "app.github" })}
          >
            <GithubIcon color={"#ccc"} />
          </a>
        </li>
        <li>
          <a
            href="https://instagram.com/freesewing_org"
            title={intl.formatMessage({ id: "app.instagram" })}
          >
            <InstagramIcon color={"#ccc"} />
          </a>
        </li>
      </ul>
    </footer>
  );
};

Footer.propTypes = {
  language: PropTypes.string.isRequired
};

export default injectIntl(Footer);
