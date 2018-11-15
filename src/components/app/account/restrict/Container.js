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
import Breadcrumbs from "../../../Breadcrumbs";
import Tray from "../../../Tray";
import TrayTitle from "../../../TrayTitle";
import TrayFooter from "../../../TrayFooter";
import WhyIcon from "@material-ui/icons/Help";

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
      <div>
        <Breadcrumbs via={[{ link: "/account", label: "app.settings" }]}>
          <FormattedMessage id="account.restrictProcessingOfYourData" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="account.restrictProcessingOfYourData" />
        </h1>
        <div className="overpad1">
          <List component="nav" className="maxw700">
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
        </div>
        {this.state.restrict ? (
          <Tray className="my1 maxw700 danger">
            <TrayTitle icon={<WarningIcon />}>
              <FormattedMessage id="app.proceedWithCaution" />
            </TrayTitle>
            <p>
              <FormattedMessage id="account.restrictProcessingWarning" />
            </p>
            <TrayFooter className="txt-right">
              <Link
                to={locLang.set("/account", locLang.get(this.props.location))}
              >
                <Button onClick={this.handleStopEditing}>
                  <BackIcon />
                  <FormattedMessage id="app.back" />
                </Button>
              </Link>
              <Button onClick={this.handleRestrict}>
                <ButtonSpinner
                  loading={this.state.loading}
                  icon={<SaveIcon className="btn-icon" />}
                />
                <FormattedMessage
                  id="app.save"
                  disabled={!this.state.restrict}
                />
              </Button>
            </TrayFooter>
          </Tray>
        ) : (
          ""
        )}
        <Tray className="my1 maxw700">
          <TrayTitle icon={<WhyIcon />}>
            <FormattedMessage id="app.whatIsThis" />
          </TrayTitle>
          <p>
            <FormattedHTMLMessage id="account.restrictProcessingOfYourDataInfo" />
          </p>
          <p>
            <FormattedMessage id="gdpr.readRights" />
          </p>
          <TrayFooter className="txt-right">
            <Link
              to={locLang.set("/docs/rights", locLang.get(this.props.location))}
            >
              <Button>
                <FormattedMessage id="app.yourRights" />
              </Button>
            </Link>
          </TrayFooter>
        </Tray>
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
