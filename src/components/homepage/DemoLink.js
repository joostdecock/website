import React from "react";
import { locLang } from "../../utils";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";

const DemoLink = props => (
  <div className="center">
    <h2>
      <FormattedMessage id="email.footerSlogan" />
    </h2>
    <p>
      <FormattedMessage id="intro.txt-newHere" />
    </p>
    <Button
      variant="contained"
      size="large"
      color="primary"
      href={locLang.set("/demo", props.language)}
    >
      <FormattedMessage id="intro.tryTheFreesewingDemo" />
    </Button>
  </div>
);

export default DemoLink;
