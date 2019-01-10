import React from "react";
import { connect } from "react-redux";
import { showNotification } from "../store/actions/notification";
import config from "../config/frontend";
import PropTypes from "prop-types";
import { locLang } from "../utils";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";

const ShareLink = props => {
  const linkToClipboard = () => {
    const selection = window.getSelection();
    const range = document.createRange();
    range.selectNodeContents(document.getElementById("share"));
    selection.removeAllRanges();
    selection.addRange(range);
    try {
      document.execCommand("copy");
      selection.removeAllRanges();
      props.showNotification(
        "success",
        <FormattedMessage id="app.copiedToClipboard" key="message" />
      );
    } catch (e) {
      props.showNotification("error", e);
    }
  };

  let to = locLang.set(props.link, props.language);
  return (
    <div className="gist">
      <div className="gist-header txt-right">
        <Button color="secondary" onClick={linkToClipboard}>
          <FormattedMessage id="app.copy" />
        </Button>
      </div>
      <Link to={to}>
        <span className="copy-this" id="share">
          {config.url.substring(0, config.url.length - 1)}
          {locLang.set(props.link, props.language)}
        </span>
      </Link>
    </div>
  );
};

ShareLink.propTypes = {
  link: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired
};

const mapDispatchToProps = dispatch => ({
  showNotification: (style, message) =>
    dispatch(showNotification(style, message))
});

export default connect(
  null,
  mapDispatchToProps
)(ShareLink);
