import React from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../../Breadcrumbs";
import ModelPicker from "./ModelPicker";
import { patternInfo } from "@freesewing/patterns";
import { locLang, capitalize } from "../../../utils";

const ChooseModel = ({ language, pattern, models }) => {
  const getModelList = pattern => {
    let modelList = {
      valid: {},
      invalid: {}
    };
    for (let handle of Object.keys(models)) {
      let valid = true;
      for (let requiredMeasurement of patternInfo[pattern].measurements) {
        if (
          typeof models[handle].measurements === "undefined" ||
          typeof models[handle].measurements[requiredMeasurement] ===
            "undefined"
        )
          valid = false;
      }
      if (valid) modelList.valid[handle] = models[handle].name || handle;
      else modelList.invalid[handle] = models[handle].name || handle;
    }
    return modelList;
  };

  return (
    <div>
      <Breadcrumbs
        via={[
          {
            label: (
              <FormattedMessage
                id="app.draftPattern"
                values={{ pattern: capitalize(pattern) }}
              />
            ),
            link: locLang.set("/draft/", language)
          }
        ]}
        towards={["app.configureYourDraft"]}
      >
        <FormattedMessage id="app.chooseAModel" />
      </Breadcrumbs>
      <h1 className="txt-center">
        <small className="color-muted">
          <FormattedMessage id="app.newDraft" />:
        </small>
        <br />
        <FormattedMessage id="app.chooseAModel" />
      </h1>
      <div className="wrap narrow">
        <div className="overpad1-always">
          <ModelPicker
            models={getModelList(pattern)}
            pattern={pattern}
            language={language}
          />
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  models: state.models
});

export default connect(mapStateToProps)(ChooseModel);
