import React from "react";
import { connect } from "react-redux";
//import Notification from "../../Notification";
//import backend from "../../../backend";
import { FormattedMessage, injectIntl } from "react-intl";
import { setUserAccount } from "../../../store/actions/user";
import Grid from "@material-ui/core/Grid";

class AccountContainer extends React.Component {
  state = {
    dialog: false,
    loading: false,
    notification: {
      show: false,
      message: "",
      type: "info"
    }
  };

  notify = (type, message) => {
    this.setState({
      //...this.state,
      notification: {
        show: true,
        type: type,
        message: message
      }
    });
  };

  handleNotificationOnClose = () => {
    // Triggered on auto-close
    if (this.state.notification.show === true) {
      this.handleNotificationClose();
    }
  };

  handleNotificationClose = () => {
    this.setState({
      ...this.state,
      notification: {
        ...this.state.notification,
        show: false
      }
    });
  };

  startLoading = () => {
    this.setState({
      ...this.state,
      loading: true
    });
  };

  stopLoading = () => {
    this.setState({
      ...this.state,
      loading: false
    });
  };

  render() {
    return (
      <section>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid item xs={12} sm={10} md={4} lg={3} xl={3} />
          <Grid item xs={12} sm={10} md={6} lg={5} xl={4}>
            <div className="docs">
              <h1>FIXME: account</h1>
            </div>
          </Grid>
          <Grid item xs={12} sm={10} md={6} lg={3} xl={3} />
        </Grid>
        <Grid container direction="row" justify="center" alignItems="center">
          <Grid
            item
            xs={12}
            sm={10}
            md={4}
            lg={3}
            xl={3}
            className="align-self-stretch"
          >
            <div className="docs toc">
              <h3>
                <FormattedMessage id="app.contents" />
              </h3>
            </div>
          </Grid>
          <Grid item xs={12} sm={10} md={6} lg={5} xl={4}>
            <div className="docs">
              <pre>{JSON.stringify(this.props.user, null, 2)}</pre>
              fixme
            </div>
          </Grid>
          <Grid item xs={12} sm={10} md={6} lg={3} xl={3}>
            <div className="docs cot">fixme too</div>
          </Grid>
        </Grid>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setUserAccount: account => dispatch(setUserAccount(account))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(AccountContainer));
