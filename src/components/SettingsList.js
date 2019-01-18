import React from "react";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { locLang } from "../utils";
import { Link } from "gatsby";
import { injectIntl } from "react-intl";
import draftSettings from "../config/draftsettings";

const SettingsList = props => {
  // Sort settings regardless of language
  const settings = {};
  for (let s of Object.keys(draftSettings.config)) {
    let label = props.intl.formatMessage({
      id: "settings." + s + ".title"
    });
    settings[label] = s;
  }
  return (
    <ul>
      {Object.keys(settings)
        .sort()
        .map((label, index) => {
          let setting = settings[label];
          return (
            <li key={setting} className="mt05">
              <Link
                to={locLang.set(
                  "/docs/draft/settings/" + setting.toLowerCase(),
                  props.language
                )}
              >
                {label}
              </Link>
              <p className="smaller">
                <FormattedMessage id={"settings." + setting + ".description"} />
              </p>
            </li>
          );
        })}
    </ul>
  );
};

SettingsList.propTypes = {
  language: PropTypes.string.isRequired
};

export default injectIntl(SettingsList);
