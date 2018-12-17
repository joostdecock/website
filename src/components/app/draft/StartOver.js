import React from "react";
import { FormattedMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import { locLang } from "../../../utils";

const StartOver = props => {
  return (
    <div>
      <h5 className="mt1 mb1">
        <FormattedMessage id="app.startOver" />
      </h5>
      <p>
        <Button
          variant="outlined"
          className="mr1"
          href={locLang.set("/draft", props.language)}
        >
          <FormattedMessage id="app.changePattern" />
        </Button>
        <Button
          variant="outlined"
          href={locLang.set("/draft/" + props.pattern, props.language)}
        >
          <FormattedMessage id="app.changeModel" />
        </Button>
      </p>
    </div>
  );
};
export default StartOver;
