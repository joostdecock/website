import React from "react";
import { connect } from "react-redux";
import BaseLayout from "../layouts/Base";
import Spinner from "../Spinner";
import { FormattedMessage } from "react-intl";
import { setUserAccount } from "../../store/actions/user";
import { setModels } from "../../store/actions/models";
import { setDrafts } from "../../store/actions/drafts";
import { saveToken, locLang } from "../../utils";
import backend from "../../apis/backend";
import { navigate } from "gatsby";

class LoginCallback extends React.Component {
  state = {
    loading: true,
    confirmation: ""
  };

  login = (confirmation, validation) => {
    backend
      .providerLogin({ confirmation, validation })
      .then(res => {
        if (res.status === 200) {
          this.props.setUserAccount(res.data.account);
          this.props.setModels(res.data.models);
          this.props.setDrafts(res.data.drafts);
          saveToken(res.data.token);
          let to = "/account";
          if (res.data.signup) to = "/welcome";
          navigate(locLang.set(to, this.props.pageContext.language));
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  componentDidMount() {
    let chunks = this.props.location.pathname.split("/");
    let validation = chunks.pop();
    let confirmation = chunks.pop();
    this.login(confirmation, validation);
  }

  render() {
    return (
      <BaseLayout>
        <div className="vspacer">&nbsp;</div>
        <div className="txt-center">
          <h1>
            <FormattedMessage id="app.justAMoment" />
          </h1>
          <Spinner />
        </div>
      </BaseLayout>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  setUserAccount: account => dispatch(setUserAccount(account)),
  setModels: models => dispatch(setModels(models)),
  setDrafts: drafts => dispatch(setDrafts(drafts))
});

export default connect(
  null,
  mapDispatchToProps
)(LoginCallback);
