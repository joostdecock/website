import React from "react";
import { FormattedMessage, FormattedHTMLMessage } from "react-intl";
import Button from "@material-ui/core/Button";
import { Link } from "gatsby";
import Center from "../Center";
import i18nConfig from "../../config/i18n";

const TranslateOrEdit = props => {
  return (
    <Center>
      <div className="maxw700 txt-center">
        <h2>
          <FormattedMessage id="editor.translateOrEdit" />
        </h2>
        <p>
          <FormattedMessage id="app.thisContentIsNotAvailableInLanguage" />
        </p>
        <p>
          <FormattedHTMLMessage id="editor.translateOrEditQuestion" />
        </p>
        <div className="mb1">
          <Button
            variant="outlined"
            color="primary"
            fullWidth={true}
            onClick={props.doCreate}
          >
            <span
              dangerouslySetInnerHTML={{
                __html: i18nConfig.icons[props.language]
              }}
              className="mr1"
            />
            <FormattedMessage id="editor.createLanguageVersion" />
          </Button>
        </div>
        <Link to={props.englishEditLink}>
          <Button
            variant="outlined"
            color="primary"
            fullWidth={true}
            size="large"
          >
            <span
              dangerouslySetInnerHTML={{ __html: i18nConfig.icons.en }}
              className="mr1"
            />
            <FormattedMessage id="editor.editEnglishVersion" />
          </Button>
        </Link>
      </div>
    </Center>
  );
};

export default TranslateOrEdit;
