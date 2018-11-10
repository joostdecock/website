import React from "react";
import { connect } from "react-redux";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import backend from "../../../../backend";
import { locLang, clearToken } from "../../../../utils";
import { setUserAccount } from "../../../../store/actions/user";
import { Link } from "gatsby";
import ButtonSpinner from "../../../ButtonSpinner";
import { navigate } from "gatsby";
import { showNotification } from "../../../../store/actions/notification";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import PauseIcon from "@material-ui/icons/PauseCircleFilled";
import Switch from "@material-ui/core/Switch";
import SaveIcon from "@material-ui/icons/Save";
import BackIcon from "@material-ui/icons/KeyboardArrowLeft";
import WarningIcon from "@material-ui/icons/Warning";

class AccountRestrictContainer extends React.Component {
  state = {
    loading: false,
    restrict: false
  };

  handleToggle = key => {
    this.setState({
      loading: false,
      restrict: this.state.restrict ? false : true
    });
  };

  handleRestrict = key => {
    this.setState({
      ...this.state,
      loading: true
    });
    backend
      .restrict()
      .then(res => {
        if (res.status === 200) {
          clearToken();
          this.props.setUserAccount(false);
          this.props.showNotification(
            "warning",
            <FormattedMessage id="account.accountRestricted" />
          );
          navigate(locLang.set("/", locLang.get(this.props.location)));
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  switchClasses = {
    colorSwitchBase: {
      color: "orange",
      "&$colorChecked": {
        color: "orange",
        "& + $colorBar": {
          backgroundColor: "orange"
        }
      }
    }
  };

  render() {
    return (
      <div className="content">
        <h1>
          <FormattedMessage id="account.restrictProcessingOfYourData" />
        </h1>

        <div className="overpad1">
          <List component="nav">
            <ListItem button onClick={this.handleToggle}>
              <ListItemIcon>
                <PauseIcon
                  classes={{ root: this.state.restrict ? "txt-warning" : "" }}
                />
              </ListItemIcon>
              <ListItemText>
                <FormattedMessage id="account.restrictProcessingOfYourData" />
              </ListItemText>
              <ListItemSecondaryAction>
                <Switch
                  className="switch-warning"
                  color="primary"
                  onClick={this.handleToggle}
                  checked={this.state.restrict}
                />
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          {this.state.restrict ? (
            <div className="box low">
              <h5>
                <WarningIcon classes={{ root: "txt-danger mr10 mb-4" }} />
                <FormattedMessage id="app.proceedWithCaution" />
              </h5>
              <p>
                <FormattedMessage id="account.restrictProcessingWarning" />
              </p>
            </div>
          ) : (
            ""
          )}
          <div className="txt-right">
            <Link
              to={locLang.set("/account", locLang.get(this.props.location))}
            >
              <Button
                onClick={this.handleStopEditing}
                className="mr10 mt10"
                variant="outlined"
              >
                <BackIcon />
                <FormattedMessage id="app.back" />
              </Button>
            </Link>
            <Button
              className="mr10 mt10"
              variant="contained"
              color="primary"
              size="large"
              disabled={this.state.restrict ? false : true}
              onClick={this.handleRestrict}
            >
              <ButtonSpinner
                loading={this.state.loading}
                icon={<SaveIcon className="btn-icon" />}
              />
              <FormattedMessage id="app.save" disabled={!this.state.restrict} />
            </Button>
          </div>
        </div>
        <div className="box">
          <h5>
            <FormattedMessage id="account.restrictProcessingOfYourData" />
          </h5>
          <p>
            <FormattedHTMLMessage id="account.restrictProcessingOfYourDataInfo" />
          </p>
        </div>
      </div>
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
    dispatch(showNotification(style, message))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountRestrictContainer);
