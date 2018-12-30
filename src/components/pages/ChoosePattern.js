import React from "react";
import BaseLayout from "../layouts/Base";
import AuthContainer from "../app/auth/Container";
import { FormattedMessage } from "react-intl";
import Breadcrumbs from "../Breadcrumbs";
import PatternPicker from "../app/draft/PatternPicker";
import { patternList } from "@freesewing/patterns";

const ChoosePatternPage = props => (
  <BaseLayout>
    <AuthContainer>
      <div>
        <Breadcrumbs
          via={[{ label: "app.newDraft", link: false }]}
          towards={["app.chooseAModel", "app.configureYourDraft"]}
        >
          <FormattedMessage id="app.chooseAPattern" />
        </Breadcrumbs>
        <h1 className="txt-center">
          <small className="color-muted">
            <FormattedMessage id="app.newDraft" />:
          </small>
          <br />
          <FormattedMessage id="app.chooseAPattern" />
        </h1>
        <div className="wrap narrow">
          <div className="overpad1-always">
            <PatternPicker patterns={patternList} {...props.pageContext} />
          </div>
        </div>
      </div>
    </AuthContainer>
  </BaseLayout>
);

export default ChoosePatternPage;
