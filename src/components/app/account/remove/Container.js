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
import SaveIcon from "@material-ui/icons/Save";
import BackIcon from "@material-ui/icons/KeyboardArrowLeft";

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
    console.log("remove");
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
      <div className="content">
        <h1>
          <FormattedMessage id="account.removeYourAccount" />
        </h1>

        <div className="overpad1">
          <List component="nav">
            <ListItem button onClick={this.handleToggle}>
              <ListItemIcon>
                <RemoveIcon
                  classes={{ root: this.state.remove ? "txt-danger" : "" }}
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
          <div className="txt-right">
            <Link
              to={locLang.set("/account", locLang.get(this.props.location))}
            >
              <Button className="mr10 mt10" variant="outlined">
                <BackIcon />
                <FormattedMessage id="app.back" />
              </Button>
            </Link>
            <Button
              className="mr10 mt10 button-danger"
              variant="contained"
              color="primary"
              size="large"
              disabled={this.state.remove ? false : true}
              onClick={this.handleRemove}
            >
              <ButtonSpinner
                loading={this.state.loading}
                icon={<RemoveIcon className="btn-icon" />}
              />
              <FormattedMessage
                id="account.removeYourAccount"
                disabled={!this.state.remove}
              />
            </Button>
          </div>
        </div>
        <div className="box">
          <h5>
            <FormattedMessage id="account.removeYourAccount" />
          </h5>
          <p>
            <FormattedHTMLMessage id="account.removeYourAccountInfo" />
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
)(AccountRemoveContainer);
