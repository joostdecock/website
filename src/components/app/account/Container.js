import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, injectIntl } from "react-intl";
import { setUserAccount } from "../../../store/actions/user";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";
import backend from "../../../apis/backend";
import Breadcrumbs from "../../Breadcrumbs";
import TwoColumns from "../../TwoColumns";
import Column from "../../Column";
import FieldDrawers from "../../fields/FieldDrawers";
import { accountFields } from "../../../config/fields";
import Field from "../../fields/Field";
import UserProfile from "../../UserProfile";

class AccountContainer extends React.Component {
  state = {
    display: "account"
  };

  injectFieldValues = () => {
    let fields = accountFields;
    let user = this.props.user;
    for (let m of Object.keys(fields.account.items)) {
      if (typeof fields.account.items[m].sub === "string") {
        let sub = fields.account.items[m].sub;
        if (
          typeof user[sub] === "undefined" ||
          typeof user[sub][m] === "undefined"
        )
          fields.account.items[m].value = null;
        else fields.account.items[m].value = user[sub][m];
      } else {
        if (typeof user[m] === "undefined")
          fields.account.items[m].value = null;
        else fields.account.items[m].value = user[m];
      }
    }
    fields.account.items.picture.value = user.pictureUris.xs;

    return fields;
  };

  updateDisplay = (key, data = null) => {
    if (key === null) key = "account";
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
      .saveAccount(data)
      .then(res => {
        if (res.status === 200) {
          this.props.setUserAccount(res.data.account);
          let msg = this.props.intl.formatMessage(
            { id: "app.fieldSaved" },
            { field: this.props.intl.formatMessage({ id: config.label }) }
          );
          this.props.showNotification("success", msg);
          this.setState({ display: "account" });
        }
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  };

  render() {
    let fields = this.injectFieldValues();
    return (
      <React.Fragment>
        <Breadcrumbs>
          <FormattedMessage id="app.settings" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.settings" />
        </h1>
        <TwoColumns>
          <Column wide>
            {this.state.display === "account" ? (
              <UserProfile user={this.props.user} />
            ) : (
              ""
            )}
            {this.state.display === "update" ? (
              <Field
                {...this.state.data}
                updateField={this.updateField}
                updateDisplay={this.updateDisplay}
                units={this.props.user.units}
              />
            ) : (
              ""
            )}
          </Column>
          <Column right narrow>
            <div className="stick">
              <FieldDrawers
                config={fields}
                units={this.props.user.settings.units}
                display={this.state.display}
                updateDisplay={this.updateDisplay}
                pictureUris={this.props.user.pictureUris}
              />
            </div>
          </Column>
        </TwoColumns>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user,
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  setUserAccount: account => dispatch(setUserAccount(account)),
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AccountContainer));
