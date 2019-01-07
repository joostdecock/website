import React from "react";
import { connect } from "react-redux";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import { patternList, patternInfo } from "@freesewing/patterns";
import Breadcrumbs from "../Breadcrumbs";
import ModelPicker from "../app/draft/ModelPicker";
import { FormattedMessage } from "react-intl";
import { locLang, capitalize } from "../../utils";
import NotFound from "../NotFound";

const ChooseModelPage = props => {
  let pattern = props["*"].split("/").pop();
  if (patternList.indexOf(pattern) === -1)
    return (
      <BaseLayout>
        <NotFound language={props.pageContext.language} />
      </BaseLayout>
    );
  else {
    const getModelList = pattern => {
      let modelList = {
        valid: {},
        invalid: {}
      };
      for (let handle of Object.keys(props.models)) {
        let valid = true;
        for (let requiredMeasurement of patternInfo[pattern].measurements) {
          if (
            typeof props.models[handle].measurements === "undefined" ||
            typeof props.models[handle].measurements[requiredMeasurement] ===
              "undefined"
          )
            valid = false;
        }
        if (valid)
          modelList.valid[handle] = props.models[handle].name || handle;
        else modelList.invalid[handle] = props.models[handle].name || handle;
      }
      return modelList;
    };
    return (
      <BaseLayout>
        <AuthContainer>
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
                  link: locLang.set("/draft/", props.pageContext.language)
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
                  language={props.pageContext.language}
                />
              </div>
            </div>
          </div>
        </AuthContainer>
      </BaseLayout>
    );
  }
};

const mapStateToProps = state => ({
  models: state.models
});

export default connect(mapStateToProps)(ChooseModelPage);
