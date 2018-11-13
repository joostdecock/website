import React from "react";
import BaseLayout from "../layouts/Base";
import backend from "../../backend";
import UserProfile from "../UserProfile";
import { FormattedMessage } from "react-intl";

class Profile extends React.Component {
  state = {
    profile: false
  };

  componentDidMount() {
    let user = this.props.location.pathname.substring(
      this.props.pageContext.matchPath.length - 1
    );
    backend
      .profile(user)
      .then(res => {
        if (res.status === 200) this.setState({ profile: res.data.profile });
      })
      .catch(err => {
        console.log(err);
        this.props.showNotification("error", err);
      });
  }

  render() {
    return (
      <BaseLayout>
        <section className="content">
          <h1>
            <FormattedMessage id="app.profile" />
          </h1>
          {this.state.profile ? (
            <UserProfile user={this.state.profile} />
          ) : (
            <p>Loading...</p>
          )}
        </section>
      </BaseLayout>
    );
  }
}

export default Profile;
