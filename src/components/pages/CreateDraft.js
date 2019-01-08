import React from "react";
import { connect } from "react-redux";
import { setGist } from "../../store/actions/gist";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import DraftContainer from "../app/draft/Container";
import Breadcrumbs from "../Breadcrumbs";
import { FormattedMessage } from "react-intl";
import { locLang, capitalize } from "../../utils";
import Center from "../Center";
import Spinner from "../Spinner";

const Draft = props => {
  let model = props["*"].split("/").pop();
  let pattern = props["*"].split("/")[2];
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

  model = props.models[model];
  if (props.user) {
    props.setGist({
      pattern,
      settings: {
        embed: true,
        sa: 0,
        complete: true,
        paperless: false,
        locale: props.pageContext.language,
        units: props.user.settings.units,
        margin: props.user.settings.units === "imperial" ? 2.38125 : 2,
        measurements: model.measurements,
        options: {}
      }
    });
  }

  return (
    <BaseLayout>
      <AuthContainer>
        <Breadcrumbs
          via={[
            {
              label: (
                <FormattedMessage
                  id="app.draftPattern"
                  values={{ pattern: capitalize(pattern) }}
                />
              ),
              link: locLang.set("/draft/", props.pageContext.language)
            },
            {
              label: (
                <FormattedMessage
                  id="app.draftPatternForModel"
                  values={{
                    pattern: capitalize(pattern),
                    model: model.name
                  }}
                />
              ),
              link: locLang.set("/draft/" + pattern, props.pageContext.language)
            }
          ]}
        >
          <FormattedMessage id="app.configureYourDraft" />
        </Breadcrumbs>
        <h1>
          <FormattedMessage id="app.configureYourDraft" />
        </h1>
        <DraftContainer {...props.pageContext} user={props.user} />
      </AuthContainer>
    </BaseLayout>
  );
};

const mapStateToProps = state => ({
  models: state.models,
  user: state.user
});

const mapDispatchToProps = dispatch => ({
  setGist: gist => dispatch(setGist(gist))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Draft);
