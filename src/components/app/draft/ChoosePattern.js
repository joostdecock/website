import React from "react";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../../Breadcrumbs";
import PatternPicker from "./PatternPicker";
import { patternList } from "@freesewing/patterns";

const ChoosePattern = props => (
  <div>
    <Breadcrumbs
      via={[{ label: "app.newDraft", link: false }]}
      towards={["app.chooseAModel", "app.configureYourDraft"]}
    >
      <FormattedMessage id="app.chooseAPattern" />
    </Breadcrumbs>
    <h1 className="txt-center">
      <small className="color-muted">
        <FormattedMessage id="app.newDraft" />:
      </small>
      <br />
      <FormattedMessage id="app.chooseAPattern" />
    </h1>
    <div className="wrap narrow">
      <div className="overpad1-always">
        <PatternPicker patterns={patternList} language={props.language} />
      </div>
    </div>
  </div>
);

export default ChoosePattern;
