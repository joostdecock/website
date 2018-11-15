import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import LanguageIcon from "@material-ui/icons/Language";
import Button from "@material-ui/core/Button";
import Tray from "./Tray";
import TrayTitle from "./TrayTitle";
import TrayFooter from "./TrayFooter";
import { Link } from "gatsby";
import { locLang } from "../utils";
import measurements from "../data/i18n/en/measurements.yaml";

const OtherMeasurements = props => {
  return (
    <Tray className="my1">
      <TrayTitle icon={<LanguageIcon />}>
        <FormattedMessage
          id="app.otherThing"
          values={{
            thing: props.intl
              .formatMessage({ id: "app.measurements" })
              .toLowerCase()
          }}
        />
      </TrayTitle>
      <ul>
        {Object.keys(measurements).map((m, index) => (
          <li>
            <Link to={"/docs/measurements/" + m.toLowerCase()}>
              <FormattedMessage id={"measurements." + m} />
            </Link>
          </li>
        ))}
      </ul>
      <TrayFooter />
    </Tray>
  );
};

export default injectIntl(OtherMeasurements);
