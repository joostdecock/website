import React from "react";
import PropTypes from "prop-types";
import RightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import { locLang } from "../utils";
import { Link } from "gatsby";
import { FormattedMessage, injectIntl } from "react-intl";

function Breadcrumbs(props) {
  const spacer = (
    <li>
      <IconButton disabled={true} className="np">
        <RightIcon />
      </IconButton>
    </li>
  );

  const i18nMessage = id => {
    if (typeof id === "string" && id !== "")
      return <FormattedMessage id={id} />;
    else return id;
  };

  const i18nLabel = id => {
    if (typeof id === "string" && id !== "")
      return props.intl.formatMessage({ id });
    else return id;
  };

  return (
    <nav className="breadcrumbs">
      <ul>
        <li>
          <Link
            to={locLang.set("/", props.intl.locale)}
            title={props.intl.formatMessage({ id: "app.home" })}
          >
            <FormattedMessage id="app.home" />
          </Link>
        </li>
        {spacer}
        {props.via.map((step, index) => {
          if (step.link)
            return [
              <li key={"crumb" + index}>
                <Link
                  to={locLang.set(step.link, props.intl.locale)}
                  title={i18nLabel(step.label)}
                >
                  {i18nMessage(step.label)}
                </Link>
              </li>,
              spacer
            ];
          else
            return [
              <li key={"crumb" + index} className="color-muted">
                {i18nMessage(step.label)}
              </li>,
              spacer
            ];
        })}
        <li>{props.children}</li>
        {props.towards.map((step, index) => {
          return [
            spacer,
            <li key={"towards" + index} className="color-muted">
              {i18nMessage(step)}
            </li>
          ];
        })}
      </ul>
    </nav>
  );
}

Breadcrumbs.propTypes = {
  via: PropTypes.array
};

Breadcrumbs.defaultProps = {
  via: [],
  towards: []
};

export default injectIntl(Breadcrumbs);
