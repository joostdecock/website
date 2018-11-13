import React from "react";
import PropTypes from "prop-types";
import HomeIcon from "@material-ui/icons/Home";
import RightIcon from "@material-ui/icons/ChevronRight";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import { locLang } from "../utils";
import { Link } from "gatsby";
import { FormattedMessage, injectIntl } from "react-intl";

function Breadcrumbs(props) {
  const spacer = (
    <li>
      <IconButton disabled={true}>
        <RightIcon />
      </IconButton>
    </li>
  );
  console.log("bread props", props);
  return (
    <nav className="breadcrumbs">
      <ul>
        <li>
          <Link
            to={locLang.set("/", props.intl.locale)}
            title={props.intl.formatMessage({ id: "app.home" })}
          >
            <IconButton color="primary">
              <HomeIcon />
            </IconButton>
          </Link>
        </li>
        {spacer}
        {props.via.map((step, index) => {
          return [
            <li>
              <Link
                to={locLang.set(step.link, props.intl.locale)}
                title={props.intl.formatMessage({ id: "app.home" })}
              >
                <Button size="small">
                  <FormattedMessage id={step.label} />
                </Button>
              </Link>
            </li>,
            spacer
          ];
        })}
        <li>
          <Button size="small" disabled={true}>
            {props.children}
          </Button>
        </li>
      </ul>
    </nav>
  );
}

Breadcrumbs.propTypes = {
  via: PropTypes.array
};

Breadcrumbs.defaultProps = {
  via: []
};

export default injectIntl(Breadcrumbs);
