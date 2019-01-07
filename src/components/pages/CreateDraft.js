import React from "react";
import { connect } from "react-redux";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import DraftContainer from "../app/draft/Container";

const Draft = props => {
  let model = props["*"].split("/").pop();
  let pattern = props["*"].split("/")[2];
  if (props.models) model = props.models[model];
  return (
    <BaseLayout>
      <AuthContainer>
        <DraftContainer
          {...props.pageContext}
          pattern={pattern}
          model={model}
          user={props.user}
        />
      </AuthContainer>
    </BaseLayout>
  );
};

const mapStateToProps = state => ({
  models: state.models,
  user: state.user
});

export default connect(mapStateToProps)(Draft);
