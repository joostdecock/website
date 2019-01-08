import React from "react";
import { connect } from "react-redux";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import DraftContainer from "../app/draft/Container";
import LoadGist from "../app/draft/LoadGist";
import Breadcrumbs from "../Breadcrumbs";
import { FormattedMessage } from "react-intl";
import { locLang } from "../../utils";

const DraftFromGist = props => (
  <BaseLayout>
    <AuthContainer>
      <Breadcrumbs
        via={[
          {
            label: <FormattedMessage id="app.newDraft" />,
            link: locLang.set("/draft/", props.pageContext.language)
          }
        ]}
      >
        <FormattedMessage id="app.newDraftFromGist" />
      </Breadcrumbs>
      <h1>
        {typeof props.gist === "undefined" || props.gist === false ? (
          <FormattedMessage id="app.newDraftFromGist" />
        ) : (
          <FormattedMessage id="app.configureYourDraft" />
        )}
      </h1>
      {typeof props.gist === "undefined" || props.gist === false ? (
        <LoadGist user={props.user} />
      ) : (
        <DraftContainer
          {...props.pageContext}
          user={props.user}
          fromGist={true}
        />
      )}
    </AuthContainer>
  </BaseLayout>
);

const mapStateToProps = state => ({
  gist: state.gist,
  user: state.user
});

export default connect(mapStateToProps)(DraftFromGist);
