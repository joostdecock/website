import React from "react";
import Markdown from "react-markdown";

const PreviewDocs = props => {
  return (
    <React.Fragment>
      <h1>{props.title}</h1>
      <Markdown source={props.markdown} />
    </React.Fragment>
  );
};

export default PreviewDocs;
