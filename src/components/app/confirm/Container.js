import React from "react";
import { connect } from "react-redux";
import LoadingMessage from "./LoadingMessage";
//import backend from "../../../backend";
import { injectIntl } from "react-intl";
import {
  showNotification,
  closeNotification
} from "../../../store/actions/notification";

class ConfirmContainer extends React.Component {
  state = {
    loading: true
  };

  stopLoading = () => {
    this.setState({
      ...this.state,
      loading: false
    });
  };

  render() {
    return (
      <div>
        {this.state.loading ? (
          <LoadingMessage language={this.props.language} />
        ) : (
          <p>now what</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  notification: state.notification
});

const mapDispatchToProps = dispatch => ({
  showNotification: (style, message) =>
    dispatch(showNotification(style, message)),
  closeNotification: () => dispatch(closeNotification())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(injectIntl(ConfirmContainer));
