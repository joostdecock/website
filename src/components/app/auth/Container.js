import React from "react";
import { connect } from "react-redux";
import LoginRequiredMessage from "./LoginRequiredMessage";
//import { navigate } from "gatsby";

class AuthContainer extends React.Component {
  render() {
    if (this.props.user.status === "active") return this.props.children;
    else return <LoginRequiredMessage slug={this.props.slug} />;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AuthContainer);
