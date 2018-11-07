import React from "react";
import { connect } from "react-redux";
import LoginRequiredMessage from "./LoginRequiredMessage";

class AuthContainer extends React.Component {
  render() {
    // Passing location and language props down to children
    const { location, language } = this.props;
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, { location, language });
    });
    if (this.props.user.status === "active") return children;
    else
      return <LoginRequiredMessage location={location} language={language} />;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(AuthContainer);
