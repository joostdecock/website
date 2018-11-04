import React from "react";
import { connect } from "react-redux";
import LoginRequiredMessage from "./LoginRequiredMessage";

class AuthContainer extends React.Component {
  render() {
    if (this.props.user.status === "active") return this.props.children;
    else
      return (
        <LoginRequiredMessage
          location={this.props.location}
          language={this.props.language}
        />
      );
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AuthContainer);
