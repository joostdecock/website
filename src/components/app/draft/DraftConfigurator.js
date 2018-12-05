import React from "react";
import { capitalize, locLang } from "../../../utils";
import { FormattedMessage } from "react-intl";
import Tray from "../../Tray";
import SeamAllowanceOption from "./options/SeamAllowance";
import ThemeOption from "./options/Theme";

const DraftConfigurator = props => {
  const { intl } = props;
  return (
    <div>
      <Tray
        title={<FormattedMessage id="app.contents" />}
        className="load-collapsed"
      >
        <div className="toc">
          <ul>
            <li>
              <a href="#pattern-options">
                <FormattedMessage id="app.patternOptions" />
              </a>
            </li>
            <li>
              <a href="#draft-options">
                <FormattedMessage id="app.draftOptions" />
              </a>
              <ul>
                <li>
                  <a href="#seam-allowance">
                    <FormattedMessage id="app.seamAllowance" />
                  </a>
                </li>
                <li>
                  <a href="#scope">
                    <FormattedMessage id="app.scope" />
                  </a>
                </li>
                <li>
                  <a href="#theme">
                    <FormattedMessage id="app.theme" />
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </Tray>
      <h3 className="mt1">
        <a name="pattern-options">
          <FormattedMessage id="app.patternOptions" />
        </a>
      </h3>
      <h3>
        <a name="draft-options">
          <FormattedMessage id="app.draftOptions" />
        </a>
      </h3>
      <h4>
        <a name="seam-allowance">
          <FormattedMessage id="app.seamAllowance" />
        </a>
      </h4>
      <SeamAllowanceOption />
      <h4>
        <a name="scope">
          <FormattedMessage id="app.scope" />
        </a>
      </h4>
      <SeamAllowanceOption />
      <h4>
        <a name="theme">
          <FormattedMessage id="app.theme" />
        </a>
      </h4>
      <ThemeOption intl={intl} />
    </div>
  );
};

export default DraftConfigurator;
