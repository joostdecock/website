import React from "react";
import { FormattedMessage, injectIntl } from "react-intl";
import LanguageIcon from "@material-ui/icons/Language";
import Tray from "./Tray";
import { Link } from "gatsby";
import { locLang } from "../utils";
import measurements from "../data/i18n/en/measurements.yaml";

const OtherMeasurements = props => {
  return (
    <Tray
      className="my1"
      icon={<LanguageIcon />}
      title={
        <FormattedMessage
          id="app.otherThing"
          values={{
            thing: props.intl
              .formatMessage({ id: "app.measurements" })
              .toLowerCase()
          }}
        />
      }
    >
      <ul>
        {Object.keys(measurements).map((m, index) => (
          <li key={"om" + index}>
            <Link
              to={locLang.set(
                "/docs/measurements/" + m.toLowerCase(),
                props.language
              )}
            >
              <FormattedMessage id={"measurements." + m} />
            </Link>
          </li>
        ))}
      </ul>
    </Tray>
  );
};

export default injectIntl(OtherMeasurements);
