import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import { setModels } from "../../../store/actions/models";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import backend from "../../../apis/backend";
import { scrollToTop } from "../../../utils";
//import MeasurementImages from "../../MeasurementImages";
//import LanguageNotAvailable from "../../LanguageNotAvailable";
import Field from "../../fields/Field";
import FieldDrawers from "../../fields/FieldDrawers";
import { modelFields } from "../../../config/fields";
import ModelProfile from "../../ModelProfile";
import Measurements from "./Measurements";

class ModelContainer extends React.Component {
  state = {
    display: "model",
    value: false
  };

  componentDidUpdate() {
    scrollToTop();
  }

  updateDisplay = (key, data = null) => {
    if (key === null) key = "model";
    if (key === "updateMeasurement") {
      key = "update";
      let measurement = data;
      data = {
        config: {
          type: "distance",
          label: "measurements." + measurement,
          value: this.props.models[this.props.handle].measurements[measurement],
          sub: "measurements"
        },
        item: measurement
      };
    }

    this.setState({ display: key, data });
  };

  updateField = (key, value, config = null) => {
    if (value === config.value)
      return this.props.showNotification(
        "info",
        <FormattedMessage id="app.noChanges" />
      );
    let data = {};
    if (config.sub) {
      data[config.sub] = {};
      data[config.sub][key] = value;
    } else data[key] = value;
    backend
      .saveModel(this.props.handle, data)
      .then(res => {
        if (res.status === 200) {
          let models = this.props.models;
          models[this.props.handle] = res.data.model;
          this.props.setModels(models);
          let msg = this.props.intl.formatMessage(
            { id: "app.fieldSaved" },
            { field: this.props.intl.formatMessage({ id: config.label }) }
          );
          this.props.showNotification("success", msg);
          this.setState({ display: "model" });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  injectFieldValues = () => {
    let fields = modelFields;
    let model = this.props.models[this.props.handle];
    for (let field of [
      "breasts",
      "created",
      "handle",
      "name",
      "units",
      "notes"
    ])
      fields.info.items[field].value = model[field];

    return fields;
  };

  render() {
    let fields = this.injectFieldValues();
    console.log(fields);
    let model = this.props.models[this.props.handle];
    return (
      <TwoColumns wrapReverse={true}>
        <Column wide>
          {this.state.display === "model" ? (
            <React.Fragment>
              <ModelProfile model={model} />
              <h2 className="txt-center">
                <FormattedMessage id="app.measurements" />
              </h2>
              <Measurements model={model} updateDisplay={this.updateDisplay} />
            </React.Fragment>
          ) : (
            ""
          )}
          {this.state.display === "update" ? (
            <Field
              {...this.state.data}
              updateField={this.updateField}
              updateDisplay={this.updateDisplay}
              units={model.units}
              intl={this.props.intl}
            />
          ) : (
            ""
          )}
        </Column>
        <Column right narrow>
          <div className="stick">
            <FieldDrawers
              config={fields}
              units={this.props.models[this.props.handle].units}
              display={this.state.display}
              updateDisplay={this.updateDisplay}
              avatars={this.props.models[this.props.handle].pictureUris}
            />
          </div>
        </Column>
      </TwoColumns>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  setModels: models => dispatch(setModels(models)),
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ModelContainer));
