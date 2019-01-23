import React from "react";
import { FormattedMessage } from "react-intl";
import TwoColumns from "../TwoColumns";
import Column from "../Column";
import { Link } from "gatsby";
import { editLink } from "../../utils";

const list = (content, language) => {
  let list = [];
  for (let key of Object.keys(content[language]).sort()) {
    list.push(
      <li key={key}>
        <Link to={editLink(key, language)}>{"/" + language + key}</Link>
      </li>
    );
  }

  return <ul>{list}</ul>;
};

const FileList = props => {
  return (
    <TwoColumns>
      <Column narrow>
        <h3>
          <FormattedMessage id="app.docs" />
        </h3>
        {list(props.content.docs, props.language)}
      </Column>
      <Column right narrow>
        <h3>
          <FormattedMessage id="app.blog" />
        </h3>
        {list(props.content.blog, props.language)}
      </Column>
      <Column right narrow>
        <h3>
          <FormattedMessage id="app.showcase" />
        </h3>
        {list(props.content.showcase, props.language)}
      </Column>
    </TwoColumns>
  );
};

export default FileList;
