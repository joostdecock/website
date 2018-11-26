import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { setModels } from "../../../store/actions/models";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import Button from "@material-ui/core/Button";
import backend from "../../../backend";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import TextField from "@material-ui/core/TextField";
import SaveIcon from "@material-ui/icons/PersonAdd";
import Tray from "../../Tray";
import { navigate } from "gatsby";
import { locLang } from "../../../utils";

class CreateModelContainer extends React.Component {
  state = {
    name: "",
    units: "metric",
    breasts: "false"
  };

  componentDidMount() {
    this.setState({
      ...this.state,
      units: this.props.user.settings.units
    });
  }

  handleSubmit = evt => {
    evt.preventDefault();
    backend
      .createModel({
        name: this.state.name,
        units: this.state.units,
        breasts: this.state.breasts === "true" ? true : false
      })
      .then(res => {
        if (res.status === 200) {
          let msg = this.props.intl.formatMessage(
            { id: "app.fieldSaved" },
            {
              field: this.props.intl.formatMessage({
                id: "app.model"
              })
            }
          );
          this.props.showNotification("success", msg);
          let models = this.props.models;
          models[res.data.model.handle] = res.data.model;
          this.props.setModels(models);
          navigate(
            locLang.set("/models/" + res.data.model.handle, this.props.language)
          );
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  updateName = evt => {
    let value = evt.target.value;
    this.setState({
      ...this.state,
      name: value
    });
  };

  toggleUnits = evt => {
    let value = evt.target.value;
    this.setState({
      ...this.state,
      units: value
    });
  };

  toggleBreasts = evt => {
    let value = evt.target.value === "true" ? "true" : "false";
    this.setState({
      ...this.state,
      breasts: value
    });
  };

  render() {
    const intl = this.props.intl;
    return (
      <div className="min70vh">
        <Breadcrumbs>
          <FormattedMessage id="app.newModel" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.newModel" />
        </h1>
        <TwoColumns>
          <Column>
            <form onSubmit={this.handleSubmit}>
              <h5>
                <FormattedMessage id="app.name" />
              </h5>
              <TextField
                id="name"
                fullWidth={true}
                label={intl.formatMessage({ id: "app.name" })}
                margin="normal"
                variant="outlined"
                value={this.state.name}
                type="text"
                onChange={this.updateName}
              />

              <h5>
                <FormattedMessage id="account.units" />
              </h5>
              <RadioGroup
                name="units"
                onChange={this.toggleUnits}
                value={this.state.units || "metric"}
                id="units"
              >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="metric"
                  checked={this.state.units === "metric" ? true : false}
                  label={intl.formatMessage({ id: "app.metricUnits" })}
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  checked={this.state.units === "metric" ? false : true}
                  value="imperial"
                  label={intl.formatMessage({ id: "app.imperialUnits" })}
                />
              </RadioGroup>

              <h5>
                <FormattedMessage id="app.chest" />
              </h5>
              <RadioGroup
                name="breasts"
                onChange={this.toggleBreasts}
                value={this.state.breasts || "false"}
                id="breasts"
              >
                <FormControlLabel
                  control={<Radio color="primary" />}
                  checked={this.state.breasts ? false : true}
                  value="false"
                  label={intl.formatMessage({ id: "app.withoutBreasts" })}
                />
                <FormControlLabel
                  control={<Radio color="primary" />}
                  value="true"
                  checked={this.state.breasts ? true : false}
                  label={intl.formatMessage({ id: "app.withBreasts" })}
                />
              </RadioGroup>
              <div className="txt-right mt1">
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth={true}
                  size="large"
                  color="primary"
                >
                  <SaveIcon className="mr1" />
                  <FormattedMessage id="app.createModel" />
                </Button>
              </div>
            </form>
          </Column>
          <Column side="right">
            <Tray
              className="my1 always-expanded"
              title={<FormattedMessage id="app.whatIsThis" />}
            >
              <h5>
                <FormattedMessage id="app.name" />
              </h5>
              <p>
                <FormattedMessage id="app.nameInfo" />
              </p>
              <h5>
                <FormattedMessage id="account.units" />
              </h5>
              <p>
                <FormattedMessage id="app.unitsInfo" />
              </p>
              <h5>
                <FormattedMessage id="app.chest" />
              </h5>
              <p>
                <FormattedMessage id="app.chestInfo" />
              </p>
            </Tray>
          </Column>
        </TwoColumns>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  models: state.models
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
)(injectIntl(CreateModelContainer));
