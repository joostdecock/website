import React from "react";
import { connect } from "react-redux";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import ModelContainer from "../app/model/Container";
import NotFound from "../NotFound";
import Breadcrumbs from "../Breadcrumbs";
import Center from "../Center";
import Spinner from "../Spinner";

const Model = props => {
  let handle = props.location.pathname.split("/").pop();
  let ownModel =
    typeof props.models === "undefined"
      ? false
      : typeof props.models[handle] === "undefined"
        ? false
        : true;
  if (!props.models)
    return (
      <BaseLayout>
        <AuthContainer>
          <Center>
            <Spinner />
          </Center>
        </AuthContainer>
      </BaseLayout>
    );
  return (
    <BaseLayout>
      <AuthContainer>
        <Breadcrumbs via={[{ link: "/models", label: "app.models" }]}>
          {props.models[handle].name}
        </Breadcrumbs>
        <h1>
          {props.models[handle].name}
          <span className="handle">
            [#
            {handle}]
          </span>
        </h1>
        {ownModel ? (
          <ModelContainer
            data={props.pageContext.data}
            models={props.models}
            handle={handle}
          />
        ) : (
          <NotFound language={props.pageContext.language} />
        )}
      </AuthContainer>
    </BaseLayout>
  );
};
const mapStateToProps = state => ({ models: state.models });

export default connect(mapStateToProps)(Model);
