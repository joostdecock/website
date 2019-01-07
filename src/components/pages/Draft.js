import React from "react";
import { connect } from "react-redux";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import EditContainer from "../app/showdraft/EditContainer";

const Draft = props => {
  let handle = props.location.pathname.split("/").pop();
  let ownDraft =
    typeof props.drafts === "undefined"
      ? false
      : typeof props.drafts[handle] === "undefined"
        ? false
        : true;
  return (
    <BaseLayout>
      <AuthContainer>
        {ownDraft ? (
          <EditContainer draft={props.drafts[handle]} />
        ) : (
          <pre>{JSON.stringify(props, null, 2)}</pre>
        )}
      </AuthContainer>
    </BaseLayout>
  );
};

const mapStateToProps = state => ({ drafts: state.drafts });

export default connect(mapStateToProps)(Draft);
