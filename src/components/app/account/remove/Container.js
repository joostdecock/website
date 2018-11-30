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
import RemoveIcon from "@material-ui/icons/DeleteForever";
import Switch from "@material-ui/core/Switch";
import BackIcon from "@material-ui/icons/KeyboardArrowLeft";
import WarningIcon from "@material-ui/icons/Warning";
import Breadcrumbs from "../../../Breadcrumbs";
import Tray from "../../../Tray";
import WhyIcon from "@material-ui/icons/Help";
import TwoColumns from "../../../TwoColumns";
import Column from "../../../Column";

class AccountRemoveContainer extends React.Component {
  state = {
    loading: false,
    remove: false
  };

  handleToggle = key => {
    this.setState({
      loading: false,
      remove: this.state.remove ? false : true
    });
  };

  handleRemove = () => {
    this.setState({
      ...this.state,
      loading: true
    });
    backend
      .remove()
      .then(res => {
        if (res.status === 200) {
          clearToken();
          this.props.setUserAccount(false);
          this.props.showNotification(
            "warning",
            <FormattedMessage id="account.accountRemoved" />
          );
          navigate(locLang.set("/", locLang.get(this.props.location)));
        }
      })
      .catch(err => {
        console.log(err);
        this.setState({ loading: false });
      });
  };

  render() {
    return (
      <div>
        <Breadcrumbs via={[{ link: "/account", label: "app.settings" }]}>
          <FormattedMessage id="account.removeYourAccount" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="account.removeYourAccount" />
        </h1>
        <TwoColumns>
          <Column>
            <div className="overpad1">
              <List component="nav" className="maxw700">
                <ListItem button onClick={this.handleToggle}>
                  <ListItemIcon>
                    <RemoveIcon
                      classes={{
                        root: this.state.remove ? "color-danger" : ""
                      }}
                    />
                  </ListItemIcon>
                  <ListItemText>
                    <FormattedMessage id="account.removeYourAccount" />
                  </ListItemText>
                  <ListItemSecondaryAction>
                    <Switch
                      color="primary"
                      className="switch-danger"
                      onClick={this.handleToggle}
                      checked={this.state.remove}
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </div>
            {this.state.remove ? (
              <Tray
                className="my1 danger always-expanded"
                icon={<WarningIcon />}
                title={<FormattedMessage id="app.proceedWithCaution" />}
                footer={
                  <div>
                    <Link
                      to={locLang.set(
                        "/account",
                        locLang.get(this.props.location)
                      )}
                    >
                      <Button className="mr10">
                        <BackIcon />
                        <FormattedMessage id="app.back" />
                      </Button>
                    </Link>
                    <Button onClick={this.handleRemove}>
                      <ButtonSpinner
                        loading={this.state.loading}
                        icon={<RemoveIcon className="btn-icon" />}
                      />
                      <FormattedMessage id="account.removeYourAccount" />
                    </Button>
                  </div>
                }
              >
                <p>
                  <FormattedHTMLMessage id="account.removeYourAccountWarning" />
                </p>
              </Tray>
            ) : (
              ""
            )}
          </Column>
          <Column right>
            <Tray
              className="my1"
              icon={<WhyIcon />}
              title={<FormattedMessage id="app.whatIsThis" />}
              footer={
                <Link
                  to={locLang.set(
                    "/docs/rights",
                    locLang.get(this.props.location)
                  )}
                >
                  <Button>
                    <FormattedMessage id="app.yourRights" />
                  </Button>
                </Link>
              }
            >
              <p>
                <FormattedHTMLMessage id="account.removeYourAccountInfo" />
              </p>
              <p>
                <FormattedMessage id="gdpr.readRights" />
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
)(AccountRemoveContainer);
